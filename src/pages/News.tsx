import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../components/Button'
import Container from '../components/Container'
import Section from '../components/Section'
import { API_URL } from '../config/api'

interface Article {
  id: number
  title: string
  summary: string
  coverImage?: string
  category: string
  author?: string
  status: string
  publishedAt?: string
  createdAt: string
}

// 占位图 - 使用可靠的本地图片服务
const PLACEHOLDER_IMAGES = [
  'https://picsum.photos/seed/news1/800/450',
  'https://picsum.photos/seed/news2/800/450',
  'https://picsum.photos/seed/news3/800/450',
  'https://picsum.photos/seed/news4/800/450',
  'https://picsum.photos/seed/news5/800/450',
  'https://picsum.photos/seed/news6/800/450',
]

export default function News() {
  const [companyNews, setCompanyNews] = useState<Article[]>([])
  const [industryNews, setIndustryNews] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // 获取公司新闻
        const companyRes = await fetch(
          `${API_URL}/api/articles?category=${encodeURIComponent('公司新闻')}&status=published`,
        )
        if (companyRes.ok) {
          const data = await companyRes.json()
          setCompanyNews(data.articles || data)
        }

        // 获取行业资讯
        const industryRes = await fetch(
          `${API_URL}/api/articles?category=${encodeURIComponent('行业资讯')}&status=published`,
        )
        if (industryRes.ok) {
          const data = await industryRes.json()
          setIndustryNews(data.articles || data)
        }
      } catch (error) {
        console.error('获取文章失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // 获取文章图片（如果有封面图则使用，否则使用占位图）
  const getArticleImage = (article: Article, index: number) => {
    if (article.coverImage && article.coverImage.startsWith('/uploads/')) {
      return `${API_URL}${article.coverImage}`
    }
    return PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

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
            {companyNews.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">暂无公司新闻</div>
            ) : (
              companyNews.slice(0, 6).map((news, index) => (
                <article key={news.id} className="card overflow-hidden">
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    <img
                      src={getArticleImage(news, index)}
                      alt={news.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={e => {
                        // 如果图片加载失败，使用备用占位图
                        e.currentTarget.src =
                          PLACEHOLDER_IMAGES[(index + 3) % PLACEHOLDER_IMAGES.length]
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium">
                        {news.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {news.publishedAt
                          ? new Date(news.publishedAt).toLocaleDateString('zh-CN')
                          : new Date(news.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.summary}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{news.author || '管理员'}</span>
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
              ))
            )}
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
            {industryNews.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">暂无行业资讯</div>
            ) : (
              industryNews.slice(0, 6).map((news, index) => (
                <article key={news.id} className="card overflow-hidden">
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    <img
                      src={getArticleImage(news, index + 3)}
                      alt={news.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={e => {
                        e.currentTarget.src =
                          PLACEHOLDER_IMAGES[(index + 6) % PLACEHOLDER_IMAGES.length]
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                        {news.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {news.publishedAt
                          ? new Date(news.publishedAt).toLocaleDateString('zh-CN')
                          : new Date(news.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.summary}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {news.author || news.source || '网络'}
                      </span>
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
              ))
            )}
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
