import { useState } from 'react'
import { api } from '../services/api'

export default function DailyPayment() {
  const [loanId, setLoanId] = useState('')
  const [amount, setAmount] = useState('')

  const pay = async () => {
    await api.post(`/payments/daily/${loanId}`, {
      amount: Number(amount),
    })
    alert('Pago registrado')
  }

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded shadow">
      <h2 className="font-bold mb-3">Pago Diario</h2>

      <input className="input" placeholder="ID préstamo"
        onChange={e => setLoanId(e.target.value)} />

      <input className="input" placeholder="Monto"
        onChange={e => setAmount(e.target.value)} />

      <button
        onClick={pay}
        className="w-full bg-green-600 text-white py-2 rounded">
        Registrar pago
      </button>
    </div>
  )
}
