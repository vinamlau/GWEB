import { motion } from 'framer-motion'
import {
  CheckCircle2,
  CreditCard,
  Globe,
  Lock,
  RefreshCcw,
  Shield,
  Smartphone,
  Wallet,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Container from '../../components/Container'
import Section from '../../components/Section'

const paymentMethods = [
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: '支付宝',
    description: '快速接入支付宝，支持多种支付场景',
    features: ['网页支付', 'APP 支付', '小程序支付', '当面付'],
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: '微信支付',
    description: '无缝对接微信支付，覆盖 10 亿 + 用户',
    features: ['公众号支付', '小程序支付', 'APP 支付', '扫码支付'],
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: '银联支付',
    description: '安全可靠的银行通道',
    features: ['银联在线', '云闪付', '二维码支付', '快捷支付'],
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: '跨境支付',
    description: '全球多币种支付解决方案',
    features: ['Visa', 'MasterCard', 'PayPal', '多币种结算'],
  },
]

const features = [
  {
    icon: <Lock className="h-8 w-8" />,
    title: '金融级安全',
    description: '通过 PCI DSS Level 1 认证，端到端加密',
    details: ['数据加密传输', '敏感信息脱敏', '风险实时监控', '安全合规'],
  },
  {
    icon: <RefreshCcw className="h-8 w-8" />,
    title: '实时清算',
    description: 'T+0/T+1 灵活选择，资金快速到账',
    details: ['实时清算', '自动对账', '多渠道结算', '资金托管'],
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: '智能风控',
    description: 'AI 智能风控，实时拦截异常交易',
    details: ['风险评分', '黑名单管理', '行为分析', '设备指纹'],
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: '高可用性',
    description: '99.99% 支付成功率，系统稳定可靠',
    details: ['分布式架构', '故障自动转移', '7x24 监控', '快速响应'],
  },
]

const services = [
  {
    title: '资金清算',
    description: '实时清算，T+0/T+1 灵活选择，资金快速到账',
    features: ['实时清算', 'T+0 快速到账', '自动对账', '多渠道结算'],
  },
  {
    title: '分账系统',
    description: '灵活分账规则，支持多方分润，自动结算',
    features: ['多级分账', '按比例分账', '按金额分账', '分账追溯'],
  },
  {
    title: '风险管理',
    description: '智能风控系统，实时监测交易风险',
    features: ['风险评分', '黑名单管理', '交易限额', '异常监控'],
  },
  {
    title: '数据分析',
    description: '交易数据可视化，业务洞察，辅助决策',
    features: ['交易报表', '用户分析', '渠道分析', '趋势预测'],
  },
]

const stats = [
  { value: '500 亿+', label: '年交易额', growth: '+35%' },
  { value: '99.99%', label: '支付成功率', growth: '持平' },
  { value: '<100ms', label: '支付响应', growth: '-15%' },
  { value: '100+', label: '支持币种', growth: '+20%' },
]

const customers = [
  '某大型电商平台',
  '某知名连锁零售',
  '某在线教育机构',
  '某旅游服务平台',
  '某生活服务平台',
  '某数字娱乐平台',
]

export default function KaisunHome() {
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
                <div className="w-20 h-20 bg-blue-600 rounded-[24px] flex items-center justify-center">
                  <span className="text-white font-bold text-4xl">K</span>
                </div>
              </div>
              <h1 className="heading-hero mb-8">楷熵信息</h1>
              <p className="text-hero mb-12 max-w-3xl mx-auto">
                专业的支付金融服务提供商
                <br />
                安全、高效、可靠的金融级支付解决方案
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/business/payment-finance">
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

      {/* Payment Methods Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">支付方式</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              集成主流支付方式，满足不同业务场景需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.title}
                className="card card-hover"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-[20px] flex items-center justify-center text-blue-600 mb-6">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-500 mb-4">{method.description}</p>
                <ul className="space-y-2">
                  {method.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
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
      <Section bg="gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">核心优势</h2>
            <p className="section-subtitle mx-auto max-w-2xl">金融级安全保障，专业的技术服务团队</p>
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
                <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center text-blue-600 mx-auto mb-6 shadow-sm">
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

      {/* Services Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">金融服务</h2>
            <p className="section-subtitle mx-auto max-w-2xl">全方位的金融技术服务，助力业务发展</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="card card-hover p-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-500 mb-6 text-lg">{service.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-700 flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Customers Section */}
      <Section bg="gray">
        <Container>
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">客户案例</h2>
            <p className="section-subtitle mx-auto max-w-2xl">服务众多知名企业，获得广泛好评</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {customers.map((customer, idx) => (
              <motion.div
                key={idx}
                className="card p-6 flex items-center justify-center text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <p className="text-gray-700 font-medium">{customer}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section bg="white" id="contact">
        <Container>
          <div className="bg-gray-900 rounded-[32px] p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
              开始使用支付服务
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              立即联系我们，获取专属的支付解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.kaisun.xin/contact" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="px-10">
                  立即咨询
                </Button>
              </a>
              <a href="https://www.kaisun.xin/pricing" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-10 border-white text-white hover:bg-white hover:text-gray-900"
                >
                  查看价格
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
