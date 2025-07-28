'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaHandshake, FaUsers, FaChartLine, FaShieldAlt, FaCalculator, FaClock, FaCheckCircle, FaUserFriends, FaCreditCard, FaMoneyBillWave, FaGlobe, FaLock } from 'react-icons/fa';

export default function LendingTypesPage() {
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
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <FaHandshake className="text-white text-2xl" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Understanding Lending Types —
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Choose What Works for You
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Not all loans are created equal. Learn about different lending types and find the one 
              that best fits your financial situation and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Traditional vs Alternative Lending */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Traditional vs Alternative Lending
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the differences between traditional banking and modern alternative lending solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Traditional Lending */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaCreditCard className="mr-3 text-gray-600" />
                Traditional Banking
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Established Institutions</p>
                    <p className="text-sm text-gray-600">Banks and credit unions with long histories</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Strict Requirements</p>
                    <p className="text-sm text-gray-600">High credit scores and extensive documentation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Lower Interest Rates</p>
                    <p className="text-sm text-gray-600">Competitive rates for qualified borrowers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Longer Processing</p>
                    <p className="text-sm text-gray-600">Weeks to months for approval and funding</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Lending */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaUsers className="mr-3 text-blue-600" />
                Alternative Lending
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Flexible Requirements</p>
                    <p className="text-sm text-gray-600">More inclusive criteria and faster approval</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Quick Processing</p>
                    <p className="text-sm text-gray-600">Same-day to same-week funding</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Innovative Solutions</p>
                    <p className="text-sm text-gray-600">Peer-to-peer and technology-driven options</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Transparent Terms</p>
                    <p className="text-sm text-gray-600">Clear fees and no hidden charges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lending Types Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Types of Lending We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From short-term solutions to long-term investments, we provide comprehensive lending options
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Payday Loans */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Payday Loans</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Short-term loans designed for emergency expenses, typically due on your next payday.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Amount:</span>
                  <span className="text-sm font-semibold">$100 - $1,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Term:</span>
                  <span className="text-sm font-semibold">7-30 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fee:</span>
                  <span className="text-sm font-semibold">$15 per $100</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>

            {/* Personal Loans */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <FaCreditCard className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Personal Loans</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Unsecured loans for larger amounts with flexible terms and competitive rates.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Amount:</span>
                  <span className="text-sm font-semibold">$1,000 - $25,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Term:</span>
                  <span className="text-sm font-semibold">3-60 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rate:</span>
                  <span className="text-sm font-semibold">5.99% - 29.99%</span>
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Learn More
              </button>
            </div>

            {/* Peer-to-Peer Loans */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <FaUserFriends className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Peer-to-Peer</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Borrow directly from individual investors through our secure platform.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Amount:</span>
                  <span className="text-sm font-semibold">$500 - $50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Term:</span>
                  <span className="text-sm font-semibold">6-84 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rate:</span>
                  <span className="text-sm font-semibold">3.99% - 24.99%</span>
                </div>
              </div>
              <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lending Features Comparison */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Lending Features Comparison</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Compare the key features of different lending types to make an informed decision
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
              <thead>
                <tr className="border-b border-white border-opacity-20">
                  <th className="text-left p-6 font-semibold">Feature</th>
                  <th className="text-center p-6 font-semibold">Payday Loans</th>
                  <th className="text-center p-6 font-semibold">Personal Loans</th>
                  <th className="text-center p-6 font-semibold">Peer-to-Peer</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Credit Check</td>
                  <td className="p-6 text-center">Soft Check</td>
                  <td className="p-6 text-center">Soft Check</td>
                  <td className="p-6 text-center">Soft Check</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Approval Time</td>
                  <td className="p-6 text-center">Same Day</td>
                  <td className="p-6 text-center">24-48 Hours</td>
                  <td className="p-6 text-center">1-3 Days</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Funding Time</td>
                  <td className="p-6 text-center">Same Day</td>
                  <td className="p-6 text-center">1-2 Business Days</td>
                  <td className="p-6 text-center">3-5 Business Days</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Documentation</td>
                  <td className="p-6 text-center">Minimal</td>
                  <td className="p-6 text-center">Standard</td>
                  <td className="p-6 text-center">Standard</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Prepayment Penalty</td>
                  <td className="p-6 text-center">None</td>
                  <td className="p-6 text-center">None</td>
                  <td className="p-6 text-center">None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Security & Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your security and privacy are our top priorities across all lending types
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaLock className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bank-Level Security</h3>
              <p className="text-gray-700">256-bit SSL encryption and secure data centers</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Privacy Protection</h3>
              <p className="text-gray-700">Your personal information is never shared without consent</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaGlobe className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Regulated & Licensed</h3>
              <p className="text-gray-700">Fully compliant with Canadian financial regulations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Choose Your Lending Type?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Understanding your options is the first step to making the right financial decision. 
              Let us help you find the perfect lending solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Start Application
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 