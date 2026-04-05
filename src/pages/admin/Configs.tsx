import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'
import { API_URL } from '../../config/api'

interface Config {
  _id: string
  key: string
  value: string
  category: string
  description: string
}

const Configs = () => {
  const [configs, setConfigs] = useState<Config[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newConfig, setNewConfig] = useState({
    key: '',
    value: '',
    category: 'basic',
    description: '',
  })

  const token = localStorage.getItem('token')

  const fetchConfigs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/config`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setConfigs(data)
    } catch (error) {
      console.error('获取配置失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfigs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdate = async (key: string) => {
    try {
      const response = await fetch(`${API_URL}/api/config/${key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: editValue }),
      })

      if (response.ok) {
        fetchConfigs()
        setEditing(null)
      } else {
        const data = await response.json()
        alert(data.message || '更新失败')
      }
    } catch (error) {
      console.error('更新失败:', error)
    }
  }

  const handleAdd = async () => {
    if (!newConfig.key || !newConfig.value) {
      alert('请填写必填项')
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newConfig),
      })

      if (response.ok) {
        fetchConfigs()
        setShowAddModal(false)
        setNewConfig({ key: '', value: '', category: 'basic', description: '' })
      } else {
        const data = await response.json()
        alert(data.message || '添加失败')
      }
    } catch (error) {
      console.error('添加失败:', error)
    }
  }

  const handleDelete = async (key: string) => {
    if (!confirm('确定要删除这个配置吗？')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/config/${key}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchConfigs()
      }
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  const getCategoryText = (category: string) => {
    const map: Record<string, string> = {
      basic: '基础配置',
      seo: 'SEO 配置',
      contact: '联系方式',
      social: '社交媒体',
      branding: '品牌标识',
    }
    return map[category] || category
  }

  const groupedConfigs = configs.reduce(
    (acc, config) => {
      if (!acc[config.category]) {
        acc[config.category] = []
      }
      acc[config.category].push(config)
      return acc
    },
    {} as Record<string, Config[]>,
  )

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">站点配置</h1>
            <p className="text-gray-600">管理网站各项配置参数</p>
          </div>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            + 新增配置
          </Button>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-[20px] p-6">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedConfigs).map(([category, categoryConfigs]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[20px] p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {getCategoryText(category)}
                </h2>
                <div className="space-y-4">
                  {categoryConfigs.map(config => (
                    <div key={config._id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-gray-900">
                              {config.key}
                            </span>
                            {config.description && (
                              <span className="text-xs text-gray-500">({config.description})</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {editing === config.key ? (
                            <>
                              <button
                                onClick={() => handleUpdate(config.key)}
                                className="text-sm text-green-600 hover:text-green-700 font-medium"
                              >
                                保存
                              </button>
                              <button
                                onClick={() => setEditing(null)}
                                className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                              >
                                取消
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditing(config.key)
                                  setEditValue(config.value)
                                }}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                              >
                                编辑
                              </button>
                              <button
                                onClick={() => handleDelete(config.key)}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                删除
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      {editing === config.key ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                          autoFocus
                        />
                      ) : (
                        <p className="text-gray-700 text-sm break-all">{config.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[24px] p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">新增配置</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">配置键 *</label>
                  <input
                    type="text"
                    value={newConfig.key}
                    onChange={e => setNewConfig({ ...newConfig, key: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="例如：siteName"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">配置值 *</label>
                  <input
                    type="text"
                    value={newConfig.value}
                    onChange={e => setNewConfig({ ...newConfig, value: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="例如：集团公司"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
                  <select
                    value={newConfig.category}
                    onChange={e => setNewConfig({ ...newConfig, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="basic">基础配置</option>
                    <option value="seo">SEO 配置</option>
                    <option value="contact">联系方式</option>
                    <option value="social">社交媒体</option>
                    <option value="branding">品牌标识</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
                  <input
                    type="text"
                    value={newConfig.description}
                    onChange={e => setNewConfig({ ...newConfig, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="配置项的描述说明"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  取消
                </Button>
                <Button variant="primary" onClick={handleAdd}>
                  添加
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default Configs
