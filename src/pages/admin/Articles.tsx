import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'
import { API_URL } from '../../config/api'

interface Article {
  _id: string
  title: string
  summary: string
  category: string
  status: string
  isTop: boolean
  viewCount: number
  publishedAt: string
  createdAt: string
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState({
    category: '',
    status: '',
  })

  const token = localStorage.getItem('token')

  const fetchArticles = async () => {
    try {
      const params = new URLSearchParams({ page: page.toString(), ...filter })
      const response = await fetch(`${API_URL}/api/articles?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setArticles(data.articles || [])
      setTotalPages(data.pages || 1)
      setTotal(data.total || 0)
    } catch (error) {
      console.error('获取文章列表失败:', error)
      setArticles([])
      setTotalPages(1)
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter])

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/articles/${id}`, {
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
      fetchArticles()
    } catch (error) {
      console.error('删除失败:', error)
      alert('删除失败，请重试')
    }
  }

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      draft: '草稿',
      published: '已发布',
      archived: '已归档',
    }
    return map[status] || status
  }

  const getCategoryText = (category: string) => {
    const map: Record<string, string> = {
      公司新闻: '公司新闻',
      业务动态: '业务动态',
      荣誉资质: '荣誉资质',
      行业资讯: '行业资讯',
      政策法规: '政策法规',
    }
    return map[category] || category
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-1 md:mb-2">
              文章管理
            </h1>
            <p className="text-sm md:text-base text-gray-600">管理网站文章和新闻 ({total} 篇)</p>
          </div>
          <Link to="/admin/articles/new">
            <Button variant="primary">+ 新建文章</Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-[16px] md:rounded-[20px] p-3 md:p-4 mb-4 md:mb-6 flex gap-2 md:gap-4 flex-wrap">
          <select
            value={filter.category}
            onChange={e => setFilter({ ...filter, category: e.target.value })}
            className="flex-1 min-w-[120px] px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-gray-300 text-sm md:text-base focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">全部分类</option>
            <option value="公司新闻">公司新闻</option>
            <option value="业务动态">业务动态</option>
            <option value="荣誉资质">荣誉资质</option>
            <option value="行业资讯">行业资讯</option>
            <option value="政策法规">政策法规</option>
          </select>

          <select
            value={filter.status}
            onChange={e => setFilter({ ...filter, status: e.target.value })}
            className="flex-1 min-w-[120px] px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-gray-300 text-sm md:text-base focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">全部状态</option>
            <option value="draft">草稿</option>
            <option value="published">已发布</option>
            <option value="archived">已归档</option>
          </select>
        </div>

        {/* Article List */}
        <div className="bg-white rounded-[16px] md:rounded-[20px] shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6 md:p-8 text-center">
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 bg-gray-100 rounded-xl"></div>
                ))}
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="p-6 md:p-8 text-center text-gray-500">
              暂无文章，
              <Link to="/admin/articles/new" className="text-blue-600 hover:underline">
                创建第一篇
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {articles.map(article => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 md:p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-0">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-2">
                        {article.isTop && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                            置顶
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            article.status === 'published'
                              ? 'bg-green-100 text-green-600'
                              : article.status === 'draft'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {getStatusText(article.status)}
                        </span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">
                          {getCategoryText(article.category)}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm mb-2 line-clamp-1">
                        {article.summary}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-gray-500">
                        <span>浏览：{article.viewCount}</span>
                        <span>创建：{new Date(article.createdAt).toLocaleDateString('zh-CN')}</span>
                        {article.publishedAt && (
                          <span>
                            发布：{new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto mt-3 sm:mt-0 sm:ml-4">
                      <Link
                        to={`/admin/articles/edit/${article._id}`}
                        className="flex-1 sm:flex-none px-3 py-1.5 text-xs md:text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-center"
                      >
                        编辑
                      </Link>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="flex-1 sm:flex-none px-3 py-1.5 text-xs md:text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4 mt-4 md:mt-6">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm"
            >
              上一页
            </Button>
            <span className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-600">
              第 {page} / {totalPages} 页
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm"
            >
              下一页
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default Articles
