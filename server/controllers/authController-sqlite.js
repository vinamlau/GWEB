const { db } = require('../config/db-sqlite')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

console.log('JWT_SECRET loaded:', process.env.JWT_SECRET ? 'YES' : 'NO')

const generateToken = id => {
  console.log(
    'Generating token with secret:',
    process.env.JWT_SECRET ? process.env.JWT_SECRET.substring(0, 10) + '...' : 'UNDEFINED',
  )
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const register = (req, res) => {
  try {
    const { username, email, password, role } = req.body

    const userExists = db
      .prepare(
        `
      SELECT * FROM users WHERE email = ? OR username = ?
    `,
      )
      .get(email, username)

    if (userExists) {
      return res.status(400).json({ message: '用户名或邮箱已存在' })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const result = db
      .prepare(
        `
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `,
      )
      .run(username, email, hashedPassword, role || 'editor')

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid)

    res.status(201).json({
      _id: user.id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user.id.toString()),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const login = (req, res) => {
  try {
    const { email, password } = req.body

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        _id: user.id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user.id.toString()),
      })
    } else {
      res.status(401).json({ message: '邮箱或密码错误' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getProfile = (req, res) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)
    if (user) {
      res.json({
        _id: user.id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      })
    } else {
      res.status(404).json({ message: '用户不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { register, login, getProfile }
