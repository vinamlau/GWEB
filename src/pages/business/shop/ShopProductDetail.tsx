import { motion } from 'framer-motion'
import { Link, useNavigate, useParams } from 'react-router-dom'

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

const ShopProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <ShopLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">商品不存在</h1>
          <Button onClick={() => navigate('/business/shop/products')}>返回商品列表</Button>
        </div>
      </ShopLayout>
    )
  }

  const handleBuyNow = () => {
    alert(
      `您选择了：${product.name}\n价格：¥${product.originalPrice}\n\n请联系客服完成购买：shop@gcore.xin`,
    )
  }

  return (
    <ShopLayout>
      {/* Product Detail */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`relative h-96 flex items-center justify-center rounded-[24px] ${
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
                <div className="text-7xl font-bold mb-4">{product.brand}</div>
                <div className="text-3xl font-semibold opacity-90">礼品卡</div>
                <div className="text-2xl mt-4 opacity-80">{product.name}</div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                    {product.brand}
                  </span>
                  <span className="text-green-600 text-sm font-medium">库存：{product.stock}</span>
                </div>

                <h1 className="text-4xl font-semibold text-gray-900 mb-4">{product.name}</h1>

                <p className="text-lg text-gray-600 mb-6">{product.description}</p>

                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-5xl font-bold text-gray-900">¥{product.originalPrice}</span>
                  <span className="text-xl text-gray-500">面值：¥{product.originalPrice}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">正品保障</div>
                    <div className="text-sm text-gray-500">官方正品，支持验证</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">⚡</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">即时发货</div>
                    <div className="text-sm text-gray-500">支付后自动发货，秒到账</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 text-sm">❤</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">售后无忧</div>
                    <div className="text-sm text-gray-500">7 天无理由退换</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="primary"
                  className="px-8 py-4 text-lg flex-1"
                  onClick={handleBuyNow}
                >
                  立即购买
                </Button>
                <Link to="/business/shop/products">
                  <Button variant="secondary" className="px-8 py-4 text-lg">
                    返回列表
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">商品详情</h2>
          <div className="bg-white rounded-[24px] p-8">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h3>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">1.</span>
                  <span>购买后您将收到电子卡密，请妥善保管</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">2.</span>
                  <span>卡密可在对应品牌官方渠道使用</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">3.</span>
                  <span>本卡不记名、不挂失、不兑现，请合理使用</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">4.</span>
                  <span>如有任何问题，请联系客服：shop@gcore.xin</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">温馨提示</h3>
              <p className="text-gray-600">
                本商品为虚拟商品，一旦发货不支持七天无理由退换。请在购买前确认需求，
                如有任何疑问请咨询客服。
              </p>
            </div>
          </div>
        </div>
      </section>
    </ShopLayout>
  )
}

export default ShopProductDetail
