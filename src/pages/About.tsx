import { Link } from 'react-router-dom'

import Button from '../components/Button'
import Container from '../components/Container'
import Section from '../components/Section'

export default function About() {
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
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title mb-6">公司简介</h2>
            <p className="text-lg text-gray-600 mb-6">
              我们是一家领先的科技公司，专注于为客户提供边缘算力、支付金融和电商业务的全方位解决方案。
              凭借多年的技术积累和行业经验，我们已经服务了超过 10 万家企业客户。
            </p>
            <p className="text-lg text-gray-600">
              我们的使命是通过创新技术，帮助企业实现数字化转型，提升运营效率，创造更大价值。
            </p>
          </div>
        </Container>
      </Section>

      <Section bg="light">
        <Container>
          <div className="text-center">
            <h2 className="section-title mb-12">联系我们</h2>
            <p className="text-lg text-gray-600 mb-8">如有任何问题或合作意向，欢迎随时联系我们</p>
            <Link to="/contact">
              <Button size="lg">立即联系</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
