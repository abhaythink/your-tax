# Indian Income Tax Calculation Rules (FY 2024-25)

This document outlines the exact tax calculation rules implemented in the calculator.

## 1. Standard Deduction

- **Amount**: ₹50,000
- **Applied to**: Gross Annual Income
- **Formula**: `Taxable Income = Gross Income - ₹50,000`

## 2. Income Tax Slabs (New Tax Regime - FY 2024-25)

Tax is calculated on **Taxable Income** (after standard deduction) using progressive slabs:

| Taxable Income Range | Tax Rate | Calculation |
|---------------------|----------|-------------|
| Up to ₹3,00,000 | 0% | Nil |
| ₹3,00,001 - ₹7,00,000 | 5% | 5% of (Income - ₹3,00,000) |
| ₹7,00,001 - ₹10,00,000 | 10% | 10% of (Income - ₹7,00,000) |
| ₹10,00,001 - ₹12,00,000 | 15% | 15% of (Income - ₹10,00,000) |
| ₹12,00,001 - ₹15,00,000 | 20% | 20% of (Income - ₹12,00,000) |
| Above ₹15,00,000 | 30% | 30% of (Income - ₹15,00,000) |

### Calculation Method (Progressive Tax)

Tax is calculated progressively, meaning:
- Each slab is calculated separately
- Only the amount in each slab is taxed at that rate
- Lower slabs are fully taxed before moving to higher slabs

**Example**: For taxable income of ₹8,00,000:
- First ₹3,00,000: 0% = ₹0
- Next ₹4,00,000 (₹3,00,001 to ₹7,00,000): 5% = ₹20,000
- Next ₹1,00,000 (₹7,00,001 to ₹8,00,000): 10% = ₹10,000
- **Total Tax (Before Rebate)**: ₹30,000

## 3. Section 87A Rebate

- **Applicable for**: Taxable income up to ₹7,00,000
- **Rebate Amount**: Full tax amount (making tax zero)
- **Formula**: If `taxableIncome ≤ ₹7,00,000`, then `rebate = tax` and `taxAfterRebate = 0`

**Important**: This means for taxable income up to ₹7,00,000, the final tax payable is **ZERO** (before surcharge and cess).

**Example**: 
- Taxable income: ₹7,00,000
- Tax calculated: ₹25,000 (5% of ₹5,00,000)
- Rebate: ₹25,000
- Tax after rebate: ₹0

## 4. Surcharge (New Tax Regime - Capped at 25%)

**Important**: Under the **New Tax Regime**, surcharge is **capped at 25%** (unlike Old Regime which has 37% for income above ₹5Cr).

Surcharge eligibility is based on **Gross Annual Income**, but the surcharge amount is calculated as a percentage of **Income Tax (after rebate)**:

| Gross Income Range | Surcharge Rate | Applied On |
|-------------------|----------------|------------|
| Up to ₹50,00,000 | 0% | No surcharge |
| ₹50,00,001 - ₹1,00,00,000 | 10% | 10% of Income Tax (after rebate) |
| ₹1,00,00,001 - ₹2,00,00,000 | 15% | 15% of Income Tax (after rebate) |
| Above ₹2,00,00,000 | **25% (capped)** | 25% of Income Tax (after rebate) |

**Key Points**:
- Surcharge eligibility is determined by **gross income** (before standard deduction)
- Surcharge amount is calculated on **income tax after rebate**
- Maximum surcharge under New Regime is **25%** (not 37%)

## 5. Health & Education Cess

- **Rate**: 4%
- **Applied on**: Income Tax (after rebate) + Surcharge
- **Formula**: `Cess = (Income Tax After Rebate + Surcharge) × 0.04`

## 6. Total Tax Calculation

```
Total Tax Payable = Income Tax (After Rebate) + Surcharge + Cess
```

## 7. Net Income

```
Net Income = Gross Annual Income - Total Tax Payable
```

## 8. Effective Tax Rate

```
Effective Tax Rate = (Total Tax Payable / Gross Annual Income) × 100
```

---

## Complete Calculation Examples

### Example 1: Income ₹7,50,000 (With Rebate)

1. **Standard Deduction**: ₹50,000
2. **Taxable Income**: ₹7,50,000 - ₹50,000 = ₹7,00,000

3. **Income Tax Calculation (Before Rebate)**:
   - Up to ₹3,00,000: 0% = ₹0
   - ₹3,00,001 - ₹7,00,000: 5% of ₹4,00,000 = ₹20,000
   - **Total Income Tax**: ₹20,000

4. **Section 87A Rebate**: ₹20,000 (full rebate as taxable income ≤ ₹7,00,000)
5. **Income Tax After Rebate**: ₹0

6. **Surcharge**: ₹0 (income < ₹50,00,000)

7. **Cess**: 4% of ₹0 = ₹0

8. **Total Tax**: ₹0 + ₹0 + ₹0 = ₹0

9. **Net Income**: ₹7,50,000 - ₹0 = ₹7,50,000

**Result**: Zero tax for income up to ₹7,50,000 (after standard deduction)!

---

### Example 2: Income ₹12,00,000

1. **Standard Deduction**: ₹50,000
2. **Taxable Income**: ₹12,00,000 - ₹50,000 = ₹11,50,000

3. **Income Tax Calculation (Before Rebate)**:
   - Up to ₹3,00,000: 0% = ₹0
   - ₹3,00,001 - ₹7,00,000: 5% of ₹4,00,000 = ₹20,000
   - ₹7,00,001 - ₹10,00,000: 10% of ₹3,00,000 = ₹30,000
   - ₹10,00,001 - ₹11,50,000: 15% of ₹1,50,000 = ₹22,500
   - **Total Income Tax**: ₹72,500

