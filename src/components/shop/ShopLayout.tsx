import { Link } from 'react-router-dom'

import Button from '../../components/Button'

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  const cartCount = 0

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/business/shop" className="text-2xl font-semibold text-gray-900">
                果壳市集
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  to="/business/shop"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  首页
                </Link>
                <Link
                  to="/business/shop/products"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  全部商品
                </Link>
                <Link
                  to="/business/shop/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  关于我们
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/business/shop/cart"
                className="relative text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to="/">
                <Button variant="secondary" className="px-4 py-2 text-sm">
                  返回集团官网
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">关于果壳市集</h3>
              <p className="text-gray-600 text-sm">
                精选优质礼品卡，为您提供便捷、优惠的购物体验。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">购物指南</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>购买流程</li>
                <li>配送说明</li>
                <li>常见问题</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">客户服务</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>售后政策</li>
                <li>退款说明</li>
                <li>联系我们</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">联系我们</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>客服邮箱：shop@gcore.xin</li>
                <li>服务热线：400-888-8888</li>
                <li>服务时间：9:00-21:00</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            © 2024 果壳市集。All rights reserved. 福州果壳网络科技有限公司
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ShopLayout
