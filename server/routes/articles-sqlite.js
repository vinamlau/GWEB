const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const articleController = require('../controllers/articleController-sqlite')
const { protect, editor } = require('../middleware/auth')

const articleValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('标题长度需要在 1-200 个字符之间'),
  body('content').trim().notEmpty().withMessage('文章内容不能为空'),
  body('summary').optional().isLength({ max: 500 }).withMessage('摘要长度不能超过 500 个字符'),
  body('category')
    .optional()
    .isIn(['公司新闻', '业务动态', '荣誉资质', '行业资讯', '政策法规'])
    .withMessage('分类不正确'),
  body('tags').optional().isArray().withMessage('标签必须是数组'),
]

router.get('/', articleController.getArticles)
router.get('/:id', articleController.getArticleById)

router.post('/', protect, editor, articleValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  articleController.createArticle(req, res)
})

router.put('/:id', protect, editor, articleValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  articleController.updateArticle(req, res)
})

router.delete('/:id', protect, editor, articleController.deleteArticle)

module.exports = router
