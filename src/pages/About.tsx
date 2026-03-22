import { Building2, CheckCircle2, Globe, Lightbulb, Target, Trophy, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

import Button from '../components/Button'
import Container from '../components/Container'
import Section from '../components/Section'

const subsidiaries = [
  {
    name: '福州果壳网络科技有限公司',
    business: '边缘算力业务',
    description:
      '专注于 CDN 内容分发、智能 DNS 解析、DDoS 防护等边缘计算服务，拥有全球 2800+ 节点，服务超过 5 万家企业客户。',
    icon: <Globe className="h-8 w-8" />,
    color: 'primary',
    stats: [
      { label: '全球节点', value: '2800+' },
      { label: '服务企业', value: '5 万+' },
      { label: '日请求量', value: '1000 亿+' },
    ],
  },
  {
    name: '福州楷熵信息技术有限公司',
    business: '支付金融业务',
    description:
      '持有央行支付牌照，提供支付宝、微信支付、银联支付等全方位支付解决方案，年交易规模突破 500 亿元。',
    icon: <Building2 className="h-8 w-8" />,
    color: 'finance',
    stats: [
      { label: '持牌机构', value: '✓' },
      { label: '年交易额', value: '500 亿+' },
      { label: '支付成功率', value: '99.99%' },
    ],
  },
  {
    name: '福州远方在线科技有限公司',
    business: '电商业务',
    description:
      '提供公域与私域电商一体化运营服务，包括天猫、京东、拼多多平台入驻，小程序商城开发，年 GMV 超 50 亿元。',
    icon: <Users className="h-8 w-8" />,
    color: 'ecommerce',
    stats: [
      { label: '服务品牌', value: '500+' },
      { label: '年 GMV', value: '50 亿+' },
      { label: '客户满意度', value: '98%' },
    ],
  },
]

const values = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: '创新驱动',
    description: '持续投入研发，推动技术创新，保持行业领先地位',
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: '客户至上',
    description: '以客户需求为中心，提供个性化、专业化的服务',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: '团队协作',
    description: '凝聚团队力量，发挥集体智慧，实现共同发展',
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: '诚信为本',
    description: '坚持诚信经营，履行社会责任，赢得客户信任',
  },
]

const milestones = [
  {
    year: '2018',
    title: '集团成立',
    description: '集团在福州成立，开始布局边缘计算、支付金融、电商业务三大领域',
  },
  {
    year: '2019',
    title: '业务拓展',
    description: '三家子公司相继成立，业务版图初步形成，服务网络覆盖全国',
  },
  {
    year: '2020',
    title: '技术突破',
    description: '边缘计算节点突破 1000 个，支付系统通过 PCI DSS 认证',
  },
  {
    year: '2021',
    title: '规模增长',
    description: '服务客户突破 5 万家，年交易规模突破 300 亿元',
  },
  {
    year: '2022',
    title: '行业认可',
    description: '荣获"国家高新技术企业"、"年度最佳支付解决方案提供商"等荣誉',
  },
  {
    year: '2023',
    title: '全球布局',
    description: '海外业务拓展至东南亚、欧洲市场，全球节点突破 2800 个',
  },
  {
    year: '2024',
    title: '持续发展',
    description: '完成新一轮融资，加速技术创新和业务拓展，迈向新台阶',
  },
]

const team = [
  {
    name: '张明',
    role: '集团董事长 & CEO',
    bio: '拥有 20 年互联网行业经验，曾任职于多家知名科技企业，带领团队实现快速发展',
  },
  {
    name: '李华',
    role: '集团总裁',
    bio: '资深企业管理专家，擅长战略规划和业务拓展，推动集团多元化发展',
  },
  {
    name: '王强',
    role: '果壳网络 CEO',
    bio: '边缘计算领域专家，主导全球 CDN 网络建设，服务超过 5 万家企业客户',
  },
  {
    name: '赵敏',
    role: '楷熵信息 CEO',
    bio: '支付金融行业资深人士，带领团队获得央行支付牌照，年交易额突破 500 亿',
  },
  {
    name: '陈杰',
    role: '远方在线 CEO',
    bio: '电商运营专家，服务 500+ 知名品牌，创造多个行业成功案例',
  },
]

