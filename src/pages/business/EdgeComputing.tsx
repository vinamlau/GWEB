import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Cloud,
  Cpu,
  Database,
  Globe,
  Layers,
  Network,
  Server,
  Shield,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Container from '../../components/Container'
import Section from '../../components/Section'
import StatCard from '../../components/StatCard'

const services = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'CDN 内容分发',
    description:
      '基于全球智能 DNS 解析和 Anycast 技术，实现内容的就近分发和动态加速，降低源站压力，提升用户体验。',
    features: ['静态资源加速', '动态内容优化', '视频流媒体加速', '大文件下载加速'],
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: '边缘计算节点',
    description:
      '依托分布式的边缘节点资源，提供容器化计算能力，支持函数计算、边缘 AI 推理等多样化场景。',
    features: ['容器编排', '函数计算 (FaaS)', '边缘 AI 推理', '实时数据处理'],
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: '网络加速',
    description: '自研智能路由算法，结合多协议优化技术，全面提升网络传输效率，降低丢包率和延迟。',
    features: ['TCP/UDP 优化', 'QUIC 协议支持', '智能路由选择', '弱网环境优化'],
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: '安全防护',
    description:
      '构建多层防御体系，提供 DDoS 防护、WAF 防火墙、Bot 管理等安全能力，保障业务稳定运行。',
    features: ['DDoS 防护', 'Web 应用防火墙', 'Bot 管理', 'SSL/TLS 加速'],
  },
]

const features = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: '全球节点分布',
    description: '500+ 全球节点，覆盖 200+ 国家和地区，六大洲均有布局',
    details: ['亚太区域 280+ 节点', '欧美区域 150+ 节点', '其他区域 70+ 节点'],
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: '低延迟高可用',
    description: '毫秒级响应，99.99% 服务可用性保障',
    details: ['平均延迟 < 50ms', '核心区域 < 20ms', 'SLA 保障 99.99%'],
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: '智能调度',
    description: 'AI 驱动的流量调度，最优路径选择',
    details: ['实时网络监控', '智能负载均衡', '故障自动切换'],
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
    details: ['首屏时间 < 500ms', '卡顿率 < 0.5%', '支持 H.265/AV1 编码', '全球同播不延迟'],
    customers: ['某头部直播平台', '某短视频平台', '某在线教育平台'],
  },
  {
    title: '游戏下载',
    description: '高速下载通道，提升用户下载体验，减少流失率。',
    details: ['下载速度提升 3-10 倍', '支持断点续传', '智能分片下载', '防盗链保护'],
    customers: ['某知名游戏厂商', '某应用商店', '某游戏平台'],
  },
  {
    title: '企业应用',
    description: '加速企业 SaaS 应用，提升员工办公效率。',
    details: ['API 响应加速', '静态资源缓存', '全球办公加速', '混合云支持'],
    customers: ['某跨国企业', '某 SaaS 服务商', '某电商平台'],
  },
  {
    title: 'IoT 物联网',
    description: '海量设备连接，边缘数据处理，降低云端压力。',
    details: ['百万级设备并发', '边缘数据过滤', '实时消息推送', '设备安全管理'],
    customers: ['某智能家居厂商', '某车联网平台', '某工业互联网平台'],
  },
]

const technicalAdvantages = [
  {
    icon: <Cpu className="h-6 w-6" />,
    title: '高性能架构',
    description: '自研高性能网络引擎，单节点支持百万级并发连接。',
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: '弹性伸缩',
    description: '根据业务流量自动扩缩容，无需担心容量规划。',
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: '数据持久化',
    description: '支持边缘数据存储和同步，满足多样化业务需求。',
  },
  {
    icon: <Network className="h-6 w-6" />,
    title: '多云互联',
    description: '支持主流云厂商互联互通，构建混合云网络。',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: '开放 API',
    description: '完善的 API 和 SDK，快速集成到您的业务系统。',
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: '可视化运维',
    description: '实时监控、告警、日志分析，运维更高效。',
  },
]

export default function EdgeComputing() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">边缘算力</h1>
            <p className="text-xl text-primary-100 mb-8">
              全球分布式 CDN 网络，为您的业务提供低延迟、高可用的边缘计算服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="white" size="lg">
                  立即咨询
                </Button>
              </Link>
              <Link to="#scenarios">
                <Button variant="white-outline" size="md" className="flex items-center gap-2">
                  查看案例
                  <ArrowRight className="h-5 w-5" />
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
            <p className="section-subtitle mx-auto">全面的边缘计算解决方案，满足各种业务场景需求</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(service => (
              <div key={service.title} className="card p-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                    {service.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
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

      {/* Features Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">技术优势</h2>
            <p className="section-subtitle mx-auto">领先的技术实力，为您提供卓越的服务体验</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map(feature => (
              <div key={feature.title} className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalAdvantages.map(advantage => (
              <div key={advantage.title} className="card p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                    {advantage.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                    <p className="text-gray-600">{advantage.description}</p>
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
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Scenarios Section */}
      <Section bg="white" id="scenarios">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">应用场景</h2>
            <p className="section-subtitle mx-auto">广泛应用于多个行业场景，助力业务增长</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scenarios.map((scenario, idx) => (
              <div key={idx} className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{scenario.title}</h3>
                <p className="text-gray-600 mb-4">{scenario.description}</p>
                <ul className="space-y-2 mb-4">
                  {scenario.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">服务客户：</p>
                  <div className="flex flex-wrap gap-2">
                    {scenario.customers.map((customer, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                      >
                        {customer}
                      </span>
                    ))}
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
          <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">开始使用边缘算力服务</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              立即联系我们，获取专属的边缘计算解决方案
            </p>
            <a href="/husk" target="_self" className="inline-block">
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
