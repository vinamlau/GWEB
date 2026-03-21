import { CreditCard, Globe, Server, Shield, ShoppingCart, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import Button from '../components/Button'
import Container from '../components/Container'
import FeatureItem from '../components/FeatureItem'
import Hero from '../components/Hero'
import Section from '../components/Section'
import ServiceCard from '../components/ServiceCard'
import StatCard from '../components/StatCard'

const services = [
  {
    title: '边缘算力',
    description: '全球分布式 CDN 网络，低延迟、高可用的边缘计算服务，为您的业务加速。',
    icon: <Server className="h-7 w-7" />,
    link: '/business/edge-computing',
    color: 'primary' as const,
  },
  {
    title: '支付金融',
    description: '集成支付宝、微信、银联等主流支付方式，安全可靠的金融级支付解决方案。',
    icon: <CreditCard className="h-7 w-7" />,
    link: '/business/payment-finance',
    color: 'finance' as const,
  },
  {
    title: '电商业务',
    description: '公域与私域电商一体化运营，从平台入驻到品牌官网，全方位电商服务。',
    icon: <ShoppingCart className="h-7 w-7" />,
    link: '/business/ecommerce',
    color: 'ecommerce' as const,
  },
]

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: '高效稳定',
    description: '99.99% 服务可用性，毫秒级响应速度',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: '安全可靠',
    description: '金融级安全防护，通过多项国际认证',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: '全球覆盖',
    description: '服务网络遍布全球 200+ 国家和地区',
  },
]

const stats = [
  { value: '500+', label: '全球节点' },
  { value: '10 万+', label: '服务企业' },
  { value: '99.99%', label: '服务可用性' },
  { value: '24/7', label: '技术支持' },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Section bg="light">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">核心业务</h2>
            <p className="section-subtitle mx-auto">
              我们专注于三大核心业务领域，为客户提供全方位的技术解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">为什么选择我们</h2>
              <p className="text-lg text-gray-600 mb-8">
                凭借多年的技术积累和行业经验，我们为客户提供最优质的服务和解决方案。
              </p>

              <div className="space-y-6">
                {features.map(feature => (
                  <FeatureItem key={feature.title} {...feature} />
                ))}
              </div>

              <div className="mt-8">
                <Link to="/about">
                  <Button size="lg">了解更多</Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <Globe className="h-32 w-32 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">全球服务网络</h3>
                  <p className="text-gray-600">覆盖全球的业务网络，随时随地为您服务</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section bg="gray">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">数据说话</h2>
            <p className="section-subtitle mx-auto">我们的成绩，您的信心保障</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section bg="white">
        <Container>
          <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">准备好开始了吗？</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              立即联系我们，获取专属的技术解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-primary-50 border-none"
                >
                  免费咨询
                </Button>
              </Link>
              <Link to="/business/edge-computing">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white/10"
                >
                  查看方案
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
