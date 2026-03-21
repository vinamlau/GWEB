import { CreditCard, Shield, Banknote, Repeat, Lock, BarChart3 } from 'lucide-react'
import Section from '../components/common/Section'
import Container from '../components/common/Container'
import FeatureItem from '../components/business/FeatureItem'
import Button from '../components/common/Button'
import { Link } from 'react-router-dom'

const paymentMethods = [
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: '支付宝集成',
    description: '快速接入支付宝支付，支持多种支付场景。',
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: '微信支付',
    description: '无缝对接微信支付，覆盖 10 亿 + 用户。',
  },
  {
    icon: <Banknote className="h-6 w-6" />,
    title: '银联支付',
    description: '支持银联卡支付，安全可靠的银行通道。',
  },
  {
    icon: <Repeat className="h-6 w-6" />,
    title: '跨境支付',
    description: '全球多币种支付，支持 100+ 国家和地区。',
  },
]

const financialServices = [
  {
    icon: <Banknote className="h-6 w-6" />,
    title: '资金清算',
    description: '实时清算，T+0/T+1灵活选择，资金快速到账。',
  },
  {
    icon: <Repeat className="h-6 w-6" />,
    title: '分账系统',
    description: '灵活分账规则，支持多方分润，自动结算。',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: '风险管理',
    description: '智能风控系统，实时监测交易风险。',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: '数据分析',
    description: '交易数据可视化，业务洞察，辅助决策。',
  },
]

const securityFeatures = [
  {
    icon: <Lock className="h-8 w-8" />,
    title: 'PCI DSS 认证',
    description: '通过 PCI DSS Level 1 认证，国际最高安全标准',
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: '数据加密',
    description: '端到端加密传输，保障数据安全',
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: '风控系统',
    description: 'AI 智能风控，实时拦截异常交易',
  },
]

export default function PaymentFinance() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-finance-600 via-finance-500 to-finance-400 text-white py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              支付金融
            </h1>
            <p className="text-xl text-finance-100 mb-8">
              集成主流支付方式，提供安全可靠的金融级支付解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-finance-600 hover:bg-finance-50 border-none"
                >
                  立即咨询
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
            <p className="section-subtitle mx-auto">
              支持多种主流支付方式，满足不同业务场景需求
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method) => (
              <div key={method.title} className="card">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-finance-100 rounded-lg flex items-center justify-center text-finance-600">
                    {method.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600">
                      {method.description}
                    </p>
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
            <p className="section-subtitle mx-auto">
              全方位的金融技术服务，助力业务发展
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialServices.map((service) => (
              <div key={service.title} className="card">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-finance-100 rounded-lg flex items-center justify-center text-finance-600">
                    {service.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Security Section */}
      <Section bg="gray">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">安全保障</h2>
            <p className="section-subtitle mx-auto">
              金融级安全防护，为您的交易保驾护航
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityFeatures.map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="w-16 h-16 bg-finance-100 rounded-2xl flex items-center justify-center text-finance-600 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Partner Banks Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">合作银行</h2>
            <p className="section-subtitle mx-auto">
              与多家主流银行深度合作，提供稳定的银行通道
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['工商银行', '建设银行', '农业银行', '中国银行', '招商银行', '交通银行', '浦发银行', '中信银行'].map((bank) => (
              <div key={bank} className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">{bank}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section bg="light">
        <Container>
          <div className="bg-gradient-to-r from-finance-600 to-finance-400 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              开始使用支付服务
            </h2>
            <p className="text-xl text-finance-100 mb-8 max-w-2xl mx-auto">
              立即联系我们，获取专属的支付解决方案
            </p>
            <Link to="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-finance-600 hover:bg-finance-50 border-none"
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
