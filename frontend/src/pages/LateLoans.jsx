import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function LateLoans() {
  const [loans, setLoans] = useState([])

  useEffect(() => {
    api.get('/loans/late').then(res => setLoans(res.data))
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-red-600 mb-4">
        Préstamos en Mora
      </h2>

      {loans.length === 0 && <p>No hay morosos 🎉</p>}

      {loans.map(l => (
        <div key={l.id} className="border-b py-2">
          <b>ID:</b> {l.id} — <b>Total:</b> ${l.totalAmount}
        </div>
      ))}
    </div>
  )
}
