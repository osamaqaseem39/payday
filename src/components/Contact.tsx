'use client';

import { useState } from 'react';
import ContactForm from './ContactForm';
import { FaEnvelope, FaPhone, FaClock, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

export default function Contact() {

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <FaEnvelope className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We are Here to Help — Reach Out Anytime
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At Payday Express, we believe communication is key to building trust and delivering exceptional service. 
            Whether you have questions about our loan options, need help with an application, want to learn more 
            about peer-to-peer lending, or simply wish to connect with our team — we're always just a message or call away.
          </p>
          <p className="text-lg text-gray-700 mt-6 font-medium">
            Your financial goals are important, and we're committed to supporting you every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form and Information */}
          <div className="space-y-8">
            {/* Contact Form */}
            <ContactForm />

            {/* Why Reach Out Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Reach Out?</h3>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Transparent Help for Real People</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Loan Inquiries – Understand your options, rates, and how to apply</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Account Assistance – Get support on payments, updates, or issues</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Investment Guidance – Learn how to invest securely through our P2P platform</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Business Partnerships – Explore partnership or affiliate opportunities</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Media Requests – For press or public relations inquiries</p>
                </div>
                
                <p className="text-lg text-blue-600 font-semibold text-center pt-4">
                  Your future starts with one message. Let's talk.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Information and Image */}
          <div className="space-y-8">
            {/* Contact Image */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="relative">
                <img 
                  src="/images/contact.png" 
                  alt="Contact Payday Express" 
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
              </div>
            </div>

            {/* Customer Support */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Support</h3>
              <p className="text-gray-600 mb-6">
                For all general inquiries, support requests, or help with your account:
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-blue-600">support@paydayexpress.ca</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaPhone className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-green-600">+1 (800) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaClock className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Support Hours</p>
                    <p className="text-purple-600">Monday – Friday | 9 AM – 6 PM (EST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit Us */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Visit Us</h3>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Head Office</h4>
                  <div className="text-gray-600 space-y-1">
                    <p className="font-medium">Payday Express Inc.</p>
                    <p>123 Finance Street, Suite 101</p>
                    <p>Toronto, Ontario, Canada</p>
                    <p className="text-sm text-gray-500 mt-2">
                      (Note: By appointment only. Virtual consultations available.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
} 