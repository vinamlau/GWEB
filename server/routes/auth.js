const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const authController = require('../controllers/authController')
const { protect } = require('../middleware/auth')

const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('用户名长度需要在 3-30 个字符之间'),
  body('email').trim().isEmail().withMessage('请输入有效的邮箱地址'),
  body('password').isLength({ min: 6 }).withMessage('密码长度至少 6 位'),
  body('role').optional().isIn(['admin', 'editor', 'viewer']).withMessage('角色类型不正确'),
]

const loginValidation = [
  body('email').trim().isEmail().withMessage('请输入有效的邮箱地址'),
  body('password').notEmpty().withMessage('请输入密码'),
]

router.post('/register', registerValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  authController.register(req, res)
})

router.post('/login', loginValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  authController.login(req, res)
})

router.get('/profile', protect, authController.getProfile)
router.put('/profile', protect, authController.updateProfile)

module.exports = router
