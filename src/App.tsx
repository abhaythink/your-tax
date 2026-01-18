import { useState } from 'react'
import './App.css'

interface TaxBreakdown {
  taxableIncome: number
  tax: number
  rebate: number
  taxAfterRebate: number
  surcharge: number
  cess: number
  totalTax: number
  netIncome: number
  effectiveRate: number
  marginalRate: number
  monthlyTax: number
  monthlyTakeHome: number
  topSlabContribution: number
  topSlabPercentage: number
  badges: string[]
  taxSlabs: Array<{
    range: string
    rate: number
    amount: number
  }>
}

interface RegimeComparison {
  newRegime: TaxBreakdown
  oldRegime: TaxBreakdown
  betterRegime: 'new' | 'old' | 'equal'
  savings: number
}

function calculateOldRegimeTax(income: number): TaxBreakdown {
  const standardDeduction = 50000
  const taxableIncome = Math.max(0, income - standardDeduction)

  let tax = 0
  const taxSlabs: Array<{ range: string; rate: number; amount: number }> = []
  const badges: string[] = []

  // Old Tax Regime slabs for FY 2024-25
  if (taxableIncome > 1000000) {
    const amount = taxableIncome - 1000000
    tax += amount * 0.30
    taxSlabs.push({ range: 'Above ₹10,00,000', rate: 30, amount })
    badges.push('🔴 Highest slab reached (30%)')
  }
  if (taxableIncome > 500000) {
    const amount = Math.min(taxableIncome - 500000, 500000)
    tax += amount * 0.20
    taxSlabs.push({ range: '₹5,00,001 - ₹10,00,000', rate: 20, amount })
  }
  if (taxableIncome > 250000) {
    const amount = Math.min(taxableIncome - 250000, 250000)
    tax += amount * 0.05
    taxSlabs.push({ range: '₹2,50,001 - ₹5,00,000', rate: 5, amount })
  }
  if (taxableIncome <= 250000) {
    taxSlabs.push({ range: 'Up to ₹2,50,000', rate: 0, amount: 0 })
  }

  taxSlabs.reverse()

  // Section 87A Rebate (Old Regime): Up to ₹12,500 for taxable income up to ₹5,00,000
  let rebate = 0
  let taxAfterRebate = tax
  if (taxableIncome <= 500000) {
    rebate = Math.min(tax, 12500)
    taxAfterRebate = tax - rebate
    if (rebate > 0) {
      badges.push('🟢 Section 87A rebate applied')
    }
  } else {
    badges.push('🔴 Section 87A rebate not applicable')
  }

  // Calculate surcharge (Old Regime - can go up to 37%)
  let surcharge = 0
  if (income > 50000000) {
    surcharge = taxAfterRebate * 0.37
    badges.push('🔴 Maximum surcharge (37%) applied')
  } else if (income > 20000000) {
    surcharge = taxAfterRebate * 0.25
  } else if (income > 10000000) {
    surcharge = taxAfterRebate * 0.15
  } else if (income > 5000000) {
    surcharge = taxAfterRebate * 0.10
  } else {
    badges.push('🟢 No surcharge applicable')
  }

  const cess = (taxAfterRebate + surcharge) * 0.04
  const totalTax = taxAfterRebate + surcharge + cess
  const netIncome = income - totalTax
  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0

  // Marginal tax rate (highest slab rate)
  let marginalRate = 0
  if (taxableIncome > 1000000) marginalRate = 30
  else if (taxableIncome > 500000) marginalRate = 20
  else if (taxableIncome > 250000) marginalRate = 5
  else marginalRate = 0

  // Monthly calculations
  const monthlyTax = totalTax / 12
  const monthlyTakeHome = netIncome / 12

  // Top slab contribution
  const topSlabTax = taxableIncome > 1000000 ? (taxableIncome - 1000000) * 0.30 : 0
  const topSlabContribution = topSlabTax
  const topSlabPercentage = tax > 0 ? (topSlabContribution / tax) * 100 : 0

  return {
    taxableIncome,
    tax,
    rebate,
    taxAfterRebate,
    surcharge,
    cess,
    totalTax,
    netIncome,
    effectiveRate,
    marginalRate,
    monthlyTax,
    monthlyTakeHome,
    topSlabContribution,
    topSlabPercentage,
    badges,
    taxSlabs
  }
}

