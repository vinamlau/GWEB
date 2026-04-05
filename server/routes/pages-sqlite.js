const express = require('express')
const { db } = require('../config/db-sqlite')
const { protect, editor } = require('../middleware/auth')

const router = express.Router()

// 获取所有页面
router.get('/', (req, res) => {
  try {
    const pages = db.prepare('SELECT * FROM pages ORDER BY id DESC').all()
    res.json(pages)
  } catch (error) {
    console.error('获取页面列表失败:', error)
    res.status(500).json({ error: '获取页面列表失败' })
  }
})

// 获取单个页面
router.get('/:slug', (req, res) => {
  try {
    const page = db.prepare('SELECT * FROM pages WHERE slug = ?').get(req.params.slug)
    if (!page) {
      return res.status(404).json({ error: '页面不存在' })
    }
    res.json(page)
  } catch (error) {
    console.error('获取页面失败:', error)
    res.status(500).json({ error: '获取页面失败' })
  }
})

// 创建页面
router.post('/', protect, editor, (req, res) => {
  try {
    const { title, slug, content, seoTitle, seoDescription, active } = req.body
    const stmt = db.prepare(
      'INSERT INTO pages (title, slug, content, seoTitle, seoDescription, active) VALUES (?, ?, ?, ?, ?, ?)',
    )
    const result = stmt.run(title, slug, content, seoTitle, seoDescription, active ? 1 : 0)

    const page = db.prepare('SELECT * FROM pages WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json(page)
  } catch (error) {
    console.error('创建页面失败:', error)
    res.status(500).json({ error: '创建页面失败' })
  }
})

// 更新页面
router.put('/:id', protect, editor, (req, res) => {
  try {
    const { title, slug, content, seoTitle, seoDescription, active } = req.body
    const stmt = db.prepare(
      'UPDATE pages SET title = ?, slug = ?, content = ?, seoTitle = ?, seoDescription = ?, active = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    )
    stmt.run(title, slug, content, seoTitle, seoDescription, active ? 1 : 0, req.params.id)

    const page = db.prepare('SELECT * FROM pages WHERE id = ?').get(req.params.id)
    res.json(page)
  } catch (error) {
    console.error('更新页面失败:', error)
    res.status(500).json({ error: '更新页面失败' })
  }
})

// 删除页面
router.delete('/:id', protect, editor, (req, res) => {
  try {
    db.prepare('DELETE FROM pages WHERE id = ?').run(req.params.id)
    res.json({ message: '页面已删除' })
  } catch (error) {
    console.error('删除页面失败:', error)
    res.status(500).json({ error: '删除页面失败' })
  }
})

module.exports = router
