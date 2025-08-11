'use client';

import { useState, useEffect } from 'react';

export default function LoanCalculator() {
  const [loanType, setLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState(1500);
  const [companyFee, setCompanyFee] = useState(0);
  const [investorShare, setInvestorShare] = useState(0);
  const [durationType, setDurationType] = useState('days');
  const [durationValue, setDurationValue] = useState(14);
  const [lateFee, setLateFee] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [perInstallment, setPerInstallment] = useState(0);
  const [lateInstallment, setLateInstallment] = useState(0);
  const [apr, setApr] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Update fees based on loan type
  useEffect(() => {
    if (loanType === 'personal') {
      setCompanyFee(10);
      setLateFee(20);
    } else if (loanType === 'payday') {
      setCompanyFee(5);
      setLateFee(5);
    } else {
      setCompanyFee(0);
      setLateFee(0);
    }
  }, [loanType]);

  // Calculate investor share based on loan amount
  useEffect(() => {
    if (loanAmount > 0) {
      const calculatedInvestorShare = (loanAmount / 100) * 13;
      setInvestorShare(calculatedInvestorShare);
    }
  }, [loanAmount]);

  // Calculate loan details when inputs change
  useEffect(() => {
    if (loanAmount > 0 && companyFee > 0 && investorShare > 0 && durationValue > 0) {
      setIsCalculating(true);
      
      // Simulate calculation delay for better UX
      const timer = setTimeout(() => {
        const calculatedTotal = loanAmount + companyFee + investorShare;
        setTotalRepayment(calculatedTotal);
        
        const calculatedPerInstallment = calculatedTotal / durationValue;
        setPerInstallment(calculatedPerInstallment);
        
        const calculatedLateInstallment = calculatedPerInstallment + lateFee;
        setLateInstallment(calculatedLateInstallment);
        
        // Calculate APR based on duration type
        const daysInTerm = durationType === 'days' ? durationValue : durationValue * 30;
        const calculatedApr = ((companyFee + investorShare) / loanAmount) * (365 / daysInTerm) * 100;
        setApr(Math.round(calculatedApr));
        
        setIsCalculating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [loanAmount, companyFee, investorShare, durationValue, durationType, lateFee]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 100 && value <= 1500) {
      setLoanAmount(value);
    }
  };

  const handleLoanTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoanType(e.target.value);
  };

  const handleDurationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDurationType(e.target.value);
  };

  const handleDurationValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setDurationValue(value);
    }
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Fixed Rate Loan Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our loan calculator to see exactly how much you'll pay. 
            No surprises, no hidden fees - just clear, transparent pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Calculator Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-glow border border-white/20 animate-fade-in-left flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Calculate Your Loan</h3>
            <p className="text-gray-600 mb-6">Fill in the details below to see your loan breakdown.</p>
            
            <div className="space-y-6 flex-1">
              {/* Loan Type */}
              <div>
                <label htmlFor="loanType" className="block text-lg font-semibold text-gray-800 mb-3">
                  Loan Type 🏦
                </label>
                <select
                  id="loanType"
                  value={loanType}
                  onChange={handleLoanTypeChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                >
                  <option value="">Select Type</option>
                  <option value="personal">Personal Loan</option>
                  <option value="payday">Payday Loan</option>
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  💡 Choose the loan type that best fits your needs.
                </p>
              </div>

              {/* Loan Amount */}
              <div>
                <label htmlFor="loanAmount" className="block text-lg font-semibold text-gray-800 mb-3">
                  How much do you need? 💰
                </label>
                <div className="relative">
                  <input
                    type="range"
                    id="loanAmount"
                    min="100"
                    max="1500"
                    step="100"
                    value={loanAmount}
                    onChange={handleAmountChange}
                    className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-3">
                    <span className="text-xs">$100</span>
                    <span className="font-bold text-blue-600 text-lg">${loanAmount.toLocaleString()}</span>
                    <span className="text-xs">$1,500</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    💡 Choose an amount that covers your emergency needs without borrowing more than necessary.
                  </p>
                </div>
              </div>

              {/* Company Fee (Read-only) */}
              <div>
                <label htmlFor="companyFee" className="block text-lg font-semibold text-gray-800 mb-3">
                  Company Fee 💼
                </label>
                <input
                  type="number"
                  id="companyFee"
                  value={companyFee}
                  readOnly
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  💡 Fixed company fee based on loan type.
                </p>
              </div>

              {/* Investor Share (Read-only) */}
              <div>
                <label htmlFor="investorShare" className="block text-lg font-semibold text-gray-800 mb-3">
                  Investor Share 📈
                </label>
                <input
                  type="number"
                  id="investorShare"
                  value={investorShare.toFixed(2)}
                  readOnly
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  💡 13% of loan amount goes to investors.
                </p>
              </div>

              {/* Duration Type */}
              <div>
                <label htmlFor="durationType" className="block text-lg font-semibold text-gray-800 mb-3">
                  Duration Type ⏰
                </label>
                <select
                  id="durationType"
                  value={durationType}
                  onChange={handleDurationTypeChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                >
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  ⚡ Choose how you want to measure the loan duration.
                </p>
              </div>

              {/* Number of Installments */}
              <div>
                <label htmlFor="durationValue" className="block text-lg font-semibold text-gray-800 mb-3">
                  Number of Installments 📅
                </label>
                <input
                  type="number"
                  id="durationValue"
                  value={durationValue}
                  onChange={handleDurationValueChange}
                  min="1"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  📊 How many payments you'll make to repay the loan.
                </p>
              </div>

              {/* Late Fee (Read-only) */}
              <div>
                <label htmlFor="lateFee" className="block text-lg font-semibold text-gray-800 mb-3">
                  Late Fee ⚠️
                </label>
                <input
                  type="number"
                  id="lateFee"
                  value={lateFee}
                  readOnly
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  💡 Additional fee if payment is late.
                </p>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Quick Select Amount 🚀
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[300, 500, 1000, 1500].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setLoanAmount(amount)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all duration-200 font-semibold ${
                        loanAmount === amount
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600 shadow-lg scale-105'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-md hover:scale-102'
                      }`}
                    >
                      ${amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  🎯 These are our most popular loan amounts. Click to instantly set your amount.
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
                  <span className="mr-2">💵</span>
                  Loan Amount
                </span>
                <span className="font-bold text-xl">${loanAmount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">💼</span>
                  Company Fee
                </span>
                <span className="font-bold">${companyFee.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">📈</span>
                  Investor Share
                </span>
                <span className="font-bold">${investorShare.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">⏰</span>
                  Duration
                </span>
                <span className="font-bold">{durationValue} {durationType}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">📊</span>
                  Per Installment
                </span>
                <span className="font-bold">${perInstallment.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  Installment with Late Fee
                </span>
                <span className="font-bold">${lateInstallment.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/20 rounded-lg border-2 border-white/30 hover:bg-white/25 transition-colors">
                <span className="font-bold flex items-center">
                  <span className="mr-2">🎯</span>
                  Total Repayment
                </span>
                <span className="font-bold text-2xl">${totalRepayment.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">📊</span>
                  APR
                </span>
                <span className="font-bold">{apr.toLocaleString()}%</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <span className="mr-2">📅</span>
                Payment Schedule
              </h4>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Number of Payments:</span>
                  <span className="font-semibold">{durationValue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Amount:</span>
                  <span className="font-semibold">${perInstallment.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Late Payment Amount:</span>
                  <span className="font-semibold">${lateInstallment.toFixed(2)}</span>
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
          </div>
        </div>
      </div>
    </section>
  );
} 