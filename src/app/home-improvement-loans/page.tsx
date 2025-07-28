'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaHome, FaCalculator, FaShieldAlt, FaClock, FaCheckCircle, FaUsers, FaChartLine, FaMobile, FaCreditCard, FaHandshake, FaGlobe, FaLock, FaRocket, FaHeart, FaEye, FaArrowRight, FaKitchenSet, FaBath, FaPlus, FaHouse, FaWindowMaximize, FaDoorOpen, FaSnowflake, FaSun, FaSolarPanel, FaPaintBrush, FaTree, FaHammer, FaUserTie, FaGraduationCap, FaBriefcase, FaHome, FaGlobeAmericas, FaChartBar, FaLaptop, FaComments, FaUpload, FaBell, FaQuoteLeft } from 'react-icons/fa';

export default function HomeImprovementLoansPage() {
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
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                <FaHome className="text-white text-2xl" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Home with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Simple, Fixed-Fee Financing
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              Upgrade Your Home with Flexible, Transparent Financing
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your home deserves to reflect your lifestyle and needs—but renovations can come with high costs. 
              At Payday Express, our Home Improvement Loans offer a smart, affordable way to transform your 
              living space without the burden of unpredictable interest or hidden fees. Whether you're planning 
              a kitchen remodel, roof replacement, or energy-efficient upgrade, we provide fixed-fee financing 
              with clear terms, quick approvals, and no surprises.
            </p>
            <div className="mt-10">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Home Improvement Loans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose a Home Improvement Loan?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the freedom to renovate without financial worries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <FaEye className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fixed Fees, Not Interest</h3>
              </div>
              <p className="text-gray-700">
                Say goodbye to fluctuating interest rates. Our fixed-fee model ensures you know exactly what you'll repay—no matter the market.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <FaRocket className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fast Approval Process</h3>
              </div>
              <p className="text-gray-700">
                Apply online in minutes and get a decision within hours. No paperwork hassles or long waiting periods.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <FaCalculator className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Flexible Loan Amounts</h3>
              </div>
              <p className="text-gray-700">
                Borrow from $2,000 to $50,000, tailored to your renovation needs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Budget-Friendly Repayment</h3>
              </div>
              <p className="text-gray-700">
                Choose a repayment plan that works for you, with clear monthly installment schedules and no early repayment penalties.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <FaChartLine className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Boost Home Value</h3>
              </div>
              <p className="text-gray-700">
                Invest in improvements that increase property value, comfort, and energy efficiency.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Secure & Transparent</h3>
              </div>
              <p className="text-gray-700">
                Blockchain-powered platform ensures secure transactions and complete transparency.
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
              Our simple 6-step process makes getting a home improvement loan quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Loan Type</h3>
              <p className="text-gray-600">
                Select "Home Improvement Loan" on our platform
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enter Your Details</h3>
              <p className="text-gray-600">
                Share your renovation goals, loan amount, and preferred duration
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Matched Instantly</h3>
              <p className="text-gray-600">
                Our AI-powered system connects you with peer investors through secure blockchain technology
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Review and Accept Terms</h3>
              <p className="text-gray-600">
                View the fixed fee, total repayment, and schedule—no hidden costs
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">5</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Funds Disbursed Quickly</h3>
              <p className="text-gray-600">
                Once approved, funds are transferred directly to your account within 24–48 hours
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">6</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Renovate With Confidence</h3>
              <p className="text-gray-600">
                Use the funds and repay in easy, transparent monthly installments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Can You Use It For */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What Can You Use It For?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Transform your living space with our flexible home improvement financing
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <FaKitchenSet className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Kitchen and bathroom renovations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPlus className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Room additions or basement finishing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaHouse className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Roof, windows, or door replacements</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaSnowflake className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">HVAC or plumbing system upgrades</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaSolarPanel className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Solar panels or energy-efficient appliances</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPaintBrush className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Flooring, painting, landscaping, and more</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Who Can Apply?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Canadian residents aged 18+</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Salaried individuals or self-employed professionals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Homeowners or renters with landlord approval</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Anyone with a clear renovation purpose and repayment plan</span>
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
              Compare with Traditional Loans
            </h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto">
              See how our home improvement approach differs from traditional banking
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
              <thead>
                <tr className="border-b border-white border-opacity-20">
                  <th className="text-left p-6 font-semibold">Feature</th>
                  <th className="text-center p-6 font-semibold">Payday Express Home Loan</th>
                  <th className="text-center p-6 font-semibold">Traditional Bank Loan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Approval Time</td>
                  <td className="p-6 text-center">Within hours</td>
                  <td className="p-6 text-center">Several days to weeks</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Interest Type</td>
                  <td className="p-6 text-center">Fixed Fee</td>
                  <td className="p-6 text-center">Variable Interest</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Prepayment Penalty</td>
                  <td className="p-6 text-center">None</td>
                  <td className="p-6 text-center">Often Applicable</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Hidden Charges</td>
                  <td className="p-6 text-center">None</td>
                  <td className="p-6 text-center">Common</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Process</td>
                  <td className="p-6 text-center">100% Online</td>
                  <td className="p-6 text-center">In-person & Paperwork Heavy</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Loan Use Flexibility</td>
                  <td className="p-6 text-center">High</td>
                  <td className="p-6 text-center">Often Restricted</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Home Improvement Examples */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Popular Home Improvement Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your home with projects that add value and comfort
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaKitchenSet className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kitchen Remodel</h3>
              <p className="text-gray-700">Update cabinets, countertops, and appliances</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBath className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bathroom Upgrade</h3>
              <p className="text-gray-700">Modern fixtures and energy-efficient features</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHouse className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Roof Replacement</h3>
              <p className="text-gray-700">Protect your home with quality roofing</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSolarPanel className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Energy Upgrades</h3>
              <p className="text-gray-700">Solar panels and energy-efficient systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Benefits of Home Improvement Loans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why choose Payday Express for your home renovation financing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaEye className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Pricing</h3>
              <p className="text-gray-700">Know exactly what you'll pay with our fixed-fee structure</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaRocket className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Funding</h3>
              <p className="text-gray-700">Get approved and funded within 24-48 hours</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">No Prepayment Penalties</h3>
              <p className="text-gray-700">Pay off your loan early without extra fees</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMobile className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">100% Online Process</h3>
              <p className="text-gray-700">Apply and manage your loan from anywhere</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Increase Home Value</h3>
              <p className="text-gray-700">Invest in improvements that boost property value</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Platform</h3>
              <p className="text-gray-700">Blockchain technology ensures safe transactions</p>
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
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Apply Today. Grow Tomorrow.
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Renovating your home doesn't need to be a financial burden. With Payday Express, 
              you gain financial flexibility, speed, and peace of mind—all in one powerful solution. 
              Apply now and bring your vision to life with a Home Improvement Loan that's built around your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
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