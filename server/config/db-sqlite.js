require('dotenv').config()
const path = require('path')
const Database = require('better-sqlite3')
const bcrypt = require('bcryptjs')

const dbPath = path.join(__dirname, 'gweb_cms.db')
const db = new Database(dbPath)

db.pragma('journal_mode = WAL')

const initializeDB = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'editor',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      summary TEXT,
      content TEXT NOT NULL,
      coverImage TEXT DEFAULT '',
      images TEXT DEFAULT '[]',
      category TEXT,
      tags TEXT DEFAULT '[]',
      author TEXT DEFAULT '管理员',
      status TEXT DEFAULT 'draft',
      viewCount INTEGER DEFAULT 0,
      isTop INTEGER DEFAULT 0,
      publishedAt DATETIME,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      originalName TEXT NOT NULL,
      path TEXT NOT NULL,
      url TEXT NOT NULL,
      size INTEGER,
      mimeType TEXT,
      category TEXT DEFAULT 'other',
      width INTEGER DEFAULT 0,
      height INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS site_configs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL,
      category TEXT DEFAULT 'basic',
      description TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      email TEXT NOT NULL,
      content TEXT NOT NULL,
      articleId INTEGER,
      status TEXT DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS menus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      parentId INTEGER,
      \`order\` INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS banners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      imageUrl TEXT,
      linkUrl TEXT,
      position TEXT DEFAULT 'home',
      \`order\` INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // 商城商品表
  db.exec(`
    CREATE TABLE IF NOT EXISTS shop_products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT,
      category TEXT,
      description TEXT,
      price REAL NOT NULL,
      originalPrice REAL,
      stock INTEGER DEFAULT 0,
      image TEXT,
      images TEXT DEFAULT '[]',
      status TEXT DEFAULT 'on_sale',
      sales INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // 商城订单表
  db.exec(`
    CREATE TABLE IF NOT EXISTS shop_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderNo TEXT UNIQUE NOT NULL,
      userId INTEGER,
      customerName TEXT NOT NULL,
      customerPhone TEXT NOT NULL,
      customerEmail TEXT,
      totalAmount REAL NOT NULL,
      payAmount REAL NOT NULL,
      discountAmount REAL DEFAULT 0,
      status TEXT DEFAULT 'pending',
      payTime DATETIME,
      payMethod TEXT,
      payTransactionNo TEXT,
      items TEXT NOT NULL,
      remark TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // 购物车表
  db.exec(`
    CREATE TABLE IF NOT EXISTS shop_cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sessionId TEXT NOT NULL,
      productId INTEGER NOT NULL,
      quantity INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  const adminExists = db.prepare('SELECT * FROM users WHERE email = ?').get('admin@example.com')
  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync('admin123456', 10)
    db.prepare(
      `
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `,
    ).run('admin', 'admin@example.com', hashedPassword, 'admin')
    console.log('✓ 创建管理员账户：admin@example.com / admin123456')
  } else {
    console.log('✓ 管理员账户已存在')
  }

  const editorExists = db.prepare('SELECT * FROM users WHERE email = ?').get('editor@example.com')
  if (!editorExists) {
    const hashedPassword = bcrypt.hashSync('editor123456', 10)
    db.prepare(
      `
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `,
    ).run('editor', 'editor@example.com', hashedPassword, 'editor')
    console.log('✓ 创建编辑账户：editor@example.com / editor123456')
  } else {
    console.log('✓ 编辑账户已存在')
  }

  const configCount = db.prepare('SELECT COUNT(*) as count FROM site_configs').get().count
  if (configCount === 0) {
    const configs = [
      ['siteName', '集团公司', 'basic', '网站名称'],
      ['siteDescription', '专业的边缘算力、支付金融、电商服务提供商', 'basic', '网站描述'],
      ['siteKeywords', '边缘计算，CDN，支付，金融，电商', 'seo', '网站关键词'],
      ['contactEmail', 'contact@example.com', 'contact', '联系邮箱'],
      ['contactPhone', '400-xxx-xxxx', 'contact', '联系电话'],
      ['contactAddress', '福建省福州市', 'contact', '联系地址'],
      ['wechatQrcode', '/uploads/wechat.jpg', 'social', '微信二维码'],
      ['weiboUrl', '', 'social', '微博链接'],
      ['logo', '/uploads/logo.png', 'branding', '网站 Logo'],
      ['favicon', '/uploads/favicon.ico', 'branding', '网站图标'],
    ]
    const stmt = db.prepare(`
      INSERT INTO site_configs (key, value, category, description)
      VALUES (?, ?, ?, ?)
    `)
    configs.forEach(config => {
      stmt.run(...config)
    })
    console.log('✓ 创建初始站点配置')
  } else {
    console.log('✓ 站点配置已存在')
  }

  const articleCount = db.prepare('SELECT COUNT(*) as count FROM articles').get().count
  if (articleCount === 0) {
    const articles = [
      {
        title: '欢迎来到集团公司官方网站',
        summary: '我们专注于边缘计算、支付金融和电商服务领域',
        content: '集团公司致力于为客户提供优质的边缘计算、支付金融和电商服务。',
        category: '公司新闻',
        tags: '["公司新闻", "集团动态"]',
        status: 'published',
        isTop: 1,
      },
      {
        title: '边缘计算节点突破 100 个',
        summary: '我们的 CDN 网络覆盖全国主要城市',
        content: '随着业务的不断发展，我们的边缘计算节点已经突破 100 个。',
        category: '业务动态',
        tags: '["边缘计算", "CDN", "基础设施"]',
        status: 'published',
        isTop: 1,
      },
      {
        title: '获得支付业务许可证',
        summary: '正式获批开展第三方支付业务',
        content: '我们已成功获得中国人民银行颁发的支付业务许可证。',
        category: '荣誉资质',
        tags: '["支付", "资质", "许可证"]',
        status: 'published',
      },
    ]
    const stmt = db.prepare(`
      INSERT INTO articles (title, summary, content, category, tags, status, isTop, publishedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    articles.forEach(article => {
      stmt.run(
        article.title,
        article.summary,
        article.content,
        article.category,
        article.tags,
        article.status,
        article.isTop,
        article.status === 'published' ? new Date().toISOString() : null,
      )
    })
    console.log('✓ 创建示例文章')
  } else {
    console.log('✓ 文章已存在')
  }

  const menuCount = db.prepare('SELECT COUNT(*) as count FROM menus').get().count
  if (menuCount === 0) {
    const menus = [
      ['首页', '/', null, 0, 1],
      ['边缘计算', '/edge', null, 1, 1],
      ['支付金融', '/payment', null, 2, 1],
      ['电商业务', '/ecommerce', null, 3, 1],
      ['关于我们', '/about', null, 4, 1],
    ]
    const stmt = db.prepare(`
      INSERT INTO menus (title, url, parentId, \`order\`, active)
      VALUES (?, ?, ?, ?, ?)
    `)
    menus.forEach(menu => {
      stmt.run(...menu)
    })
    console.log('✓ 创建示例菜单')
  } else {
    console.log('✓ 菜单已存在')
  }

  const bannerCount = db.prepare('SELECT COUNT(*) as count FROM banners').get().count
  if (bannerCount === 0) {
    const banners = [
      ['首页轮播图 1', '/uploads/banner1.jpg', '/edge', 'home', 0, 1],
      ['首页轮播图 2', '/uploads/banner2.jpg', '/payment', 'home', 1, 1],
    ]
    const stmt = db.prepare(`
      INSERT INTO banners (title, imageUrl, linkUrl, position, \`order\`, active)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    banners.forEach(banner => {
      stmt.run(...banner)
    })
    console.log('✓ 创建示例广告')
  } else {
    console.log('✓ 广告已存在')
  }

  console.log('\n✅ 数据库初始化完成!')
  console.log('\n管理员账户：admin@example.com / admin123456')
  console.log('编辑账户：editor@example.com / editor123456')
}

module.exports = { db, initializeDB }
