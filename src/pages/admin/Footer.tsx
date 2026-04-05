import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'
import { API_URL } from '../../config/api'

interface Footer {
  id: number
  companyName?: string
  description?: string
  address?: string
  phone?: string
  email?: string
  icpLicense?: string
  socialLinks?: Record<string, string>
  active: boolean
  createdAt: string
}

const Footer = () => {
  const [footers, setFooters] = useState<Footer[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingFooter, setEditingFooter] = useState<Footer | null>(null)
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    icpLicense: '',
    socialLinks: {
      wechat: '',
      weibo: '',
      github: '',
    },
    active: true,
  })

  const token = localStorage.getItem('token')

  const fetchFooters = async () => {
    try {
      const response = await fetch(`${API_URL}/api/footer`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setFooters(data || [])
    } catch (error) {
      console.error('获取页脚配置失败:', error)
      setFooters([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFooters()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingFooter
        ? `${API_URL}/api/footer/${editingFooter.id}`
        : `${API_URL}/api/footer`
      const method = editingFooter ? 'PUT' : 'POST'

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
        alert(errorData.error || '保存失败')
        return
      }

      setShowModal(false)
      setEditingFooter(null)
      setFormData({
        companyName: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        icpLicense: '',
        socialLinks: { wechat: '', weibo: '', github: '' },
        active: true,
      })
      fetchFooters()
    } catch (error) {
      console.error('保存页脚配置失败:', error)
      alert('保存失败，请重试')
    }
  }

  const handleEdit = (footer: Footer) => {
    setEditingFooter(footer)
    setFormData({
      companyName: footer.companyName || '',
      description: footer.description || '',
      address: footer.address || '',
      phone: footer.phone || '',
      email: footer.email || '',
      icpLicense: footer.icpLicense || '',
      socialLinks: footer.socialLinks || { wechat: '', weibo: '', github: '' },
      active: !!footer.active,
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setEditingFooter(null)
    setFormData({
      companyName: '',
      description: '',
      address: '',
      phone: '',
      email: '',
      icpLicense: '',
      socialLinks: { wechat: '', weibo: '', github: '' },
      active: true,
    })
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">页脚配置</h1>
            <p className="text-gray-600 mt-2">管理网站底部的公司信息、联系方式等</p>
          </div>
          <Button onClick={() => setShowModal(true)}>+ 新增配置</Button>
        </div>

        {/* Footer List */}
        {loading ? (
          <div className="text-center py-12">加载中...</div>
        ) : footers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">暂无页脚配置</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    公司名称
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">邮箱</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">电话</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">状态</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {footers.map(footer => (
                  <tr key={footer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                      {footer.companyName || '-'}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{footer.email || '-'}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{footer.phone || '-'}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          footer.active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {footer.active ? '启用' : '禁用'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleEdit(footer)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm mr-3"
                      >
                        编辑
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
                  {editingFooter ? '编辑页脚配置' : '新增页脚配置'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">公司名称</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="例如：某某集团有限公司"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">公司简介</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="简短的公司介绍"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        联系电话
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="400-xxx-xxxx"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        联系邮箱
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="contact@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">联系地址</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="详细地址"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ICP 备案号
                    </label>
                    <input
                      type="text"
                      value={formData.icpLicense}
                      onChange={e => setFormData({ ...formData, icpLicense: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="京 ICP 备 xxxxxxxx 号"
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">社交媒体</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">微信</label>
                        <input
                          type="text"
                          value={formData.socialLinks.wechat}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              socialLinks: { ...formData.socialLinks, wechat: e.target.value },
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          placeholder="微信公众号/二维码链接"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">微博</label>
                        <input
                          type="text"
                          value={formData.socialLinks.weibo}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              socialLinks: { ...formData.socialLinks, weibo: e.target.value },
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          placeholder="微博链接"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GitHub
                        </label>
                        <input
                          type="text"
                          value={formData.socialLinks.github}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              socialLinks: { ...formData.socialLinks, github: e.target.value },
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          placeholder="GitHub 链接"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="footer-active"
                      checked={formData.active}
                      onChange={e => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="footer-active" className="text-sm font-medium text-gray-700">
                      启用此配置
                    </label>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button type="submit" className="flex-1">
                      {editingFooter ? '保存更改' : '创建配置'}
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

export default Footer
