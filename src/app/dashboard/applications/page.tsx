'use client';

import { useState, useEffect } from 'react';
import { HiEye, HiCheckCircle, HiXCircle, HiClock, HiSearch } from 'react-icons/hi';
import { dashboardApi } from '../../../config/api';

interface Application {
  _id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  jobId: string;
  status: string;
  appliedDate: string;
  resumeUrl?: string;
  coverLetter?: string;
  experience: string;
  education: string;
  skills: string[];
  phoneNumber?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  
}

import DashboardLayout from '../../../components/DashboardLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [authStatus, setAuthStatus] = useState<string>('Checking...');

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthStatus(`✅ Authenticated (Token: ${token.substring(0, 20)}...)`);
    } else {
      setAuthStatus('❌ No authentication token found');
    }
    
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      // Debug: Check authentication state
      const token = localStorage.getItem('authToken');
      console.log('🔐 Fetching applications - Auth token present:', !!token);
      if (token) {
        console.log('🔐 Token length:', token.length);
        console.log('🔐 Token preview:', token.substring(0, 20) + '...');
      }
      
      const data = await dashboardApi.applications.list();
      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        console.error('API returned non-array data:', data);
        setApplications([]);
      }
    } catch (error: any) {
      console.error('Error fetching applications:', error);
      
      // Check if it's an authentication error
      if (error.message && error.message.includes('Authentication failed')) {
        console.log('🔐 Authentication error detected, redirecting to login...');
        // Clear invalid token and redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        return;
      }
      
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await dashboardApi.applications.updateStatus(id, status);
      await fetchApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-purple-100 text-purple-800';
      case 'interviewing':
        return 'bg-indigo-100 text-indigo-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <HiClock className="h-4 w-4" />;
      case 'reviewing':
        return <HiEye className="h-4 w-4" />;
      case 'shortlisted':
        return <HiCheckCircle className="h-4 w-4" />;
      case 'interviewing':
        return <HiClock className="h-4 w-4" />;
      case 'hired':
        return <HiCheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <HiXCircle className="h-4 w-4" />;
      default:
        return <HiClock className="h-4 w-4" />;
    }
  };

  const filteredApplications = applications.filter(application => {
    const matchesFilter = filter === 'all' || application.status === filter;
    const matchesSearch = application.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading applications...</p>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
                <p className="text-gray-600">Manage job applications and candidates</p>
              </div>
            </div>

            {/* Authentication Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Authentication Status</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>{authStatus}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    try {
                      console.log('🧪 Testing authentication manually...');
                      const token = localStorage.getItem('authToken');
                      if (!token) {
                        alert('No authentication token found. Please log in first.');
                        return;
                      }
                      
                      const response = await fetch('http://localhost:3002/api/applications', {
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                        }
                      });
                      
                      console.log('🧪 Manual test response status:', response.status);
                      console.log('🧪 Manual test response headers:', Object.fromEntries(response.headers.entries()));
                      
                      if (response.ok) {
                        const data = await response.json();
                        console.log('🧪 Manual test success:', data);
                        alert('✅ Authentication test successful! Check console for details.');
                      } else {
                        const errorData = await response.json();
                        console.log('🧪 Manual test failed:', errorData);
                        alert(`❌ Authentication test failed: ${response.status} - ${errorData.message || 'Unknown error'}`);
                      }
                    } catch (error: any) {
                      console.error('🧪 Manual test error:', error);
                      alert(`❌ Authentication test error: ${error.message}`);
                    }
                  }}
                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Test Auth
                </button>
                <button
                  onClick={async () => {
                    try {
                      console.log('🔐 Testing login flow...');
                      const response = await fetch('http://localhost:3002/api/auth/login', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          email: 'admin@payday.com',
                          password: 'admin123'
                        })
                      });
                      
                      console.log('🔐 Login test response status:', response.status);
                      
                      if (response.ok) {
                        const data = await response.json();
                        console.log('🔐 Login test success:', data);
                        
                        if (data.data && data.data.token) {
                          localStorage.setItem('authToken', data.data.token);
                          setAuthStatus(`✅ Login successful! Token: ${data.data.token.substring(0, 20)}...`);
                          alert('✅ Login test successful! Token stored. Now try the Test Auth button.');
                        } else {
                          alert('❌ Login response missing token data');
                        }
                      } else {
                        const errorData = await response.json();
                        console.log('🔐 Login test failed:', errorData);
                        alert(`❌ Login test failed: ${response.status} - ${errorData.message || 'Unknown error'}`);
                      }
                    } catch (error: any) {
                      console.error('🔐 Login test error:', error);
                      alert(`❌ Login test error: ${error.message}`);
                    }
                  }}
                  className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ml-2"
                >
                  Test Login
                </button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interviewing">Interviewing</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {filteredApplications.map((application) => (
                <div key={application._id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{application.candidateName}</h3>
                      <p className="text-sm text-gray-600 mb-2">{application.jobTitle}</p>
                      <p className="text-sm text-gray-500">{application.candidateEmail}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span className="ml-1 capitalize">{application.status}</span>
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Experience:</span> {application.experience}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Education:</span> {application.education}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Applied:</span> {new Date(application.appliedDate).toLocaleDateString()}
                    </div>
                  </div>

                  {application.skills && application.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {application.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {skill}
                          </span>
                        ))}
                        {application.skills.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{application.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setSelectedApplication(application);
                        setShowModal(true);
                      }}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <HiEye className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                    
                    <div className="flex space-x-2">
                      {application.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'reviewing')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Review
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'rejected')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {application.status === 'reviewing' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'shortlisted')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'rejected')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {application.status === 'shortlisted' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'interviewing')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Interview
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'rejected')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {application.status === 'interviewing' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'hired')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Hire
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'rejected')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No applications found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 