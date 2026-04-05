const express = require('express')
const { db } = require('../config/db-sqlite')
const auth = require('../middleware/auth')

const router = express.Router()

// 获取所有页脚配置
router.get('/', (req, res) => {
  try {
    const footers = db.prepare('SELECT * FROM footers ORDER BY id DESC').all()
    res.json(footers)
  } catch (error) {
    console.error('获取页脚配置失败:', error)
    res.status(500).json({ error: '获取页脚配置失败' })
  }
})

// 获取启用的页脚
router.get('/active', (req, res) => {
  try {
    const footer = db
      .prepare('SELECT * FROM footers WHERE active = 1 ORDER BY id DESC LIMIT 1')
      .get()
    if (!footer) {
      return res.status(404).json({ error: '页脚配置不存在' })
    }
    res.json(footer)
  } catch (error) {
    console.error('获取页脚失败:', error)
    res.status(500).json({ error: '获取页脚失败' })
  }
})

// 创建页脚配置
router.post('/', auth.protect, auth.editor, (req, res) => {
  try {
    const { companyName, description, address, phone, email, icpLicense, socialLinks } = req.body
    const stmt = db.prepare(
      'INSERT INTO footers (company_name, description, address, phone, email, icp_license, social_links) VALUES (?, ?, ?, ?, ?, ?, ?)',
    )
    const result = stmt.run(
      companyName,
      description,
      address,
      phone,
      email,
      icpLicense,
      JSON.stringify(socialLinks || {}),
    )

    const footer = db.prepare('SELECT * FROM footers WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json(footer)
  } catch (error) {
    console.error('创建页脚配置失败:', error)
    res.status(500).json({ error: '创建页脚配置失败' })
  }
})

// 更新页脚配置
router.put('/:id', auth.protect, auth.editor, (req, res) => {
  try {
    const { companyName, description, address, phone, email, icpLicense, socialLinks, active } =
      req.body
    const stmt = db.prepare(
      'UPDATE footers SET company_name = ?, description = ?, address = ?, phone = ?, email = ?, icp_license = ?, social_links = ?, active = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    )
    stmt.run(
      companyName,
      description,
      address,
      phone,
      email,
      icpLicense,
      JSON.stringify(socialLinks || {}),
      active ? 1 : 0,
      req.params.id,
    )

    const footer = db.prepare('SELECT * FROM footers WHERE id = ?').get(req.params.id)
    res.json(footer)
  } catch (error) {
    console.error('更新页脚配置失败:', error)
    res.status(500).json({ error: '更新页脚配置失败' })
  }
})

module.exports = router
