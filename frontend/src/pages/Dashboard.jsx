import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Dashboard() {
  const [data, setData] = useState({ total: 0, paid: 0 })

  useEffect(() => {
    api.get('/loans').then(res => {
      const total = res.data.reduce((a, b) => a + b.totalAmount, 0)
      const paid = res.data.reduce((a, b) => a + b.paidAmount, 0)
      setData({ total, paid })
    })
  }, [])

  return (
    <div className="max-w-3xl mx-auto mt-6 grid grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded shadow text-center">
        <h3>Total Prestado</h3>
        <p className="text-2xl font-bold">${data.total}</p>
      </div>

      <div className="bg-white p-6 rounded shadow text-center">
        <h3>Total Cobrado</h3>
        <p className="text-2xl font-bold text-green-600">
          ${data.paid}
        </p>
      </div>
    </div>
  )
}
