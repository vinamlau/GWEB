import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../../../components/Button'

interface ProductCard {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  image: string
  description: string
  stock: number
  category: string
}

const products: ProductCard[] = [
  {
    id: 1,
    name: '朴朴超市礼品卡 100 元',
    brand: '朴朴',
    price: 95,
    originalPrice: 100,
    image:
      'https://img.alicdn.com/imgextra/i2/O1CN01Z7zK8R1MbFQvJKdWZ_!!6000000001455-0-tps-800-600.jpg',
    description: '全品类通用，新鲜到家，30 分钟送达',
    stock: 500,
    category: '朴朴卡',
  },
  {
    id: 2,
    name: '朴朴超市礼品卡 200 元',
    brand: '朴朴',
    price: 190,
    originalPrice: 200,
    image:
      'https://img.alicdn.com/imgextra/i3/O1CN01hKZ9nN1zKxvJKdWZ_!!6000000006693-0-tps-800-600.jpg',
    description: '家庭优选，实惠多多',
    stock: 300,
    category: '朴朴卡',
  },
  {
    id: 3,
    name: '永辉超市购物卡 100 元',
    brand: '永辉',
    price: 97,
    originalPrice: 100,
    image:
      'https://img.alicdn.com/imgextra/i4/O1CN01Y8zK8R1MbFQvJKdWZ_!!6000000001455-0-tps-800-600.jpg',
    description: '生鲜优选，品质生活',
    stock: 400,
    category: '永辉卡',
  },
  {
    id: 4,
    name: '沃尔玛礼品卡 500 元',
    brand: '沃尔玛',
    price: 485,
    originalPrice: 500,
    image:
      'https://img.alicdn.com/imgextra/i1/O1CN01X9zK8R1MbFQvJKdWZ_!!6000000001455-0-tps-800-600.jpg',
    description: '超值大额，企业采购首选',
    stock: 150,
    category: '沃尔玛卡',
  },
  {
    id: 5,
    name: '世纪联华购物卡 100 元',
    brand: '世纪联华',
    price: 96,
    originalPrice: 100,
    image:
      'https://img.alicdn.com/imgextra/i2/O1CN01W7zK8R1MbFQvJKdWZ_!!6000000001455-0-tps-800-600.jpg',
    description: '便捷购物，优惠多多',
    stock: 450,
    category: '世纪联华卡',
  },
  {
    id: 6,
    name: '永辉超市购物卡 300 元',
    brand: '永辉',
    price: 288,
    originalPrice: 300,
    image:
      'https://img.alicdn.com/imgextra/i3/O1CN01V8zK8R1MbFQvJKdWZ_!!6000000001455-0-tps-800-600.jpg',
    description: '大额优惠，购物更划算',
    stock: 200,
    category: '永辉卡',
  },
]

const categories = ['全部', '朴朴卡', '永辉卡', '沃尔玛卡', '世纪联华卡']

const ShopProductsStandalone = () => {
  const navigate = useNavigate()

  const handleBuyNow = (productId: number) => {
    console.log('点击购买，商品 ID:', productId)
    navigate(`/shop/products/${productId}`)
  }

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
      <section className="bg-gradient-to-br from-blue-50 via-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">全部商品</h1>
            <p className="text-xl text-gray-600">精选各大商超礼品卡，优惠多多</p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div
                  className={`relative h-64 flex items-center justify-center ${
                    product.brand === '朴朴'
                      ? 'bg-gradient-to-br from-green-400 to-green-600'
                      : product.brand === '永辉'
                        ? 'bg-gradient-to-br from-red-400 to-red-600'
                        : product.brand === '沃尔玛'
                          ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                          : 'bg-gradient-to-br from-orange-400 to-orange-600'
                  }`}
                >
                  <div className="text-center text-white p-8">
                    <div className="text-6xl font-bold mb-4">{product.brand}</div>
                    <div className="text-2xl font-semibold opacity-90">礼品卡</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                      {product.brand}
                    </span>
                    <span className="text-green-600 text-xs font-medium">
                      库存：{product.stock}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ¥{product.originalPrice}
                    </span>
                    <Button
                      variant="primary"
                      className="px-6 py-2 rounded-full"
                      onClick={e => {
                        e.stopPropagation()
                        handleBuyNow(product.id)
                      }}
                    >
                      购买
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">企业采购更优惠</h2>
            <p className="text-xl text-gray-600 mb-8">大宗采购享受专属折扣，联系客服获取报价</p>
            <Link to="/contact">
              <Button variant="primary" className="px-8 py-4 text-base">
                联系客服
              </Button>
            </Link>
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

export default ShopProductsStandalone
