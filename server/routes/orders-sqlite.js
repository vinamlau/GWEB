const express = require('express')
const router = express.Router()
const db = require('../config/db-sqlite')

// 生成订单号
const generateOrderNo = () => {
  const date = new Date()
  const timestamp = date
    .toISOString()
    .replace(/[-:T.]/g, '')
    .slice(0, 14)
  const random = Math.random().toString().slice(2, 6)
  return `SHOP${timestamp}${random}`
}

// 创建订单
router.post('/orders', (req, res) => {
  try {
    const { customerName, customerPhone, customerEmail, items, remark, payMethod } = req.body

    if (!customerName || !customerPhone || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: '请填写完整的订单信息' })
    }

    // 计算订单金额
    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      const product = db.prepare('SELECT * FROM shop_products WHERE id = ?').get(item.productId)
      if (!product) {
        return res.status(404).json({ success: false, message: `商品 ${item.productId} 不存在` })
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `商品 ${product.name} 库存不足` })
      }

      totalAmount += product.price * item.quantity
      orderItems.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      })
    }

    const orderNo = generateOrderNo()

    // 创建订单
    db.prepare(
      `
      INSERT INTO shop_orders (orderNo, customerName, customerPhone, customerEmail, totalAmount, payAmount, items, remark, payMethod, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `,
    ).run(
      orderNo,
      customerName,
      customerPhone,
      customerEmail,
      totalAmount,
      totalAmount, // 实际支付金额（暂无折扣）
      JSON.stringify(orderItems),
      remark,
      payMethod,
    )

    // 扣减库存
    for (const item of orderItems) {
      db.prepare('UPDATE shop_products SET stock = stock - ? WHERE id = ?').run(
        item.quantity,
        item.productId,
      )
    }

    res.json({
      success: true,
      message: '订单创建成功',
      data: {
        orderNo,
        totalAmount,
      },
    })
  } catch (error) {
    console.error('创建订单失败:', error)
    res.status(500).json({ success: false, message: '创建订单失败' })
  }
})

// 查询订单详情
router.get('/orders/:orderNo', (req, res) => {
  try {
    const { orderNo } = req.params
    const order = db.prepare('SELECT * FROM shop_orders WHERE orderNo = ?').get(orderNo)

    if (!order) {
      return res.status(404).json({ success: false, message: '订单不存在' })
    }

    // 解析订单项
    order.items = JSON.parse(order.items)

    res.json({ success: true, data: order })
  } catch (error) {
    console.error('查询订单失败:', error)
    res.status(500).json({ success: false, message: '查询订单失败' })
  }
})

// 取消订单
router.post('/orders/:orderNo/cancel', (req, res) => {
  try {
    const { orderNo } = req.params
    const order = db.prepare('SELECT * FROM shop_orders WHERE orderNo = ?').get(orderNo)

    if (!order) {
      return res.status(404).json({ success: false, message: '订单不存在' })
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ success: false, message: '订单状态不允许取消' })
    }

    // 恢复库存
    const items = JSON.parse(order.items)
    for (const item of items) {
      db.prepare('UPDATE shop_products SET stock = stock + ? WHERE id = ?').run(
        item.quantity,
        item.productId,
      )
    }

    // 更新订单状态
    db.prepare("UPDATE shop_orders SET status = 'cancelled' WHERE orderNo = ?").run(orderNo)

    res.json({ success: true, message: '订单已取消' })
  } catch (error) {
    console.error('取消订单失败:', error)
    res.status(500).json({ success: false, message: '取消订单失败' })
  }
})

// 模拟支付成功回调
router.post('/orders/:orderNo/pay', (req, res) => {
  try {
    const { orderNo } = req.params
    const { payTransactionNo, payMethod } = req.body

    const order = db.prepare('SELECT * FROM shop_orders WHERE orderNo = ?').get(orderNo)

    if (!order) {
      return res.status(404).json({ success: false, message: '订单不存在' })
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ success: false, message: '订单状态异常' })
    }

    // 更新订单状态为已支付
    db.prepare(
      `
      UPDATE shop_orders 
      SET status = 'paid', 
          payTime = CURRENT_TIMESTAMP,
          payMethod = ?,
          payTransactionNo = ?
      WHERE orderNo = ?
    `,
    ).run(payMethod || 'alipay', payTransactionNo || `PAY${Date.now()}`, orderNo)

    // 增加商品销量
    const items = JSON.parse(order.items)
    for (const item of items) {
      db.prepare('UPDATE shop_products SET sales = sales + ? WHERE id = ?').run(
        item.quantity,
        item.productId,
      )
    }

    res.json({ success: true, message: '支付成功' })
  } catch (error) {
    console.error('支付处理失败:', error)
    res.status(500).json({ success: false, message: '支付处理失败' })
  }
})

// 后台管理：获取订单列表
router.get('/admin/orders', (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit

    let whereClause = 'WHERE 1=1'
    let params = []

    if (status) {
      whereClause += ' AND status = ?'
      params.push(status)
    }

    const { count } = db
      .prepare(`SELECT COUNT(*) as count FROM shop_orders ${whereClause}`)
      .get(...params)

    const orders = db
      .prepare(
        `
      SELECT * FROM shop_orders 
      ${whereClause}
      ORDER BY createdAt DESC 
      LIMIT ? OFFSET ?
    `,
      )
      .all(...params, parseInt(limit), parseInt(offset))

    // 解析订单项
    orders.forEach(order => {
      order.items = JSON.parse(order.items)
    })

    res.json({
      success: true,
      data: orders,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    })
  } catch (error) {
    console.error('获取订单列表失败:', error)
    res.status(500).json({ success: false, message: '获取订单列表失败' })
  }
})

// 后台管理：订单发货
router.post('/admin/orders/:orderNo/ship', (req, res) => {
  try {
    const { orderNo } = req.params
    const { trackingNo, carrier } = req.body

    const order = db.prepare('SELECT * FROM shop_orders WHERE orderNo = ?').get(orderNo)

    if (!order) {
      return res.status(404).json({ success: false, message: '订单不存在' })
    }

    if (order.status !== 'paid') {
      return res.status(400).json({ success: false, message: '订单未支付，无法发货' })
    }

    // 更新订单状态为已发货
    db.prepare(
      `
      UPDATE shop_orders 
      SET status = 'shipped',
          trackingNo = ?,
          carrier = ?
      WHERE orderNo = ?
    `,
    ).run(trackingNo, carrier, orderNo)

    res.json({ success: true, message: '订单已发货' })
  } catch (error) {
    console.error('订单发货失败:', error)
    res.status(500).json({ success: false, message: '订单发货失败' })
  }
})

module.exports = router
