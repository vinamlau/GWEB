const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const configController = require('../controllers/configController')
const { protect, admin } = require('../middleware/auth')

const configValidation = [
  body('key')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('配置键长度需要在 1-100 个字符之间'),
  body('value').notEmpty().withMessage('配置值不能为空'),
  body('category')
    .optional()
    .isIn(['basic', 'seo', 'contact', 'social', 'branding'])
    .withMessage('分类不正确'),
  body('description').optional().isLength({ max: 500 }).withMessage('描述长度不能超过 500 个字符'),
]

router.get('/', configController.getConfigs)
router.get('/:key', configController.getConfigByKey)

router.post('/', protect, admin, configValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  configController.createConfig(req, res)
})

router.put('/:key', protect, admin, (req, res) => {
  configController.updateConfig(req, res)
})

router.delete('/:key', protect, admin, configController.deleteConfig)

router.post('/batch', configController.batchGetConfigs)

module.exports = router