4. **Section 87A Rebate**: ₹0 (taxable income > ₹7,00,000)
5. **Income Tax After Rebate**: ₹72,500

6. **Surcharge**: ₹0 (income < ₹50,00,000)

7. **Cess**: 4% of ₹72,500 = ₹2,900

8. **Total Tax**: ₹72,500 + ₹0 + ₹2,900 = ₹75,400

9. **Net Income**: ₹12,00,000 - ₹75,400 = ₹11,24,600

---

### Example 3: Income ₹60,00,000 (With Surcharge)

1. **Standard Deduction**: ₹50,000
2. **Taxable Income**: ₹60,00,000 - ₹50,000 = ₹59,50,000

3. **Income Tax Calculation (Before Rebate)**:
   - Up to ₹3,00,000: 0% = ₹0
   - ₹3,00,001 - ₹7,00,000: 5% of ₹4,00,000 = ₹20,000
   - ₹7,00,001 - ₹10,00,000: 10% of ₹3,00,000 = ₹30,000
   - ₹10,00,001 - ₹12,00,000: 15% of ₹2,00,000 = ₹30,000
   - ₹12,00,001 - ₹15,00,000: 20% of ₹3,00,000 = ₹60,000
   - Above ₹15,00,000: 30% of ₹44,50,000 = ₹13,35,000
   - **Total Income Tax**: ₹14,75,000

4. **Section 87A Rebate**: ₹0 (taxable income > ₹7,00,000)
5. **Income Tax After Rebate**: ₹14,75,000

6. **Surcharge**: 10% of ₹14,75,000 = ₹1,47,500 (income between ₹50L-₹1Cr)

7. **Cess**: 4% of (₹14,75,000 + ₹1,47,500) = ₹64,900

8. **Total Tax**: ₹14,75,000 + ₹1,47,500 + ₹64,900 = ₹16,87,400

9. **Net Income**: ₹60,00,000 - ₹16,87,400 = ₹43,12,600

---

### Example 4: Income ₹3,00,00,000 (High Income - Surcharge Capped at 25%)

1. **Standard Deduction**: ₹50,000
2. **Taxable Income**: ₹3,00,00,000 - ₹50,000 = ₹2,99,50,000

3. **Income Tax Calculation (Before Rebate)**:
   - Up to ₹3,00,000: 0% = ₹0
   - ₹3,00,001 - ₹7,00,000: 5% of ₹4,00,000 = ₹20,000
   - ₹7,00,001 - ₹10,00,000: 10% of ₹3,00,000 = ₹30,000
   - ₹10,00,001 - ₹12,00,000: 15% of ₹2,00,000 = ₹30,000
   - ₹12,00,001 - ₹15,00,000: 20% of ₹3,00,000 = ₹60,000
   - Above ₹15,00,000: 30% of ₹2,84,50,000 = ₹85,35,000
   - **Total Income Tax**: ₹85,75,000

4. **Section 87A Rebate**: ₹0
5. **Income Tax After Rebate**: ₹85,75,000

6. **Surcharge**: **25%** of ₹85,75,000 = ₹21,43,750 (income > ₹2Cr, **capped at 25%**)

7. **Cess**: 4% of (₹85,75,000 + ₹21,43,750) = ₹4,28,750

8. **Total Tax**: ₹85,75,000 + ₹21,43,750 + ₹4,28,750 = ₹1,11,47,500

9. **Net Income**: ₹3,00,00,000 - ₹1,11,47,500 = ₹1,88,52,500

**Note**: Even though income is ₹3Cr, surcharge is capped at 25% (not 37%) under New Regime.

---

## Important Notes

1. **Tax Regime**: This calculator uses the **New Tax Regime** (FY 2024-25, AY 2025-26)
2. **Standard Deduction**: Automatically applied to all salaried individuals
3. **Section 87A Rebate**: For taxable income up to ₹7,00,000, tax is fully rebated (zero tax)
4. **Surcharge Cap**: Under New Regime, surcharge is **capped at 25%** (not 37% like Old Regime)
5. **Surcharge Base**: Surcharge eligibility based on **gross income**, but calculated on **income tax after rebate**
6. **Cess**: Always 4% on (Tax After Rebate + Surcharge)

## Key Differences: New Regime vs Old Regime

| Feature | New Regime | Old Regime |
|---------|-----------|------------|
| Surcharge Cap | 25% | 37% (for income > ₹5Cr) |
| Standard Deduction | ₹50,000 | ₹50,000 |
| Section 87A Rebate | Up to ₹7L taxable income | Up to ₹5L taxable income |

## Validation Checklist

When validating the calculator, check:
- [ ] Standard deduction of ₹50,000 is applied
- [ ] Tax slabs are calculated progressively (not flat rate)
- [ ] Section 87A rebate applies for taxable income ≤ ₹7,00,000
- [ ] Surcharge is capped at 25% (not 37%) for income > ₹2Cr
- [ ] Surcharge eligibility based on gross income
- [ ] Surcharge calculated on income tax after rebate
- [ ] Cess is 4% of (Tax After Rebate + Surcharge)
- [ ] All amounts are rounded appropriately
- [ ] Edge cases (exactly at slab boundaries) are handled correctly
- [ ] Income up to ₹7,50,000 (gross) results in zero tax
