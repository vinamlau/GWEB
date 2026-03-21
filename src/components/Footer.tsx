import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="ml-2 text-xl font-bold">集团公司</span>
            </div>
            <p className="text-gray-400 text-sm">
              专注于边缘算力、支付金融、电商业务，为您提供全方位的技术解决方案。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
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
                <span className="text-gray-400">400-xxx-xxxx</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">contact@company.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">北京市朝阳区 xxx 路 xxx 号</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} 集团公司。All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                服务条款
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                网站地图
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
