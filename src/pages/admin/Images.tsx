import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'

interface Image {
  _id: string
  name: string
  originalName: string
  url: string
  size: number
  mimeType: string
  category: string
  width: number
  height: number
  createdAt: string
}

const Images = () => {
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [uploading, setUploading] = useState(false)
  const [filter, setFilter] = useState({ category: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
  const token = localStorage.getItem('token')

  const fetchImages = async () => {
    try {
      const params = new URLSearchParams({ page: page.toString(), ...filter })
      const response = await fetch(`${API_URL}/api/images?${params}`)
      const data = await response.json()
      setImages(data.images)
      setTotalPages(data.pages)
    } catch (error) {
      console.error('获取图片失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('image', file)
    formData.append('category', filter.category || 'other')

    try {
      const response = await fetch(`${API_URL}/api/images/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (response.ok) {
        fetchImages()
      } else {
        const data = await response.json()
        alert(data.message || '上传失败')
      }
    } catch (error) {
      console.error('上传失败:', error)
      alert('上传失败，请重试')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这张图片吗？')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/images/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchImages()
      }
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) {
      return '0 B'
    }
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">图片管理</h1>
            <p className="text-gray-600">管理网站图片资源</p>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            <Button
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? '上传中...' : '+ 上传图片'}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-[20px] p-4 mb-6">
          <select
            value={filter.category}
            onChange={e => setFilter({ category: e.target.value })}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">全部分类</option>
            <option value="logo">Logo</option>
            <option value="banner">Banner</option>
            <option value="product">产品</option>
            <option value="news">新闻</option>
            <option value="team">团队</option>
            <option value="other">其他</option>
          </select>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-[16px] animate-pulse"></div>
            ))
          ) : images.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              暂无图片，点击上方按钮上传
            </div>
          ) : (
            images.map(image => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[16px] shadow-sm overflow-hidden group"
              >
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <img
                    src={`${API_URL}${image.url}`}
                    alt={image.originalName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                    >
                      删除
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate mb-1">
                    {image.originalName}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatFileSize(image.size)}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full">{image.category}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2"
            >
              上一页
            </Button>
            <span className="px-4 py-2 text-gray-600">
              第 {page} / {totalPages} 页
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2"
            >
              下一页
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default Images
