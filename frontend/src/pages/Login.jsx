import { useState } from 'react'

export default function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  const login = () => {
    if (user === 'admin' && pass === '1234') {
      alert('Login correcto')
    } else {
      alert('Credenciales incorrectas')
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input className="input" placeholder="Usuario"
        onChange={e => setUser(e.target.value)} />

      <input className="input" type="password" placeholder="Contraseña"
        onChange={e => setPass(e.target.value)} />

      <button
        onClick={login}
        className="w-full bg-blue-600 text-white py-2 rounded">
        Entrar
      </button>
    </div>
  )
}
