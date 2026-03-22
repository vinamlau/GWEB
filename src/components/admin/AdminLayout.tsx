import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface AdminLayoutProps {
  children: React.ReactNode
}

interface User {
  username: string
  role: string
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      navigate('/admin/login')
      return
    }

    setUser(JSON.parse(userData))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/admin/login')
  }

  const menuItems = [
    { path: '/admin/dashboard', label: '仪表盘', icon: '📊' },
    { path: '/admin/articles', label: '文章管理', icon: '📝' },
    { path: '/admin/images', label: '图片管理', icon: '🖼️' },
    { path: '/admin/users', label: '用户管理', icon: '👥' },
    { path: '/admin/comments', label: '评论管理', icon: '💬' },
    { path: '/admin/menus', label: '菜单管理', icon: '📋' },
    { path: '/admin/banners', label: '广告管理', icon: '📢' },
    { path: '/admin/configs', label: '站点配置', icon: '⚙️' },
  ]

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - 桌面端固定显示 */}
      <aside className="hidden lg:flex w-64 bg-white shadow-xl flex-col flex-shrink-0 h-screen fixed left-0 top-0 overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">CMS 管理</h1>
          </div>

          <nav className="flex-1 p-3 md:p-4 space-y-1 overflow-y-auto">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl transition-all ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg md:text-xl mr-2 md:mr-3">{item.icon}</span>
                <span className="text-sm md:text-base whitespace-nowrap">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-3 md:p-4 border-t border-gray-100">
            <div className="mb-2 md:mb-3 px-2 md:px-4 py-2">
              <p className="text-xs md:text-sm font-medium text-gray-900">{user.username}</p>
              <p className="text-xs text-gray-500">{user.role === 'admin' ? '管理员' : '编辑'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-3 md:px-4 py-2 text-left text-xs md:text-sm text-red-600 hover:bg-red-50 rounded-lg md:rounded-xl transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar - 仅在移动端显示 */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed lg:hidden inset-y-0 left-0 z-50 w-64 bg-white shadow-xl"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">CMS 管理</h1>
          </div>

          <nav className="flex-1 p-3 md:p-4 space-y-1 overflow-y-auto">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl transition-all ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-lg md:text-xl mr-2 md:mr-3">{item.icon}</span>
                <span className="text-sm md:text-base whitespace-nowrap">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-3 md:p-4 border-t border-gray-100">
            <div className="mb-2 md:mb-3 px-2 md:px-4 py-2">
              <p className="text-xs md:text-sm font-medium text-gray-900">{user.username}</p>
              <p className="text-xs text-gray-500">{user.role === 'admin' ? '管理员' : '编辑'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-3 md:px-4 py-2 text-left text-xs md:text-sm text-red-600 hover:bg-red-50 rounded-lg md:rounded-xl transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen ml-0 lg:ml-64 overflow-hidden">
        {/* Top Bar - 仅移动端显示汉堡菜单 */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="px-4 py-4 flex items-center justify-between lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex-1"></div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
