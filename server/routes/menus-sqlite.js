const express = require('express')
const { db } = require('../config/db-sqlite')
const auth = require('../middleware/auth')

const router = express.Router()

// 获取所有菜单
router.get('/', (req, res) => {
  try {
    const menus = db.prepare('SELECT * FROM menus ORDER BY `order` ASC').all()
    res.json({ menus })
  } catch (error) {
    console.error('获取菜单列表失败:', error)
    res.status(500).json({ error: '获取菜单列表失败' })
  }
})

// 获取单个菜单
router.get('/:id', (req, res) => {
  try {
    const menu = db.prepare('SELECT * FROM menus WHERE id = ?').get(req.params.id)
    if (!menu) {
      return res.status(404).json({ error: '菜单不存在' })
    }
    res.json({ menu })
  } catch (error) {
    console.error('获取菜单失败:', error)
    res.status(500).json({ error: '获取菜单失败' })
  }
})

// 创建菜单
router.post('/', auth.protect, auth.editor, (req, res) => {
  try {
    const { title, url, parentId, order, active } = req.body
    const result = db
      .prepare('INSERT INTO menus (title, url, parentId, `order`, active) VALUES (?, ?, ?, ?, ?)')
      .run(
        title,
        url,
        parentId !== undefined ? parentId : null,
        order || 0,
        active === true || active === 1 ? 1 : 0,
      )

    const newMenu = db.prepare('SELECT * FROM menus WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json({ menu: newMenu })
  } catch (error) {
    console.error('创建菜单失败:', error)
    res.status(500).json({ error: '创建菜单失败' })
  }
})

// 更新菜单
router.put('/:id', auth.protect, auth.editor, (req, res) => {
  try {
    const { title, url, parentId, order, active } = req.body
    const menuId = req.params.id

    const existingMenu = db.prepare('SELECT * FROM menus WHERE id = ?').get(menuId)
    if (!existingMenu) {
      return res.status(404).json({ error: '菜单不存在' })
    }

    const updateStmt = db.prepare(
      'UPDATE menus SET title = ?, url = ?, parentId = ?, `order` = ?, active = ? WHERE id = ?',
    )
    updateStmt.run(
      title,
      url,
      parentId !== undefined ? parentId : null,
      order || 0,
      active === true || active === 1 ? 1 : 0,
      menuId,
    )

    const updatedMenu = db.prepare('SELECT * FROM menus WHERE id = ?').get(menuId)
    res.json({ menu: updatedMenu })
  } catch (error) {
    console.error('更新菜单失败:', error)
    console.error('错误详情:', error.message, error.stack)
    res.status(500).json({ error: '更新菜单失败', details: error.message })
  }
})

// 删除菜单
router.delete('/:id', auth.protect, auth.editor, (req, res) => {
  try {
    const menuId = req.params.id
    const menu = db.prepare('SELECT * FROM menus WHERE id = ?').get(menuId)

    if (!menu) {
      return res.status(404).json({ error: '菜单不存在' })
    }

    db.prepare('DELETE FROM menus WHERE id = ?').run(menuId)
    res.json({ message: '菜单已删除' })
  } catch (error) {
    console.error('删除菜单失败:', error)
    res.status(500).json({ error: '删除菜单失败' })
  }
})

module.exports = router
