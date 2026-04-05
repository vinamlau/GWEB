import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'
import { API_URL } from '../../config/api'

interface Page {
  id: number
  title: string
  slug: string
  content: string
  seoTitle?: string
  seoDescription?: string
  active: boolean
  createdAt: string
  updatedAt: string
}

const Pages = () => {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    seoTitle: '',
    seoDescription: '',
    active: true,
  })

  const token = localStorage.getItem('token')

  const fetchPages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/pages`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setPages(data || [])
    } catch (error) {
      console.error('获取页面列表失败:', error)
      setPages([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      alert('未授权，请重新登录')
      window.location.href = '/admin/login'
      return
    }

    try {
      const url = editingPage ? `${API_URL}/api/pages/${editingPage.id}` : `${API_URL}/api/pages`
      const method = editingPage ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 401) {
          alert('登录已过期，请重新登录')
          localStorage.removeItem('token')
          window.location.href = '/admin/login'
          return
        }
        alert(errorData.error || '保存失败')
        return
      }

      // 触发页面更新事件，通知前台刷新
      window.dispatchEvent(new CustomEvent('pageUpdated'))

      setShowModal(false)
      setEditingPage(null)
      setFormData({
        title: '',
        slug: '',
        content: '',
        seoTitle: '',
        seoDescription: '',
        active: true,
      })
      fetchPages()
    } catch (error) {
      console.error('保存页面失败:', error)
      alert('保存失败，请重试')
    }
  }

  const handleEdit = (page: Page) => {
    setEditingPage(page)
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      seoTitle: page.seoTitle || '',
      seoDescription: page.seoDescription || '',
      active: !!page.active,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除此页面吗？')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/pages/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert(errorData.error || '删除失败')
        return
      }
      fetchPages()
    } catch (error) {
      console.error('删除失败:', error)
      alert('删除失败，请重试')
    }
  }

  const resetForm = () => {
    setEditingPage(null)
    setFormData({
      title: '',
      slug: '',
      content: '',
      seoTitle: '',
      seoDescription: '',
      active: true,
    })
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">页面管理</h1>
            <p className="text-gray-600 mt-2">管理网站首页、关于我们、联系我们等单页内容</p>
          </div>
          <Button onClick={() => setShowModal(true)}>+ 新增页面</Button>
        </div>

        {/* Pages List */}
        {loading ? (
          <div className="text-center py-12">加载中...</div>
        ) : pages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">暂无页面</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">标题</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Slug</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">状态</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    更新时间
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pages.map(page => (
                  <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-900 font-medium">{page.title}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-mono">{page.slug}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          page.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {page.active ? '已发布' : '未发布'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(page.updatedAt).toLocaleString('zh-CN')}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleEdit(page)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm mr-3"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingPage ? '编辑页面' : '新增页面'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      页面标题 *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="例如：首页、关于我们、联系我们"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={e => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono"
                      placeholder="例如：home, about, contact"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      用于 URL 访问，如：/pages/{formData.slug}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      页面内容 *
                    </label>
                    <textarea
                      required
                      value={formData.content}
                      onChange={e => setFormData({ ...formData, content: e.target.value })}
                      rows={12}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="输入页面内容（支持 HTML）"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO 标题</label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={e => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="搜索引擎显示的标题"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO 描述</label>
                    <textarea
                      value={formData.seoDescription}
                      onChange={e => setFormData({ ...formData, seoDescription: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="搜索引擎显示的描述"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="active"
                      checked={formData.active}
                      onChange={e => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="active" className="text-sm font-medium text-gray-700">
                      启用此页面
                    </label>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button type="submit" className="flex-1">
                      {editingPage ? '保存更改' : '创建页面'}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setShowModal(false)
                        resetForm()
                      }}
                      className="flex-1"
                    >
                      取消
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default Pages
