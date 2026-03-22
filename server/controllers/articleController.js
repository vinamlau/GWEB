const Article = require('../models/Article')

const getArticles = async (req, res) => {
  try {
    const pageSize = 10
    const page = parseInt(req.query.page) || 1
    const { category, status, search, isTop } = req.query

    const query = {}
    if (category) query.category = category
    if (status) query.status = status
    if (isTop) query.isTop = isTop === 'true'
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ]
    }

    const articles = await Article.find(query)
      .sort({ isTop: -1, publishedAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    const count = await Article.countDocuments(query)

    res.json({
      articles,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (article) {
      article.viewCount += 1
      await article.save()
      res.json(article)
    } else {
      res.status(404).json({ message: '文章不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createArticle = async (req, res) => {
  try {
    const { title, summary, content, coverImage, images, category, tags, author, status, isTop } =
      req.body

    const article = await Article.create({
      title,
      summary,
      content,
      coverImage: coverImage || '',
      images: images || [],
      category,
      tags: tags || [],
      author: author || '管理员',
      status: status || 'draft',
      isTop: isTop || false,
      publishedAt: status === 'published' ? new Date() : null,
    })

    res.status(201).json(article)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateArticle = async (req, res) => {
  try {
    const { title, summary, content, coverImage, images, category, tags, status, isTop } = req.body

    const article = await Article.findById(req.params.id)

    if (article) {
      article.title = title || article.title
      article.summary = summary || article.summary
      article.content = content || article.content
      article.coverImage = coverImage !== undefined ? coverImage : article.coverImage
      article.images = images || article.images
      article.category = category || article.category
      article.tags = tags || article.tags
      article.status = status || article.status
      article.isTop = isTop !== undefined ? isTop : article.isTop

      if (status === 'published' && !article.publishedAt) {
        article.publishedAt = new Date()
      }

      article.updatedAt = new Date()
      const updatedArticle = await article.save()

      res.json(updatedArticle)
    } else {
      res.status(404).json({ message: '文章不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (article) {
      await article.deleteOne()
      res.json({ message: '文章已删除' })
    } else {
      res.status(404).json({ message: '文章不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getTopArticles = async (req, res) => {
  try {
    const articles = await Article.find({
      status: 'published',
      isTop: true,
    })
      .sort({ publishedAt: -1 })
      .limit(5)
    res.json(articles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getLatestArticles = async (req, res) => {
  try {
    const { limit = 10 } = req.query
    const articles = await Article.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
    res.json(articles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getTopArticles,
  getLatestArticles,
}