function calculateTax(income: number): TaxBreakdown {
  const standardDeduction = 50000
  const taxableIncome = Math.max(0, income - standardDeduction)

  let tax = 0
  const taxSlabs: Array<{ range: string; rate: number; amount: number }> = []
  const badges: string[] = []

  // Tax slabs for FY 2024-25 (New Tax Regime)
  if (taxableIncome > 1500000) {
    const amount = taxableIncome - 1500000
    tax += amount * 0.30
    taxSlabs.push({ range: 'Above ₹15,00,000', rate: 30, amount })
    badges.push('🔴 Highest slab reached (30%)')
  }
  if (taxableIncome > 1200000) {
    const amount = Math.min(taxableIncome - 1200000, 300000)
    tax += amount * 0.20
    taxSlabs.push({ range: '₹12,00,001 - ₹15,00,000', rate: 20, amount })
  }
  if (taxableIncome > 1000000) {
    const amount = Math.min(taxableIncome - 1000000, 200000)
    tax += amount * 0.15
    taxSlabs.push({ range: '₹10,00,001 - ₹12,00,000', rate: 15, amount })
  }
  if (taxableIncome > 700000) {
    const amount = Math.min(taxableIncome - 700000, 300000)
    tax += amount * 0.10
    taxSlabs.push({ range: '₹7,00,001 - ₹10,00,000', rate: 10, amount })
  }
  if (taxableIncome > 300000) {
    const amount = Math.min(taxableIncome - 300000, 400000)
    tax += amount * 0.05
    taxSlabs.push({ range: '₹3,00,001 - ₹7,00,000', rate: 5, amount })
  }
  if (taxableIncome <= 300000) {
    taxSlabs.push({ range: 'Up to ₹3,00,000', rate: 0, amount: 0 })
  }

  taxSlabs.reverse()

  // Section 87A Rebate: For taxable income up to ₹7,00,000, rebate equals tax
  let rebate = 0
  let taxAfterRebate = tax
  if (taxableIncome <= 700000 && tax > 0) {
    rebate = tax
    taxAfterRebate = 0
    badges.push('🟢 Section 87A rebate applied')
  } else if (taxableIncome > 700000) {
    badges.push('🔴 Section 87A rebate not applicable')
  }

  // Calculate surcharge (New Tax Regime - capped at 25%)
  let surcharge = 0
  if (income > 20000000) {
    surcharge = taxAfterRebate * 0.25
    badges.push('🟡 Surcharge capped at 25% (New Regime)')
  } else if (income > 10000000) {
    surcharge = taxAfterRebate * 0.15
  } else if (income > 5000000) {
    surcharge = taxAfterRebate * 0.10
  } else {
    badges.push('🟢 No surcharge applicable')
  }

  const cess = (taxAfterRebate + surcharge) * 0.04
  const totalTax = taxAfterRebate + surcharge + cess
  const netIncome = income - totalTax
  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0

  // Marginal tax rate (highest slab rate)
  let marginalRate = 0
  if (taxableIncome > 1500000) marginalRate = 30
  else if (taxableIncome > 1200000) marginalRate = 20
  else if (taxableIncome > 1000000) marginalRate = 15
  else if (taxableIncome > 700000) marginalRate = 10
  else if (taxableIncome > 300000) marginalRate = 5
  else marginalRate = 0

  // Monthly calculations
  const monthlyTax = totalTax / 12
  const monthlyTakeHome = netIncome / 12

  // Top slab contribution
  const topSlabTax = taxableIncome > 1500000 ? (taxableIncome - 1500000) * 0.30 : 0
  const topSlabContribution = topSlabTax
  const topSlabPercentage = tax > 0 ? (topSlabContribution / tax) * 100 : 0

  return {
    taxableIncome,
    tax,
    rebate,
    taxAfterRebate,
    surcharge,
    cess,
    totalTax,
    netIncome,
    effectiveRate,
    marginalRate,
    monthlyTax,
    monthlyTakeHome,
    topSlabContribution,
    topSlabPercentage,
    badges,
    taxSlabs
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

function formatIndianNumber(value: string): string {
  const numbers = value.replace(/\D/g, '')
  if (!numbers) return ''
  const num = parseInt(numbers, 10)
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(num)
}

function parseIndianNumber(value: string): number {
  return parseFloat(value.replace(/,/g, '')) || 0
}

function App() {
  const [income, setIncome] = useState<string>('')
  const [breakdown, setBreakdown] = useState<TaxBreakdown | null>(null)
  const [comparison, setComparison] = useState<RegimeComparison | null>(null)
  const [showComparison, setShowComparison] = useState(true)

  const handleCalculate = () => {
    const incomeValue = parseIndianNumber(income)
    if (incomeValue > 0) {
      const newRegime = calculateTax(incomeValue)
      const oldRegime = calculateOldRegimeTax(incomeValue)
      
      setBreakdown(newRegime)
      
      const savings = oldRegime.totalTax - newRegime.totalTax
      const betterRegime: 'new' | 'old' | 'equal' = 
        savings > 0 ? 'new' : savings < 0 ? 'old' : 'equal'
      
      setComparison({
        newRegime,
        oldRegime,
        betterRegime,
        savings: Math.abs(savings)
      })
    } else {
      setBreakdown(null)
      setComparison(null)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const formatted = formatIndianNumber(inputValue)
    setIncome(formatted)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCalculate()
    }
  }

  // Calculate "what if" insight
  const getWhatIfInsight = (breakdown: TaxBreakdown) => {
    if (breakdown.taxableIncome <= 1500000) return null
    
    // If ₹5L of income were below ₹15L threshold
    const hypotheticalReduction = 500000 * 0.10 // 10% difference between 20% and 30%
    return {
      amount: hypotheticalReduction,
      message: `If ₹5L of income were below ₹15L threshold, tax would reduce by approximately ${formatCurrency(hypotheticalReduction)}`
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>🇮🇳 Indian Income Tax Calculator</h1>
          <p className="subtitle">Calculate your income tax, surcharge & cess for FY 2024-25</p>
        </header>

        <div className="calculator-card">
          <div className="input-section">
            <label htmlFor="income">Annual Income (₹)</label>
            <div className="input-wrapper">
              <div className="input-with-prefix">
                <span className="currency-prefix">₹</span>
                <input
                  id="income"
                  type="text"
                  inputMode="numeric"
                  placeholder="12,00,000"
                  value={income}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="income-input"
                />
              </div>
              <button onClick={handleCalculate} className="calculate-btn">
                Calculate
              </button>
            </div>
            <p className="input-hint">Standard deduction of ₹50,000 is applied automatically</p>
          </div>

          {breakdown && (
            <div className="results-section">
              {/* Badges */}
              {breakdown.badges.length > 0 && (
                <div className="badges-section">
                  {breakdown.badges.map((badge, index) => (
                    <span key={index} className="badge">{badge}</span>
                  ))}
                </div>
              )}

              {/* Summary Cards */}
              <div className="summary-grid">
                <div className="summary-card primary">
                  <div className="summary-label">Total Tax Payable</div>
                  <div className="summary-value">{formatCurrency(breakdown.totalTax)}</div>
                </div>
                <div className="summary-card">
                  <div className="summary-label">Net Income</div>
                  <div className="summary-value">{formatCurrency(breakdown.netIncome)}</div>
                </div>
                <div className="summary-card">
                  <div className="summary-label">Effective Tax Rate</div>
                  <div className="summary-value">{breakdown.effectiveRate.toFixed(2)}%</div>
                </div>
              </div>

              {/* Monthly Breakup */}
              <div className="monthly-section">
                <h3>Monthly Breakdown</h3>
                <div className="monthly-grid">
                  <div className="monthly-card">
                    <div className="monthly-label">Monthly Tax</div>
                    <div className="monthly-value">{formatCurrency(breakdown.monthlyTax)}</div>
                  </div>
                  <div className="monthly-card">
                    <div className="monthly-label">Monthly Take-Home (approx)</div>
                    <div className="monthly-value">{formatCurrency(breakdown.monthlyTakeHome)}</div>
                  </div>
                </div>
              </div>

              {/* Marginal Tax Rate */}
              <div className="insight-section">
                <div className="insight-card">
                  <div className="insight-label">Marginal Tax Rate</div>
                  <div className="insight-value">{breakdown.marginalRate}%</div>
                  <div className="insight-detail">
                    Each additional ₹1 earns ₹{(1 - breakdown.marginalRate / 100).toFixed(2)} after tax
                  </div>
                </div>
              </div>

              {/* Top Slab Contribution */}
              {breakdown.topSlabPercentage > 0 && (
                <div className="insight-section">
                  <div className="insight-card">
                    <div className="insight-label">Top Slab Contribution</div>
                    <div className="insight-value">{breakdown.topSlabPercentage.toFixed(1)}%</div>
                    <div className="insight-detail">
                      {breakdown.topSlabPercentage.toFixed(0)}% of your tax comes from income above ₹15,00,000
                    </div>
                  </div>
                </div>
              )}

              {/* What If Insight */}
              {getWhatIfInsight(breakdown) && (
                <div className="whatif-section">
                  <div className="whatif-card">
                    <div className="whatif-icon">💡</div>
                    <div className="whatif-content">
                      <div className="whatif-title">Tax Optimization Insight</div>
                      <div className="whatif-text">{getWhatIfInsight(breakdown)!.message}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Regime Comparison */}
              {comparison && showComparison && (
                <div className="comparison-section">
                  <div className="comparison-header">
                    <h3>Regime Comparison</h3>
                    <button 
                      className="toggle-btn"
                      onClick={() => setShowComparison(!showComparison)}
                    >
                      {showComparison ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                      <thead>
                        <tr>
                          <th className="table-header">Regime</th>
                          <th className="table-header">Total Tax</th>
                          <th className="table-header">Net Income</th>
                          <th className="table-header">Better?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={comparison.betterRegime === 'new' ? 'better-row' : ''}>
                          <td className="table-label">New Regime</td>
                          <td className="table-value">{formatCurrency(comparison.newRegime.totalTax)}</td>
                          <td className="table-value">{formatCurrency(comparison.newRegime.netIncome)}</td>
                          <td className="table-value">
                            {comparison.betterRegime === 'new' ? '✅ Yes' : '—'}
                          </td>
                        </tr>
                        <tr className={comparison.betterRegime === 'old' ? 'better-row' : ''}>
                          <td className="table-label">Old Regime</td>
                          <td className="table-value">{formatCurrency(comparison.oldRegime.totalTax)}</td>
                          <td className="table-value">{formatCurrency(comparison.oldRegime.netIncome)}</td>
                          <td className="table-value">
                            {comparison.betterRegime === 'old' ? '✅ Yes' : '—'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {comparison.savings > 0 && (
                    <div className="savings-badge">
                      {comparison.betterRegime === 'new' ? 'New' : 'Old'} Regime saves you {formatCurrency(comparison.savings)} per year
                    </div>
                  )}
                </div>
              )}

              {/* Tax Breakdown */}
              <div className="breakdown-section">
                <h3>Tax Breakdown</h3>
                <table className="breakdown-table">
                  <tbody>
                    <tr>
                      <td className="table-label">Taxable Income</td>
                      <td className="table-value">{formatCurrency(breakdown.taxableIncome)}</td>
                    </tr>
                    <tr>
                      <td className="table-label">Income Tax (Before Rebate)</td>
                      <td className="table-value">{formatCurrency(breakdown.tax)}</td>
                    </tr>
                    {breakdown.rebate > 0 && (
                      <tr className="rebate-row">
                        <td className="table-label">Section 87A Rebate</td>
                        <td className="table-value rebate-value">-{formatCurrency(breakdown.rebate)}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="table-label">Income Tax (After Rebate)</td>
                      <td className="table-value">{formatCurrency(breakdown.taxAfterRebate)}</td>
                    </tr>
                    {breakdown.surcharge > 0 && (
                      <tr>
                        <td className="table-label">Surcharge</td>
                        <td className="table-value">{formatCurrency(breakdown.surcharge)}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="table-label">Health & Education Cess (4%)</td>
                      <td className="table-value">{formatCurrency(breakdown.cess)}</td>
                    </tr>
                    <tr className="total-row">
                      <td className="table-label">Total Tax Payable</td>
                      <td className="table-value total-value">{formatCurrency(breakdown.totalTax)}</td>
                    </tr>
                  </tbody>
                </table>
                {breakdown.rebate > 0 && (
                  <div className="rebate-note">
                    💡 Tax rebate under Section 87A: For taxable income up to ₹7,00,000, tax is fully rebated.
                  </div>
                )}
              </div>

              {/* Tax Slabs */}
              {breakdown.taxSlabs.length > 0 && (
                <div className="slabs-section">
                  <h3>Tax Slabs Applied</h3>
                  <table className="slabs-table">
                    <thead>
                      <tr>
                        <th className="table-header">Income Range</th>
                        <th className="table-header">Tax Rate</th>
                        <th className="table-header">Tax Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {breakdown.taxSlabs.map((slab, index) => (
                        <tr key={index}>
                          <td className="table-label">{slab.range}</td>
                          <td className="table-value">{slab.rate}%</td>
                          <td className="table-value">
                            {slab.amount > 0 ? formatCurrency(slab.amount * (slab.rate / 100)) : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        <footer>
          <p>Calculated as per Finance Act 2023, applicable for FY 2024-25 (AY 2025-26)</p>
          <p>Based on New Tax Regime for FY 2024-25 (Assessment Year 2025-26)</p>
          <p className="disclaimer">This is a simplified calculator. Consult a tax advisor for accurate calculations.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
