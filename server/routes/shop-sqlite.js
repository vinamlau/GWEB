const express = require('express')
const router = express.Router()
const { db } = require('../config/db-sqlite')

// 获取商品列表
router.get('/products', (req, res) => {
  try {
    const { category, brand, status = 'on_sale', page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit

    let whereClause = 'WHERE status = ?'
    let params = [status]

    if (category) {
      whereClause += ' AND category = ?'
      params.push(category)
    }

    if (brand) {
      whereClause += ' AND brand = ?'
      params.push(brand)
    }

    const countQuery = `SELECT COUNT(*) as count FROM shop_products ${whereClause}`
    const { count } = db.prepare(countQuery).get(...params)

    const query = `
      SELECT * FROM shop_products 
      ${whereClause}
      ORDER BY createdAt DESC
      LIMIT ? OFFSET ?
    `

    const products = db.prepare(query).all(...params, parseInt(limit), parseInt(offset))

    res.json({
      success: true,
      data: products,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    })
  } catch (error) {
    console.error('获取商品列表失败:', error)
    res.status(500).json({ success: false, message: '获取商品列表失败' })
  }
})

// 获取商品详情
router.get('/products/:id', (req, res) => {
  try {
    const { id } = req.params
    const product = db.prepare('SELECT * FROM shop_products WHERE id = ?').get(id)

    if (!product) {
      return res.status(404).json({ success: false, message: '商品不存在' })
    }

    // 增加浏览量
    db.prepare('UPDATE shop_products SET viewCount = COALESCE(viewCount, 0) + 1 WHERE id = ?').run(
      id,
    )

    res.json({ success: true, data: product })
  } catch (error) {
    console.error('获取商品详情失败:', error)
    res.status(500).json({ success: false, message: '获取商品详情失败' })
  }
})

// 获取商品分类
router.get('/categories', (req, res) => {
  try {
    const categories = db
      .prepare(
        `
      SELECT category, COUNT(*) as count 
      FROM shop_products 
      WHERE status = 'on_sale' 
      GROUP BY category
    `,
      )
      .all()

    res.json({ success: true, data: categories })
  } catch (error) {
    console.error('获取商品分类失败:', error)
    res.status(500).json({ success: false, message: '获取商品分类失败' })
  }
})

// 获取商品品牌
router.get('/brands', (req, res) => {
  try {
    const brands = db
      .prepare(
        `
      SELECT brand, COUNT(*) as count 
      FROM shop_products 
      WHERE status = 'on_sale' 
      GROUP BY brand
    `,
      )
      .all()

    res.json({ success: true, data: brands })
  } catch (error) {
    console.error('获取商品品牌失败:', error)
    res.status(500).json({ success: false, message: '获取商品品牌失败' })
  }
})

// 后台管理：创建商品
router.post('/admin/products', (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      price,
      originalPrice,
      stock,
      image,
      images = '[]',
      status = 'on_sale',
    } = req.body

    const result = db
      .prepare(
        `
      INSERT INTO shop_products (name, brand, category, description, price, originalPrice, stock, image, images, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      )
      .run(name, brand, category, description, price, originalPrice, stock, image, images, status)

    res.json({
      success: true,
      message: '商品创建成功',
      data: { id: result.lastInsertRowid },
    })
  } catch (error) {
    console.error('创建商品失败:', error)
    res.status(500).json({ success: false, message: '创建商品失败' })
  }
})

// 后台管理：更新商品
router.put('/admin/products/:id', (req, res) => {
  try {
    const { id } = req.params
    const {
      name,
      brand,
      category,
      description,
      price,
      originalPrice,
      stock,
      image,
      images,
      status,
    } = req.body

    db.prepare(
      `
      UPDATE shop_products 
      SET name = ?, brand = ?, category = ?, description = ?, price = ?, 
          originalPrice = ?, stock = ?, image = ?, images = ?, status = ?,
          updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    ).run(
      name,
      brand,
      category,
      description,
      price,
      originalPrice,
      stock,
      image,
      images,
      status,
      id,
    )

    res.json({ success: true, message: '商品更新成功' })
  } catch (error) {
    console.error('更新商品失败:', error)
    res.status(500).json({ success: false, message: '更新商品失败' })
  }
})

