'use client';

import { useState, useEffect } from 'react';

// Simple Interest
const simpleInterest = (principal: number, rate: number, time: number) => {
  return principal * (rate / 100) * (time / 365);
};

// Compound Interest
const compoundInterest = (principal: number, rate: number, time: number, frequency: number = 1) => {
  return principal * Math.pow(1 + (rate / 100) / frequency, frequency * time) - principal;
};

// Monthly Payment (EMI)
const monthlyPayment = (principal: number, rate: number, months: number) => {
  const monthlyRate = rate / 100 / 12;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
         (Math.pow(1 + monthlyRate, months) - 1);
};

export default function LoanCalculator() {
  const [calculationType, setCalculationType] = useState('simple');
  const [principal, setPrincipal] = useState(1500);
  const [rate, setRate] = useState(15);
  const [time, setTime] = useState(30);
  const [frequency, setFrequency] = useState(12);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate loan details when inputs change
  useEffect(() => {
    if (principal > 0 && rate > 0 && time > 0) {
      setIsCalculating(true);
      
      // Simulate calculation delay for better UX
      const timer = setTimeout(() => {
        let interest = 0;
        let total = 0;
        let emi = 0;

        switch (calculationType) {
          case 'simple':
            interest = simpleInterest(principal, rate, time);
            total = principal + interest;
            break;
          case 'compound':
            interest = compoundInterest(principal, rate, time, frequency);
            total = principal + interest;
            break;
          case 'emi':
            emi = monthlyPayment(principal, rate, time);
            total = emi * time;
            interest = total - principal;
            break;
        }

        setInterestAmount(interest);
        setTotalRepayment(total);
        setMonthlyEMI(emi);
        
        setIsCalculating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [principal, rate, time, frequency, calculationType]);

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 100 && value <= 50000) {
      setPrincipal(value);
    }
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value >= 0 && value <= 100) {
      setRate(value);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setTime(value);
    }
  };

  const handleCalculationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCalculationType(e.target.value);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(parseInt(e.target.value));
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
              {/* Calculation Type */}
              <div>
                <label htmlFor="calculationType" className="block text-lg font-semibold text-gray-800 mb-3">
                  Calculation Type 🏦
                </label>
                <select
                  id="calculationType"
                  value={calculationType}
                  onChange={handleCalculationTypeChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                >
                  <option value="simple">Simple Interest</option>
                  <option value="compound">Compound Interest</option>
                  <option value="emi">Monthly EMI</option>
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  💡 Choose the type of interest calculation you want to use.
                </p>
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
                    max="50000"
                    step="100"
                    value={principal}
                    onChange={handlePrincipalChange}
                    className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-3">
                    <span className="text-xs">$100</span>
                    <span className="font-bold text-blue-600 text-lg">${principal.toLocaleString()}</span>
                    <span className="text-xs">$50,000</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    💡 Enter the principal amount you want to borrow.
                  </p>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label htmlFor="rate" className="block text-lg font-semibold text-gray-800 mb-3">
                  Annual Interest Rate (%) 📊
                </label>
                <input
                  type="number"
                  id="rate"
                  value={rate}
                  onChange={handleRateChange}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  💡 Enter the annual interest rate as a percentage.
                </p>
              </div>

              {/* Time Period */}
              <div>
                <label htmlFor="time" className="block text-lg font-semibold text-gray-800 mb-3">
                  {calculationType === 'emi' ? 'Loan Term (Months)' : 'Time Period (Days)'} ⏰
                </label>
                <input
                  type="number"
                  id="time"
                  value={time}
                  onChange={handleTimeChange}
                  min="1"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  📊 {calculationType === 'emi' ? 'Enter the loan term in months.' : 'Enter the time period in days.'}
                </p>
              </div>

              {/* Compounding Frequency (for compound interest) */}
              {calculationType === 'compound' && (
                <div>
                  <label htmlFor="frequency" className="block text-lg font-semibold text-gray-800 mb-3">
                    Compounding Frequency 📈
                  </label>
                  <select
                    id="frequency"
                    value={frequency}
                    onChange={handleFrequencyChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                  >
                    <option value="1">Annually</option>
                    <option value="2">Semi-annually</option>
                    <option value="4">Quarterly</option>
                    <option value="12">Monthly</option>
                    <option value="365">Daily</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-2">
                    💡 How often interest is compounded per year.
                  </p>
                </div>
              )}

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Quick Select Amount 🚀
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[1000, 5000, 10000, 25000].map((amount) => (
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
                  <span className="mr-2">💵</span>
                  Principal Amount
                </span>
                <span className="font-bold text-xl">${principal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">📊</span>
                  Interest Rate
                </span>
                <span className="font-bold">{rate}%</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">⏰</span>
                  Time Period
                </span>
                <span className="font-bold">{time} {calculationType === 'emi' ? 'months' : 'days'}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <span className="flex items-center">
                  <span className="mr-2">📈</span>
                  Interest Amount
                </span>
                <span className="font-bold">${interestAmount.toFixed(2)}</span>
              </div>
              
              {calculationType === 'emi' && monthlyEMI > 0 && (
                <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                  <span className="flex items-center">
                    <span className="mr-2">📊</span>
                    Monthly EMI
                  </span>
                  <span className="font-bold">${monthlyEMI.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center p-4 bg-white/20 rounded-lg border-2 border-white/30 hover:bg-white/25 transition-colors">
                <span className="font-bold flex items-center">
                  <span className="mr-2">🎯</span>
                  Total Repayment
                </span>
                <span className="font-bold text-2xl">${totalRepayment.toFixed(2)}</span>
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
                  <span className="font-semibold capitalize">{calculationType} Interest</span>
                </div>
                {calculationType === 'compound' && (
                  <div className="flex justify-between">
                    <span>Compounding Frequency:</span>
                    <span className="font-semibold">{frequency} times per year</span>
                  </div>
                )}
                {calculationType === 'emi' && (
                  <div className="flex justify-between">
                    <span>Number of Payments:</span>
                    <span className="font-semibold">{time}</span>
                  </div>
                )}
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