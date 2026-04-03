import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import Button from '../../../components/Button'
import ShopLayout from '../../../components/shop/ShopLayout'

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
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1607082349566-1873422c8082?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400&h=300&fit=crop',
    description: '大额优惠，购物更划算',
    stock: 200,
    category: '永辉卡',
  },
]

const features = [
  {
    title: '正品保障',
    description: '所有卡券均为官方正品，支持验证',
    icon: '✓',
  },
  {
    title: '即时发货',
    description: '支付成功后自动发货，秒到账',
    icon: '⚡',
  },
  {
    title: '售后无忧',
    description: '7 天无理由退换，客服在线支持',
    icon: '❤',
  },
  {
    title: '安全支付',
    description: '多重加密，保障资金安全',
    icon: '🔒',
  },
]

const ShopHome = () => {
  return (
    <ShopLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 mb-6">果壳市集</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              精选优质礼品卡，生活购物更优惠
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/shop/products">
                <Button variant="primary" className="px-8 py-4 text-base">
                  立即选购
                </Button>
              </Link>
              <Link to="/shop/about">
                <Button variant="secondary" className="px-8 py-4 text-base">
                  了解更多
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 53.3C480 67 600 73 720 73.3C840 73 960 67 1080 53.3C1200 40 1320 20 1380 10L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">热门卡券</h2>
            <p className="text-xl text-gray-600">精选各大商超礼品卡，优惠多多</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                onClick={() => (window.location.href = `/shop/products/${product.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    省 ¥{product.originalPrice - product.price}
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
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-red-600">¥{product.price}</span>
                      <span className="text-gray-400 line-through text-sm">
                        ¥{product.originalPrice}
                      </span>
                    </div>
                    <Button variant="primary" className="px-6 py-2 rounded-full">
                      购买
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop/products">
              <Button variant="secondary" className="px-8 py-4 text-base">
                查看全部商品
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-semibold mb-6">企业采购更优惠</h2>
            <p className="text-xl text-gray-300 mb-8">大宗采购享受专属折扣，联系客服获取报价</p>
            <Button
              variant="secondary"
              className="px-8 py-4 text-base bg-white text-gray-900 hover:bg-gray-100"
            >
              联系客服
            </Button>
          </motion.div>
        </div>
      </section>
    </ShopLayout>
  )
}

export default ShopHome
