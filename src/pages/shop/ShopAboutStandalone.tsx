import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'

const ShopAboutStandalone = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/shop" className="text-2xl font-semibold text-gray-900">
                果壳市集
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/shop" className="text-gray-600 hover:text-gray-900 transition-colors">
                  首页
                </Link>
                <Link
                  to="/shop/products"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  全部商品
                </Link>
                <Link
                  to="/shop/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  关于我们
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/shop/cart"
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

      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6">关于果壳市集</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              福州果壳网络科技有限公司旗下精选礼品卡购物平台
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">我们的使命</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                果壳市集致力于为用户提供优质、便捷、实惠的礼品卡购物体验。
                我们与各大商超品牌建立直接合作，确保所有卡券均为官方正品，
                同时为消费者争取最大力度的优惠。
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                无论是个人消费还是企业采购，我们都能提供合适的产品和优质的服务。
                即时发货、安全支付、售后无忧，让您的每一次购物都轻松愉快。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl p-8"
            >
              <div className="grid grid-cols-2 gap-4 h-full">
                {[
                  { value: '100%', label: '正品保障' },
                  { value: '<1 秒', label: '即时发货' },
                  { value: '7 天', label: '无理由退换' },
                  { value: '24h', label: '客服在线' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 flex flex-col justify-center items-center text-center"
                  >
                    <div className="text-3xl font-bold text-gray-900 mb-2">{item.value}</div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">为什么选择我们</h2>
            <p className="text-xl text-gray-600">专业、可靠、实惠的购物体验</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✓',
                title: '正品保障',
                description: '所有卡券均为官方正品，支持验证，假一赔十',
              },
              {
                icon: '⚡',
                title: '即时发货',
                description: '支付成功后自动发货，秒到账，无需等待',
              },
              {
                icon: '❤',
                title: '售后无忧',
                description: '7 天无理由退换，专业客服在线支持',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-[24px] p-8 text-center shadow-lg"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">联系我们</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-2">📧 客服邮箱</div>
                <div className="text-gray-600">shop@gcore.xin</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-2">📞 服务热线</div>
                <div className="text-gray-600">400-888-8888</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-2">🕐 服务时间</div>
                <div className="text-gray-600">9:00-21:00</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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

export default ShopAboutStandalone