const stats = [
  { value: '10 万+', label: '服务企业客户' },
  { value: '500 亿+', label: '年交易规模' },
  { value: '2800+', label: '全球服务节点' },
  { value: '5000+', label: '专业团队成员' },
]

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">关于我们</h1>
            <p className="text-xl text-primary-100 mb-8">
              专注于边缘算力、支付金融、电商业务，为客户提供全方位的技术解决方案
            </p>
          </div>
        </Container>
      </section>

      {/* Company Intro Section */}
      <Section bg="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title mb-6">集团简介</h2>
            <p className="text-lg text-gray-600 mb-6">
              我们是一家领先的科技集团，总部位于福州，专注于为客户提供边缘算力、支付金融和电商业务的全方位解决方案。
              凭借多年的技术积累和行业经验，我们已经服务了超过 10 万家企业客户，年交易规模突破 500
              亿元。
            </p>
            <p className="text-lg text-gray-600 mb-6">
              集团旗下拥有三家全资子公司：福州果壳网络科技有限公司（边缘算力）、福州楷熵信息技术有限公司（支付金融）、福州远方在线科技有限公司（电商业务），
              业务网络遍布全球 200+ 国家和地区。
            </p>
            <p className="text-lg text-gray-600">
              我们的使命是通过创新技术，帮助企业实现数字化转型，提升运营效率，创造更大价值。
              愿景是成为全球领先的技术服务提供商，让科技赋能每一个企业。
            </p>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section bg="gray">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Subsidiaries Section */}
      <Section bg="light">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">旗下子公司</h2>
            <p className="section-subtitle mx-auto">三大业务板块协同发展，打造完整的技术服务生态</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subsidiaries.map(company => (
              <div key={company.name} className="card p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mx-auto mb-4">
                  {company.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{company.name}</h3>
                <div className="text-primary-600 font-semibold text-center mb-4">
                  {company.business}
                </div>
                <p className="text-gray-600 mb-6">{company.description}</p>

                <div className="space-y-3">
                  {company.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                    >
                      <span className="text-gray-600">{stat.label}</span>
                      <span className="font-semibold text-gray-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">核心价值观</h2>
            <p className="section-subtitle mx-auto">我们的价值观指引着企业发展的方向</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(value => (
              <div key={value.title} className="text-center p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Milestones Section */}
      <Section bg="gray">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">发展历程</h2>
            <p className="section-subtitle mx-auto">从成立到现在，我们不断突破自我，创造辉煌</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 hidden md:block" />

            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div
                  key={milestone.year}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1 w-full">
                    <div className={`card p-6 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <div className="text-primary-600 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10 w-4 h-4 bg-primary-600 rounded-full hidden md:block" />

                  <div className="flex-1 w-full hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section bg="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">管理团队</h2>
            <p className="section-subtitle mx-auto">经验丰富的管理团队引领企业持续发展</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map(member => (
              <div key={member.name} className="card p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <div className="text-primary-600 text-sm font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Certifications Section */}
      <Section bg="light">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-title">资质荣誉</h2>
            <p className="section-subtitle mx-auto">通过多项国际认证，获得行业权威认可</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              '国家高新技术企业',
              'ISO27001 信息安全管理体系认证',
              'ISO9001 质量管理体系认证',
              'PCI DSS Level 1 支付卡行业数据安全标准',
              '央行支付业务许可证',
              'CDN 经营许可证',
              '增值电信业务经营许可证',
              '年度最佳支付解决方案提供商',
            ].map((cert, idx) => (
              <div key={idx} className="card p-6 flex items-center gap-3">
                <Trophy className="h-6 w-6 text-primary-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section bg="white">
        <Container>
          <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">联系我们</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              如有任何问题或合作意向，欢迎随时联系我们
            </p>
            <Link to="/contact">
              <Button variant="white" size="lg">
                立即联系
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
