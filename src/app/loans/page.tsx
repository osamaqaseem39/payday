'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaMoneyBillWave, FaCalculator, FaShieldAlt, FaClock, FaCheckCircle, FaUserFriends, FaChartLine, FaMobile, FaCreditCard, FaHandshake } from 'react-icons/fa';

export default function LoansPage() {
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
                <FaMoneyBillWave className="text-white text-2xl" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect Loan —
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Fast, Fair, and Transparent
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Whether you need quick cash for an emergency, want to consolidate debt, 
              or are looking to invest in your future, we have the right loan solution for you.
            </p>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Loan Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our range of loan products designed to meet your specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Payday Loans */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Payday Loans</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Quick access to short-term funds with transparent fixed fees. Perfect for emergency expenses.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">$100 - $1,500</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">7-30 days term</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">Same day approval</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>

            {/* Personal Loans */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <FaCreditCard className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Personal Loans</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Flexible loans for larger amounts with longer terms. Ideal for major purchases or debt consolidation.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">$1,000 - $25,000</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">3-60 months term</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">Competitive rates</span>
                </li>
              </ul>
              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Apply Now
              </button>
            </div>

            {/* Peer-to-Peer Loans */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <FaUserFriends className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Peer-to-Peer Loans</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Borrow from real people through our secure platform. Better rates, transparent process.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">$500 - $50,000</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">6-84 months term</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">Lower interest rates</span>
                </li>
              </ul>
              <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Loans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our Loans?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best borrowing experience with transparency and ethical practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalculator className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Fees</h3>
              <p className="text-gray-600">No hidden charges, no surprises. You know exactly what you'll pay.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure & Safe</h3>
              <p className="text-gray-600">Bank-level security to protect your personal and financial information.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMobile className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick & Easy</h3>
              <p className="text-gray-600">Apply online in minutes, get approved quickly, receive funds fast.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHandshake className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Terms</h3>
              <p className="text-gray-600">Choose repayment schedules that work for your financial situation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple Application Process</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Getting a loan has never been easier. Follow these simple steps to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Apply Online</h3>
              <p className="opacity-90">Fill out our simple online application form in just a few minutes.</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Get Approved</h3>
              <p className="opacity-90">Receive instant approval with our advanced assessment system.</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Sign Documents</h3>
              <p className="opacity-90">Review and sign your loan agreement electronically.</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Receive Funds</h3>
              <p className="opacity-90">Get your money deposited directly into your bank account.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join thousands of Canadians who trust Payday Express for their lending needs. 
              Apply today and get the funds you need when you need them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Apply for a Loan
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 