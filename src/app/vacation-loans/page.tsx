'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaPlane, FaCalculator, FaShieldAlt, FaClock, FaCheckCircle, FaUsers, FaChartLine, FaMobile, FaCreditCard, FaHandshake, FaGlobe, FaLock, FaRocket, FaHeart, FaEye, FaArrowRight, FaHotel, FaPassport, FaUtensils, FaShip, FaMountain, FaCar, FaUserFriends, FaGraduationCap, FaBriefcase, FaHome, FaGlobeAmericas, FaMapMarkedAlt } from 'react-icons/fa';

export default function VacationLoansPage() {
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
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 pt-16">
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
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                  <FaPlane className="text-white text-2xl" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Turn Dream Getaways into Reality with
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  Vacation Loans
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                Plan the Getaway You Deserve—Without Financial Stress
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                At Payday Express, we offer fixed-fee loans powered by transparent terms, blockchain security, 
                and rapid approval. No hidden charges. No mounting interest. Just clear, predictable payments 
                aligned with your budget. Now you can enjoy your time off without bringing financial anxiety back home.
              </p>
              <div className="mt-10">
                <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Apply Now
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/images/vacationloan.png"
                  alt="Vacation Loans - Payday Express"
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-red-600/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vacation Loans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose a Vacation Loan from Payday Express?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the freedom to travel without financial worries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                  <FaRocket className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Instant Approval</h3>
              </div>
              <p className="text-gray-700">
                Quick online application with immediate response
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <FaEye className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fixed Fees</h3>
              </div>
              <p className="text-gray-700">
                Know your total cost upfront—no surprises
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Flexible Terms</h3>
              </div>
              <p className="text-gray-700">
                Choose your duration to fit your repayment ability
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Blockchain-Powered</h3>
              </div>
              <p className="text-gray-700">
                Transparent, secure transactions for peace of mind
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <FaHeart className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Low Barriers</h3>
              </div>
              <p className="text-gray-700">
                Minimal documentation and flexible credit requirements
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <FaGlobe className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Use Anywhere</h3>
              </div>
              <p className="text-gray-700">
                Book flights, hotels, activities, or even cover visa and travel insurance
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
              Our simple 6-step process makes getting a vacation loan quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Select Loan Type</h3>
              <p className="text-gray-600">
                Choose "Vacation Loan" from the dropdown on our platform
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Apply Online</h3>
              <p className="text-gray-600">
                Fill out your loan request, choose duration, and submit
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Approved</h3>
              <p className="text-gray-600">
                Our AI and blockchain system reviews and approves quickly
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Receive Funds</h3>
              <p className="text-gray-600">
                Money is deposited directly into your account
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">5</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enjoy Your Trip</h3>
              <p className="text-gray-600">
                Spend stress-free and focus on making memories
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">6</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Repay Flexibly</h3>
              <p className="text-gray-600">
                Follow a simple, fixed repayment plan without surprises
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
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Salaried employees planning annual or family leave</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Freelancers or remote workers needing a digital detox</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Students organizing educational travel or gap year trips</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Couples planning honeymoons or romantic vacations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Anyone with a valid ID, Canadian residency, and consistent income</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Can You Use It For?</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <FaPlane className="text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700">Domestic or international travel</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaHotel className="text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700">Hotel or Airbnb bookings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPassport className="text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700">Travel insurance and visa costs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUtensils className="text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700">Dining, shopping, and adventure tours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaShip className="text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700">Cruises, theme parks, or ski resorts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaRocket className="text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700">Emergency or last-minute travel</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaHeart className="text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700">Honeymoons or destination weddings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaMapMarkedAlt className="text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700">Adventure and exploration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Compare with Traditional Travel Loans
            </h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto">
              See how our vacation-focused approach differs from traditional banking
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

      {/* Travel Scenarios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Perfect for Every Traveler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a solo adventurer or planning a family vacation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBriefcase className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Business Travelers</h3>
              <p className="text-gray-700">Extend your business trip for leisure</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUserFriends className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Family Vacations</h3>
              <p className="text-gray-700">Create lasting memories with loved ones</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Students</h3>
              <p className="text-gray-700">Educational travel and gap year adventures</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Couples</h3>
              <p className="text-gray-700">Romantic getaways and honeymoons</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Fly?
            </h2>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Apply Today. Grow Tomorrow.
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stop waiting and start packing. Our Vacation Loan helps you fund unforgettable memories 
              with no financial baggage. Apply today and get instant access to the getaway you've earned.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
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