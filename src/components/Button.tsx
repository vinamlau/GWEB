import { HTMLMotionProps, motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'link'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full'

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500',
    secondary:
      'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 active:bg-blue-100 focus:ring-blue-500',
    outline:
      'bg-transparent border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-900',
    ghost: 'bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
    white: 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-500 shadow-sm',
    link: 'bg-transparent text-blue-600 hover:text-blue-700 p-0 h-auto focus:ring-blue-500',
  }

  const sizeStyles = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <motion.button
      className={[baseStyles, variantStyles[variant], sizeStyles[size], disabledStyles, className]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </motion.button>
  )
}
