'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaUser, FaCalculator, FaShieldAlt, FaClock, FaCheckCircle, FaUsers, FaChartLine, FaMobile, FaCreditCard, FaHandshake, FaGlobe, FaLock, FaRocket, FaHeart, FaEye, FaArrowRight } from 'react-icons/fa';

export default function PersonalLoansPage() {
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16">
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <FaCreditCard className="text-white text-2xl" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Personal Loans —
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Simple, Fast, and Transparent
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                Unlock Life's Possibilities with Payday Express Personal Loans
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                At Payday Express, we understand that life doesn't always go as planned. Whether you're facing an unexpected medical bill, 
                need to consolidate debt, plan a home improvement, or cover education expenses, our personal loans are designed to provide 
                you with flexible financial support when you need it most.
              </p>
              <div className="mt-10">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Apply Now
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/images/personalloan.png"
                  alt="Personal Loans - Payday Express"
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Personal Loans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose a Personal Loan from Payday Express?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our personal loan solutions are built around fixed rates, transparent fees, and quick approval times. 
              Unlike traditional loans, our platform uses a peer-to-peer lending model powered by blockchain technology 
              to ensure secure, fast, and trustworthy transactions—all without the need to deal with banks or hidden costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <FaCalculator className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Loan Amounts</h3>
              </div>
              <p className="text-gray-700">
                Borrow anywhere from $1,000 to $50,000
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Loan Terms</h3>
              </div>
              <p className="text-gray-700">
                Flexible repayment options from 6 months to 3 years
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <FaEye className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fixed Fees</h3>
              </div>
              <p className="text-gray-700">
                Know your costs upfront — no compounding interest
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                  <FaRocket className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Quick Processing</h3>
              </div>
              <p className="text-gray-700">
                Get approval and funds in days, not weeks
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Secure Transactions</h3>
              </div>
              <p className="text-gray-700">
                Backed by AI and blockchain for maximum security and transparency
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <FaHeart className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No Hidden Charges</h3>
              </div>
              <p className="text-gray-700">
                One-time fixed company fee + investor share, that's it
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Personal Loans Work */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How Personal Loans Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple 5-step process makes getting a personal loan quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Apply Online</h3>
              <p className="text-gray-600">
                Fill out a simple online application form in minutes — no paperwork, no queues.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Matched with Investors</h3>
              <p className="text-gray-600">
                Our smart algorithm matches you with real people who are ready to invest in your loan request.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Cost Breakdown</h3>
              <p className="text-gray-600">
                See exactly how much you'll pay: loan amount + one-time fixed company fee + investor share.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Receive Funds Quickly</h3>
              <p className="text-gray-600">
                Once approved, your funds are transferred directly to your account, ready to use.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">5</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Repay with Confidence</h3>
              <p className="text-gray-600">
                Choose between monthly or bi-weekly installments. We'll remind you before every due date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Apply */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Who Can Apply?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Anyone in Canada with:
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">A valid government-issued ID</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Proof of income or employment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">A basic credit profile</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">A bank account for direct deposit</span>
                </div>
              </div>
              <p className="text-lg text-gray-700 mt-6">
                Even if you have a low credit score, our system focuses more on your current repayment capacity and stability, not just your past.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Use Your Loan For:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Medical emergencies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Debt consolidation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Education expenses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Car repairs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Travel or relocation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Major life events</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Home renovation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Appliance replacement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Fee Model vs Traditional */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Fixed Fee Model vs Traditional Interest Rates
            </h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto">
              Unlike traditional lenders who apply compound interest, Payday Express offers a flat-fee structure. 
              You pay the same agreed fee regardless of term or delays (unless late fees apply). 
              This makes budgeting easier and ensures complete financial clarity.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
              <thead>
                <tr className="border-b border-white border-opacity-20">
                  <th className="text-left p-6 font-semibold">Loan Provider</th>
                  <th className="text-center p-6 font-semibold">Cost Structure</th>
                  <th className="text-center p-6 font-semibold">Transparency</th>
                  <th className="text-center p-6 font-semibold">Speed</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Traditional Bank</td>
                  <td className="p-6 text-center">Variable interest rates</td>
                  <td className="p-6 text-center">Low</td>
                  <td className="p-6 text-center">Slow (7–14 days)</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Payday Express</td>
                  <td className="p-6 text-center">Fixed fee + investor share</td>
                  <td className="p-6 text-center">High</td>
                  <td className="p-6 text-center">Fast (1–3 days)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Fixed Fees Are Better */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Fixed Fees Are Better for You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the advantages of our transparent fee structure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaEye className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">No surprises</h3>
              <p className="text-gray-700">Know exactly what you'll pay from day one</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalculator className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Easier to calculate</h3>
              <p className="text-gray-700">Simple math to understand your total cost</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">No increasing interest</h3>
              <p className="text-gray-700">Your fee stays the same throughout the term</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHandshake className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Encourages timely repayment</h3>
              <p className="text-gray-700">Clear incentives to pay on time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Apply?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              With Payday Express, borrowing is easy, transparent, and built for you — not the bank.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Apply Now
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300">
                Use Our Loan Calculator
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Still have questions? Explore our FAQs or contact our lending specialists today. 
              We're here to help you make smart borrowing decisions.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 