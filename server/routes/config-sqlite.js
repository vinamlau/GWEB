const express = require('express')
const router = express.Router()
const { protect, admin } = require('../middleware/auth')
const { db } = require('../config/db-sqlite')

router.get('/', (req, res) => {
  try {
    const { category } = req.query
    let query = 'SELECT * FROM site_configs'
    const params = []

    if (category) {
      query += ' WHERE category = ?'
      params.push(category)
    }

    query += ' ORDER BY category, key'

    const configs = db.prepare(query).all(...params)
    res.json(configs.map(c => ({ ...c, _id: c.id.toString() })))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:key', (req, res) => {
  try {
    const config = db.prepare('SELECT * FROM site_configs WHERE key = ?').get(req.params.key)
    if (config) {
      res.json({ ...config, _id: config.id.toString() })
    } else {
      res.status(404).json({ message: '配置项不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', protect, admin, (req, res) => {
  try {
    const { key, value, category, description } = req.body

    const configExists = db.prepare('SELECT * FROM site_configs WHERE key = ?').get(key)
    if (configExists) {
      return res.status(400).json({ message: '配置键已存在' })
    }

    const result = db
      .prepare(
        `
      INSERT INTO site_configs (key, value, category, description)
      VALUES (?, ?, ?, ?)
    `,
      )
      .run(key, value, category || 'basic', description || '')

    const config = db.prepare('SELECT * FROM site_configs WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json({ ...config, _id: config.id.toString() })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:key', protect, admin, (req, res) => {
  try {
    const { value, description } = req.body
    const config = db.prepare('SELECT * FROM site_configs WHERE key = ?').get(req.params.key)

    if (config) {
      db.prepare(
        `
        UPDATE site_configs SET value = ?, description = ? WHERE key = ?
      `,
      ).run(value, description, req.params.key)

      const updatedConfig = db
        .prepare('SELECT * FROM site_configs WHERE key = ?')
        .get(req.params.key)
      res.json({ ...updatedConfig, _id: updatedConfig.id.toString() })
    } else {
      res.status(404).json({ message: '配置项不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:key', protect, admin, (req, res) => {
  try {
    const config = db.prepare('SELECT * FROM site_configs WHERE key = ?').get(req.params.key)
    if (config) {
      db.prepare('DELETE FROM site_configs WHERE key = ?').run(req.params.key)
      res.json({ message: '配置已删除' })
    } else {
      res.status(404).json({ message: '配置项不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
