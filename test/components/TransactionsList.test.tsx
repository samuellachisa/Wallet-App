import { render, screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TransactionDetail } from '../../src/components/TransactionDetail'
import { TransactionsList } from '../../src/components/TransactionsList'

function renderListOnly(ui: ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

function renderDetailAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/transactions/:id" element={<TransactionDetail />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('TransactionsList', () => {
  it('renders dashboard cards from wallet data', () => {
    renderListOnly(<TransactionsList />)

    expect(screen.getByText('Card Balance')).toBeInTheDocument()
    expect(screen.getByText('Daily Points')).toBeInTheDocument()
    expect(screen.getByText('No Payment Due')).toBeInTheDocument()
    expect(screen.getByText(/You've paid your September balance/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Latest Transactions/i })).toBeInTheDocument()
  })

  it('lists merchant rows with links to details', () => {
    renderListOnly(<TransactionsList />)

    expect(screen.getAllByText('Apple').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Payment').length).toBeGreaterThanOrEqual(1)
    expect(
      screen.getAllByRole('link', { name: /IKEA/i }).length,
    ).toBeGreaterThanOrEqual(1)
    expect(
      screen.getAllByRole('link', { name: /Target/i }).length,
    ).toBeGreaterThanOrEqual(1)
  })

  it('uses detail URLs on row links', () => {
    renderListOnly(<TransactionsList />)
    const appleLink = screen.getAllByText('Apple')[0]?.closest('a')
    expect(appleLink).toHaveAttribute('href', '/transactions/tx-apple-pending')
  })
})

describe('TransactionDetail', () => {
  it('renders pending Apple transaction from a deep link', () => {
    renderDetailAt('/transactions/tx-apple-pending')

    expect(
      screen.queryByRole('heading', { name: /Latest Transactions/i }),
    ).not.toBeInTheDocument()
    expect(screen.getByText('Status: Pending')).toBeInTheDocument()
    expect(screen.getAllByText('$14.06').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })
})
