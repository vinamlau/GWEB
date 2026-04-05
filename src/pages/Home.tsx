import { motion } from 'framer-motion'
import { ChevronRight, CreditCard, Globe, Server, ShoppingCart, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../components/Button'
import Container from '../components/Container'
import Section from '../components/Section'
import { API_URL } from '../config/api'

const services = [
  {
    title: '边缘算力',
    description: '全球分布式 CDN 网络，低延迟、高可用的边缘计算服务',
    icon: <Server className="h-8 w-8" />,
    link: '/business/edge-computing',
    features: ['2800+ 全球节点', '<50ms 响应时间', '99.99% 可用性'],
  },
  {
    title: '支付金融',
    description: '集成主流支付方式，安全可靠的金融级支付解决方案',
    icon: <CreditCard className="h-8 w-8" />,
    link: '/business/payment-finance',
    features: ['全渠道支付', '金融级安全', '实时清算'],
  },
  {
    title: '电商业务',
    description: '公域与私域电商一体化运营，全方位电商服务',
    icon: <ShoppingCart className="h-8 w-8" />,
    link: '/business/ecommerce',
    features: ['平台入驻', '私域运营', '供应链管理'],
  },
  {
    title: '果壳市集',
    description: '精选优质礼品卡，便捷实惠的线上购物平台',
    icon: <ShoppingCart className="h-8 w-8" />,
    link: '/business/shop',
    features: ['朴朴卡券', '永辉卡券', '沃尔玛卡券'],
  },
]

const stats = [
  { value: '10 万+', label: '服务企业客户', growth: '+25%' },
  { value: '500 亿+', label: '年交易规模', growth: '+40%' },
  { value: '2800+', label: '全球服务节点', growth: '+15%' },
  { value: '99.99%', label: '服务可用性', growth: '持平' },
]

interface HomePage {
  id?: number
  title?: string
  slug?: string
  content?: string
}

export default function Home() {
  const [homePage, setHomePage] = useState<HomePage | null>(null)

  useEffect(() => {
    const fetchHomePage = async () => {
      const response = await fetch(`${API_URL}/api/pages/home`)
      if (response.ok) {
        const data = await response.json()
        setHomePage(data)
      }
    }
    fetchHomePage()

    const handlePageUpdate = () => {
      fetchHomePage()
    }
    window.addEventListener('pageUpdated', handlePageUpdate)
    return () => {
      window.removeEventListener('pageUpdated', handlePageUpdate)
    }
  }, [])

  // 如果后台编辑了首页内容，则显示后台内容；否则显示默认内容
  const showCustomContent = homePage && homePage.content && homePage.content.length > 0

  // 如果后台有自定义内容，显示自定义内容
  if (showCustomContent) {
    return (
      <div
        className="home-page-container"
        dangerouslySetInnerHTML={{ __html: homePage.content || '' }}
      />
    )
  }

  // 否则显示默认设计内容
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section - Apple Style */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-32 pb-24 md:pt-40 md:pb-32">
        <Container>
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="heading-hero mb-8">引领数字未来</h1>

              <p className="text-hero mb-12 max-w-3xl mx-auto">
                专注于边缘算力、支付金融、电商业务， 为您提供全方位的技术解决方案
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/business/edge-computing">
                  <Button size="lg" className="px-10">
                    探索业务
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="secondary" size="lg" className="px-10">
                    联系我们
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section - Apple Style */}
      <Section bg="gray">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-3">
                  {stat.value}
                </div>
                <div className="text-base md:text-lg text-gray-500 mb-2">{stat.label}</div>
                <div className="text-sm text-green-600 font-medium">{stat.growth}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services Section - Apple Style */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">核心业务</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              我们专注于四大核心业务领域，为客户提供全方位的技术解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="group card card-hover cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={service.link}>
                  <div className="w-20 h-20 bg-gray-50 rounded-[24px] flex items-center justify-center text-gray-900 mb-8 group-hover:bg-gray-900 group-hover:text-white transition-all duration-500 ease-out">
                    {service.icon}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>

                  <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-base text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="btn-link group-hover:translate-x-2 transition-transform duration-500 ease-out">
                    了解更多
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Features Section - Asymmetric Layout */}
      <Section bg="subtle">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-2 mb-6">为什么选择我们</h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                凭借多年的技术积累和行业经验，我们为客户提供最优质的服务和解决方案。
                持续创新，追求卓越，是我们不变的承诺。
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <Zap className="h-6 w-6" />,
                    title: '高效稳定',
                    description: '99.99% 服务可用性，毫秒级响应速度',
                  },
                  {
                    icon: <Globe className="h-6 w-6" />,
                    title: '全球覆盖',
                    description: '服务网络遍布全球 200+ 国家和地区',
                  },
                  {
                    icon: <Server className="h-6 w-6" />,
                    title: '技术领先',
                    description: '自主研发核心算法，保持行业领先地位',
                  },
                ].map((feature, idx) => (
                  <motion.div
                    key={feature.title}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-900 shadow-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-500">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl p-8 md:p-12">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {[
                    { value: '2800+', label: '全球节点' },
                    { value: '1000 亿+', label: '日请求量' },
                    { value: '5 万+', label: '企业客户' },
                    { value: '<50ms', label: '平均响应' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 flex flex-col justify-center"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                        {item.value}
                      </div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* CTA Section - Apple Style */}
      <Section bg="gray">
        <Container>
          <div className="bg-gray-900 rounded-[32px] p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
              准备好开始了吗？
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              立即联系我们，获取专属的技术解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="px-10">
                  免费咨询
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-10 border-white text-white hover:bg-white hover:text-gray-900"
                >
                  了解更多
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
