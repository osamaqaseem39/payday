'use client';

import { useState } from 'react';
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import FileUpload from './FileUpload';
import { getDashboardApiUrl } from '@/config/api';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  coverLetter: string;
  resume: { url: string; name: string } | null;
}

interface CareerApplicationFormProps {
  jobId?: string;
  jobTitle?: string;
}

export default function CareerApplicationForm({ jobId, jobTitle }: CareerApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: jobTitle || '',
    experience: '',
    coverLetter: '',
    resume: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUploaded = (fileUrl: string, fileName: string) => {
    setFormData(prev => ({
      ...prev,
      resume: { url: fileUrl, name: fileName }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Prepare data for dashboard server
      const applicationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: formData.experience,
        coverLetter: formData.coverLetter,
        resume: formData.resume ? {
          filename: formData.resume.name,
          path: formData.resume.url,
          mimetype: 'application/pdf', // Default mimetype
          size: 0 // Size will be set by the server
        } : undefined
      };

      console.log('📤 Submitting application data:', applicationData);
      console.log('🌐 API URL:', getDashboardApiUrl('/api/applications'));

      const response = await fetch(getDashboardApiUrl('/api/applications'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', response.headers);
      
      if (response.ok) {
        const successData = await response.json();
        console.log('✅ Success response:', successData);
        setSubmitStatus('success');
        
        // Store user email for candidate dashboard access
        localStorage.setItem('userEmail', formData.email);
        sessionStorage.setItem('userEmail', formData.email);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          position: jobTitle || '',
          experience: '',
          coverLetter: '',
          resume: null,
        });
        
        // Show success message with link to candidate dashboard
        setTimeout(() => {
          if (window.confirm('Application submitted successfully! Would you like to view your candidate dashboard?')) {
            window.location.href = '/dashboard/candidate';
          }
        }, 2000);
      } else {
        const errorData = await response.json();
        console.log('❌ Error response:', errorData);
        setSubmitStatus('error');
        setErrorMessage(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply for a Position</h2>
        <p className="text-gray-600">
          Tell us about yourself and why you'd be a great fit for our team
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-600 text-xl mr-3" />
            <div>
              <h3 className="font-semibold text-green-800">Application Submitted!</h3>
              <p className="text-green-700">Thank you for your interest. We'll review your application and get back to you soon.</p>
              <div className="mt-3">
                <a
                  href="/dashboard/candidate"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View My Candidate Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-600 text-xl mr-3" />
            <div>
              <h3 className="font-semibold text-red-800">Submission Failed</h3>
              <p className="text-red-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
              Position You're Applying For *
            </label>
            {jobTitle ? (
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            ) : (
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a position</option>
                <option value="Senior Software Engineer">Senior Software Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Customer Success Manager">Customer Success Manager</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Marketing Specialist">Marketing Specialist</option>
                <option value="Sales Representative">Sales Representative</option>
                <option value="Other">Other</option>
              </select>
            )}
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience *
            </label>
                          <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select experience level</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (2-5 years)</option>
                <option value="senior">Senior Level (5-10 years)</option>
                <option value="expert">Expert Level (10+ years)</option>
              </select>
          </div>
        </div>

        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
            Cover Letter *
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us why you're interested in this position and what makes you a great fit for our team..."
          />
        </div>

        <div>
          <FileUpload
            onFileUploaded={handleFileUploaded}
            allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
            maxSize={5}
            label="Resume/CV"
            placeholder="Upload your resume or CV (PDF, DOC, DOCX)"
            required={true}
          />
          {formData.resume && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">{formData.resume.name}</p>
                  <p className="text-xs text-green-600">Successfully uploaded</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Submitting Application...
              </>
            ) : (
              <>
                <FaPaperPlane className="mr-2" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 