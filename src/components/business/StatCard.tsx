import { motion } from 'framer-motion'

interface StatCardProps {
  value: string
  label: string
  suffix?: string
}

export default function StatCard({ value, label, suffix = '' }: StatCardProps) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
        {value}{suffix}
      </div>
      <div className="text-gray-600 text-lg">{label}</div>
    </motion.div>
  )
}
