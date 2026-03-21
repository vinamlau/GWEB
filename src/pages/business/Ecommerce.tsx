import { ShoppingCart, Store, Truck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Container from '../../components/Container'
import Section from '../../components/Section'

const publicEcommerce = [
  {
    icon: <Store className="h-6 w-6" />,
    title: '平台入驻',
    description: '天猫、京东等主流电商平台入驻服务，快速开店。',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: '流量运营',
    description: '专业运营团队，提升店铺流量和转化率。',
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: '营销推广',
    description: '精准营销策略，提升品牌知名度和销量。',
  },
]

const privateEcommerce = [
  {
    icon: <Store className="h-6 w-6" />,
    title: '小程序商城',
    description: '微信、支付宝小程序商城开发，私域流量运营。',
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: '品牌官网',
    description: '品牌官方商城建设，打造独立销售渠道。',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: '社群运营',
    description: '私域流量池建设，提升用户粘性和复购率。',
  },
]

const supplyChain = [
  {
    icon: <Truck className="h-6 w-6" />,
    title: '仓储物流',
    description: '智能仓储管理，全国多地分仓，快速配送。',
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: '订单管理',
    description: '全渠道订单统一管理，自动化处理流程。',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: '售后服务',
    description: '专业客服团队，完善的售后服务体系。',
  },
]

export default function Ecommerce() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ecommerce-600 via-ecommerce-500 to-ecommerce-400 text-white py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">电商业务</h1>
            <p className="text-xl text-ecommerce-100 mb-8">
              公域与私域电商一体化运营，全方位电商服务解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-ecommerce-600 hover:bg-ecommerce-50 border-none"
                >
                  立即咨询
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Public Ecommerce Section */}
      <Section bg="light">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">公域电商</h2>
            <p className="section-subtitle mx-auto">主流电商平台运营，快速获取公域流量</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publicEcommerce.map(service => (
              <div key={service.title} className="card">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-ecommerce-100 rounded-lg flex items-center justify-center text-ecommerce-600">
                    {service.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Private Ecommerce Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">私域电商</h2>
            <p className="section-subtitle mx-auto">构建私域流量池，提升用户价值和复购率</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privateEcommerce.map(service => (
              <div key={service.title} className="card">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-ecommerce-100 rounded-lg flex items-center justify-center text-ecommerce-600">
                    {service.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Supply Chain Section */}
      <Section bg="gray">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">供应链服务</h2>
            <p className="section-subtitle mx-auto">完善的供应链体系，保障业务高效运转</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supplyChain.map(service => (
              <div key={service.title} className="card">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-ecommerce-100 rounded-lg flex items-center justify-center text-ecommerce-600">
                    {service.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section bg="light">
        <Container>
          <div className="bg-gradient-to-r from-ecommerce-600 to-ecommerce-400 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">开始使用电商服务</h2>
            <p className="text-xl text-ecommerce-100 mb-8 max-w-2xl mx-auto">
              立即联系我们，获取专属的电商解决方案
            </p>
            <Link to="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-ecommerce-600 hover:bg-ecommerce-50 border-none"
              >
                免费咨询
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
