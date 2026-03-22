require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const path = require('path')

const connectDB = require('./config/db')

// 导入路由
const authRoutes = require('./routes/auth')
const articleRoutes = require('./routes/articles')
const imageRoutes = require('./routes/images')
const configRoutes = require('./routes/config')

// 初始化 Express 应用
const app = express()

// 连接数据库
connectDB()

// 中间件
app.use(helmet()) // 安全头
app.use(cors()) // 跨域
app.use(compression()) // 压缩
app.use(morgan('dev')) // 日志
app.use(express.json()) // JSON 解析
app.use(express.urlencoded({ extended: true })) // URL 编码解析

// 静态文件服务（上传的文件）
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API 路由
app.use('/api/auth', authRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/config', configRoutes)

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CMS API 运行正常' })
})

// 404 处理
app.use((req, res) => {
  res.status(404).json({ message: '接口不存在' })
})

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err : {},
  })
})

// 启动服务器
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`)
  console.log(`环境：${process.env.NODE_ENV}`)
})

module.exports = app
