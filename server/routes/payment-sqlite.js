const express = require('express')
const router = express.Router()
const { db } = require('../config/db-sqlite')

// 创建支付订单
router.post('/create', (req, res) => {
  try {
    const { orderNo, payMethod } = req.body

    if (!orderNo || !payMethod) {
      return res.status(400).json({ success: false, message: '订单号和支付方式不能为空' })
    }

    const order = db.prepare('SELECT * FROM shop_orders WHERE orderNo = ?').get(orderNo)

    if (!order) {
      return res.status(404).json({ success: false, message: '订单不存在' })
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ success: false, message: '订单状态不允许支付' })
    }

    // 根据支付方式生成支付参数
    if (payMethod === 'alipay') {
      // 支付宝支付（这里使用示例代码，实际需接入支付宝 SDK）
      const alipayParams = {
        outTradeNo: orderNo,
        totalAmount: order.payAmount.toFixed(2),
        subject: `果壳市集订单-${orderNo}`,
        productCode: 'FAST_INSTANT_TRADE_PAY',
      }

      // TODO: 调用支付宝 SDK 生成支付链接或二维码
      // const result = await alipaySdk.exec('alipay.trade.page.pay', alipayParams)

      res.json({
        success: true,
        payMethod: 'alipay',
        payUrl: `https://openapi.alipay.com/gateway.do?orderNo=${orderNo}&amount=${order.payAmount}`,
        message: '请跳转到支付宝支付页面',
      })
    } else if (payMethod === 'wechat') {
      // 微信支付（这里使用示例代码，实际需接入微信支付 SDK）
      const wechatParams = {
        outTradeNo: orderNo,
        totalFee: Math.round(order.payAmount * 100), // 单位：分
        body: `果壳市集订单-${orderNo}`,
        spbillCreateIp: req.ip,
      }

      // TODO: 调用微信支付 SDK 生成支付参数
      // const result = await wechatPay.pay({ type: 'JSAPI', data: wechatParams })

      res.json({
        success: true,
        payMethod: 'wechat',
        payCode: 'wechat_pay_code', // 支付二维码内容
        message: '请使用微信扫码支付',
      })
    } else {
      return res.status(400).json({ success: false, message: '不支持的支付方式' })
    }
  } catch (error) {
    console.error('创建支付订单失败:', error)
    res.status(500).json({ success: false, message: '创建支付订单失败' })
  }
})

// 支付宝回调
router.post('/alipay/notify', (req, res) => {
  try {
    const { outTradeNo, tradeNo, tradeStatus, totalAmount } = req.body

    console.log('支付宝回调:', req.body)

    // 验证签名（实际需使用支付宝公钥验证）
    // const isValid = alipaySdk.verifySign(req.body)
    // if (!isValid) {
    //   return res.status(400).json({ success: false, message: '签名验证失败' })
    // }

    if (tradeStatus === 'TRADE_SUCCESS' || tradeStatus === 'TRADE_FINISHED') {
      // 更新订单状态为已支付
      const order = db.prepare('SELECT * FROM shop_orders WHERE orderNo = ?').get(outTradeNo)

      if (order && order.status === 'pending') {
        db.prepare(
          `
          UPDATE shop_orders 
          SET status = 'paid', 
              payTime = CURRENT_TIMESTAMP,
              payMethod = 'alipay',
              payTransactionNo = ?
          WHERE orderNo = ?
        `,
        ).run(tradeNo, outTradeNo)

        // 增加商品销量
        const items = JSON.parse(order.items)
        for (const item of items) {
          db.prepare('UPDATE shop_products SET sales = sales + ? WHERE id = ?').run(
            item.quantity,
            item.productId,
          )
        }
      }
    }

    // 返回成功给支付宝
    res.send('success')
  } catch (error) {
    console.error('支付宝回调处理失败:', error)
    res.send('fail')
  }
})

// 微信支付回调
router.post('/wechat/notify', (req, res) => {
  try {
    const { outTradeNo, transactionId, totalFee } = req.body

    console.log('微信回调:', req.body)

    // 验证签名（实际需使用微信密钥验证）
    // const isValid = wechatPay.verifyCallback(req.body)
    // if (!isValid) {
    //   return res.status(400).json({ success: false, message: '签名验证失败' })
    // }

    const order = db.prepare('SELECT * FROM shop_orders WHERE orderNo = ?').get(outTradeNo)

    if (order && order.status === 'pending') {
      db.prepare(
        `
        UPDATE shop_orders 
        SET status = 'paid', 
            payTime = CURRENT_TIMESTAMP,
            payMethod = 'wechat',
            payTransactionNo = ?
        WHERE orderNo = ?
      `,
      ).run(transactionId, outTradeNo)

      // 增加商品销量
      const items = JSON.parse(order.items)
      for (const item of items) {
        db.prepare('UPDATE shop_products SET sales = sales + ? WHERE id = ?').run(
          item.quantity,
          item.productId,
        )
      }
    }

    // 返回成功给微信
    res.json({ returnCode: 'SUCCESS', returnMsg: 'OK' })
  } catch (error) {
    console.error('微信回调处理失败:', error)
    res.json({ returnCode: 'FAIL', returnMsg: '处理失败' })
  }
})

// 查询支付状态
router.get('/status/:orderNo', (req, res) => {
  try {
    const { orderNo } = req.params
    const order = db.prepare('SELECT * FROM shop_orders WHERE orderNo = ?').get(orderNo)

    if (!order) {
      return res.status(404).json({ success: false, message: '订单不存在' })
    }

    res.json({
      success: true,
      data: {
        orderNo: order.orderNo,
        status: order.status,
        payAmount: order.payAmount,
        payTime: order.payTime,
        payMethod: order.payMethod,
      },
    })
  } catch (error) {
    console.error('查询支付状态失败:', error)
    res.status(500).json({ success: false, message: '查询支付状态失败' })
  }
})

module.exports = router
