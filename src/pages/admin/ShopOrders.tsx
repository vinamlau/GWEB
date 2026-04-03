import { useEffect, useState } from 'react'

import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/Button'

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001'

interface OrderItem {
  productId: number
  productName: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: number
  orderNo: string
  customerName: string
  customerPhone: string
  customerEmail: string
  totalAmount: number
  payAmount: number
  status: string
  payMethod: string
  payTime: string
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

const ShopOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')

  const fetchOrders = async () => {
    try {
      const url = statusFilter
        ? `${API_URL}/api/orders/admin/orders?status=${statusFilter}`
        : `${API_URL}/api/orders/admin/orders`
      const response = await fetch(url)
      const data = await response.json()
      if (data.success) {
        setOrders(data.data)
      }
    } catch (error) {
      console.error('获取订单列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [statusFilter])

  const handleShip = async (orderNo: string) => {
    const trackingNo = prompt('请输入快递单号:')
    if (!trackingNo) {
      return
    }

    const carrier = prompt('请输入快递公司:') || '顺丰速运'

    try {
      const response = await fetch(`${API_URL}/api/orders/admin/orders/${orderNo}/ship`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trackingNo, carrier }),
      })

      const data = await response.json()
      if (data.success) {
        alert('订单已发货')
        fetchOrders()
      }
    } catch (error) {
      console.error('订单发货失败:', error)
      alert('发货失败')
    }
  }

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: '待支付',
      paid: '已支付',
      shipped: '已发货',
      completed: '已完成',
      cancelled: '已取消',
      refunded: '已退款',
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-600',
      paid: 'bg-green-100 text-green-600',
      shipped: 'bg-blue-100 text-blue-600',
      completed: 'bg-purple-100 text-purple-600',
      cancelled: 'bg-gray-100 text-gray-600',
      refunded: 'bg-red-100 text-red-600',
    }
    return colorMap[status] || 'bg-gray-100 text-gray-600'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN')
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">订单管理</h1>
            <p className="text-gray-600 mt-1">管理果壳市集的所有订单</p>
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">全部状态</option>
            <option value="pending">待支付</option>
            <option value="paid">已支付</option>
            <option value="shipped">已发货</option>
            <option value="completed">已完成</option>
            <option value="cancelled">已取消</option>
          </select>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-500 py-8">加载中...</div>
          ) : orders.length === 0 ? (
            <div className="text-center text-gray-500 py-8">暂无订单</div>
          ) : (
            orders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-semibold text-gray-900">
                          订单号：{order.orderNo}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        下单时间：{formatDate(order.createdAt)}
                        {order.payTime && <span> · 支付时间：{formatDate(order.payTime)}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">¥{order.payAmount}</div>
                      <div className="text-sm text-gray-500">
                        共{order.items?.length || 0}件商品
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">客户:</span> {order.customerName}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">电话:</span> {order.customerPhone}
                      </div>
                      {order.customerEmail && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">邮箱:</span> {order.customerEmail}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{item.productName}</div>
                          <div className="text-sm text-gray-500">
                            ¥{item.price} × {item.quantity}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ¥{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      支付方式：
                      {order.payMethod === 'alipay'
                        ? '支付宝'
                        : order.payMethod === 'wechat'
                          ? '微信支付'
                          : order.payMethod || '未支付'}
                    </div>
                    {order.status === 'paid' && (
                      <Button variant="primary" onClick={() => handleShip(order.orderNo)}>
                        确认发货
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default ShopOrders
