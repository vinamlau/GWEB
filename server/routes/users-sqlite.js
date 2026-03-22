const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/db-sqlite')

const router = express.Router()

// 获取所有用户
router.get('/', (req, res) => {
  try {
    const users = db.prepare('SELECT * FROM users ORDER BY createdAt DESC').all()
    res.json({ users })
  } catch (error) {
    console.error('获取用户列表失败:', error)
    res.status(500).json({ error: '获取用户列表失败' })
  }
})

// 获取单个用户
router.get('/:id', (req, res) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id)
    if (!user) {
      return res.status(404).json({ error: '用户不存在' })
    }
    res.json({ user })
  } catch (error) {
    console.error('获取用户失败:', error)
    res.status(500).json({ error: '获取用户失败' })
  }
})

// 创建用户
router.post('/', async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    if (existingUser) {
      return res.status(400).json({ error: '邮箱已被使用' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const result = db
      .prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)')
      .run(username, email, hashedPassword, role || 'editor')

    const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json({ user: newUser })
  } catch (error) {
    console.error('创建用户失败:', error)
    res.status(500).json({ error: '创建用户失败' })
  }
})

// 更新用户
router.put('/:id', async (req, res) => {
  try {
    const { username, email, password, role } = req.body
    const userId = req.params.id

    const existingUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
    if (!existingUser) {
      return res.status(404).json({ error: '用户不存在' })
    }

    let updateSql
    let params

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      updateSql = 'UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?'
      params = [username, email, hashedPassword, role, userId]
    } else {
      updateSql = 'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?'
      params = [username, email, role, userId]
    }

    db.prepare(updateSql).run(...params)
    const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
    res.json({ user: updatedUser })
  } catch (error) {
    console.error('更新用户失败:', error)
    res.status(500).json({ error: '更新用户失败' })
  }
})

// 删除用户
router.delete('/:id', (req, res) => {
  try {
    const userId = req.params.id
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)

    if (!user) {
      return res.status(404).json({ error: '用户不存在' })
    }

    if (user.role === 'admin') {
      return res.status(400).json({ error: '不能删除管理员账户' })
    }

    db.prepare('DELETE FROM users WHERE id = ?').run(userId)
    res.json({ message: '用户已删除' })
  } catch (error) {
    console.error('删除用户失败:', error)
    res.status(500).json({ error: '删除用户失败' })
  }
})

module.exports = router
