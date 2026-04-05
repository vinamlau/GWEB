import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import AdminLayout from '../../components/admin/AdminLayout'
import { API_URL } from '../../config/api'

interface Comment {
  id: number
  author: string
  email: string
  content: string
  articleId?: number
  status: string
  createdAt: string
}

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    const token = localStorage.getItem('token')

    try {
      const res = await fetch(`${API_URL}/api/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setComments(data.comments || data || [])
    } catch (error) {
      console.error('获取评论列表失败:', error)
      setComments([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: number, status: string) => {
    const token = localStorage.getItem('token')

    try {
      const res = await fetch(`${API_URL}/api/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const errorData = await res.json()
        alert(errorData.error || '更新失败')
        return
      }
      fetchComments()
    } catch (error) {
      console.error('更新评论状态失败:', error)
      alert('更新失败，请重试')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除此评论吗？')) {
      return
    }

    const token = localStorage.getItem('token')

    try {
      const res = await fetch(`${API_URL}/api/comments/${id}`, {
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
      fetchComments()
    } catch (error) {
      console.error('删除评论失败:', error)
      alert('删除失败，请重试')
    }
  }

  const filteredComments = filter === 'all' ? comments : comments.filter(c => c.status === filter)

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">评论管理</h1>
              <p className="text-gray-600">管理用户评论和反馈</p>
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl bg-white"
              >
                <option value="all">全部评论</option>
                <option value="pending">待审核</option>
                <option value="approved">已通过</option>
                <option value="rejected">已拒绝</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {loading ? (
            <div className="text-center py-12 text-gray-500">加载中...</div>
          ) : filteredComments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">暂无评论数据</div>
          ) : (
            filteredComments.map(comment => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      {comment.author[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900">{comment.author}</span>
                        <span className="text-sm text-gray-500">{comment.email}</span>
                      </div>
                      <p className="text-gray-600">{comment.content}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(comment.createdAt).toLocaleString('zh-CN')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={comment.status}
                      onChange={e => handleStatusChange(comment.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        comment.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : comment.status === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      <option value="pending">待审核</option>
                      <option value="approved">已通过</option>
                      <option value="rejected">已拒绝</option>
                    </select>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </AdminLayout>
  )
}

export default Comments
