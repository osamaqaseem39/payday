'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CareerApplicationForm from '@/components/CareerApplicationForm';
import { FaBriefcase, FaUsers, FaHeart, FaRocket, FaGraduationCap, FaHandshake, FaLightbulb, FaGlobe, FaCheckCircle, FaStar, FaMapMarkerAlt, FaClock, FaSpinner } from 'react-icons/fa';
import { dashboardApi } from '@/config/api';

// Job interface based on the server model
interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  department: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'expert';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  benefits: string[];
  status: 'draft' | 'published' | 'closed' | 'archived';
  applicationDeadline: string;
  numberOfPositions: number;
  tags: string[];
  isRemote: boolean;
  isUrgent: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CareerPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const jobsData = await dashboardApi.jobs.list();
        setJobs(jobsData || []);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load job listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Closed';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  // Helper function to get employment type color
  const getEmploymentTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      'contract': 'bg-purple-100 text-purple-800',
      'internship': 'bg-orange-100 text-orange-800',
      'freelance': 'bg-pink-100 text-pink-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Helper function to get experience level color
  const getExperienceLevelColor = (level: string) => {
    const colors = {
      'entry': 'bg-green-100 text-green-800',
      'mid': 'bg-blue-100 text-blue-800',
      'senior': 'bg-purple-100 text-purple-800',
      'expert': 'bg-red-100 text-red-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

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

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="flex items-center space-x-3">
                <FaSpinner className="animate-spin text-4xl text-blue-600" />
                <span className="text-xl text-gray-600">Loading job listings...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-red-800 mb-4">Unable to Load Jobs</h3>
                <p className="text-red-600 mb-6">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Jobs Grid */}
          {!loading && !error && (
            <>
              {jobs.length === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
                    <FaBriefcase className="text-6xl text-gray-400 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">No Open Positions</h3>
                    <p className="text-gray-600 mb-6">
                      We don't have any open positions at the moment, but we're always looking for talented people to join our team.
                    </p>
                    <p className="text-gray-600">
                      Feel free to submit a general application below, and we'll keep your information on file for future opportunities.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {jobs.map((job) => (
                    <div key={job._id} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getEmploymentTypeColor(job.employmentType)}`}>
                          {job.employmentType.replace('-', ' ')}
                        </span>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMapMarkerAlt className="mr-2" />
                          <span>{job.isRemote ? 'Remote' : job.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaClock className="mr-2" />
                          <span>Posted {formatDate(job.createdAt)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaBriefcase className="mr-2" />
                          <span>{job.department}</span>
                        </div>
                        {job.salary && (
                          <div className="flex items-center text-sm text-gray-600">
                            <FaStar className="mr-2" />
                            <span>
                              {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-700 mb-6 line-clamp-3">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className={`px-3 py-1 rounded-full text-sm ${getExperienceLevelColor(job.experienceLevel)}`}>
                          {job.experienceLevel}
                        </span>
                        {job.isRemote && (
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            Remote
                          </span>
                        )}
                        {job.isUrgent && (
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            Urgent
                          </span>
                        )}
                        {job.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
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

      {/* Application Form Section */}
      <section id="application-form" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CareerApplicationForm />
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
              <button 
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Apply Now
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