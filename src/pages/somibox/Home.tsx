import { motion } from 'framer-motion'
import {
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
    description: '天猫、京东、拼多多等主流电商平台入驻服务',
    features: ['快速入驻', '资质审核', '店铺装修', '运营培训'],
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: '流量运营',
    description: '专业运营团队，提升店铺流量和转化率',
    features: ['SEO 优化', '付费推广', '活动策划', '数据分析'],
  },
  {
    icon: <Megaphone className="h-6 w-6" />,
    title: '营销推广',
    description: '精准营销策略，提升品牌知名度和销量',
    features: ['品牌营销', '内容营销', '社交推广', 'KOL 合作'],
  },
]

const privateEcommerce = [
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: '小程序商城',
    description: '微信、支付宝、抖音小程序商城开发',
    features: ['定制开发', '社交裂变', '会员体系', '营销工具'],
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: '品牌官网',
    description: '品牌官方商城建设，打造独立销售渠道',
    features: ['品牌定制', '多端适配', '支付集成', '数据沉淀'],
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: '社群运营',
    description: '私域流量池建设，提升用户粘性和复购率',
    features: ['社群搭建', '内容运营', '用户分层', '精准营销'],
  },
]

const supplyChain = [
  {
    icon: <Truck className="h-6 w-6" />,
    title: '仓储物流',
    description: '智能仓储管理，全国多地分仓，快速配送',
    features: ['智能分仓', '库存管理', '订单拣货', '物流配送'],
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: '订单管理',
    description: '全渠道订单统一管理，自动化处理流程',
    features: ['订单聚合', '自动审核', '智能拆单', '物流跟踪'],
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: '售后服务',
    description: '专业客服团队，完善的售后服务体系',
    features: ['7x24 客服', '退换货处理', '客户关怀', '投诉处理'],
  },
]

const stats = [
  { value: '500+', label: '服务品牌', growth: '+30%' },
  { value: '50 亿+', label: '年 GMV', growth: '+45%' },
  { value: '98%', label: '客户满意度', growth: '+5%' },
  { value: '24h', label: '快速响应', growth: '持平' },
]

const successCases = [
  {
    title: '某知名美妆品牌',
    platform: '天猫 + 小程序',
    result: '双 11 销售额破亿，同比增长 300%',
    strategies: ['全渠道运营', '私域流量', '直播带货'],
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

const features = [
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: '数据驱动',
    description: '基于大数据分析，精准洞察用户需求',
    details: ['用户画像', '行为分析', '趋势预测', '决策支持'],
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: '精细化运营',
    description: '全流程精细化运营，提升转化和复购',
    details: ['用户分层', '精准营销', '自动化运营', '效果追踪'],
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: '全渠道覆盖',
    description: '公域 + 私域一体化运营，最大化销售机会',
    details: ['平台电商', '社交电商', '内容电商', '直播电商'],
  },
  {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: '供应链整合',
    description: '完善的供应链体系，保障业务高效运转',
    details: ['采购管理', '仓储物流', '质量控制', '售后支持'],
  },
]

export default function SomiboxHome() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-32 pb-24 md:pt-40 md:pb-32">
        <Container>
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 bg-orange-500 rounded-[24px] flex items-center justify-center">
                  <span className="text-white font-bold text-4xl">S</span>
                </div>
              </div>
              <h1 className="heading-hero mb-8">远方在线</h1>
              <p className="text-hero mb-12 max-w-3xl mx-auto">
                专业的电商运营服务商
                <br />
                公域与私域电商一体化运营解决方案
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/business/ecommerce">
                  <Button size="lg" className="px-10">
                    了解服务
                  </Button>
                </Link>
                <Link to="#contact">
                  <Button variant="secondary" size="lg" className="px-10">
                    联系我们
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
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

      {/* Public Ecommerce Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">公域电商</h2>
            <p className="section-subtitle mx-auto max-w-2xl">主流电商平台运营，快速获取公域流量</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publicEcommerce.map((service, index) => (
              <motion.div
                key={service.title}
                className="card card-hover"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-16 h-16 bg-orange-50 rounded-[20px] flex items-center justify-center text-orange-500 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Private Ecommerce Section */}
      <Section bg="gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">私域电商</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              构建私域流量池，提升用户价值和复购率
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {privateEcommerce.map((service, index) => (
              <motion.div
                key={service.title}
                className="card card-hover"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-16 h-16 bg-orange-50 rounded-[20px] flex items-center justify-center text-orange-500 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">核心优势</h2>
            <p className="section-subtitle mx-auto max-w-2xl">专业的运营团队，成熟的运营体系</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center text-orange-500 mx-auto mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-600 flex items-center justify-center"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Supply Chain Section */}
      <Section bg="gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">供应链服务</h2>
            <p className="section-subtitle mx-auto max-w-2xl">完善的供应链体系，保障业务高效运转</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supplyChain.map((service, index) => (
              <motion.div
                key={service.title}
                className="card card-hover"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-16 h-16 bg-orange-50 rounded-[20px] flex items-center justify-center text-orange-500 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Success Cases Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">成功案例</h2>
            <p className="section-subtitle mx-auto max-w-2xl">服务众多知名品牌，创造卓越业绩</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successCases.map((case_, index) => (
              <motion.div
                key={index}
                className="card card-hover p-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{case_.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                  <span className="text-orange-500 font-medium">{case_.platform}</span>
                </div>
                <p className="text-gray-700 font-semibold mb-6 text-lg">{case_.result}</p>
                <div className="flex flex-wrap gap-2">
                  {case_.strategies.map((strategy, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full"
                    >
                      {strategy}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section bg="gray" id="contact">
        <Container>
          <div className="bg-gray-900 rounded-[32px] p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
              开始使用电商服务
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              立即联系我们，获取专属的电商解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.somibox.cn/contact" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="px-10">
                  立即咨询
                </Button>
              </a>
              <a href="https://www.somibox.cn/cases" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-10 border-white text-white hover:bg-white hover:text-gray-900"
                >
                  查看更多案例
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
