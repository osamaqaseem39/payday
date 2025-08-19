'use client';

import { useState, useEffect } from 'react';

// Loan category data from the database
const loanCategories = [
  {
    id: 1,
    name: 'Personal Loan',
    status: 'Active',
    fixedRate: 13.00,
    maxDays: 25,
    maxLimit: 1500.00,
    loanType: 'Pay Day',
    companyFee: 10.00
  },
  {
    id: 2,
    name: 'Business Loan',
    status: 'Active',
    fixedRate: 10.00,
    maxDays: 75,
    maxLimit: 20000.00,
    loanType: 'Investors Fund',
    companyFee: 3000.00
  },
  {
    id: 3,
    name: 'Student Loan',
    status: 'Inactive',
    fixedRate: 5.00,
    maxDays: 120,
    maxLimit: 300000.00,
    loanType: 'Investors Fund',
    companyFee: 1000.00
  },
  {
    id: 4,
    name: 'Car Loan',
    status: 'Active',
    fixedRate: 8.75,
    maxDays: 540,
    maxLimit: 1000000.00,
    loanType: 'Peer To Peer',
    companyFee: 2500.00
  },
  {
    id: 5,
    name: 'Home Renovation Loan',
    status: 'Active',
    fixedRate: 9.50,
    maxDays: 365,
    maxLimit: 750000.00,
    loanType: 'Peer To Peer',
    companyFee: 1800.00
  }
];

// New Loan Calculation Formula
const calculateTotalLoanAmount = (amount: number, fixedRatePercentage: number) => {
  return amount + (fixedRatePercentage / 100 * amount);
};

const calculateInstallment = (totalLoanAmount: number, timeInDays: number, paymentFrequency: 'weekly' | 'monthly') => {
  if (paymentFrequency === 'weekly') {
    const weeks = Math.ceil(timeInDays / 7);
    return totalLoanAmount / weeks;
  } else {
    const months = Math.ceil(timeInDays / 30);
    return totalLoanAmount / months;
  }
};

