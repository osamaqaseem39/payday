'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaHeartbeat, FaCalculator, FaShieldAlt, FaClock, FaCheckCircle, FaUsers, FaChartLine, FaMobile, FaCreditCard, FaHandshake, FaGlobe, FaLock, FaRocket, FaHeart, FaEye, FaArrowRight, FaTooth, FaUserMd, FaBrain, FaBaby, FaWheelchair, FaPills, FaHospital, FaUserTie, FaGraduationCap, FaBriefcase, FaHome, FaGlobeAmericas, FaChartBar, FaLaptop, FaComments, FaUpload, FaBell, FaQuoteLeft, FaStethoscope, FaAmbulance, FaUserInjured, FaSmile } from 'react-icons/fa';

export default function MedicalLoansPage() {
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
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 pt-16">
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
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-purple-600 rounded-full flex items-center justify-center">
                  <FaHeartbeat className="text-white text-2xl" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Flexible Financing for
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">
                  Unexpected Medical Expenses
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                Get the Care You Need, When You Need It
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Unexpected medical expenses shouldn't prevent you from getting the treatment you deserve. 
                At Payday Express, we provide fast, transparent, and flexible medical loans designed to 
                help you cover healthcare costs with ease—whether it's an emergency procedure, dental work, 
                surgery, or ongoing treatments.
              </p>
              <div className="mt-10">
                <button className="bg-gradient-to-r from-red-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Apply Now
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/images/healthloan.png"
                  alt="Medical Loans - Payday Express"
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-purple-600/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Medical Loans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose a Medical Loan?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Medical bills can be overwhelming—especially when they arrive unplanned. Our fixed-rate medical loans offer:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <FaRocket className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Immediate Access to Funds</h3>
              </div>
              <p className="text-gray-700">
                Get approved and funded quickly so you can focus on recovery, not paperwork.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <FaEye className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No Hidden Fees</h3>
              </div>
              <p className="text-gray-700">
                Transparent, flat-rate fees—know exactly what you'll pay from day one.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mr-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Flexible Terms</h3>
              </div>
              <p className="text-gray-700">
                Choose repayment plans that suit your income and schedule, whether short-term or extended over several months.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No Collateral Needed</h3>
              </div>
              <p className="text-gray-700">
                Our unsecured loans don't require assets or property as security.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <FaHeart className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Support for All Medical Needs</h3>
              </div>
              <p className="text-gray-700">
                From urgent care and surgery to cosmetic procedures, dental, mental health, fertility treatments, and more.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                  <FaMobile className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">100% Online Process</h3>
              </div>
              <p className="text-gray-700">
                Apply from anywhere, anytime with our mobile-friendly platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligible Medical Expenses */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Eligible Medical Expenses
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We cover a wide range of healthcare needs:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaAmbulance className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency Medical Bills</h3>
              <p className="text-gray-700">Urgent care and emergency procedures</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTooth className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Dental & Orthodontic</h3>
              <p className="text-gray-700">Dental procedures and orthodontic work</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaEye className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Vision & Eye Surgery</h3>
              <p className="text-gray-700">LASIK and other vision procedures</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUserMd className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Elective & Cosmetic</h3>
              <p className="text-gray-700">Elective and cosmetic surgery</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBrain className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mental Health Care</h3>
              <p className="text-gray-700">Therapy and psychiatric care</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBaby className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fertility Treatments</h3>
              <p className="text-gray-700">IVF and fertility procedures</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaWheelchair className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Rehabilitation</h3>
              <p className="text-gray-700">Physiotherapy and rehabilitation</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaPills className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Prescription Medications</h3>
              <p className="text-gray-700">Medications not covered by insurance</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple 5-step process makes getting a medical loan quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Apply Online</h3>
              <p className="text-gray-600">
                Select "Medical Loan" from the loan type dropdown and fill in your details.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Estimate</h3>
              <p className="text-gray-600">
                Our system will auto-calculate company fees and investor charges for full transparency.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Duration</h3>
              <p className="text-gray-600">
                Pick between days or months to match your repayment comfort.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Review & Confirm</h3>
              <p className="text-gray-600">
                Accept your personalized offer with no hidden terms.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">5</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Receive Funds</h3>
              <p className="text-gray-600">
                Get the money you need, often within 24 hours.
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
                Who Can Apply for a Medical Loan?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                At Payday Express, we make medical loans accessible to a wide range of Canadians. You can apply if you meet the following criteria:
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Canadian Resident: Must be a legal resident of Canada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Age Requirement: Applicants must be 18 years or older</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Proof of Income: A steady source of income or proof of financial support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Valid Identification: Government-issued ID for identity verification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Bank Account: An active Canadian bank account to receive funds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Credit Flexibility: All credit backgrounds considered; no minimum credit score required</span>
                </div>
              </div>
              <p className="text-lg text-gray-700 mt-6">
                Whether you're employed full-time, part-time, self-employed, a student with income, or receiving government support, you may be eligible. We assess your ability to repay based on real-world factors, not just your credit score.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Can You Use It For?</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <FaAmbulance className="text-red-600 flex-shrink-0" />
                  <span className="text-gray-700">Emergency Medical Bills</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaTooth className="text-red-600 flex-shrink-0" />
                  <span className="text-gray-700">Dental Procedures</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPills className="text-red-600 flex-shrink-0" />
                  <span className="text-gray-700">Prescription Medications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUserMd className="text-red-600 flex-shrink-0" />
                  <span className="text-gray-700">Surgery & Specialized Treatment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaBrain className="text-red-600 flex-shrink-0" />
                  <span className="text-gray-700">Mental Health Services</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaSmile className="text-red-600 flex-shrink-0" />
                  <span className="text-gray-700">Cosmetic or Elective Procedures</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaWheelchair className="text-red-600 flex-shrink-0" />
                  <span className="text-gray-700">Assistive Devices & Equipment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaHeartbeat className="text-red-600 flex-shrink-0" />
                  <span className="text-gray-700">Post-Treatment Recovery</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                Whatever your health need, our transparent and fast loan process ensures you get support when it matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Compare with Traditional Medical Loans
            </h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto">
              When unexpected medical expenses arise, timing and transparency matter. Here's how Payday Express Medical Loans stack up against traditional medical loan providers:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
              <thead>
                <tr className="border-b border-white border-opacity-20">
                  <th className="text-left p-6 font-semibold">Feature</th>
                  <th className="text-center p-6 font-semibold">Payday Express</th>
                  <th className="text-center p-6 font-semibold">Traditional Lenders</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Approval Speed</td>
                  <td className="p-6 text-center">Within hours</td>
                  <td className="p-6 text-center">Several days to weeks</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Eligibility Criteria</td>
                  <td className="p-6 text-center">Flexible, inclusive</td>
                  <td className="p-6 text-center">Strict credit and income requirements</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Fee Structure</td>
                  <td className="p-6 text-center">Fixed fee, no hidden charges</td>
                  <td className="p-6 text-center">Interest-based, often with hidden fees</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Loan Disbursement</td>
                  <td className="p-6 text-center">Fast, often same-day</td>
                  <td className="p-6 text-center">Delayed due to lengthy processing</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Credit Impact</td>
                  <td className="p-6 text-center">Soft checks or alternative assessments</td>
                  <td className="p-6 text-center">Hard credit checks, may lower credit score</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Application Process</td>
                  <td className="p-6 text-center">Fully online, mobile-friendly</td>
                  <td className="p-6 text-center">Offline paperwork and branch visits</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Repayment Transparency</td>
                  <td className="p-6 text-center">Simple terms, fixed payment schedules</td>
                  <td className="p-6 text-center">Variable interest rates, changing dues</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Support for Diverse Needs</td>
                  <td className="p-6 text-center">Includes elective, dental, and mental care</td>
                  <td className="p-6 text-center">Often limited to major procedures</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Medical Loan Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Benefits of Medical Loans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why choose Payday Express for your medical financing needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaRocket className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Approval</h3>
              <p className="text-gray-700">Get approved within hours, not days or weeks</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaEye className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Fees</h3>
              <p className="text-gray-700">Fixed fees with no hidden charges or surprises</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Inclusive Eligibility</h3>
              <p className="text-gray-700">All credit backgrounds considered</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMobile className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">100% Online</h3>
              <p className="text-gray-700">Apply from anywhere, anytime</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">No Collateral</h3>
              <p className="text-gray-700">Unsecured loans with no assets required</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaClock className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Terms</h3>
              <p className="text-gray-700">Choose repayment plans that work for you</p>
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
              Begin your loan application in minutes. Enjoy fast approval, fixed fees, and complete transparency. 
              Whether for medical bills or emergencies, Payday Express makes borrowing simple, secure, and stress-free. 
              Your financial peace of mind starts now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-red-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
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