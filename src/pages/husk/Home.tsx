import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Cpu, Globe, Layers, Server, Shield, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import ComputeNodeMap from '../../components/ComputeNodeMap'
import Container from '../../components/Container'
import Section from '../../components/Section'

const features = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: '全球覆盖',
    description: '2800+ 边缘节点，覆盖全球 200+ 国家和地区',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: '超低延迟',
    description: '毫秒级响应，就近接入，提升用户体验',
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: '强大算力',
    description: '弹性扩展，按需分配，满足各种计算需求',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: '安全可靠',
    description: '多层防护，数据加密，保障业务安全',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: '灵活部署',
    description: '支持多种部署方式，快速集成，即开即用',
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: '高可用性',
    description: '99.99% 服务可用性，智能调度，故障自愈',
  },
]

const services = [
  {
    title: 'CDN 内容分发',
    description: '基于全球智能 DNS 解析和 Anycast 技术，实现内容的就近分发和动态加速',
    features: ['静态资源加速', '动态内容优化', '视频流媒体加速', '大文件下载加速'],
  },
  {
    title: '边缘计算',
    description: '将计算能力下沉到网络边缘，降低延迟，提升响应速度',
    features: ['边缘函数', '实时数据处理', 'AI 推理', '物联网计算'],
  },
  {
    title: '智能 DNS',
    description: '智能解析，负载均衡，故障转移，保障服务高可用',
    features: ['智能调度', '健康检查', 'DNS 故障转移', '多线路解析'],
  },
  {
    title: 'DDoS 防护',
    description: '分布式防护，智能清洗，保障业务连续性',
    features: ['Tbps 级防护', 'AI 智能识别', '秒级响应', '7x24 监控'],
  },
]

const stats = [
  { value: '2800+', label: '全球节点' },
  { value: '1000 亿+', label: '日请求量' },
  { value: '99.99%', label: '服务可用性' },
  { value: '<50ms', label: '平均响应' },
]

const customers = [
  '某头部直播平台',
  '某短视频平台',
  '某在线教育平台',
  '某电商平台',
  '某游戏公司',
  '某新闻媒体',
]

export default function HuskHome() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 md:py-32 lg:py-40">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-white rounded-none flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-3xl">H</span>
                </div>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-none">
                果壳网络
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                全球领先的边缘计算服务提供商
                <br />
                为您的业务提供强大的算力支持
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/compute-map">
                  <Button size="lg" variant="white" className="w-full sm:w-auto px-10">
                    查看节点分布
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="#services">
                  <Button variant="white-outline" size="lg" className="w-full sm:w-auto px-10">
                    了解服务
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Company Intro Section */}
      <Section bg="subtle">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title mb-6">关于果壳网络</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              福州果壳网络科技有限公司是一家专注于边缘计算和 CDN 内容分发的高新技术企业。
              我们拥有全球 2800+ 边缘计算节点，服务网络覆盖 200+ 国家和地区， 日请求处理量超过 1000
              亿次，为 5 万+ 企业客户提供稳定、高效、安全的边缘计算服务。
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              我们的使命是通过创新的边缘计算技术，帮助企业降低 IT 成本，提升业务性能，
              实现数字化转型。愿景是成为全球领先的边缘计算服务提供商， 让算力像水电一样触手可及。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">技术优势</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    自研边缘计算平台
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    智能 DNS 解析系统
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    分布式架构设计
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    AI 智能调度算法
                  </li>
                </ul>
              </div>
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">服务保障</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    7x24 小时技术支持
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    99.99% 服务可用性
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    秒级故障响应
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    专业运维团队
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">核心优势</h2>
            <p className="section-subtitle mx-auto">
              凭借先进的技术和优质的服务，我们为客户提供卓越的边缘计算体验
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(feature => (
              <motion.div
                key={feature.title}
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-none flex items-center justify-center text-gray-900 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section bg="subtle" id="services">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">服务产品</h2>
            <p className="section-subtitle mx-auto">
              提供全方位的边缘计算和 CDN 服务，满足不同业务场景需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(service => (
              <div key={service.title} className="card p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Compute Node Map Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">全球节点分布</h2>
            <p className="section-subtitle mx-auto">实时查看全球边缘计算节点的分布情况和运行状态</p>
          </div>
          <ComputeNodeMap />
        </Container>
      </Section>

      {/* Customers Section */}
      <Section bg="subtle">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">客户案例</h2>
            <p className="section-subtitle mx-auto">服务众多知名企业，获得广泛好评</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {customers.map((customer, idx) => (
              <div key={idx} className="card p-6 flex items-center justify-center text-center">
                <p className="text-gray-700 font-medium">{customer}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section bg="white">
        <Container>
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-none p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">开始使用边缘计算服务</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              立即联系我们，获取专属的边缘计算解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.husk.xin/contact" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="white" className="w-full sm:w-auto px-10">
                  立即咨询
                </Button>
              </a>
              <a href="https://www.husk.xin/pricing" target="_blank" rel="noopener noreferrer">
                <Button variant="white-outline" size="lg" className="w-full sm:w-auto px-10">
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
