import { Server, Zap, Shield, Globe, Clock, TrendingUp } from 'lucide-react'
import Section from '../components/common/Section'
import Container from '../components/common/Container'
import FeatureItem from '../components/business/FeatureItem'
import StatCard from '../components/business/StatCard'
import Button from '../components/common/Button'
import { Link } from 'react-router-dom'

const services = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'CDN 内容分发',
    description: '全球智能调度，快速分发静态和动态内容，提升用户体验。',
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: '边缘计算节点',
    description: '分布式计算能力，就近处理数据，降低延迟，提高效率。',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: '网络加速',
    description: '智能路由选择，协议优化，全面提升网络传输速度。',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: '安全防护',
    description: 'DDoS 防护、WAF、SSL 加速，全方位保障业务安全。',
  },
]

const features = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: '全球节点分布',
    description: '500+ 全球节点，覆盖 200+ 国家和地区',
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: '低延迟高可用',
    description: '毫秒级响应，99.99% 服务可用性保障',
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: '智能调度',
    description: 'AI 驱动的流量调度，最优路径选择',
  },
]

const stats = [
  { value: '500+', label: '全球节点', suffix: '+' },
  { value: '100', label: '覆盖国家', suffix: '+' },
  { value: '50', label: 'Tbps 带宽', suffix: '+' },
  { value: '99.99', label: '可用性', suffix: '%' },
]

const scenarios = [
  {
    title: '视频直播',
    description: '超低延迟直播，流畅不卡顿，支持百万级并发。',
  },
  {
    title: '游戏下载',
    description: '高速下载通道，提升用户下载体验，减少流失率。',
  },
  {
    title: '企业应用',
    description: '加速企业 SaaS 应用，提升员工办公效率。',
  },
]

export default function EdgeComputing() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              边缘算力
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              全球分布式 CDN 网络，为您的业务提供低延迟、高可用的边缘计算服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-primary-50 border-none"
                >
                  立即咨询
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <Section bg="light">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">核心服务</h2>
            <p className="section-subtitle mx-auto">
              全面的边缘计算解决方案，满足各种业务场景需求
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className="card">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
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

      {/* Features Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">技术优势</h2>
            <p className="section-subtitle mx-auto">
              领先的技术实力，为您提供卓越的服务体验
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-4">
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

      {/* Stats Section */}
      <Section bg="gray">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Scenarios Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">应用场景</h2>
            <p className="section-subtitle mx-auto">
              广泛应用于多个行业场景，助力业务增长
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scenarios.map((scenario) => (
              <div key={scenario.title} className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {scenario.title}
                </h3>
                <p className="text-gray-600">
                  {scenario.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section bg="light">
        <Container>
          <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              开始使用边缘算力服务
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              立即联系我们，获取专属的边缘计算解决方案
            </p>
            <Link to="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50 border-none"
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
