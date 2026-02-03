import CreateLoan from './pages/CreateLoan'
import LoansList from './pages/LoansList'

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <CreateLoan />
      <LoansList />
    </div>
  )
}