// 后台管理：删除商品
router.delete('/admin/products/:id', (req, res) => {
  try {
    const { id } = req.params
    db.prepare('DELETE FROM shop_products WHERE id = ?').run(id)
    res.json({ success: true, message: '商品删除成功' })
  } catch (error) {
    console.error('删除商品失败:', error)
    res.status(500).json({ success: false, message: '删除商品失败' })
  }
})

// 后台管理：获取所有商品（含下架）
router.get('/admin/products', (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit

    const { count } = db.prepare('SELECT COUNT(*) as count FROM shop_products').get()
    const products = db
      .prepare(
        `
      SELECT * FROM shop_products 
      ORDER BY createdAt DESC 
      LIMIT ? OFFSET ?
    `,
      )
      .all(parseInt(limit), parseInt(offset))

    res.json({
      success: true,
      data: products,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    })
  } catch (error) {
    console.error('获取商品列表失败:', error)
    res.status(500).json({ success: false, message: '获取商品列表失败' })
  }
})

// 初始化示例商品
const initializeProducts = () => {
  const count = db.prepare('SELECT COUNT(*) as count FROM shop_products').get().count
  if (count === 0) {
    const products = [
      {
        name: '朴朴超市礼品卡 100 元',
        brand: '朴朴',
        category: '朴朴卡',
        description: '全品类通用，新鲜到家，30 分钟送达',
        price: 95,
        originalPrice: 100,
        stock: 500,
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
        status: 'on_sale',
      },
      {
        name: '朴朴超市礼品卡 200 元',
        brand: '朴朴',
        category: '朴朴卡',
        description: '家庭优选，实惠多多',
        price: 190,
        originalPrice: 200,
        stock: 300,
        image: 'https://images.unsplash.com/photo-1607082349566-1873422c8082?w=400&h=300&fit=crop',
        status: 'on_sale',
      },
      {
        name: '永辉超市购物卡 100 元',
        brand: '永辉',
        category: '永辉卡',
        description: '生鲜优选，品质生活',
        price: 97,
        originalPrice: 100,
        stock: 400,
        image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
        status: 'on_sale',
      },
      {
        name: '沃尔玛礼品卡 500 元',
        brand: '沃尔玛',
        category: '沃尔玛卡',
        description: '超值大额，企业采购首选',
        price: 485,
        originalPrice: 500,
        stock: 150,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
        status: 'on_sale',
      },
      {
        name: '世纪联华购物卡 100 元',
        brand: '世纪联华',
        category: '世纪联华卡',
        description: '便捷购物，优惠多多',
        price: 96,
        originalPrice: 100,
        stock: 450,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
        status: 'on_sale',
      },
      {
        name: '永辉超市购物卡 300 元',
        brand: '永辉',
        category: '永辉卡',
        description: '大额优惠，购物更划算',
        price: 288,
        originalPrice: 300,
        stock: 200,
        image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400&h=300&fit=crop',
        status: 'on_sale',
      },
    ]

    const stmt = db.prepare(`
      INSERT INTO shop_products (name, brand, category, description, price, originalPrice, stock, image, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    products.forEach(product => {
      stmt.run(
        product.name,
        product.brand,
        product.category,
        product.description,
        product.price,
        product.originalPrice,
        product.stock,
        product.image,
        product.status,
      )
    })

    console.log('✓ 创建初始商城商品')
  } else {
    console.log('✓ 商城商品已存在')
  }
}

// 暂时注释掉，避免启动时出错
// initializeProducts()

module.exports = router
