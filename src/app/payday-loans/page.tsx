'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaMoneyBillWave, FaCalculator, FaShieldAlt, FaClock, FaCheckCircle, FaUsers, FaChartLine, FaMobile, FaCreditCard, FaHandshake, FaGlobe, FaLock, FaRocket, FaHeart, FaEye, FaArrowRight, FaCar, FaHome, FaUtensils, FaPlane, FaUserTie, FaGraduationCap, FaBriefcase, FaGlobeAmericas, FaChartBar, FaLaptop, FaComments, FaUpload, FaBell, FaQuoteLeft, FaStethoscope, FaAmbulance, FaUserInjured, FaSmile, FaLightbulb, FaTools, FaShoppingCart } from 'react-icons/fa';

export default function PaydayLoansPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pt-16">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator" 
        style={{ width: `${scrollProgress}%` }}
      ></div>
      
      <Header />
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                  <FaMoneyBillWave className="text-white text-2xl" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Payday Loans —
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  Quick Cash When You Need It Most
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                Get fast, secure, and transparent payday loans with fixed fees—no hidden charges, no surprises.
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                When life throws unexpected expenses your way—car repairs, emergency bills, or unplanned travel—Payday Express 
                is here to help with smart, ethical, and blockchain-backed payday loans. Designed to give you access to 
                short-term funds without the stress of traditional high-interest lending, our platform offers a faster, 
                fairer way to borrow.
              </p>
              <div className="mt-10">
                <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Apply Now
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/images/paydayloan.png"
                  alt="Payday Loans - Payday Express"
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-blue-600/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Is a Payday Loan */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What Is a Payday Loan?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A payday loan is a short-term loan designed to provide immediate financial relief until your next paycheck. 
                It's a practical solution for individuals who need small amounts of money—typically between $150 to $1,500—to 
                cover urgent or unforeseen expenses.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Unlike traditional loans, payday loans through Payday Express come with fixed fees, no compound interest, 
                and clear repayment terms.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features:</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Short-term financial relief</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">$150 to $1,500 loan amounts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Fixed fees, no compound interest</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Clear repayment terms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Repayment on next payday</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Flexible repayment options</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple 4-step process makes getting a payday loan quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Apply Online in Minutes</h3>
              <p className="text-gray-600">
                Choose the payday loan option, enter your details, and submit a quick application
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Evaluation with AI</h3>
              <p className="text-gray-600">
                Our system uses AI and blockchain for secure, fair evaluation—no long paperwork or credit hassles
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Funds Fast</h3>
              <p className="text-gray-600">
                Once approved, the loan is disbursed to your account—often within the same day
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Repay with Ease</h3>
              <p className="text-gray-600">
                The loan is repaid in full on your next payday or based on a flexible schedule you choose
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Payday Express */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Payday Express for Payday Loans?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Experience the difference with our ethical, transparent approach to payday lending
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <FaEye className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fixed Fees Only</h3>
              </div>
              <p className="text-gray-700">
                No interest, no hidden charges
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <FaRocket className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Same-Day Disbursement</h3>
              </div>
              <p className="text-gray-700">
                Funds when you truly need them
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Transparent Contracts</h3>
              </div>
              <p className="text-gray-700">
                Blockchain ensures everything is visible and verifiable
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Flexible Terms</h3>
              </div>
              <p className="text-gray-700">
                Tailored repayment aligned with your payday
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <FaHeart className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No Credit Score Worries</h3>
              </div>
              <p className="text-gray-700">
                We focus on affordability, not history
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <FaHandshake className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Ethical Lending</h3>
              </div>
              <p className="text-gray-700">
                We prioritize your ability to repay without added stress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Apply */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Who Can Apply?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our payday loans are available to:
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Employed individuals or freelancers with verifiable income</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Canadian residents aged 18 or above</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Students or part-time workers with regular stipends</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Anyone facing a short-term financial gap and looking for ethical, fast funding</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Can You Use It For?</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <FaStethoscope className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Emergency medical expenses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaHome className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Utility bills or rent</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCar className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Home or car repairs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaShoppingCart className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Groceries and daily essentials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPlane className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Unplanned travel or personal needs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaLightbulb className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Unexpected expenses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Compare with Traditional Payday Lenders
            </h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto">
              See how our ethical approach differs from traditional payday lending
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
              <thead>
                <tr className="border-b border-white border-opacity-20">
                  <th className="text-left p-6 font-semibold">Feature</th>
                  <th className="text-center p-6 font-semibold">Payday Express</th>
                  <th className="text-center p-6 font-semibold">Traditional Payday Lenders</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Fee Type</td>
                  <td className="p-6 text-center">Fixed Fee</td>
                  <td className="p-6 text-center">High Interest Rates</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Transparency</td>
                  <td className="p-6 text-center">Blockchain-backed Contracts</td>
                  <td className="p-6 text-center">Often Opaque Terms</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Approval Speed</td>
                  <td className="p-6 text-center">AI-Powered Instant Decisions</td>
                  <td className="p-6 text-center">Manual, Slower Process</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Credit Check</td>
                  <td className="p-6 text-center">Not Always Required</td>
                  <td className="p-6 text-center">Usually Required</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Customer Impact</td>
                  <td className="p-6 text-center">Budget-Friendly Repayment</td>
                  <td className="p-6 text-center">Risk of Debt Cycles</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-12 max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                  <FaGlobe className="text-white text-2xl" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                To lead Canada's transformation toward transparent, fixed-rate lending by building a trusted, 
                blockchain-powered platform that puts fairness, speed, and financial empowerment in every borrower's hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Get Started Today
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              With Payday Express, borrowing is smarter, safer, and stress-free. Avoid credit card debt, 
              bypass traditional lenders, and experience a new era of responsible payday lending powered by technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Apply Now
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300">
                Calculate Loan
              </button>
            </div>
            <div className="mt-8">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                🔒 Safe. Transparent. Instant.
              </p>
              <p className="text-gray-600">
                Apply now and regain control of your financial freedom.
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              👉 Apply Now or Calculate Loan to see your custom plan
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 