'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaGraduationCap, FaCalculator, FaShieldAlt, FaClock, FaCheckCircle, FaUsers, FaChartLine, FaMobile, FaCreditCard, FaHandshake, FaGlobe, FaLock, FaRocket, FaHeart, FaEye, FaArrowRight, FaBook, FaLaptop, FaHome, FaCar, FaPlane, FaUserGraduate, FaUniversity, FaGlobeAmericas } from 'react-icons/fa';

export default function StudentLoansPage() {
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
                  <FaGraduationCap className="text-white text-2xl" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Student Loans —
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  Fuel Your Future with Smart Financing
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                Empower Your Education with Flexible Student Loans
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                At Payday Express, we believe financial limitations should never stand in the way of your academic dreams. 
                Our student loan solutions are designed to help you focus on learning, not loan stress. Whether you're 
                pursuing college, a diploma, professional training, or post-graduate studies, we offer fast, transparent, 
                and flexible funding with fixed fees, not compounding interest.
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
                  src="/images/studentloan.png"
                  alt="Student Loans - Payday Express"
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-blue-600/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Student Loans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Payday Express Student Loans?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our peer-to-peer lending platform—powered by AI and blockchain—connects students with real-world investors, 
              offering secure, trustworthy, and bank-free funding at fair terms. No confusing interest rates. No last-minute surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <FaCalculator className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Loan Amounts</h3>
              </div>
              <p className="text-gray-700">
                From $1,000 to $30,000
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Terms</h3>
              </div>
              <p className="text-gray-700">
                Flexible durations from 6 months to 3 years
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
                Know your total cost upfront—no compound interest
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                  <FaRocket className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fast Disbursement</h3>
              </div>
              <p className="text-gray-700">
                Get approved and funded in as little as 48–72 hours
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
                Blockchain-based system ensures complete transparency
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <FaHeart className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Student-Friendly</h3>
              </div>
              <p className="text-gray-700">
                No early repayment penalties, no credit score discrimination
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Student Loan Process Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How Our Student Loan Process Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple 5-step process makes getting a student loan quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Apply Online in Minutes</h3>
              <p className="text-gray-600">
                Choose the loan type, amount, and term. No paperwork or in-person meetings required.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Auto-Matching with Investors</h3>
              <p className="text-gray-600">
                Our algorithm pairs your application with real investors who fund your loan directly.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Fee Display</h3>
              <p className="text-gray-600">
                You'll see the exact amount you'll pay: Loan amount + Company fixed fee + Investor share
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Receive Your Funds</h3>
              <p className="text-gray-600">
                Approved funds are sent directly to your bank account or tuition institution.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">5</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Repay Over Time</h3>
              <p className="text-gray-600">
                Choose monthly or custom installments that work around your academic schedule.
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
                We accept applications from:
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Full-time or part-time students</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Domestic or international students (with valid ID)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Applicants with or without a high credit score</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Those with proof of enrollment or admission</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Use Your Student Loan For:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <FaUniversity className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Tuition fees</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaBook className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Books and study materials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaGraduationCap className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Exam fees</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaHome className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Student accommodation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUserGraduate className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Living expenses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaLaptop className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Tech & equipment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCar className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Transportation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPlane className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Relocation</span>
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
              Comparing Traditional Student Loans vs. Payday Express
            </h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto">
              See how our student-focused approach differs from traditional banking
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
              <thead>
                <tr className="border-b border-white border-opacity-20">
                  <th className="text-left p-6 font-semibold">Feature</th>
                  <th className="text-center p-6 font-semibold">Traditional Bank Loan</th>
                  <th className="text-center p-6 font-semibold">Payday Express Student Loan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Interest Type</td>
                  <td className="p-6 text-center">Variable/compound interest</td>
                  <td className="p-6 text-center">Flat fixed fee</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Approval Time</td>
                  <td className="p-6 text-center">5–15 days</td>
                  <td className="p-6 text-center">1–3 days</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Transparency</td>
                  <td className="p-6 text-center">Low</td>
                  <td className="p-6 text-center">High</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Borrower Type</td>
                  <td className="p-6 text-center">Credit-based</td>
                  <td className="p-6 text-center">Education-focused</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Early Repayment Penalty</td>
                  <td className="p-6 text-center">Often charged</td>
                  <td className="p-6 text-center">$0 early payment penalty</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Application Method</td>
                  <td className="p-6 text-center">In-person or online</td>
                  <td className="p-6 text-center">100% online</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What Makes Payday Express Different */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Makes Payday Express Different?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our student-focused approach puts your education first
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaEye className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">No compound interest</h3>
              <p className="text-gray-700">Fixed fees that don't grow over time</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUserGraduate className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">No cosigner required</h3>
              <p className="text-gray-700">Apply independently as a student</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalculator className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fixed repayment structure</h3>
              <p className="text-gray-700">Predictable payments throughout your term</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMobile className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Apply and manage online</h3>
              <p className="text-gray-700">Complete digital experience</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Supportive of young borrowers</h3>
              <p className="text-gray-700">Designed for first-time borrowers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Structure */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What is the Cost?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Payday Express follows a fixed fee model:
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Fee Breakdown:</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Company Fee:</span>
                  <span className="text-gray-700">A one-time set fee based on your loan type</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Investor Share:</span>
                  <span className="text-gray-700">13% of loan amount</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <span className="font-semibold text-green-900">No compound interest</span>
                  <span className="text-green-700">✓</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <span className="font-semibold text-green-900">No monthly surprises</span>
                  <span className="text-green-700">✓</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                Use our <span className="text-blue-600 font-semibold cursor-pointer">Loan Calculator</span> to preview your exact installment and total repayment before you apply.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Example Calculation:</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-700">Loan Amount:</span>
                  <span className="font-semibold">$10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Company Fee:</span>
                  <span className="font-semibold">$500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Investor Share (13%):</span>
                  <span className="font-semibold">$1,300</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Repayment:</span>
                    <span className="text-green-600">$11,800</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Fixed amount - no surprises, no compound interest
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Get Started Today
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We make financing your education simple, transparent, and student-focused. 
              Join thousands of learners across Canada who are already achieving more with Payday Express.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Apply Now
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300">
                Calculate Your Loan
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Need help deciding? Speak to our loan experts or check out our FAQ section for guidance.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 