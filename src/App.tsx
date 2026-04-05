import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import ComputeNodeMap from './components/ComputeNodeMap'
import Layout from './components/Layout'
import { API_URL } from './config/api'
import About from './pages/About'
import ArticleEditor from './pages/admin/ArticleEditor'
import Articles from './pages/admin/Articles'
import Banners from './pages/admin/Banners'
import BusinessPages from './pages/admin/BusinessPages'
import Comments from './pages/admin/Comments'
import Configs from './pages/admin/Configs'
import AdminDashboard from './pages/admin/Dashboard'
import Footer from './pages/admin/Footer'
import Images from './pages/admin/Images'
// Admin pages
import AdminLogin from './pages/admin/Login'
import Menus from './pages/admin/Menus'
import NewsListPage from './pages/admin/NewsListPage'
import Pages from './pages/admin/Pages'
import ShopOrders from './pages/admin/ShopOrders'
import ShopProductsAdmin from './pages/admin/ShopProducts'
import Users from './pages/admin/Users'
import Ecommerce from './pages/business/Ecommerce'
import EdgeComputing from './pages/business/EdgeComputing'
import PaymentFinance from './pages/business/PaymentFinance'
import ShopAbout from './pages/business/shop/ShopAbout'
import ShopLayoutHome from './pages/business/shop/ShopHome'
import ShopProductDetail from './pages/business/shop/ShopProductDetail'
import ShopProducts from './pages/business/shop/ShopProducts'
import Contact from './pages/Contact'
import Home from './pages/Home'
import HuskHome from './pages/husk/Home'
import KaisunHome from './pages/kaisun/Home'
import News from './pages/News'
import ShopAboutStandalone from './pages/shop/ShopAboutStandalone'
import ShopHomeStandalone from './pages/shop/ShopHomeStandalone'
import ShopProductDetailStandalone from './pages/shop/ShopProductDetailStandalone'
import ShopProductsStandalone from './pages/shop/ShopProductsStandalone'
import SomiboxHome from './pages/somibox/Home'

// 判断是否是后台管理页面
function isAdminRoute(pathname: string) {
  return pathname.startsWith('/admin')
}

// 前台页面路由组件（带 Layout）
function FrontendRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business/edge-computing" element={<EdgeComputing />} />
        <Route path="/business/payment-finance" element={<PaymentFinance />} />
        <Route path="/business/ecommerce" element={<Ecommerce />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/husk" element={<HuskHome />} />
        <Route path="/husk/compute-map" element={<ComputeNodeMap />} />
        <Route path="/kaisun" element={<KaisunHome />} />
        <Route path="/somibox" element={<SomiboxHome />} />
        {/* 业务板块展示页，点击跳转到独立商城页面 */}
        <Route path="/business/shop" element={<ShopLayoutHome />} />
        <Route path="/business/shop/products" element={<ShopProducts />} />
        <Route path="/business/shop/products/:id" element={<ShopProductDetail />} />
        <Route path="/business/shop/about" element={<ShopAbout />} />
      </Routes>
    </Layout>
  )
}

// 独立商城路由组件（不带 Layout）
function ShopRoutes() {
  return (
    <Routes>
      {/* 独立商城页面（不带集团官网导航） */}
      <Route path="/shop" element={<ShopHomeStandalone />} />
      <Route path="/shop/products" element={<ShopProductsStandalone />} />
      <Route path="/shop/products/:id" element={<ShopProductDetailStandalone />} />
      <Route path="/shop/about" element={<ShopAboutStandalone />} />
    </Routes>
  )
}

// 后台管理路由组件（不带 Layout）
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/pages" element={<Pages />} />
      <Route path="/admin/business-pages" element={<BusinessPages />} />
      <Route path="/admin/news-list" element={<NewsListPage />} />
      <Route path="/admin/footer" element={<Footer />} />
      <Route path="/admin/articles" element={<Articles />} />
      <Route path="/admin/articles/new" element={<ArticleEditor />} />
      <Route path="/admin/articles/edit/:id" element={<ArticleEditor />} />
      <Route path="/admin/images" element={<Images />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/comments" element={<Comments />} />
      <Route path="/admin/menus" element={<Menus />} />
      <Route path="/admin/banners" element={<Banners />} />
      <Route path="/admin/configs" element={<Configs />} />
      <Route path="/admin/shop-products" element={<ShopProductsAdmin />} />
      <Route path="/admin/shop-orders" element={<ShopOrders />} />
    </Routes>
  )
}

// 带条件 Layout 的路由组件
function AppRoutes() {
  const location = useLocation()
  const isAdmin = isAdminRoute(location.pathname)
  const isShop = location.pathname.startsWith('/shop')

  // 获取站点配置并更新 favicon 和 title
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${API_URL}/api/config`)
        if (response.ok) {
          const data = await response.json()
          const configMap = data.reduce(
            (acc: Record<string, string>, item: { key: string; value: string }) => {
              acc[item.key] = item.value
              return acc
            },
            {},
          )

          // 更新 favicon
          if (configMap.favicon) {
            const faviconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement
            if (faviconLink) {
              faviconLink.href = `${API_URL}${configMap.favicon}`
            }
          }

          // 更新 title
          if (configMap.siteName) {
            document.title = `${configMap.siteName} | 边缘算力 · 支付金融 · 电商业务`
          }
        }
      } catch (error) {
        console.error('获取站点配置失败:', error)
      }
    }
    fetchConfig()

    // 监听配置更新事件
    const handleConfigUpdate = () => {
      fetchConfig()
    }
    window.addEventListener('siteConfigUpdated', handleConfigUpdate)

    // 每 30 秒自动刷新一次
    const interval = setInterval(fetchConfig, 30000)

    return () => {
      window.removeEventListener('siteConfigUpdated', handleConfigUpdate)
      clearInterval(interval)
    }
  }, [])

  if (isAdmin) {
    return <AdminRoutes />
  }
  if (isShop) {
    return <ShopRoutes />
  }
  return <FrontendRoutes />
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
