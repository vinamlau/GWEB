import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  bg?: 'white' | 'gray' | 'light'
}

export default function Section({ children, className = '', bg = 'white' }: SectionProps) {
  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    light: 'bg-gradient-to-b from-gray-50 to-white',
  }

  return <section className={`py-16 md:py-24 ${bgStyles[bg]} ${className}`}>{children}</section>
}
