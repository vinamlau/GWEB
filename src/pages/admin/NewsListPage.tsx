import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'
import { API_URL } from '../../config/api'

interface NewsPage {
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

const NewsListPage = () => {
  const [newsPage, setNewsPage] = useState<NewsPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: '新闻动态',
    slug: 'news',
    content: '',
    seoTitle: '',
    seoDescription: '',
    active: true,
  })

  const token = localStorage.getItem('token')

  const fetchNewsPage = async () => {
    try {
      const response = await fetch(`${API_URL}/api/pages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const page = data.find((p: NewsPage) => p.slug === 'news')
      setNewsPage(page || null)
      if (page) {
        setFormData({
          title: page.title,
          slug: page.slug,
          content: page.content,
          seoTitle: page.seoTitle || '',
          seoDescription: page.seoDescription || '',
          active: !!page.active,
        })
      }
    } catch (error) {
      console.error('获取页面失败:', error)
      setNewsPage(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNewsPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url =
        editing && newsPage ? `${API_URL}/api/pages/${newsPage.id}` : `${API_URL}/api/pages`
      const method = editing && newsPage ? 'PUT' : 'POST'

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
      setEditing(false)
      fetchNewsPage()
    } catch (error) {
      console.error('保存失败:', error)
      alert('保存失败，请重试')
    }
  }

  const handleEdit = () => {
    if (newsPage) {
      setFormData({
        title: newsPage.title,
        slug: newsPage.slug,
        content: newsPage.content,
        seoTitle: newsPage.seoTitle || '',
        seoDescription: newsPage.seoDescription || '',
        active: !!newsPage.active,
      })
      setEditing(true)
      setShowModal(true)
    }
  }

  const resetForm = () => {
    setEditing(false)
    setFormData({
      title: '新闻动态',
      slug: 'news',
      content: '',
      seoTitle: '',
      seoDescription: '',
      active: true,
    })
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">新闻动态列表页管理</h1>
            <p className="text-gray-600 mt-2">管理新闻动态列表页的头部内容和 SEO 信息</p>
          </div>
          <Button onClick={handleEdit} disabled={!newsPage && loading}>
            {newsPage ? '编辑页面' : loading ? '加载中...' : '创建页面'}
          </Button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        ) : !newsPage ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-lg font-medium">暂无新闻动态列表页配置</p>
            </div>
            <p className="text-gray-500 mb-6">
              创建新闻动态列表页，管理页面标题、介绍内容和 SEO 信息
            </p>
            <Button onClick={() => setShowModal(true)}>创建页面</Button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{newsPage.title}</h2>
                <p className="text-sm text-gray-500">
                  Slug: <code className="text-blue-600">/{newsPage.slug}</code>
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">页面内容</label>
                  <div
                    className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: newsPage.content || '<p class="text-gray-400">暂无内容</p>',
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO 标题</label>
                    <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700">
                      {newsPage.seoTitle || <span className="text-gray-400">未设置</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO 描述</label>
                    <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700">
                      {newsPage.seoDescription || <span className="text-gray-400">未设置</span>}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        newsPage.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {newsPage.active ? '已发布' : '未发布'}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="text-gray-500">创建时间：</span>
                      <span className="text-gray-900">
                        {new Date(newsPage.createdAt).toLocaleString('zh-CN')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">更新时间：</span>
                      <span className="text-gray-900">
                        {new Date(newsPage.updatedAt).toLocaleString('zh-CN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  {editing ? '编辑新闻动态列表页' : '创建新闻动态列表页'}
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
                      placeholder="例如：新闻动态、新闻中心"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      disabled
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono"
                    />
                    <p className="text-xs text-gray-500 mt-1">固定值：news，用于 URL 访问 /news</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      页面介绍内容 *
                    </label>
                    <textarea
                      required
                      value={formData.content}
                      onChange={e => setFormData({ ...formData, content: e.target.value })}
                      rows={8}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="输入新闻动态页面的介绍内容（支持 HTML），例如：了解公司最新动态和行业资讯"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO 标题</label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={e => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="搜索引擎显示的标题，例如：新闻动态 - 集团公司"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO 描述</label>
                    <textarea
                      value={formData.seoDescription}
                      onChange={e => setFormData({ ...formData, seoDescription: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="搜索引擎显示的描述，例如：查看集团公司最新动态、企业新闻和行业资讯"
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
                      {editing ? '保存更改' : '创建页面'}
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

export default NewsListPage
