import { ArrowRight } from 'lucide-react'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  link: string
  color?: 'primary' | 'finance' | 'ecommerce'
}

export default function ServiceCard({
  title,
  description,
  icon,
  link,
  color = 'primary',
}: ServiceCardProps) {
  const colorStyles = {
    primary: 'from-primary-600 to-primary-400',
    finance: 'from-finance-600 to-finance-400',
    ecommerce: 'from-ecommerce-600 to-ecommerce-400',
  }

  return (
    <Card className="group">
      <div className="flex flex-col items-start">
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorStyles[color]} flex items-center justify-center mb-4`}
        >
          <div className="text-white">{icon}</div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 mb-4 flex-grow">{description}</p>

        <Link
          to={link}
          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
        >
          了解更多
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Card>
  )
}
