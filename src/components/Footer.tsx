import { Github, Mail, MapPin, MessageCircle, Phone, Twitter } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { API_URL } from '../config/api'

interface FooterData {
  companyName?: string
  description?: string
  address?: string
  phone?: string
  email?: string
  icpLicense?: string
  socialLinks?: {
    wechat?: string
    weibo?: string
    github?: string
  }
}

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null)

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await fetch(`${API_URL}/api/footer/active`)
        if (response.ok) {
          const data = await response.json()
          setFooterData(data)
        }
      } catch (error) {
        console.error('获取页脚数据失败:', error)
      }
    }
    fetchFooter()

    // 监听页脚更新事件
    const handleFooterUpdate = () => {
      fetchFooter()
    }
    window.addEventListener('footerUpdated', handleFooterUpdate)

    return () => {
      window.removeEventListener('footerUpdated', handleFooterUpdate)
    }
  }, [])

  const footer = footerData || {
    companyName: '集团公司',
    description: '专注于边缘算力、支付金融、电商业务，为您提供全方位的技术解决方案。',
    address: '北京市朝阳区 xxx 路 xxx 号',
    phone: '400-xxx-xxxx',
    email: 'contact@company.com',
    socialLinks: { wechat: '', weibo: '', github: '' },
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'wechat':
        return <MessageCircle className="h-5 w-5" />
      case 'weibo':
        return <Twitter className="h-5 w-5" />
      case 'github':
        return <Github className="h-5 w-5" />
      default:
        return <Github className="h-5 w-5" />
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-xl font-bold">{footer.companyName}</h3>
              <p className="text-gray-400 text-sm">{footer.description}</p>
            </div>
            <div className="flex space-x-4">
              {footer.socialLinks?.github && (
                <a
                  href={footer.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {getSocialIcon('github')}
                </a>
              )}
              {footer.socialLinks?.weibo && (
                <a
                  href={footer.socialLinks.weibo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {getSocialIcon('weibo')}
                </a>
              )}
              {footer.socialLinks?.wechat && (
                <a
                  href={footer.socialLinks.wechat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {getSocialIcon('wechat')}
                </a>
              )}
            </div>
          </div>

          {/* Business Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              业务板块
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/business/edge-computing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  边缘算力
                </Link>
              </li>
              <li>
                <Link
                  to="/business/payment-finance"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  支付金融
                </Link>
              </li>
              <li>
                <Link
                  to="/business/ecommerce"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  电商业务
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              关于我们
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  公司简介
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition-colors">
                  新闻动态
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              联系方式
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">{footer.phone}</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">{footer.email}</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">{footer.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {footer.companyName}。All rights reserved.
            </p>
            {footer.icpLicense && (
              <p className="text-gray-400 text-sm mt-2 md:mt-0">{footer.icpLicense}</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
