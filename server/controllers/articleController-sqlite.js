const { db } = require('../config/db-sqlite')

const getArticles = (req, res) => {
  try {
    const pageSize = 10
    const page = parseInt(req.query.page) || 1
    const { category, status, search, isTop } = req.query

    let query = 'SELECT * FROM articles WHERE 1=1'
    const params = []

    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }
    if (status) {
      query += ' AND status = ?'
      params.push(status)
    }
    if (isTop) {
      query += ' AND isTop = 1'
    }
    if (search) {
      query += ' AND (title LIKE ? OR content LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }

    query += ' ORDER BY isTop DESC, publishedAt DESC LIMIT ? OFFSET ?'
    params.push(pageSize, pageSize * (page - 1))

    const articles = db.prepare(query).all(...params)

    const countQuery = `SELECT COUNT(*) as count FROM articles WHERE 1=1 ${
      category ? 'AND category = ?' : ''
    } ${status ? 'AND status = ?' : ''}`
    const countParams = []
    if (category) countParams.push(category)
    if (status) countParams.push(status)
    const count = db.prepare(countQuery).get(...countParams).count

    res.json({
      articles: articles.map(a => ({
        ...a,
        _id: a.id.toString(),
        tags: JSON.parse(a.tags || '[]'),
        images: JSON.parse(a.images || '[]'),
        isTop: !!a.isTop,
      })),
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getArticleById = (req, res) => {
  try {
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id)
    if (article) {
      db.prepare('UPDATE articles SET viewCount = viewCount + 1 WHERE id = ?').run(req.params.id)
      res.json({
        ...article,
        _id: article.id.toString(),
        tags: JSON.parse(article.tags || '[]'),
        images: JSON.parse(article.images || '[]'),
        isTop: !!article.isTop,
      })
    } else {
      res.status(404).json({ message: '文章不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createArticle = (req, res) => {
  try {
    const { title, summary, content, coverImage, images, category, tags, author, status, isTop } =
      req.body

    const result = db
      .prepare(
        `
      INSERT INTO articles (title, summary, content, coverImage, images, category, tags, author, status, isTop, publishedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      )
      .run(
        title,
        summary || '',
        content,
        coverImage || '',
        JSON.stringify(images || []),
        category,
        JSON.stringify(tags || []),
        author || '管理员',
        status || 'draft',
        isTop ? 1 : 0,
        status === 'published' ? new Date() : null,
      )

    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json({
      ...article,
      _id: article.id.toString(),
      tags: JSON.parse(article.tags),
      images: JSON.parse(article.images),
      isTop: !!article.isTop,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateArticle = (req, res) => {
  try {
    const { title, summary, content, coverImage, images, category, tags, status, isTop } = req.body

    db.prepare(
      `
      UPDATE articles SET
        title = ?,
        summary = ?,
        content = ?,
        coverImage = ?,
        images = ?,
        category = ?,
        tags = ?,
        status = ?,
        isTop = ?,
        updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    ).run(
      title,
      summary,
      content,
      coverImage,
      JSON.stringify(images),
      category,
      JSON.stringify(tags),
      status,
      isTop ? 1 : 0,
      req.params.id,
    )

    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id)
    res.json({
      ...article,
      _id: article.id.toString(),
      tags: JSON.parse(article.tags),
      images: JSON.parse(article.images),
      isTop: !!article.isTop,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteArticle = (req, res) => {
  try {
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id)
    if (article) {
      db.prepare('DELETE FROM articles WHERE id = ?').run(req.params.id)
      res.json({ message: '文章已删除' })
    } else {
      res.status(404).json({ message: '文章不存在' })
    }
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
}
