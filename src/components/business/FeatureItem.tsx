import { ReactNode } from 'react'
import { CheckCircle } from 'lucide-react'

interface FeatureItemProps {
  icon?: ReactNode
  title: string
  description: string
}

export default function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0">
        {icon || <CheckCircle className="h-6 w-6 text-primary-600" />}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  )
}
