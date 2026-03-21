import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'

import Button from '../components/Button'
import Container from '../components/Container'
import Section from '../components/Section'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 实际项目中这里应该调用 API 提交表单
    alert('感谢您的留言，我们会尽快联系您！')
  }

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">联系我们</h1>
            <p className="text-xl text-primary-100 mb-8">
              如有任何问题或合作意向，欢迎随时联系我们
            </p>
          </div>
        </Container>
      </section>

      <Section bg="light">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="section-title mb-6">联系方式</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">电话咨询</h3>
                    <p className="text-gray-600">400-xxx-xxxx</p>
                    <p className="text-sm text-gray-500">工作日 9:00-18:00</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">邮箱联系</h3>
                    <p className="text-gray-600">contact@company.com</p>
                    <p className="text-sm text-gray-500">我们会在 24 小时内回复</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">公司地址</h3>
                    <p className="text-gray-600">北京市朝阳区 xxx 路 xxx 号</p>
                    <p className="text-sm text-gray-500">欢迎来访，请提前预约</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="section-title mb-6">在线留言</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    姓名 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    电话
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    留言内容 *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Send className="mr-2 h-5 w-5" />
                  提交留言
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
