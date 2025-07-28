'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaBriefcase, FaUsers, FaHeart, FaRocket, FaGraduationCap, FaHandshake, FaLightbulb, FaGlobe, FaCheckCircle, FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function CareerPage() {
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
                  <FaBriefcase className="text-white text-2xl" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Join Our Team —
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Build the Future of Finance
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                At Payday Express, we're not just building a company—we're building a movement. 
                Join us in revolutionizing how Canadians access financial services with transparency, 
                technology, and trust.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/images/careers.png"
                  alt="Careers - Payday Express"
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes Payday Express an exceptional place to grow your career
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaRocket className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation Culture</h3>
              <p className="text-gray-700">Work with cutting-edge technology and shape the future of fintech</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Purpose-Driven</h3>
              <p className="text-gray-700">Make a real impact on people's financial lives and communities</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Collaborative Team</h3>
              <p className="text-gray-700">Work with talented, passionate people who support your growth</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Continuous Learning</h3>
              <p className="text-gray-700">Access to training, conferences, and skill development programs</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaGlobe className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Remote-First</h3>
              <p className="text-gray-700">Flexible work arrangements that fit your lifestyle</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Competitive Benefits</h3>
              <p className="text-gray-700">Health, dental, retirement, and performance-based rewards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Values
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our values guide everything we do—from how we serve our customers to how we treat each other. 
                We believe in creating an environment where everyone can thrive and make a meaningful impact.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaHeart className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Empathy First</h3>
                    <p className="text-gray-600">We understand our customers' needs and design solutions that truly help them.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaLightbulb className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation Mindset</h3>
                    <p className="text-gray-600">We constantly challenge the status quo and embrace new ideas.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaHandshake className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrity Always</h3>
                    <p className="text-gray-600">We do what's right, even when it's hard, and build trust through transparency.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What Our Team Says</h3>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-gray-700 mb-4">"Working at Payday Express has been incredible. I love that we're actually helping people improve their financial lives."</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-full mr-3"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Sarah Chen</p>
                      <p className="text-sm text-gray-600">Senior Product Manager</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-gray-700 mb-4">"The culture here is amazing. Everyone is passionate about our mission and supportive of each other's growth."</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-600 rounded-full mr-3"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Marcus Rodriguez</p>
                      <p className="text-sm text-gray-600">Lead Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our growing team and help us build the future of financial services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Senior Software Engineer */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Senior Software Engineer</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Full-time</span>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>Remote (Canada)</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaClock className="mr-2" />
                  <span>Posted 2 days ago</span>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Build scalable, secure applications that help Canadians access better financial services. 
                Work with modern technologies and shape our platform's future.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Node.js</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">TypeScript</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">AWS</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>

            {/* Product Manager */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Product Manager</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Full-time</span>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>Toronto, ON</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaClock className="mr-2" />
                  <span>Posted 1 week ago</span>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Lead product strategy and development for our lending platform. 
                Work closely with customers, engineering, and design teams to deliver exceptional experiences.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Product Strategy</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">User Research</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Agile</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Fintech</span>
              </div>
              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Apply Now
              </button>
            </div>

            {/* Customer Success Manager */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Customer Success Manager</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Full-time</span>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>Vancouver, BC</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaClock className="mr-2" />
                  <span>Posted 3 days ago</span>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Help our customers achieve their financial goals. Build relationships, provide support, 
                and ensure exceptional experiences throughout their journey.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Customer Support</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Relationship Building</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Problem Solving</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Financial Services</span>
              </div>
              <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Apply Now
              </button>
            </div>

            {/* Data Analyst */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Data Analyst</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Full-time</span>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>Remote (Canada)</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaClock className="mr-2" />
                  <span>Posted 5 days ago</span>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Analyze customer data, market trends, and business metrics to drive strategic decisions. 
                Help us understand and serve our customers better.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">SQL</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Python</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Tableau</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Statistics</span>
              </div>
              <button className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Benefits & Perks</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We believe in taking care of our team. Here's what we offer to support your success and well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Health & Wellness</h3>
              <p className="opacity-90">Comprehensive health, dental, and vision coverage</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Learning & Development</h3>
              <p className="opacity-90">Professional development budget and conference attendance</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaGlobe className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Flexible Work</h3>
              <p className="opacity-90">Remote-first culture with flexible hours and locations</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Performance Rewards</h3>
              <p className="opacity-90">Competitive salary, equity, and performance bonuses</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Join Our Team?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              If you're passionate about making a difference in people's financial lives and want to work 
              with a team that values innovation, integrity, and impact, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                View All Positions
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300">
                Contact HR
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 