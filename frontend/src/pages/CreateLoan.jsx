import { useState } from 'react'
import { api } from '../services/api'

export default function CreateLoan() {
  const [amount, setAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [installments, setInstallments] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    try {
      setLoading(true)
      await api.post('/loans', {
        amount: Number(amount),
        interestRate: Number(interestRate),
        installments: Number(installments),
      })
      alert('✅ Préstamo creado')
      setAmount('')
      setInterestRate('')
      setInstallments('')
    } catch (e) {
      alert('❌ Error al crear préstamo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Nuevo Préstamo</h1>

      <input className="input" placeholder="Monto"
        value={amount}
        onChange={e => setAmount(e.target.value)} />

      <input className="input" placeholder="Interés %"
        value={interestRate}
        onChange={e => setInterestRate(e.target.value)} />

      <input className="input" placeholder="Cuotas"
        value={installments}
        onChange={e => setInstallments(e.target.value)} />

      <button
        onClick={submit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded mt-4"
      >
        {loading ? 'Guardando...' : 'Crear Préstamo'}
      </button>
    </div>
  )
}
