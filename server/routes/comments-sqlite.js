const express = require('express')
const db = require('../config/db-sqlite')

const router = express.Router()

// 获取所有评论
router.get('/', (req, res) => {
  try {
    const comments = db.prepare('SELECT * FROM comments ORDER BY createdAt DESC').all()
    res.json({ comments })
  } catch (error) {
    console.error('获取评论列表失败:', error)
    res.status(500).json({ error: '获取评论列表失败' })
  }
})

// 获取单个评论
router.get('/:id', (req, res) => {
  try {
    const comment = db.prepare('SELECT * FROM comments WHERE id = ?').get(req.params.id)
    if (!comment) {
      return res.status(404).json({ error: '评论不存在' })
    }
    res.json({ comment })
  } catch (error) {
    console.error('获取评论失败:', error)
    res.status(500).json({ error: '获取评论失败' })
  }
})

// 创建评论
router.post('/', (req, res) => {
  try {
    const { author, email, content, articleId, status } = req.body
    const result = db
      .prepare(
        'INSERT INTO comments (author, email, content, articleId, status) VALUES (?, ?, ?, ?, ?)',
      )
      .run(author, email, content, articleId || null, status || 'pending')

    const newComment = db.prepare('SELECT * FROM comments WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json({ comment: newComment })
  } catch (error) {
    console.error('创建评论失败:', error)
    res.status(500).json({ error: '创建评论失败' })
  }
})

// 更新评论
router.put('/:id', (req, res) => {
  try {
    const { status } = req.body
    const commentId = req.params.id

    const existingComment = db.prepare('SELECT * FROM comments WHERE id = ?').get(commentId)
    if (!existingComment) {
      return res.status(404).json({ error: '评论不存在' })
    }

    db.prepare('UPDATE comments SET status = ? WHERE id = ?').run(status, commentId)
    const updatedComment = db.prepare('SELECT * FROM comments WHERE id = ?').get(commentId)
    res.json({ comment: updatedComment })
  } catch (error) {
    console.error('更新评论失败:', error)
    res.status(500).json({ error: '更新评论失败' })
  }
})

// 删除评论
router.delete('/:id', (req, res) => {
  try {
    const commentId = req.params.id
    const comment = db.prepare('SELECT * FROM comments WHERE id = ?').get(commentId)

    if (!comment) {
      return res.status(404).json({ error: '评论不存在' })
    }

    db.prepare('DELETE FROM comments WHERE id = ?').run(commentId)
    res.json({ message: '评论已删除' })
  } catch (error) {
    console.error('删除评论失败:', error)
    res.status(500).json({ error: '删除评论失败' })
  }
})

module.exports = router
