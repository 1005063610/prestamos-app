import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function LoansList() {
  const [loans, setLoans] = useState([])

  useEffect(() => {
    api.get('/loans').then(res => setLoans(res.data))
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Préstamos</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Monto</th>
            <th>Total</th>
            <th>Cuota</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(l => (
            <tr key={l.id} className="text-center border-t">
              <td>${l.amount}</td>
              <td>${l.totalAmount}</td>
              <td>${l.installmentAmount}</td>
              <td
                className={
                  l.status === 'LATE'
                    ? 'text-red-600 font-bold'
                    : 'text-green-600'
                }
              >
                {l.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
