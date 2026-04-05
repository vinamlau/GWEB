import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'
import { API_URL } from '../../config/api'

const ArticleEditor = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    coverImage: '',
    category: '公司新闻',
    tags: '',
    status: 'draft',
    isTop: false,
  })

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (isEdit) {
      fetchArticle()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`${API_URL}/api/articles/${id}`)
      const data = await response.json()
      setFormData({
        title: data.title || '',
        summary: data.summary || '',
        content: data.content || '',
        coverImage: data.coverImage || '',
        category: data.category || '公司新闻',
        tags: data.tags?.join(', ') || '',
        status: data.status || 'draft',
        isTop: data.isTop || false,
      })
    } catch (error) {
      console.error('获取文章失败:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean),
      }

      const response = await fetch(
        isEdit ? `${API_URL}/api/articles/${id}` : `${API_URL}/api/articles`,
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      )

      if (response.ok) {
        navigate('/admin/articles')
      } else {
        const data = await response.json()
        alert(data.message || '操作失败')
      }
    } catch (error) {
      console.error('保存失败:', error)
      alert('保存失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {isEdit ? '编辑文章' : '新建文章'}
          </h1>
          <p className="text-gray-600">{isEdit ? '修改文章内容' : '创建一篇新文章'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-[20px] p-6 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">文章标题 *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="输入标题"
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">文章摘要</label>
              <textarea
                value={formData.summary}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="简要描述文章内容"
                rows={3}
                maxLength={500}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">分类 *</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="公司新闻">公司新闻</option>
                  <option value="业务动态">业务动态</option>
                  <option value="荣誉资质">荣誉资质</option>
                  <option value="行业资讯">行业资讯</option>
                  <option value="政策法规">政策法规</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={e => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="用逗号分隔多个标签"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">封面图片 URL</label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">文章内容 *</label>
              <textarea
                required
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-mono"
                placeholder="输入文章内容..."
                rows={15}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="draft">草稿</option>
                  <option value="published">已发布</option>
                  <option value="archived">已归档</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isTop}
                    onChange={e => setFormData({ ...formData, isTop: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 relative"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">置顶文章</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/admin/articles')}>
              取消
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? '保存中...' : '保存'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default ArticleEditor
