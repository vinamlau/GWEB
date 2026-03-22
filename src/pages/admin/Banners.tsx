import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import AdminLayout from '../../components/admin/AdminLayout'

interface Banner {
  id: number
  title: string
  imageUrl: string
  linkUrl: string
  position: string
  order: number
  active: boolean
}

const Banners = () => {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    linkUrl: '',
    position: 'home',
    order: 0,
    active: true,
  })

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    const token = localStorage.getItem('token')
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

    try {
      const res = await fetch(`${API_URL}/api/banners`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      setBanners(data.banners || data || [])
    } catch (error) {
      console.error('获取广告列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除此广告位吗？')) {
      return
    }

    const token = localStorage.getItem('token')
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

    try {
      await fetch(`${API_URL}/api/banners/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchBanners()
    } catch (error) {
      console.error('删除广告失败:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

    try {
      const url = editingBanner
        ? `${API_URL}/api/banners/${editingBanner.id}`
        : `${API_URL}/api/banners`
      const method = editingBanner ? 'PUT' : 'POST'

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      setShowModal(false)
      setEditingBanner(null)
      setFormData({
        title: '',
        imageUrl: '',
        linkUrl: '',
        position: 'home',
        order: 0,
        active: true,
      })
      fetchBanners()
    } catch (error) {
      console.error('保存广告失败:', error)
    }
  }

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData({
      title: banner.title,
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl,
      position: banner.position,
      order: banner.order,
      active: banner.active,
    })
    setShowModal(true)
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">广告位管理</h1>
              <p className="text-gray-600">管理网站广告和横幅</p>
            </div>
            <button
              onClick={() => {
                setEditingBanner(null)
                setFormData({
                  title: '',
                  imageUrl: '',
                  linkUrl: '',
                  position: 'home',
                  order: 0,
                  active: true,
                })
                setShowModal(true)
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              添加广告
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">加载中...</div>
          ) : banners.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">暂无广告数据</div>
          ) : (
            banners.map(banner => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="aspect-video bg-gray-100 relative">
                  {banner.imageUrl ? (
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      暂无图片
                    </div>
                  )}
                  <div
                    className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${
                      banner.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {banner.active ? '启用' : '禁用'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{banner.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">位置：{banner.position}</p>
                  <p className="text-xs text-gray-500 mb-4">链接：{banner.linkUrl}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[20px] p-8 max-w-md w-full mx-4"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {editingBanner ? '编辑广告' : '添加广告'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">广告标题</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">图片 URL</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">链接地址</label>
                  <input
                    type="text"
                    value={formData.linkUrl}
                    onChange={e => setFormData({ ...formData, linkUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">广告位置</label>
                  <select
                    value={formData.position}
                    onChange={e => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="home">首页</option>
                    <option value="edge">边缘计算</option>
                    <option value="payment">支付金融</option>
                    <option value="ecommerce">电商业务</option>
                  </select>
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
                    {editingBanner ? '更新' : '创建'}
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

export default Banners
