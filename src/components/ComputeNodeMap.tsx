import { motion } from 'framer-motion'
import { Circle, Globe, Zap } from 'lucide-react'
import { useState } from 'react'

interface ComputeNode {
  id: string
  name: string
  location: string
  lat: number
  lng: number
  computePower: number // TFLOPS
  status: 'active' | 'busy' | 'maintenance' | 'offline'
  requests: number // 每秒请求数
  latency: number // ms
  region: string
}

const nodeData: ComputeNode[] = [
  // 中国大陆节点
  {
    id: 'cn-beijing',
    name: '北京节点',
    location: '北京',
    lat: 39.9042,
    lng: 116.4074,
    computePower: 850,
    status: 'active',
    requests: 125000,
    latency: 5,
    region: '华北',
  },
  {
    id: 'cn-shanghai',
    name: '上海节点',
    location: '上海',
    lat: 31.2304,
    lng: 121.4737,
    computePower: 920,
    status: 'active',
    requests: 138000,
    latency: 6,
    region: '华东',
  },
  {
    id: 'cn-guangzhou',
    name: '广州节点',
    location: '广州',
    lat: 23.1291,
    lng: 113.2644,
    computePower: 780,
    status: 'active',
    requests: 98000,
    latency: 7,
    region: '华南',
  },
  {
    id: 'cn-shenzhen',
    name: '深圳节点',
    location: '深圳',
    lat: 22.5431,
    lng: 114.0579,
    computePower: 890,
    status: 'busy',
    requests: 156000,
    latency: 8,
    region: '华南',
  },
  {
    id: 'cn-chengdu',
    name: '成都节点',
    location: '成都',
    lat: 30.5728,
    lng: 104.0668,
    computePower: 650,
    status: 'active',
    requests: 72000,
    latency: 9,
    region: '西南',
  },
  {
    id: 'cn-wuhan',
    name: '武汉节点',
    location: '武汉',
    lat: 30.5928,
    lng: 114.3055,
    computePower: 580,
    status: 'active',
    requests: 65000,
    latency: 8,
    region: '华中',
  },
  {
    id: 'cn-xian',
    name: '西安节点',
    location: '西安',
    lat: 34.3416,
    lng: 108.9398,
    computePower: 520,
    status: 'active',
    requests: 58000,
    latency: 10,
    region: '西北',
  },
  {
    id: 'cn-fuzhou',
    name: '福州节点',
    location: '福州',
    lat: 26.0745,
    lng: 119.2965,
    computePower: 720,
    status: 'active',
    requests: 82000,
    latency: 6,
    region: '华东',
  },
  {
    id: 'cn-hangzhou',
    name: '杭州节点',
    location: '杭州',
    lat: 30.2741,
    lng: 120.1551,
    computePower: 680,
    status: 'active',
    requests: 75000,
    latency: 7,
    region: '华东',
  },
  {
    id: 'cn-nanjing',
    name: '南京节点',
    location: '南京',
    lat: 32.0603,
    lng: 118.7969,
    computePower: 620,
    status: 'active',
    requests: 68000,
    latency: 7,
    region: '华东',
  },
  {
    id: 'cn-chongqing',
    name: '重庆节点',
    location: '重庆',
    lat: 29.4316,
    lng: 106.9123,
    computePower: 590,
    status: 'active',
    requests: 62000,
    latency: 10,
    region: '西南',
  },
  {
    id: 'cn-tianjin',
    name: '天津节点',
    location: '天津',
    lat: 39.3434,
    lng: 117.3616,
    computePower: 560,
    status: 'active',
    requests: 58000,
    latency: 6,
    region: '华北',
  },
]

const statusConfig = {
  active: {
    label: '运行中',
    color: 'bg-green-500',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-600',
  },
  busy: {
    label: '高负载',
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-500/20',
    textColor: 'text-yellow-600',
  },
  maintenance: {
    label: '维护中',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-600',
  },
  offline: {
    label: '离线',
    color: 'bg-gray-400',
    bgColor: 'bg-gray-400/20',
    textColor: 'text-gray-600',
  },
}

