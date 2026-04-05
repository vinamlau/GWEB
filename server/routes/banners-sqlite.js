const express = require('express')
const { db } = require('../config/db-sqlite')

const router = express.Router()

// 获取所有广告
router.get('/', (req, res) => {
  try {
    const banners = db.prepare('SELECT * FROM banners ORDER BY `order` ASC').all()
    res.json({ banners })
  } catch (error) {
    console.error('获取广告列表失败:', error)
    res.status(500).json({ error: '获取广告列表失败' })
  }
})

// 获取单个广告
router.get('/:id', (req, res) => {
  try {
    const banner = db.prepare('SELECT * FROM banners WHERE id = ?').get(req.params.id)
    if (!banner) {
      return res.status(404).json({ error: '广告不存在' })
    }
    res.json({ banner })
  } catch (error) {
    console.error('获取广告失败:', error)
    res.status(500).json({ error: '获取广告失败' })
  }
})

// 创建广告
router.post('/', (req, res) => {
  try {
    const { title, imageUrl, linkUrl, position, order, active } = req.body
    const result = db
      .prepare(
        'INSERT INTO banners (title, imageUrl, linkUrl, position, `order`, active) VALUES (?, ?, ?, ?, ?, ?)',
      )
      .run(title, imageUrl, linkUrl, position, order || 0, active !== undefined ? active : true)

    const newBanner = db.prepare('SELECT * FROM banners WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json({ banner: newBanner })
  } catch (error) {
    console.error('创建广告失败:', error)
    res.status(500).json({ error: '创建广告失败' })
  }
})

// 更新广告
router.put('/:id', (req, res) => {
  try {
    const { title, imageUrl, linkUrl, position, order, active } = req.body
    const bannerId = req.params.id

    const existingBanner = db.prepare('SELECT * FROM banners WHERE id = ?').get(bannerId)
    if (!existingBanner) {
      return res.status(404).json({ error: '广告不存在' })
    }

    db.prepare(
      'UPDATE banners SET title = ?, imageUrl = ?, linkUrl = ?, position = ?, `order` = ?, active = ? WHERE id = ?',
    ).run(title, imageUrl, linkUrl, position, order, active !== undefined ? active : true, bannerId)

    const updatedBanner = db.prepare('SELECT * FROM banners WHERE id = ?').get(bannerId)
    res.json({ banner: updatedBanner })
  } catch (error) {
    console.error('更新广告失败:', error)
    res.status(500).json({ error: '更新广告失败' })
  }
})

// 删除广告
router.delete('/:id', (req, res) => {
  try {
    const bannerId = req.params.id
    const banner = db.prepare('SELECT * FROM banners WHERE id = ?').get(bannerId)

    if (!banner) {
      return res.status(404).json({ error: '广告不存在' })
    }

    db.prepare('DELETE FROM banners WHERE id = ?').run(bannerId)
    res.json({ message: '广告已删除' })
  } catch (error) {
    console.error('删除广告失败:', error)
    res.status(500).json({ error: '删除广告失败' })
  }
})

module.exports = router
