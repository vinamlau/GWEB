const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')

const { initializeDB } = require('./config/db-sqlite')

const authRoutes = require('./routes/auth-sqlite')
const articleRoutes = require('./routes/articles-sqlite')
const imageRoutes = require('./routes/images-sqlite')
const configRoutes = require('./routes/config-sqlite')
const userRoutes = require('./routes/users-sqlite')
const commentRoutes = require('./routes/comments-sqlite')
const menuRoutes = require('./routes/menus-sqlite')
const bannerRoutes = require('./routes/banners-sqlite')
const shopRoutes = require('./routes/shop-sqlite')
const orderRoutes = require('./routes/orders-sqlite')
const paymentRoutes = require('./routes/payment-sqlite')
const pageRoutes = require('./routes/pages-sqlite')
const footerRoutes = require('./routes/footer-sqlite')

const app = express()

initializeDB()

app.use(
  cors({
    origin: '*',
    credentials: false,
  }),
)
app.use(compression())
app.use(morgan('dev'))
app.use(express.json())
// 配置上传文件目录的静态访问，允许跨域（必须在 helmet 之前配置）
app.use(
  '/uploads',
  (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
  },
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: res => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
    },
  }),
)

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  }),
)

app.use('/api/auth', authRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/config', configRoutes)
app.use('/api/users', userRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/menus', menuRoutes)
app.use('/api/banners', bannerRoutes)
app.use('/api/shop', shopRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/pages', pageRoutes)
app.use('/api/footer', footerRoutes)

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    database: 'sqlite',
    timestamp: new Date().toISOString(),
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`)
  console.log(`环境：${process.env.NODE_ENV || 'development'}`)
  console.log(`数据库：SQLite`)
  console.log(`\n访问管理后台：http://localhost:5173/admin/login`)
  console.log(`管理员账户：admin@example.com / admin123456`)
})