export default function ComputeNodeMap() {
  const [selectedNode, setSelectedNode] = useState<ComputeNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // 计算总算力
  const totalComputePower = nodeData.reduce((sum, node) => sum + node.computePower, 0)
  const totalRequests = nodeData.reduce((sum, node) => sum + node.requests, 0)
  const activeNodes = nodeData.filter(node => node.status === 'active').length

  // 将经纬度转换为百分比位置（中国地图投影）
  const latLngToPercent = (lat: number, lng: number) => {
    // 中国范围：纬度 18°N-54°N，经度 73°E-135°E
    const chinaLatMin = 18
    const chinaLatMax = 54
    const chinaLngMin = 73
    const chinaLngMax = 135

    const x = ((lng - chinaLngMin) / (chinaLngMax - chinaLngMin)) * 100
    const y = ((chinaLatMax - lat) / (chinaLatMax - chinaLatMin)) * 100

    return { x, y }
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-6 w-6 text-blue-500" />
            <span className="text-sm text-gray-500">总算力</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {totalComputePower.toLocaleString()} TFLOPS
          </div>
          <div className="text-xs text-green-600 mt-1">↑ 12.5% 较上月</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            <span className="text-sm text-gray-500">总请求量</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(totalRequests / 1000).toFixed(1)}K/s
          </div>
          <div className="text-xs text-green-600 mt-1">↑ 8.3% 较上月</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Circle className="h-6 w-6 text-green-500" />
            <span className="text-sm text-gray-500">活跃节点</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {activeNodes} / {nodeData.length}
          </div>
          <div className="text-xs text-gray-500 mt-1">98.5% 可用率</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-6 w-6 text-purple-500" />
            <span className="text-sm text-gray-500">覆盖区域</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(nodeData.map(n => n.region)).size} 个
          </div>
          <div className="text-xs text-gray-500 mt-1">全国主要区域</div>
        </div>
      </div>

      {/* Map Container - China Map */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-[24px] overflow-hidden h-[600px] border border-gray-200">
        {/* China Map Background */}
        <div className="absolute inset-0 opacity-[0.15]">
          <svg viewBox="0 0 1000 800" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* China map outline - simplified but recognizable */}
            <path
              d="M180,200 
                 L220,180 L280,170 L350,180 L420,190 L480,200 L520,220 L550,250 
                 L570,300 L580,350 L570,400 L550,450 L520,500 L480,540 
                 L430,570 L380,590 L330,600 L280,590 L240,570 L210,540 
                 L190,500 L180,450 L175,400 L170,350 L165,300 L170,250 Z"
              fill="currentColor"
              className="text-gray-400"
            />
          </svg>
        </div>

        {/* Grid Lines - Subtle */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full">
            {[...Array(9)].map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={`${i * 12.5}%`}
                x2="100%"
                y2={`${i * 12.5}%`}
                stroke="#666"
                strokeWidth="1"
              />
            ))}
            {[...Array(13)].map((_, i) => (
              <line
                key={`v${i}`}
                x1={`${i * 8.33}%`}
                y1="0"
                x2={`${i * 8.33}%`}
                y2="100%"
                stroke="#666"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>

        {/* Node Points */}
        {nodeData.map(node => {
          const { x, y } = latLngToPercent(node.lat, node.lng)
          const status = statusConfig[node.status]

          return (
            <motion.div
              key={node.id}
              className="absolute cursor-pointer"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(node)}
            >
              {/* Pulse Animation */}
              {node.status === 'active' && (
                <>
                  <motion.div
                    className={`absolute inset-0 ${status.color} rounded-full`}
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: '24px', height: '24px', marginLeft: '-8px', marginTop: '-8px' }}
                  />
                  <motion.div
                    className={`absolute inset-0 ${status.color} rounded-full`}
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    style={{ width: '24px', height: '24px', marginLeft: '-8px', marginTop: '-8px' }}
                  />
                </>
              )}

              {/* Node Point */}
              <div
                className={`relative w-3 h-3 ${status.color} rounded-full border-2 border-white shadow-lg transition-all duration-300`}
                style={{
                  transform: hoveredNode === node.id ? 'scale(1.5)' : 'scale(1)',
                }}
              />

              {/* Tooltip on Hover */}
              {hoveredNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10"
                >
                  <div className="font-semibold">{node.name}</div>
                  <div className="text-gray-300">
                    {node.computePower} TFLOPS | {node.requests.toLocaleString()} req/s
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
                </motion.div>
              )}
            </motion.div>
          )
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Circle className="h-4 w-4" />
            节点状态说明
          </h4>
          <div className="space-y-2.5">
            {Object.entries(statusConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2.5">
                <div className={`w-3 h-3 ${config.color} rounded-full shadow-sm`} />
                <span className="text-xs text-gray-700 font-medium">{config.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compute Power Legend */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            算力规模图例
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 bg-green-400 rounded-full"
                style={{ transform: 'scale(0.6)' }}
              />
              <span className="text-xs text-gray-700">&lt;600 TFLOPS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              <span className="text-xs text-gray-700">600-850 TFLOPS</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 bg-green-600 rounded-full"
                style={{ transform: 'scale(1.4)' }}
              />
              <span className="text-xs text-gray-700">&gt;850 TFLOPS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedNode.name}</h3>
              <p className="text-gray-500">
                {selectedNode.region} | {selectedNode.location}
              </p>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-sm text-gray-500 mb-1">算力值</div>
              <div className="text-xl font-bold text-gray-900">
                {selectedNode.computePower} TFLOPS
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-sm text-gray-500 mb-1">请求量</div>
              <div className="text-xl font-bold text-gray-900">
                {selectedNode.requests.toLocaleString()} req/s
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-sm text-gray-500 mb-1">延迟</div>
              <div className="text-xl font-bold text-gray-900">{selectedNode.latency} ms</div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-sm text-gray-500 mb-1">状态</div>
              <div className={`text-xl font-bold ${statusConfig[selectedNode.status].textColor}`}>
                {statusConfig[selectedNode.status].label}
              </div>
            </div>
          </div>

          {/* Compute Power Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">算力使用率</span>
              <span className="text-sm font-semibold text-gray-900">
                {Math.round((selectedNode.requests / 200000) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${statusConfig[selectedNode.status].color}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((selectedNode.requests / 200000) * 100, 100)}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Node List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nodeData.map(node => {
          const status = statusConfig[node.status]
          return (
            <motion.div
              key={node.id}
              className={`card p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedNode?.id === node.id ? 'ring-2 ring-gray-900' : ''
              }`}
              onClick={() => setSelectedNode(node)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{node.name}</h4>
                <span className={`px-2 py-1 text-xs rounded ${status.bgColor} ${status.textColor}`}>
                  {status.label}
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                {node.region} | {node.location}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{node.computePower} TFLOPS</span>
                <span className="text-gray-600">{node.latency} ms</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
