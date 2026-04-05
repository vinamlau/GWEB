import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import AdminLayout from '../../components/admin/AdminLayout'
import { API_URL } from '../../config/api'

interface Menu {
  id: number
  title: string
  url: string
  parentId?: number
  order: number
  active: boolean
}

const Menus = () => {
  const [menus, setMenus] = useState<Menu[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    parentId: 0,
    order: 0,
    active: true,
  })

  useEffect(() => {
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    const token = localStorage.getItem('token')

    try {
      const res = await fetch(`${API_URL}/api/menus`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setMenus(data.menus || data || [])
    } catch (error) {
      console.error('获取菜单列表失败:', error)
      setMenus([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除此菜单项吗？')) {
      return
    }

    const token = localStorage.getItem('token')

    try {
      const res = await fetch(`${API_URL}/api/menus/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        const errorData = await res.json()
        alert(errorData.error || '删除失败')
        return
      }
      fetchMenus()
    } catch (error) {
      console.error('删除菜单失败:', error)
      alert('删除失败，请重试')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const url = editingMenu ? `${API_URL}/api/menus/${editingMenu.id}` : `${API_URL}/api/menus`
      const method = editingMenu ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        alert(errorData.error || '保存失败')
        return
      }

      setShowModal(false)
      setEditingMenu(null)
      setFormData({ title: '', url: '', parentId: 0, order: 0, active: true })
      fetchMenus()
    } catch (error) {
      console.error('保存菜单失败:', error)
      alert('保存失败，请重试')
    }
  }

  const handleEdit = (menu: Menu) => {
    setEditingMenu(menu)
    setFormData({
      title: menu.title,
      url: menu.url,
      parentId: menu.parentId || 0,
      order: menu.order,
      active: menu.active,
    })
    setShowModal(true)
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">菜单管理</h1>
              <p className="text-gray-600">管理网站导航菜单</p>
            </div>
            <button
              onClick={() => {
                setEditingMenu(null)
                setFormData({ title: '', url: '', parentId: 0, order: 0, active: true })
                setShowModal(true)
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              添加菜单
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  标题
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  URL
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  排序
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  状态
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    加载中...
                  </td>
                </tr>
              ) : menus.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    暂无菜单数据
                  </td>
                </tr>
              ) : (
                menus.map(menu => (
                  <tr key={menu.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{menu.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{menu.url}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{menu.order}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          menu.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {menu.active ? '启用' : '禁用'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(menu)}
                        className="text-blue-600 hover:text-blue-900 mr-4 text-sm font-medium"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(menu.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[20px] p-8 max-w-md w-full mx-4"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {editingMenu ? '编辑菜单' : '添加菜单'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">菜单标题</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">链接地址</label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">排序</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
                  <select
                    value={formData.active ? 'true' : 'false'}
                    onChange={e => setFormData({ ...formData, active: e.target.value === 'true' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="true">启用</option>
                    <option value="false">禁用</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    {editingMenu ? '更新' : '创建'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default Menus
