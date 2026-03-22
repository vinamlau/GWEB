const Image = require('../models/Image')
const fs = require('fs').promises
const path = require('path')

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '请上传图片文件' })
    }

    const { originalname, filename, path: filePath, size, mimetype } = req.file
    const { category = 'other', width = 0, height = 0 } = req.body

    const imageUrl = `/uploads/${path.relative(path.join(__dirname, '../uploads'), filePath)}`

    const image = await Image.create({
      name: filename,
      originalName: originalname,
      path: filePath,
      url: imageUrl,
      size: size,
      mimeType: mimetype,
      category: category,
      width: parseInt(width),
      height: parseInt(height),
    })

    res.status(201).json(image)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getImages = async (req, res) => {
  try {
    const pageSize = 20
    const page = parseInt(req.query.page) || 1
    const { category, search } = req.query

    const query = {}
    if (category) query.category = category
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { originalName: { $regex: search, $options: 'i' } },
      ]
    }

    const images = await Image.find(query)
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    const count = await Image.countDocuments(query)

    res.json({
      images,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id)
    if (image) {
      res.json(image)
    } else {
      res.status(404).json({ message: '图片不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id)
    if (image) {
      await fs.unlink(image.path)
      await image.deleteOne()
      res.json({ message: '图片已删除' })
    } else {
      res.status(404).json({ message: '图片不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateImageInfo = async (req, res) => {
  try {
    const { category, width, height } = req.body
    const image = await Image.findById(req.params.id)

    if (image) {
      image.category = category || image.category
      image.width = width !== undefined ? parseInt(width) : image.width
      image.height = height !== undefined ? parseInt(height) : image.height
      const updatedImage = await image.save()
      res.json(updatedImage)
    } else {
      res.status(404).json({ message: '图片不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getImagesByCategory = async (req, res) => {
  try {
    const { category } = req.params
    const images = await Image.find({ category }).sort({ createdAt: -1 })
    res.json(images)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  uploadImage,
  getImages,
  getImageById,
  deleteImage,
  updateImageInfo,
  getImagesByCategory,
}
