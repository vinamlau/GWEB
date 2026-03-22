import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe,
  Megaphone,
  ShoppingBag,
  ShoppingCart,
  Store,
  Target,
  Truck,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Container from '../../components/Container'
import Section from '../../components/Section'

const publicEcommerce = [
  {
    icon: <Store className="h-6 w-6" />,
    title: '平台入驻',
    description: '天猫、京东、拼多多等主流电商平台入驻服务，快速开店，专业运营指导。',
    features: ['快速入驻通道', '资质审核指导', '店铺装修服务', '运营培训'],
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: '流量运营',
    description: '专业运营团队，提升店铺流量和转化率，实现销售增长。',
    features: ['SEO 优化', '付费推广', '活动策划', '数据分析'],
  },
  {
    icon: <Megaphone className="h-6 w-6" />,
    title: '营销推广',
    description: '精准营销策略，提升品牌知名度和销量，打造爆款产品。',
    features: ['品牌营销', '内容营销', '社交媒体推广', 'KOL 合作'],
  },
]

const privateEcommerce = [
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: '小程序商城',
    description: '微信、支付宝、抖音小程序商城开发，私域流量运营，社交电商解决方案。',
    features: ['定制化开发', '社交裂变', '会员体系', '营销工具'],
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: '品牌官网',
    description: '品牌官方商城建设，打造独立销售渠道，提升品牌形象。',
    features: ['品牌定制', '多端适配', '支付集成', '数据沉淀'],
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: '社群运营',
    description: '私域流量池建设，提升用户粘性和复购率，实现精细化运营。',
    features: ['社群搭建', '内容运营', '用户分层', '精准营销'],
  },
]

const supplyChain = [
  {
    icon: <Truck className="h-6 w-6" />,
    title: '仓储物流',
    description: '智能仓储管理，全国多地分仓，快速配送，降低物流成本。',
    features: ['智能分仓', '库存管理', '订单拣货', '物流配送'],
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: '订单管理',
    description: '全渠道订单统一管理，自动化处理流程，提高订单处理效率。',
    features: ['订单聚合', '自动审核', '智能拆单', '物流跟踪'],
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: '售后服务',
    description: '专业客服团队，完善的售后服务体系，提升用户满意度。',
    features: ['7x24 客服', '退换货处理', '客户关怀', '投诉处理'],
  },
]

const stats = [
  { value: '500+', label: '服务品牌' },
  { value: '50 亿+', label: '年 GMV' },
  { value: '98%', label: '客户满意度' },
  { value: '24h', label: '快速响应' },
]

const successCases = [
  {
    title: '某知名美妆品牌',
    platform: '天猫 + 小程序',
    result: '双 11 销售额破亿，同比增长 300%',
    strategies: ['全渠道运营', '私域流量建设', '直播带货'],
  },
  {
    title: '某家居品牌',
    platform: '京东 + 品牌官网',
    result: '线上销售占比提升至 40%，复购率达 35%',
    strategies: ['内容营销', '会员运营', '场景化营销'],
  },
  {
    title: '某食品品牌',
    platform: '拼多多 + 社群',
    result: '月销百万单，社群用户超 10 万',
    strategies: ['社交裂变', '团购活动', '用户运营'],
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
                <Button variant="white" size="lg">
                  立即咨询
                </Button>
              </Link>
              <Link to="#cases">
                <Button variant="white-outline" size="md" className="flex items-center gap-2">
                  成功案例
                  <ArrowRight className="h-5 w-5" />
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
              <div key={service.title} className="card p-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-ecommerce-100 rounded-lg flex items-center justify-center text-ecommerce-600">
                    {service.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-ecommerce-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
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
              <div key={service.title} className="card p-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-ecommerce-100 rounded-lg flex items-center justify-center text-ecommerce-600">
                    {service.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-ecommerce-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
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
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-ecommerce-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Supply Chain Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">供应链服务</h2>
            <p className="section-subtitle mx-auto">完善的供应链体系，保障业务高效运转</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supplyChain.map(service => (
              <div key={service.title} className="card p-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-ecommerce-100 rounded-lg flex items-center justify-center text-ecommerce-600">
                    {service.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-ecommerce-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Success Cases Section */}
      <Section bg="light" id="cases">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">成功案例</h2>
            <p className="section-subtitle mx-auto">服务众多知名品牌，创造卓越业绩</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successCases.map((case_, idx) => (
              <div key={idx} className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{case_.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-ecommerce-600" />
                  <span className="text-ecommerce-600 font-medium">{case_.platform}</span>
                </div>
                <p className="text-gray-700 font-semibold mb-4">{case_.result}</p>
                <div className="flex flex-wrap gap-2">
                  {case_.strategies.map((strategy, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-ecommerce-50 text-ecommerce-700 text-xs rounded-full"
                    >
                      {strategy}
                    </span>
                  ))}
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
            <a href="/somibox" target="_self" className="inline-block">
              <Button variant="white" size="lg">
                访问官网
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </Container>
      </Section>
    </div>
  )
}
