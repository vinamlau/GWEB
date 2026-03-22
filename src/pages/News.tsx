import { ArrowRight, Calendar, ChevronRight, FileText, Megaphone, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

import Button from '../components/Button'
import Container from '../components/Container'
import Section from '../components/Section'

const companyNews = [
  {
    id: 1,
    title: '集团完成 C 轮融资，加速边缘计算全球布局',
    summary:
      '近日，集团宣布完成 C 轮融资，由知名投资机构领投，融资金额达数亿元。本轮融资将用于加速边缘计算节点的全球部署，加大研发投入，拓展海外市场。',
    date: '2024-01-15',
    category: '公司新闻',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    author: '集团办公室',
  },
  {
    id: 2,
    title: '果壳网络边缘计算节点突破 2800 个，覆盖全球主要地区',
    summary:
      '福州果壳网络科技有限公司宣布，其 CDN 边缘计算节点数量已突破 2800 个，覆盖全球 200+ 国家和地区，日请求处理量超过 1000 亿次，服务稳定性达到 99.99%。',
    date: '2024-01-10',
    category: '业务动态',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    author: '果壳网络',
  },
  {
    id: 3,
    title: '楷熵信息荣获"年度最佳支付解决方案提供商"奖项',
    summary:
      '在第三届中国支付产业高峰论坛上，福州楷熵信息技术有限公司凭借创新的支付技术和优质的服务，荣获"年度最佳支付解决方案提供商"奖项。',
    date: '2024-01-05',
    category: '荣誉资质',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    author: '楷熵信息',
  },
  {
    id: 4,
    title: '远方在线电商业务年 GMV 突破 50 亿元，同比增长 150%',
    summary:
      '福州远方在线科技有限公司 2023 年业绩亮眼，全年 GMV 突破 50 亿元，同比增长 150%。其中，私域电商业务增长迅猛，成为新的增长引擎。',
    date: '2024-01-03',
    category: '业务动态',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800',
    author: '远方在线',
  },
  {
    id: 5,
    title: '集团通过 ISO27001 信息安全管理体系认证',
    summary:
      '集团正式通过 ISO27001 信息安全管理体系认证，标志着集团在信息安全管理方面达到国际标准，为客户提供更安全可靠的服务保障。',
    date: '2023-12-28',
    category: '资质认证',
    image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=800',
    author: '集团办公室',
  },
  {
    id: 6,
    title: '集团与多家银行达成战略合作，提升支付服务能力',
    summary:
      '楷熵信息与工商银行、建设银行、招商银行等多家主流银行签署战略合作协议，将在支付清算、跨境支付、供应链金融等领域展开深度合作。',
    date: '2023-12-20',
    category: '战略合作',
    image: 'https://images.unsplash.com/photo-1565514020176-db7643f46c96?w=800',
    author: '楷熵信息',
  },
]

const industryNews = [
  {
    id: 101,
    title: '2024 年中国 CDN 市场规模将突破 500 亿元',
    summary:
      '据权威机构预测，2024 年中国 CDN 市场规模将突破 500 亿元，同比增长 25%。边缘计算、5G 应用、超高清视频等新兴需求成为主要增长动力。',
    date: '2024-01-12',
    category: '行业报告',
    source: 'IDC 研究报告',
  },
  {
    id: 102,
    title: '央行发布支付行业新规，促进行业健康发展',
    summary:
      '中国人民银行发布《非银行支付机构监督管理条例》，进一步完善支付行业监管框架，促进行业规范健康发展，保护消费者合法权益。',
    date: '2024-01-08',
    category: '政策法规',
    source: '中国人民银行',
  },
  {
    id: 103,
    title: '直播电商市场规模持续扩大，2024 年有望突破 3 万亿',
    summary:
      '2023 年中国直播电商市场规模达 2.5 万亿元，同比增长 40%。预计 2024 年将继续保持高速增长，市场规模有望突破 3 万亿元。',
    date: '2024-01-06',
    category: '市场趋势',
    source: '艾瑞咨询',
  },
  {
    id: 104,
    title: '跨境电商迎来政策利好，多部门出台支持措施',
    summary:
      '商务部、海关总署等多部门联合出台支持跨境电商发展的政策措施，包括优化通关流程、完善税收政策、加强海外仓建设等。',
    date: '2024-01-02',
    category: '政策法规',
    source: '商务部',
  },
  {
    id: 105,
    title: 'AI 技术在支付风控领域的应用日益广泛',
    summary:
      '随着人工智能技术的发展，越来越多的支付机构将 AI 应用于交易风控、反欺诈、信用评估等领域，显著提升风控效率和准确性。',
    date: '2023-12-25',
    category: '技术创新',
    source: '支付产业观察',
  },
  {
    id: 106,
    title: '私域流量运营成为电商新趋势',
    summary:
      '在公域流量成本持续上升的背景下，私域流量运营成为电商企业的新选择。小程序、社群、直播等私域运营方式受到品牌商青睐。',
    date: '2023-12-18',
    category: '行业趋势',
    source: '电商研究中心',
  },
]

const newsCategories = [
  { name: '全部', icon: <FileText className="h-5 w-5" />, count: 12 },
  { name: '公司新闻', icon: <Megaphone className="h-5 w-5" />, count: 6 },
  { name: '业务动态', icon: <Calendar className="h-5 w-5" />, count: 3 },
  { name: '荣誉资质', icon: <Trophy className="h-5 w-5" />, count: 2 },
  { name: '行业资讯', icon: <FileText className="h-5 w-5" />, count: 6 },
]

export default function News() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">新闻动态</h1>
            <p className="text-xl text-primary-100 mb-8">了解公司最新资讯和行业动态</p>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <Section bg="light">
        <Container>
          <div className="flex flex-wrap gap-4 justify-center">
            {newsCategories.map(category => (
              <button
                key={category.name}
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {category.icon}
                <span className="font-medium">{category.name}</span>
                <span className="text-sm text-gray-500">({category.count})</span>
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* Company News Section */}
      <Section bg="white">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">公司新闻</h2>
            <Link
              to="/news/company"
              className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium"
            >
              查看更多
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyNews.slice(0, 6).map(news => (
              <article key={news.id} className="card overflow-hidden">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium">
                      {news.category}
                    </span>
                    <span className="text-sm text-gray-500">{news.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{news.author}</span>
                    <Link
                      to={`/news/${news.id}`}
                      className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      阅读全文
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Industry News Section */}
      <Section bg="light">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">行业资讯</h2>
            <Link
              to="/news/industry"
              className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium"
            >
              查看更多
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industryNews.map(news => (
              <article key={news.id} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-finance-50 text-finance-700 text-xs rounded-full font-medium">
                      {news.category}
                    </span>
                    <span className="text-sm text-gray-500">{news.date}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{news.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{news.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">来源：{news.source}</span>
                  <Link
                    to={`/news/industry/${news.id}`}
                    className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    阅读全文
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter Section */}
      <Section bg="white">
        <Container>
          <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">订阅我们的通讯</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              获取最新的公司动态和行业资讯，每月发送
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="请输入您的邮箱"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button variant="white" size="lg">
                立即订阅
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
