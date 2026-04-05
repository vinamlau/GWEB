import { useEffect, useState } from 'react'

import Container from '../components/Container'
import Section from '../components/Section'
import { API_URL } from '../config/api'

interface AboutPage {
  id?: number
  title?: string
  slug?: string
  content?: string
}

export default function About() {
  const [aboutPage, setAboutPage] = useState<AboutPage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        const response = await fetch(`${API_URL}/api/pages/about`)
        if (response.ok) {
          const data = await response.json()
          setAboutPage(data)
        }
      } catch (error) {
        console.error('获取关于页面失败:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAboutPage()

    // 监听页面更新事件
    const handlePageUpdate = () => {
      fetchAboutPage()
    }
    window.addEventListener('pageUpdated', handlePageUpdate)

    return () => {
      window.removeEventListener('pageUpdated', handlePageUpdate)
    }
  }, [])

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

  // 如果没有内容，显示默认提示
  if (!aboutPage?.content) {
    return (
      <div className="flex flex-col">
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
        <Section bg="white">
          <Container>
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">暂无内容，请在后台管理中添加内容</p>
            </div>
          </Container>
        </Section>
      </div>
    )
  }

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <section className="about-hero-section">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="about-hero-title">{aboutPage.title || '关于我们'}</h1>
            <p className="about-hero-subtitle">
              专注于边缘算力、支付金融、电商业务，为客户提供全方位的技术解决方案
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <div
        className="about-content-wrapper"
        dangerouslySetInnerHTML={{ __html: aboutPage.content || '' }}
      />
    </div>
  )
}
