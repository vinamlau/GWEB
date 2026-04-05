const express = require('express')
const router = express.Router()
const { protect, editor } = require('../middleware/auth')
const upload = require('../middleware/upload')
const { db } = require('../config/db-sqlite')

router.post('/upload', protect, editor, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '请上传图片文件' })
    }

    const { originalname, filename, path: filePath, size, mimetype } = req.file
    const { category = 'other', width = 0, height = 0 } = req.body

    // 从完整路径中提取相对路径
    const uploadsIndex = filePath.indexOf('uploads')
    const relativePath =
      uploadsIndex >= 0 ? filePath.substring(uploadsIndex) : `uploads/${filename}`
    const imageUrl = '/' + relativePath

    const result = db
      .prepare(
        `
        INSERT INTO images (name, originalName, path, url, size, mimeType, category, width, height)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        filename,
        originalname,
        filePath,
        imageUrl,
        size,
        mimetype,
        category,
        parseInt(width),
        parseInt(height),
      )

    const image = db.prepare('SELECT * FROM images WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json(image)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/', (req, res) => {
  try {
    const pageSize = 20
    const page = parseInt(req.query.page) || 1
    const { category } = req.query

    let query = 'SELECT * FROM images WHERE 1=1'
    const params = []

    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }

    query += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?'
    params.push(pageSize, pageSize * (page - 1))

    const images = db.prepare(query).all(...params)

    const countQuery = `SELECT COUNT(*) as count FROM images WHERE 1=1 ${
      category ? 'AND category = ?' : ''
    }`
    const countParams = []
    if (category) countParams.push(category)
    const count = db.prepare(countQuery).get(...countParams).count

    res.json({
      images: images.map(i => ({ ...i, _id: i.id.toString() })),
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', (req, res) => {
  try {
    const image = db.prepare('SELECT * FROM images WHERE id = ?').get(req.params.id)
    if (image) {
      res.json({ ...image, _id: image.id.toString() })
    } else {
      res.status(404).json({ message: '图片不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:id', protect, editor, (req, res) => {
  try {
    const image = db.prepare('SELECT * FROM images WHERE id = ?').get(req.params.id)
    if (image) {
      db.prepare('DELETE FROM images WHERE id = ?').run(req.params.id)
      res.json({ message: '图片已删除' })
    } else {
      res.status(404).json({ message: '图片不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
