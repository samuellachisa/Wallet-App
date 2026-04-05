import { Navigate, Route, Routes } from 'react-router-dom'
import { TransactionDetail } from './components/TransactionDetail'
import { TransactionsList } from './components/TransactionsList'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<TransactionsList />} />
      <Route path="/transactions/:id" element={<TransactionDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