export default function LoanCalculator() {
  const [selectedCategory, setSelectedCategory] = useState(loanCategories[0]);
  const [principal, setPrincipal] = useState(1500);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [fixedRateAmount, setFixedRateAmount] = useState(0);
  const [weeklyInstallment, setWeeklyInstallment] = useState(0);
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Update calculator values when loan category changes
  useEffect(() => {
    if (selectedCategory) {
      setPrincipal(Math.min(principal, selectedCategory.maxLimit));
    }
  }, [selectedCategory]);

  // Calculate loan details when inputs change
  useEffect(() => {
    if (principal > 0 && selectedCategory) {
      setIsCalculating(true);
      
      // Simulate calculation delay for better UX
      const timer = setTimeout(() => {
        const totalLoanAmount = calculateTotalLoanAmount(principal, selectedCategory.fixedRate);
        const fixedRate = totalLoanAmount - principal;
        const weeklyInstallment = calculateInstallment(totalLoanAmount, selectedCategory.maxDays, 'weekly');
        const monthlyInstallment = calculateInstallment(totalLoanAmount, selectedCategory.maxDays, 'monthly');

        setFixedRateAmount(fixedRate);
        setTotalRepayment(totalLoanAmount);
        setWeeklyInstallment(weeklyInstallment);
        setMonthlyInstallment(monthlyInstallment);
        
        setIsCalculating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [principal, selectedCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = loanCategories.find(cat => cat.id === parseInt(e.target.value));
    if (category) {
      setSelectedCategory(category);
    }
  };

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 100 && value <= selectedCategory.maxLimit) {
      setPrincipal(value);
    }
  };





  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Fixed Rate Loan Calculator with Installments
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our loan calculator to see exactly how much you'll pay and your weekly/monthly installments. 
            No surprises, no hidden fees - just clear, transparent pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Calculator Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-glow border border-white/20 animate-fade-in-left flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Calculate Your Loan</h3>
            <p className="text-gray-600 mb-6">Fill in the details below to see your loan breakdown.</p>
            
            <div className="space-y-6 flex-1">
              {/* Loan Category Selection */}
              <div>
                <label htmlFor="loanCategory" className="block text-lg font-semibold text-gray-800 mb-3">
                  Loan Category 🏦
                </label>
                <select
                  id="loanCategory"
                  value={selectedCategory.id}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                >
                  {loanCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} {category.status === 'Inactive' ? '(Currently Unavailable)' : ''}
                    </option>
                  ))}
                </select>
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-800 space-y-1">
                    <div className="flex justify-between">
                      <span>Loan Type:</span>
                      <span className="font-semibold">{selectedCategory.loanType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Amount:</span>
                      <span className="font-semibold">${selectedCategory.maxLimit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Term:</span>
                      <span className="font-semibold">{selectedCategory.maxDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Company Fee:</span>
                      <span className="font-semibold">${selectedCategory.companyFee.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>



              {/* Principal Amount */}
              <div>
                <label htmlFor="principal" className="block text-lg font-semibold text-gray-800 mb-3">
                  Principal Amount 💰
                </label>
                <div className="relative">
                  <input
                    type="range"
                    id="principal"
                    min="100"
                    max={selectedCategory.maxLimit}
                    step="100"
                    value={principal}
                    onChange={handlePrincipalChange}
                    className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-3">
                    <span className="text-xs">$100</span>
                    <span className="font-bold text-blue-600 text-lg">${principal.toLocaleString()}</span>
                    <span className="text-xs">${selectedCategory.maxLimit.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    💡 Enter the principal amount you want to borrow (max: ${selectedCategory.maxLimit.toLocaleString()}).
                  </p>
                </div>
              </div>

              {/* Fixed Rate Display */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Annual Fixed Rate 📊
                </label>
                <div className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-lg font-semibold text-blue-600">
                  {selectedCategory.fixedRate}%
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  💡 Fixed rate for {selectedCategory.name} - cannot be modified
                </p>
              </div>

              {/* Time Period Display */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Loan Term (Days) ⏰
                </label>
                <div className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-lg font-semibold text-blue-600">
                  {selectedCategory.maxDays} days
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  📊 Fixed term for {selectedCategory.name} - cannot be modified
                </p>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Quick Select Amount 🚀
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[1000, 5000, 10000, Math.min(25000, selectedCategory.maxLimit)].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setPrincipal(amount)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all duration-200 font-semibold ${
                        principal === amount
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600 shadow-lg scale-105'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-md hover:scale-102'
                      }`}
                    >
                      ${amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  🎯 These are popular loan amounts. Click to instantly set your amount.
                </p>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-glow-lg animate-fade-in-right animate-gradient flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Your Loan Summary</h3>
            <p className="text-blue-100 mb-6">Here's exactly what you'll pay - no surprises!</p>
            
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">🏦</span>
                  Loan Category
                </span>
                <span className="font-bold text-lg">{selectedCategory.name}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">💵</span>
                  Principal Amount
                </span>
                <span className="font-bold text-xl">${principal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">📊</span>
                  Fixed Rate
                </span>
                <span className="font-bold">{selectedCategory.fixedRate}%</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">⏰</span>
                  Loan Term
                </span>
                <span className="font-bold">{selectedCategory.maxDays} days</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">📈</span>
                  Fixed Rate Amount
                </span>
                <span className="font-bold">${fixedRateAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">💼</span>
                  Company Fee
                </span>
                <span className="font-bold">${selectedCategory.companyFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">📅</span>
                  Weekly Installment
                </span>
                <span className="font-bold">${weeklyInstallment.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">📅</span>
                  Monthly Installment
                </span>
                <span className="font-bold">${monthlyInstallment.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/20 rounded-lg border-2 border-white/30 hover:bg-white/25 transition-colors">
                <span className="font-bold flex items-center">
                  <span className="mr-2">🎯</span>
                  Total Repayment
                </span>
                <span className="font-bold text-2xl">${(totalRepayment + selectedCategory.companyFee).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <span className="mr-2">📅</span>
                Calculation Details
              </h4>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Calculation Type:</span>
                  <span className="font-semibold capitalize">Fixed Rate + Installments</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Type:</span>
                  <span className="font-semibold">{selectedCategory.loanType}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className="btn-primary text-white px-8 py-4 rounded-xl font-semibold w-full shadow-glow hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                🚀 Apply for This Loan
              </button>
              <p className="text-xs text-blue-100 mt-2">
                Application takes less than 5 minutes
              </p>
            </div>
          </div>
        </div>

        {/* Important Disclaimers */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Important Information</h4>
          <div className="text-sm text-yellow-700 space-y-2">
            <p>
              • This calculator provides estimates only. Actual loan terms and fees may vary based on your application.
            </p>
            <p>
              • Payday loans are short-term loans intended for emergency use only. Consider all alternatives before borrowing.
            </p>
            <p>
              • Late payments may result in additional fees and charges. Please ensure you can repay the loan on time.
            </p>
            <p>
              • APR rates are high due to the short-term nature of payday loans. Consider the total cost before borrowing.
            </p>
            <p>
              • This service is available to Canadian residents only. Rates and terms may vary by province.
            </p>
            <p>
              • Company fees are additional to the calculated fixed rate and will be added to your total repayment amount.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 