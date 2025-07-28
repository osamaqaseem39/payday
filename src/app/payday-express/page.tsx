'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaRocket, FaHeart, FaShieldAlt, FaCalculator, FaUsers, FaChartLine, FaMobile, FaCreditCard, FaHandshake, FaGlobe, FaCheckCircle, FaLightbulb } from 'react-icons/fa';

export default function PaydayExpressPage() {
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
                <FaRocket className="text-white text-2xl" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to Payday Express —
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Your Financial Partner
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're revolutionizing the way Canadians access financial services. 
              With transparent fees, ethical practices, and cutting-edge technology, 
              we're making borrowing simple, fair, and accessible for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Payday Express provides innovative financial solutions that bridge the gap between traditional banking and modern needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMobile className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Digital-First Approach</h3>
              <p className="text-gray-700">Apply, manage, and repay loans entirely through our secure online platform</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Peer-to-Peer Lending</h3>
              <p className="text-gray-700">Connect borrowers with individual investors for better rates and transparency</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalculator className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Pricing</h3>
              <p className="text-gray-700">Fixed fees and clear terms with no hidden charges or surprises</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission & Values
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At Payday Express, we believe everyone deserves access to fair, transparent, and ethical financial services. 
                Our mission is to provide Canadians with better alternatives to traditional banking—solutions that are 
                accessible, affordable, and built on trust.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We're committed to financial inclusion, technological innovation, and customer empowerment. 
                Every decision we make is guided by our core values of transparency, fairness, and community.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaHeart className="text-white text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer First</h3>
                  <p className="text-sm text-gray-600">Your success is our success</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShieldAlt className="text-white text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Trust & Security</h3>
                  <p className="text-sm text-gray-600">Your data and privacy protected</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGlobe className="text-white text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-sm text-gray-600">Leading-edge technology</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaHandshake className="text-white text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                  <p className="text-sm text-gray-600">Building stronger communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How We're Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another financial company. Here's what sets us apart from traditional lenders
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaLightbulb className="mr-3 text-blue-600" />
                Innovation-Driven
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">AI-Powered Assessment</p>
                    <p className="text-sm text-gray-600">Advanced algorithms for fair and accurate loan decisions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Blockchain Security</p>
                    <p className="text-sm text-gray-600">Cutting-edge technology to protect your data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Mobile-First Design</p>
                    <p className="text-sm text-gray-600">Seamless experience across all devices</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaHeart className="mr-3 text-green-600" />
                Customer-Centric
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">24/7 Support</p>
                    <p className="text-sm text-gray-600">Real people ready to help whenever you need</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Educational Resources</p>
                    <p className="text-sm text-gray-600">Tools and guides to improve financial literacy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Flexible Solutions</p>
                    <p className="text-sm text-gray-600">Customized options that fit your unique situation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions designed to meet your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <FaCreditCard className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Short-Term Loans</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Quick access to funds for emergency expenses with transparent fees and fast approval.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">Same-day approval</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">No credit check</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">Fixed fees</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <FaUsers className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Peer-to-Peer Platform</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Connect with individual investors for better rates and more flexible terms.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">Lower interest rates</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">Transparent process</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">Community-driven</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <FaCalculator className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Financial Tools</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Calculators, planners, and educational resources to help you make informed decisions.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">Loan calculators</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">Budget planners</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="text-sm">Educational content</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Security */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Technology & Security</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We leverage cutting-edge technology to provide secure, efficient, and transparent financial services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Bank-Level Security</h3>
              <p className="opacity-90">256-bit SSL encryption and secure data centers</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">AI-Powered</h3>
              <p className="opacity-90">Advanced algorithms for fair and accurate assessments</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMobile className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Mobile-First</h3>
              <p className="opacity-90">Optimized for smartphones and tablets</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaGlobe className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Cloud-Based</h3>
              <p className="opacity-90">Scalable infrastructure for reliable service</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Experience Payday Express?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join thousands of Canadians who have already discovered a better way to borrow. 
              Experience the difference that transparency, technology, and trust can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Get Started Today
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