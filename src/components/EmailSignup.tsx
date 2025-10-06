'use client';

import { useState } from 'react';
import { FaEnvelope, FaCheckCircle, FaRocket, FaShieldAlt, FaGift } from 'react-icons/fa';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically send the email to your backend
    console.log('Email subscription:', email);
    
    setIsSubscribed(true);
    setIsLoading(false);
  };

  if (isSubscribed) {
    return (
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Our Community!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for subscribing! You'll receive our latest updates, exclusive offers, and financial tips directly in your inbox.
            </p>
            <button
              onClick={() => {
                setIsSubscribed(false);
                setEmail('');
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Subscribe Another Email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="email-signup" className="py-20 bg-blue-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">
              Stay Updated with PaydayExpress
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get the latest news, exclusive offers, financial tips, and updates about our services delivered straight to your inbox.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <FaRocket className="text-yellow-400 text-xl" />
                <span>Exclusive loan offers and promotions</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaShieldAlt className="text-yellow-400 text-xl" />
                <span>Financial security tips and advice</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaGift className="text-yellow-400 text-xl" />
                <span>Special discounts for subscribers</span>
              </div>
            </div>

            {/* Privacy Note */}
            <p className="text-sm text-blue-200">
              We respect your privacy. Unsubscribe at any time. No spam, ever.
            </p>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Join Our Newsletter
              </h3>
              <p className="text-gray-600">
                Get started with your email address
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <FaEnvelope className="mr-2" />
                    Subscribe Now
                  </>
                )}
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Join over <span className="font-semibold text-blue-600">25,000</span> subscribers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
