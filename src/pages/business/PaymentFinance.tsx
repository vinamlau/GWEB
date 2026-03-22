import {
  ArrowRight,
  Banknote,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Globe,
  Lock,
  Repeat,
  Shield,
  Smartphone,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Container from '../../components/Container'
import Section from '../../components/Section'

const paymentMethods = [
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: '支付宝集成',
    description: '快速接入支付宝支付，支持网页支付、APP 支付、小程序支付、当面付等多种支付场景。',
    features: ['即时到账', '担保交易', '分期付款', '花呗分期'],
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: '微信支付',
    description:
      '无缝对接微信支付，覆盖 10 亿 + 用户，支持公众号支付、小程序支付、APP 支付、扫码支付。',
    features: ['微信支付分', '先享后付', '红包营销', '会员积分'],
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: '银联支付',
    description: '支持银联卡支付，安全可靠的银行通道，包括银联在线、云闪付、二维码支付等。',
    features: ['银联在线支付', '云闪付', '二维码支付', '银行卡快捷支付'],
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: '跨境支付',
    description:
      '全球多币种支付，支持 100+ 国家和地区，覆盖 Visa、MasterCard、PayPal 等国际主流支付方式。',
    features: ['多币种结算', '外汇管理', '跨境收款', '国际信用卡'],
  },
]

const financialServices = [
  {
    icon: <Banknote className="h-6 w-6" />,
    title: '资金清算',
    description: '实时清算，T+0/T+1 灵活选择，资金快速到账，支持多渠道对账。',
    features: ['实时清算', 'T+0 快速到账', '自动对账', '多渠道结算'],
  },
  {
    icon: <Repeat className="h-6 w-6" />,
    title: '分账系统',
    description: '灵活分账规则，支持多方分润，自动结算，满足平台型业务需求。',
    features: ['多级分账', '按比例/金额分账', '自动结算', '分账追溯'],
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: '风险管理',
    description: '智能风控系统，实时监测交易风险，支持自定义风控规则和策略。',
    features: ['风险评分', '黑名单管理', '交易限额', '异常监控'],
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: '数据分析',
    description: '交易数据可视化，业务洞察，辅助决策，支持自定义报表和导出。',
    features: ['交易报表', '用户分析', '渠道分析', '趋势预测'],
  },
]

const securityFeatures = [
  {
    icon: <Lock className="h-8 w-8" />,
    title: 'PCI DSS 认证',
    description: '通过 PCI DSS Level 1 认证，国际最高安全标准，保障支付数据安全。',
    details: ['Level 1 最高认证', '年度审计', '安全合规', '数据保护'],
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: '数据加密',
    description: '端到端加密传输，采用国密算法和国际标准加密技术，保障数据安全。',
    details: ['SSL/TLS 加密', '国密 SM2/SM3/SM4', '敏感信息脱敏', '密钥管理'],
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: '风控系统',
    description: 'AI 智能风控，实时拦截异常交易，降低欺诈风险。',
    details: ['机器学习模型', '行为分析', '设备指纹', '关系网络'],
  },
]

const complianceFeatures = [
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: '支付牌照',
    description: '持有央行支付业务许可证，合规经营，资金安全有保障。',
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: '备付金存管',
    description: '客户备付金全额存管，与自有资金隔离，确保资金安全。',
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: '反洗钱合规',
    description: '完善的反洗钱制度和流程，履行反洗钱义务。',
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: '信息安全',
    description: '通过 ISO27001 信息安全管理体系认证。',
  },
]

const stats = [
  { value: '10 亿+', label: '覆盖用户' },
  { value: '100+', label: '支持币种' },
  { value: '99.99%', label: '支付成功率' },
  { value: '<100ms', label: '支付响应' },
]

export default function PaymentFinance() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-finance-600 via-finance-500 to-finance-400 text-white py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">支付金融</h1>
            <p className="text-xl text-finance-100 mb-8">
              集成主流支付方式，提供安全可靠的金融级支付解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="white" size="lg">
                  立即咨询
                </Button>
              </Link>
              <Link to="#security">
                <Button variant="white-outline" size="md" className="flex items-center gap-2">
                  安全保障
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Payment Methods Section */}
      <Section bg="light">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">支付解决方案</h2>
            <p className="section-subtitle mx-auto">支持多种主流支付方式，满足不同业务场景需求</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map(method => (
              <div key={method.title} className="card p-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-finance-100 rounded-lg flex items-center justify-center text-finance-600">
                    {method.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <ul className="space-y-2">
                      {method.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-finance-600 mr-2 flex-shrink-0" />
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

      {/* Financial Services Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">金融服务</h2>
            <p className="section-subtitle mx-auto">全方位的金融技术服务，助力业务发展</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financialServices.map(service => (
              <div key={service.title} className="card p-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-finance-100 rounded-lg flex items-center justify-center text-finance-600">
                    {service.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-finance-600 mr-2 flex-shrink-0" />
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
                <div className="text-3xl md:text-4xl font-bold text-finance-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Security Section */}
      <Section bg="white" id="security">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">安全保障</h2>
            <p className="section-subtitle mx-auto">金融级安全防护，为您的交易保驾护航</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {securityFeatures.map(feature => (
              <div key={feature.title} className="text-center p-6">
                <div className="w-16 h-16 bg-finance-100 rounded-2xl flex items-center justify-center text-finance-600 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="text-gray-700 text-sm">
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceFeatures.map((feature, idx) => (
              <div key={idx} className="card p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-finance-100 rounded-lg flex items-center justify-center text-finance-600">
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Partner Banks Section */}
      <Section bg="light">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">合作银行</h2>
            <p className="section-subtitle mx-auto">与多家主流银行深度合作，提供稳定的银行通道</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              '工商银行',
              '建设银行',
              '农业银行',
              '中国银行',
              '招商银行',
              '交通银行',
              '浦发银行',
              '中信银行',
            ].map(bank => (
              <div
                key={bank}
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm"
              >
                <span className="text-gray-700 font-medium">{bank}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section bg="light">
        <Container>
          <div className="bg-gradient-to-r from-finance-600 to-finance-400 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">开始使用支付服务</h2>
            <p className="text-xl text-finance-100 mb-8 max-w-2xl mx-auto">
              立即联系我们，获取专属的支付解决方案
            </p>
            <a href="/kaisun" target="_self" className="inline-block">
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
