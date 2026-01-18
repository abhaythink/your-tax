# 🇮🇳 Indian Income Tax Calculator

A simple, elegant, and interactive web application to calculate Indian income tax including surcharges and cess for FY 2024-25.

## Features

- ✅ Calculate income tax based on Indian tax slabs (New Tax Regime)
- ✅ Automatic standard deduction of ₹50,000
- ✅ Surcharge calculation for high-income earners
- ✅ Health & Education Cess (4%)
- ✅ Detailed tax breakdown with slab-wise calculations
- ✅ Modern, responsive UI
- ✅ Works as a static site (perfect for GitHub Pages)

## Tax Slabs (FY 2024-25)

- Up to ₹3,00,000: Nil
- ₹3,00,001 - ₹7,00,000: 5%
- ₹7,00,001 - ₹10,00,000: 10%
- ₹10,00,001 - ₹12,00,000: 15%
- ₹12,00,001 - ₹15,00,000: 20%
- Above ₹15,00,000: 30%

## Surcharge Rates (New Tax Regime - Capped at 25%)

- Income up to ₹50L: No surcharge
- Income ₹50L - ₹1Cr: 10% of tax (after rebate)
- Income ₹1Cr - ₹2Cr: 15% of tax (after rebate)
- Income above ₹2Cr: 25% of tax (after rebate) - **Capped at 25%**

**Note**: Under New Tax Regime, surcharge is capped at 25% (unlike Old Regime which has 37%).

## Section 87A Rebate

- For taxable income up to ₹7,00,000: Full tax rebate (zero tax)
- This means gross income up to ₹7,50,000 (after ₹50,000 standard deduction) results in zero tax

## Cess

4% on (Tax After Rebate + Surcharge)

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Deployment to GitHub Pages

### Quick Setup (Recommended - Automatic Deployment)

1. **Update the base path in `vite.config.ts`**:
   - Change `base: '/your-tax/'` to match your GitHub repository name
   - If your repo is `https://github.com/username/my-tax-calculator`, use `base: '/my-tax-calculator/'`
   - If your repo is `https://github.com/username/your-tax`, keep it as `base: '/your-tax/'`

2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/your-tax.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy when you push to `main` branch

4. **Your site will be live at**:
   - `https://username.github.io/your-tax/` (replace with your username and repo name)

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Install gh-pages
yarn add -D gh-pages

# Add deploy script to package.json (already added if using the workflow)
# "deploy": "yarn build && gh-pages -d dist"

# Deploy
yarn deploy
```

Then in GitHub Settings → Pages, select the `gh-pages` branch as the source.

## Important Notes

- This calculator uses the **New Tax Regime** for FY 2024-25 (Assessment Year 2025-26)
- **Surcharge is capped at 25%** under New Regime (not 37% like Old Regime)
- **Section 87A rebate** is automatically applied for taxable income up to ₹7,00,000
- This is a simplified calculator for estimation purposes. For accurate tax calculations, please consult a tax advisor.

## Calculation Order

1. Apply standard deduction (₹50,000)
2. Calculate income tax using progressive slabs
3. Apply Section 87A rebate (if applicable)
4. Calculate surcharge (based on gross income, applied to tax after rebate)
5. Calculate cess (4% on tax after rebate + surcharge)
6. Total tax = Tax after rebate + Surcharge + Cess

## License

MIT
