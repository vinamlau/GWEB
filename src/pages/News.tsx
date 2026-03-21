import Container from '../components/Container'
import Section from '../components/Section'

const news = [
  {
    title: '公司完成新一轮融资，加速边缘计算布局',
    date: '2024-01-15',
    category: '公司新闻',
  },
  {
    title: '边缘算力节点突破 500 个，覆盖全球主要地区',
    date: '2024-01-10',
    category: '业务动态',
  },
  {
    title: '荣获"年度最佳支付解决方案提供商"奖项',
    date: '2024-01-05',
    category: '荣誉资质',
  },
]

export default function News() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">新闻动态</h1>
            <p className="text-xl text-primary-100 mb-8">了解公司最新资讯和行业动态</p>
          </div>
        </Container>
      </section>

      <Section bg="light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map(item => (
              <div key={item.title} className="card">
                <div className="text-sm text-primary-600 mb-2">{item.category}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <div className="text-sm text-gray-500">{item.date}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
