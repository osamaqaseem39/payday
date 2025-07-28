'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaBuilding, FaCalculator, FaShieldAlt, FaClock, FaCheckCircle, FaUsers, FaChartLine, FaMobile, FaCreditCard, FaHandshake, FaGlobe, FaLock, FaRocket, FaHeart, FaEye, FaArrowRight, FaBoxes, FaLightbulb, FaDollarSign, FaTools, FaStore, FaUserTie, FaGraduationCap, FaBriefcase, FaHome, FaGlobeAmericas, FaChartBar, FaLaptop, FaComments, FaUpload, FaBell, FaQuoteLeft } from 'react-icons/fa';

export default function SmallBusinessLoansPage() {
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
                  <FaBuilding className="text-white text-2xl" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Small Business Loans —
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Accelerate Growth with Trusted Business Loans
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                Helping Canadian Startups Grow with Honest Lending
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                At Payday Express, we understand what it takes to build and sustain a small business in today's fast-paced market. 
                Whether you're starting up, scaling operations, or navigating a cash flow crunch, our Small Business Loan solutions 
                provide fast, flexible funding backed by blockchain-powered transparency and fixed-fee pricing.
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
                  src="/images/businessloan.png"
                  alt="Small Business Loans - Payday Express"
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Small Business Loans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose a Payday Express Small Business Loan?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Traditional banks often say "no." We say "let's grow." We connect small business owners with real investors 
              through a secure peer-to-peer platform—no banks, no hidden charges, no compound interest. Just capital with confidence.
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
                From $2,000 to $100,000
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Repayment Terms</h3>
              </div>
              <p className="text-gray-700">
                Flexible options from 3 to 36 months
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <FaEye className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fixed Fee Model</h3>
              </div>
              <p className="text-gray-700">
                Transparent cost structure – no compound interest, ever
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                  <FaRocket className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fast Approval</h3>
              </div>
              <p className="text-gray-700">
                Get funded in 72 hours or less
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Secure Platform</h3>
              </div>
              <p className="text-gray-700">
                Blockchain ensures secure and verifiable transactions
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <FaHeart className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">All Business Types Welcome</h3>
              </div>
              <p className="text-gray-700">
                Startups, freelancers, and growing companies
              </p>
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
              Our simple 5-step process makes getting a business loan quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Apply Online</h3>
              <p className="text-gray-600">
                Select your loan type, amount, and duration. Submit basic business and identity information.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Matched Instantly</h3>
              <p className="text-gray-600">
                Our AI-driven algorithm matches your request with real investors on our P2P platform.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Cost Breakdown</h3>
              <p className="text-gray-600">
                See the exact fees up front: Loan Amount + Company Fixed Fee + Investor Share (13%)
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Receive Your Funds</h3>
              <p className="text-gray-600">
                Once approved, the funds are disbursed directly into your business account.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">5</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Repay with Confidence</h3>
              <p className="text-gray-600">
                Choose monthly installments or flexible custom payment plans.
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
                We proudly support:
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Startups with a valid business plan</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Existing small businesses with proof of income</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Entrepreneurs with limited or no credit history</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Freelancers and sole proprietors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Women- and minority-owned businesses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">E-commerce and local retail shops</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Applicants with or without a high credit score</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Can You Use It For?</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <FaBoxes className="text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Purchase inventory or equipment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaLightbulb className="text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Launch or scale a product</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaDollarSign className="text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Cover rent, payroll, or marketing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaChartBar className="text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Manage seasonal cash flow</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaTools className="text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Renovate or upgrade business space</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUserTie className="text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Hire new team members</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Compare with Traditional Business Loans
            </h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto">
              See how our business-focused approach differs from traditional banking
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
              <thead>
                <tr className="border-b border-white border-opacity-20">
                  <th className="text-left p-6 font-semibold">Criteria</th>
                  <th className="text-center p-6 font-semibold">Payday Express</th>
                  <th className="text-center p-6 font-semibold">Bank Loan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Approval Speed</td>
                  <td className="p-6 text-center">1–3 days</td>
                  <td className="p-6 text-center">7–30 days</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Credit Score Requirement</td>
                  <td className="p-6 text-center">Low/None</td>
                  <td className="p-6 text-center">High</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Interest Model</td>
                  <td className="p-6 text-center">Fixed fee</td>
                  <td className="p-6 text-center">Compound interest</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Transparency</td>
                  <td className="p-6 text-center">Full (via blockchain)</td>
                  <td className="p-6 text-center">Often unclear</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Support for Startups</td>
                  <td className="p-6 text-center">✅ Yes</td>
                  <td className="p-6 text-center">❌ Often denied</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Repayment Flexibility</td>
                  <td className="p-6 text-center">High</td>
                  <td className="p-6 text-center">Medium to low</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fixed Fees Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Fixed Fees, Not Interest Rates
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              At Payday Express, we don't believe in compounding confusion. Instead of interest, 
              we charge a fixed fee based on loan type and duration. You'll know the full repayment amount upfront.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Cost Components:</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <span className="font-semibold text-gray-900">Company Fee</span>
                  <span className="text-gray-700">Flat fee based on loan category</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <span className="font-semibold text-gray-900">Investor Share</span>
                  <span className="text-gray-700">Fixed 13% of loan amount</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <span className="font-semibold text-green-900">Late Payment Fee</span>
                  <span className="text-green-700">Only applies if installment is late</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6 font-semibold">
                No hidden fees. No credit traps. Just honest financing.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Example Loan Breakdown</h3>
              <p className="text-gray-600 mb-6">Let's say you apply for a $10,000 business loan for 12 months:</p>
              <div className="space-y-4">
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
                    <span>Total Payback:</span>
                    <span className="text-blue-600">$11,800</span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Monthly Installment:</span>
                  <span className="text-green-600">~$983</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                Try our built-in <span className="text-blue-600 font-semibold cursor-pointer">Loan Calculator</span> to see your exact repayment before you apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Experience */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Mobile-Friendly, Fully Digital Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Whether you're on your laptop or smartphone, applying for a business loan is seamless and secure with our responsive platform:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaLaptop className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Intuitive loan wizard</h3>
              <p className="text-gray-700">Step-by-step guidance through the application</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUpload className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure document upload</h3>
              <p className="text-gray-700">Safe and encrypted file sharing</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBell className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time status updates</h3>
              <p className="text-gray-700">Track your application progress</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaComments className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Chat-based customer support</h3>
              <p className="text-gray-700">Get help when you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Real Stories, Real Impact
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaQuoteLeft className="text-white text-2xl" />
                </div>
              </div>
              <blockquote className="text-xl text-gray-700 italic mb-6">
                "Payday Express helped me expand my retail store without dealing with banks or interest. Transparent and fast!"
              </blockquote>
              <p className="text-lg font-semibold text-gray-900">
                — Amira S., Small Retail Owner, Toronto
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
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Apply Today. Grow Tomorrow.
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Getting business funding shouldn't be complicated or discouraging. With Payday Express, 
              you get fair, fast, and flexible financing, backed by technology that works for you—not against you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Apply Now
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300">
                Calculate Loan
              </button>
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