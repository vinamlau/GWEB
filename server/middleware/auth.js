const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: '未授权，请重新登录' })
    }
  }

  if (!token) {
    res.status(401).json({ message: '未找到 token，未授权' })
  }
}

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: '拒绝访问，需要管理员权限' })
  }
}

const editor = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'editor')) {
    next()
  } else {
    res.status(403).json({ message: '拒绝访问，需要编辑或管理员权限' })
  }
}

module.exports = { protect, admin, editor }
