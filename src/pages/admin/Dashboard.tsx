import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import AdminLayout from '../../components/admin/AdminLayout'

interface Stats {
  articles: number
  images: number
  configs: number
  users: number
  comments: number
  banners: number
  menus: number
}

interface Activity {
  id: number
  action: string
  user: string
  time: string
  type: 'create' | 'update' | 'delete'
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    articles: 0,
    images: 0,
    configs: 0,
    users: 0,
    comments: 0,
    banners: 0,
    menus: 0,
  })
  const [loading, setLoading] = useState(true)
  const [activityData, setActivityData] = useState<Activity[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token')
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        }

        const [articlesRes, imagesRes, configsRes, usersRes, commentsRes, bannersRes, menusRes] =
          await Promise.all([
            fetch(`${API_URL}/api/articles?page=1`, { headers }),
            fetch(`${API_URL}/api/images?page=1`, { headers }),
            fetch(`${API_URL}/api/config`, { headers }),
            fetch(`${API_URL}/api/users`, { headers }),
            fetch(`${API_URL}/api/comments`, { headers }),
            fetch(`${API_URL}/api/banners`, { headers }),
            fetch(`${API_URL}/api/menus`, { headers }),
          ])

        const articlesData = await articlesRes.json()
        const imagesData = await imagesRes.json()
        const configsData = await configsRes.json()
        const usersData = await usersRes.json()
        const commentsData = await commentsRes.json()
        const bannersData = await bannersRes.json()
        const menusData = await menusRes.json()

        setStats({
          articles: articlesData.total || 0,
          images: imagesData.total || 0,
          configs: configsData.length || 0,
          users: usersData.total || 0,
          comments: commentsData.total || 0,
          banners: bannersData.length || 0,
          menus: menusData.length || 0,
        })

        const recentActivity: Activity[] = [
          {
            id: 1,
            action: '创建新文章',
            user: '管理员',
            time: '5 分钟前',
            type: 'create',
          },
          {
            id: 2,
            action: '更新图片资源',
            user: '编辑',
            time: '15 分钟前',
            type: 'update',
          },
          {
            id: 3,
            action: '删除过时配置',
            user: '管理员',
            time: '1 小时前',
            type: 'delete',
          },
          {
            id: 4,
            action: '添加新用户',
            user: '管理员',
            time: '2 小时前',
            type: 'create',
          },
          {
            id: 5,
            action: '更新菜单结构',
            user: '编辑',
            time: '3 小时前',
            type: 'update',
          },
        ]
        setActivityData(recentActivity)
      } catch (error) {
        console.error('获取统计数据失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: '文章总数',
      value: stats.articles,
      icon: '📝',
      color: 'from-blue-500 to-blue-600',
      link: '/admin/articles',
      change: '+12%',
    },
    {
      title: '图片总数',
      value: stats.images,
      icon: '🖼️',
      color: 'from-green-500 to-green-600',
      link: '/admin/images',
      change: '+8%',
    },
    {
      title: '用户数量',
      value: stats.users,
      icon: '👥',
      color: 'from-purple-500 to-purple-600',
      link: '/admin/users',
      change: '+24%',
    },
    {
      title: '评论数量',
      value: stats.comments,
      icon: '💬',
      color: 'from-orange-500 to-orange-600',
      link: '/admin/comments',
      change: '+18%',
    },
    {
      title: '广告位',
      value: stats.banners,
      icon: '📢',
      color: 'from-pink-500 to-pink-600',
      link: '/admin/banners',
      change: '+5%',
    },
    {
      title: '菜单项',
      value: stats.menus,
      icon: '📋',
      color: 'from-cyan-500 to-cyan-600',
      link: '/admin/menus',
      change: '+3%',
    },
  ]

  const performanceData = [
    { name: '周一', views: 120, visits: 80 },
    { name: '周二', views: 132, visits: 91 },
    { name: '周三', views: 101, visits: 73 },
    { name: '周四', views: 134, visits: 85 },
    { name: '周五', views: 90, visits: 64 },
    { name: '周六', views: 230, visits: 150 },
    { name: '周日', views: 210, visits: 140 },
  ]

  const categoryData = [
    { name: '边缘计算', value: 35, color: '#3B82F6' },
    { name: '支付金融', value: 30, color: '#10B981' },
    { name: '电商业务', value: 25, color: '#F59E0B' },
    { name: '其他', value: 10, color: '#8B5CF6' },
  ]

  const projectData = [
    { name: '官网内容', progress: 85, color: 'bg-blue-500' },
    { name: '产品文档', progress: 65, color: 'bg-green-500' },
    { name: '营销素材', progress: 45, color: 'bg-orange-500' },
  ]

  return (
    <AdminLayout>
      <div className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Workforce Dashboard
          </h1>
          <p className="text-sm md:text-base text-gray-600">欢迎回来，管理员</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={card.link}>
                <div className="bg-white rounded-[16px] md:rounded-[20px] p-3 md:p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <div
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-lg md:text-xl`}
                    >
                      {card.icon}
                    </div>
                    <span className="text-xs font-medium text-green-600">{card.change}</span>
                  </div>
                  {loading ? (
                    <div className="h-6 md:h-7 bg-gray-200 rounded-lg animate-pulse"></div>
                  ) : (
                    <>
                      <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
                        {card.value}
                      </p>
                      <p className="text-xs text-gray-600">{card.title}</p>
                    </>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-base md:text-xl font-semibold text-gray-900">Team Performance</h2>
              <select className="text-xs md:text-sm border border-gray-300 rounded-lg px-2 md:px-3 py-1 md:py-2 bg-white">
                <option>最近 7 天</option>
                <option>最近 30 天</option>
                <option>最近 90 天</option>
              </select>
            </div>
            <div className="h-48 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorVisit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorView)"
                  />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="#10B981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorVisit)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-base md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
              Content Categories
            </h2>
            <div className="h-40 md:h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-base md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
              Project Overview
            </h2>
            <div className="space-y-4 md:space-y-6">
              {projectData.map((project, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm font-medium text-gray-700">
                      {project.name}
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-gray-900">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
                    <div
                      className={`${project.color} h-2.5 rounded-full transition-all duration-500`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-base md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
              Recent Activity
            </h2>
            <div className="space-y-3 md:space-y-4">
              {activityData.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-2 md:space-x-3 pb-3 md:pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'create'
                        ? 'bg-green-100 text-green-600'
                        : activity.type === 'update'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {activity.type === 'create' ? '+' : activity.type === 'update' ? '✏️' : '🗑️'}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs md:text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.user} · {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-base md:text-xl font-semibold text-gray-900">Quick Actions</h2>
            <Link
              to="/admin/articles/new"
              className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-600 text-white rounded-xl text-xs md:text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              创建文章
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="flex items-start p-3 md:p-4 bg-blue-50 rounded-xl">
              <span className="text-xl md:text-2xl mr-2 md:mr-3"></span>
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-900 mb-1">管理文章</p>
                <p className="text-xs text-gray-600 mb-2">发布公司新闻、业务动态</p>
                <Link
                  to="/admin/articles"
                  className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium inline-block"
                >
                  前往管理 →
                </Link>
              </div>
            </div>
            <div className="flex items-start p-3 md:p-4 bg-green-50 rounded-xl">
              <span className="text-xl md:text-2xl mr-2 md:mr-3">️</span>
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-900 mb-1">图片资源</p>
                <p className="text-xs text-gray-600 mb-2">管理 Logo、产品图片</p>
                <Link
                  to="/admin/images"
                  className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium inline-block"
                >
                  上传图片 →
                </Link>
              </div>
            </div>
            <div className="flex items-start p-3 md:p-4 bg-purple-50 rounded-xl">
              <span className="text-xl md:text-2xl mr-2 md:mr-3">️</span>
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-900 mb-1">站点配置</p>
                <p className="text-xs text-gray-600 mb-2">设置网站名称、联系方式</p>
                <Link
                  to="/admin/configs"
                  className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium inline-block"
                >
                  管理配置 →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard
