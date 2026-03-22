const express = require('express')
const router = express.Router()
const { protect, editor } = require('../middleware/auth')
const upload = require('../middleware/upload')
const imageController = require('../controllers/imageController')

router.post('/upload', protect, editor, upload.single('image'), imageController.uploadImage)

router.get('/', imageController.getImages)
router.get('/category/:category', imageController.getImagesByCategory)
router.get('/:id', imageController.getImageById)

router.put('/:id', protect, editor, imageController.updateImageInfo)
router.delete('/:id', protect, editor, imageController.deleteImage)

module.exports = router
