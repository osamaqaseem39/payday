'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaHeart, FaCalculator, FaShieldAlt, FaClock, FaCheckCircle, FaUsers, FaChartLine, FaMobile, FaCreditCard, FaHandshake, FaGlobe, FaLock, FaRocket, FaEye, FaArrowRight, FaRing, FaUtensils, FaCamera, FaPlane, FaMusic, FaGift, FaUserFriends, FaGraduationCap, FaBriefcase, FaHome, FaGlobeAmericas, FaChartBar, FaLaptop, FaComments, FaUpload, FaBell, FaQuoteLeft, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function WeddingLoansPage() {
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
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 pt-16">
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
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center">
                  <FaHeart className="text-white text-2xl" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Plan the Perfect Wedding with
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                  Easy Financing
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                Celebrate Your Big Day Without Financial Stress
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Planning a wedding is one of life's most exciting milestones—but it can also be one of the most expensive. 
                At Payday Express, we offer flexible and transparent wedding loans designed to help you cover all the 
                important moments—from the ring to the reception—without draining your savings.
              </p>
              <div className="mt-10">
                <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Apply Now
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/images/weddingloan.png"
                  alt="Wedding Loans - Payday Express"
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-purple-600/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Wedding Loans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose a Payday Express Wedding Loan?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A wedding loan helps you manage big-day expenses without draining your savings. With fixed fees, flexible terms, 
              and no hidden charges, you can finance venues, dresses, catering, travel, and more—stress-free. Avoid credit 
              card debt and get instant funds with clear repayment plans tailored to your budget. Whether it's an intimate 
              event or a grand celebration, a wedding loan gives you the financial breathing room to focus on what truly 
              matters—making unforgettable memories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mr-4">
                  <FaEye className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fixed-Fee Transparency</h3>
              </div>
              <p className="text-gray-700">
                No surprise interest charges—know exactly what you'll pay
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Flexible Repayment Terms</h3>
              </div>
              <p className="text-gray-700">
                Tailored to your timeline and budget
              </p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center mr-4">
                  <FaRocket className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fast Approval</h3>
              </div>
              <p className="text-gray-700">
                Instant access to funds for venues, attire, catering, décor, or honeymoon plans
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No Collateral Required</h3>
              </div>
              <p className="text-gray-700">
                Simple eligibility—making it easy for couples to focus on their special day
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <FaCalculator className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Clear, Predictable Payments</h3>
              </div>
              <p className="text-gray-700">
                Dedicated support and transparent payment schedules
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <FaHeart className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Stress-Free Planning</h3>
              </div>
              <p className="text-gray-700">
                Make planning your dream wedding more affordable and stress-free
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
              How It Works – Apply for a Wedding Loan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple 6-step process makes getting a wedding loan quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Loan Type</h3>
              <p className="text-gray-600">
                Select "Wedding Loan" from our loan options to begin your application
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enter Loan Details</h3>
              <p className="text-gray-600">
                Specify the amount you need and your desired repayment duration
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Auto-Fill Fees</h3>
              <p className="text-gray-600">
                Our system auto-calculates the fixed company fee and investor share for transparency
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Submit Application</h3>
              <p className="text-gray-600">
                Complete a quick digital form—no paperwork or long waits
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">5</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Approved Fast</h3>
              <p className="text-gray-600">
                Receive instant approval decisions with funds disbursed directly to your account
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">6</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Start Planning</h3>
              <p className="text-gray-600">
                Use the loan for venues, dresses, catering, or your honeymoon—on your terms
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
                  <span className="text-gray-700">Canadian residents aged 18 or older</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Couples planning a wedding—big or small</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Family members contributing to wedding costs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Event planners or coordinators managing funds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Applicants with full-time, part-time, or self-employment income</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Individuals with active Canadian bank accounts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">No perfect credit score required—flexible credit checks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Those looking for fixed fees over fluctuating interest rates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Borrowers who prefer simple repayment plans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">People seeking transparent, fast financial support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Anyone needing extra financial room for wedding-related costs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Ideal for those avoiding high-interest credit card debt</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Can You Use It For?</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">Wedding venue bookings and deposits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUtensils className="text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">Catering, food, and beverage expenses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaGift className="text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">Wedding attire for bride, groom, and party</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaHeart className="text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">Floral arrangements and decorations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCamera className="text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">Professional photography and videography</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPlane className="text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">Travel and accommodations for guests or honeymoon</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaMusic className="text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">Engagement parties and bridal showers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaMusic className="text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">Entertainment, DJs, and live bands</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUserFriends className="text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">Wedding planner and coordinator fees</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaGift className="text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">Invitations, gifts, and wedding favors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">Emergency or last-minute wedding expenses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCalculator className="text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700">Stress-free budgeting with fixed fees and timelines</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Compare with Traditional Business Loans
            </h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto">
              This comparison highlights how Payday Express Wedding Loans provide faster, fairer, and more flexible options 
              to finance your big day—without the stress of traditional borrowing.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
              <thead>
                <tr className="border-b border-white border-opacity-20">
                  <th className="text-left p-6 font-semibold">Feature</th>
                  <th className="text-center p-6 font-semibold">Payday Express Wedding Loans</th>
                  <th className="text-center p-6 font-semibold">Traditional Wedding Loans</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Approval Speed</td>
                  <td className="p-6 text-center">Instant pre-approval and fast disbursement</td>
                  <td className="p-6 text-center">Often slow, bank-dependent approval process</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Fee Structure</td>
                  <td className="p-6 text-center">Fixed, transparent fees—no hidden charges</td>
                  <td className="p-6 text-center">Variable interest rates with possible hidden fees</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Credit Requirements</td>
                  <td className="p-6 text-center">Flexible credit checks, inclusive approach</td>
                  <td className="p-6 text-center">Rigid credit score requirements</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Application Process</td>
                  <td className="p-6 text-center">Fully online, easy-to-use interface</td>
                  <td className="p-6 text-center">Paperwork-heavy, time-consuming processes</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Repayment Terms</td>
                  <td className="p-6 text-center">Clear, simple terms tailored to your budget</td>
                  <td className="p-6 text-center">Can be complex or unclear</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Loan Amount Flexibility</td>
                  <td className="p-6 text-center">Customized amounts based on your event needs</td>
                  <td className="p-6 text-center">Often limited or rigid loan brackets</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Transparency</td>
                  <td className="p-6 text-center">End-to-end clarity with blockchain-backed systems</td>
                  <td className="p-6 text-center">Less transparent, subject to lender-specific policies</td>
                </tr>
                <tr className="border-b border-white border-opacity-10">
                  <td className="p-6 font-medium">Customer Support</td>
                  <td className="p-6 text-center">Personalized, fast response support</td>
                  <td className="p-6 text-center">Generic or delayed service from large institutions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Wedding Planning Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Benefits of Wedding Loans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why choose Payday Express for your wedding financing needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
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

            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Terms</h3>
              <p className="text-gray-700">Repayment plans tailored to your wedding timeline</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMobile className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">100% Online</h3>
              <p className="text-gray-700">Apply from anywhere, anytime</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">No Collateral</h3>
              <p className="text-gray-700">Unsecured loans with no assets required</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalculator className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Clear Payments</h3>
              <p className="text-gray-700">Predictable payment schedules</p>
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
              Your dream wedding doesn't need to wait. Apply for your wedding loan now and celebrate with the confidence 
              that your finances are in good hands. Let Payday Express help you start your forever, stress-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
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