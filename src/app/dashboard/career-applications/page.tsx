'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { HiEye, HiTrash, HiSearch, HiMail, HiPhone, HiCalendar, HiDocumentText, HiDownload } from 'react-icons/hi';
import { dashboardApi } from '@/config/api';
import { useAuth } from '@/contexts/AuthContext';

interface CareerApplication {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  coverLetter: string;
  resume: {
    filename?: string;
    path?: string;
    url?: string;
    name?: string;
    uploadedAt?: string;
  };
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  notes?: string;
  appliedAt?: string;
  applicationDate?: string;
  reviewedBy?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  reviewedAt?: string;
}

interface InterviewCandidate {
  _id: string;
  careerApplication: CareerApplication;
  currentStage: 'screening' | 'phone-interview' | 'technical-interview' | 'final-interview' | 'offer' | 'rejected' | 'hired';
  overallRating?: number;
  skillsAssessment?: {
    technical: number;
    communication: number;
    problemSolving: number;
    culturalFit: number;
  };
  interviews: Array<{
    stage: string;
    scheduledAt: string;
    status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
    notes?: string;
    feedback?: string;
    rating?: number;
  }>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function CareerApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [interviewCandidates, setInterviewCandidates] = useState<InterviewCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<CareerApplication | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<InterviewCandidate | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'applications' | 'candidates'>('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');

  // Check if user has admin or manager access
  useEffect(() => {
    if (user && (user.role !== 'admin' && user.role !== 'manager')) {
      console.log('🚫 User does not have required access. Role:', user.role);
      window.location.href = '/dashboard';
      return;
    }
    
    if (user && (user.role === 'admin' || user.role === 'manager')) {
      // Check if we have a valid token before fetching
      const token = localStorage.getItem('authToken');
      if (token && token.trim() !== '') {
        console.log('✅ User authenticated and authorized, fetching applications');
        fetchApplications();
      } else {
        console.log('⚠️ No valid token found, redirecting to login');
        window.location.href = '/login';
      }
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      // Debug: Check authentication token
      const token = localStorage.getItem('authToken');
      console.log('🔐 Auth token:', token ? 'Present' : 'Missing');
      console.log('🔐 Token value:', token ? token.substring(0, 20) + '...' : 'None');
      console.log('🔐 Token length:', token ? token.length : 0);
      console.log('🔐 Token trimmed:', token ? token.trim() : 'N/A');
      
      // Debug: Check if user is authenticated
      if (!token || token.trim() === '') {
        console.error('❌ No auth token found or token is empty. User needs to login first.');
        setApplications([]);
        setInterviewCandidates([]);
        setLoading(false);
        // Redirect to login if no token
        window.location.href = '/login';
        return;
      }
      
      console.log('🚀 Attempting to fetch both applications and interview candidates...');
      console.log('🔐 Current user:', user);
      console.log('🔐 User role:', user?.role);
      
      // Test the token format
      console.log('🔐 Token format check:');
      console.log('  - Starts with Bearer:', token.startsWith('Bearer ') ? 'Yes' : 'No');
      console.log('  - Contains dots:', token.includes('.') ? 'Yes' : 'No');
      console.log('  - Length reasonable:', token.length > 50 ? 'Yes' : 'No');
      
      // Fetch both types of data
      const [applications, candidates] = await Promise.all([
        dashboardApi.applications.list(),
        dashboardApi.interviewCandidates.list()
      ]);
      
      console.log('✅ Received applications:', applications);
      console.log('✅ Received interview candidates:', candidates);
      
      if (Array.isArray(applications)) {
        setApplications(applications);
        console.log(`📊 Set ${applications.length} applications`);
      } else {
        console.warn('⚠️ Unexpected applications data format:', applications);
        setApplications([]);
      }
      
      if (Array.isArray(candidates)) {
        setInterviewCandidates(candidates);
        console.log(`📊 Set ${candidates.length} interview candidates`);
      } else {
        console.warn('⚠️ Unexpected candidates data format:', candidates);
        setInterviewCandidates([]);
      }
    } catch (error: any) {
      console.error('❌ Error fetching data:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Handle authentication errors
      if (error.message?.includes('Authentication failed') || error.message?.includes('No token provided')) {
        console.log('🔄 Redirecting to login due to authentication failure');
        // Clear token and redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        return;
      }
      
      setApplications([]);
      setInterviewCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId: string, status: string, notes?: string) => {
    try {
      await dashboardApi.applications.updateStatus(applicationId, status);
      fetchApplications();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (applicationId: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      await dashboardApi.applications.delete(applicationId);
      fetchApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      // Career Application Statuses
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'hired': return 'bg-purple-100 text-purple-800';
      
      // Interview Candidate Stages
      case 'screening': return 'bg-orange-100 text-orange-800';
      case 'phone-interview': return 'bg-blue-100 text-blue-800';
      case 'technical-interview': return 'bg-indigo-100 text-indigo-800';
      case 'final-interview': return 'bg-purple-100 text-purple-800';
      case 'offer': return 'bg-green-100 text-green-800';
      
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = 
      `${application.firstName} ${application.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    const matchesPosition = positionFilter === 'all' || application.position === positionFilter;
    
    return matchesSearch && matchesStatus && matchesPosition;
  });

  if (loading) {
    return (
      <ProtectedRoute requiredRole="manager">
        <DashboardLayout>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading applications and candidates...</p>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="manager">
      <DashboardLayout>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Applications Management</h1>
                <p className="text-gray-600">Review and manage job applications and interview candidates</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'applications'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Career Applications ({applications.length})
                </button>
                <button
                  onClick={() => setActiveTab('candidates')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'candidates'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Interview Candidates ({interviewCandidates.length})
                </button>
              </nav>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search applications by name, email, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="block w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All Positions</option>
                <option value="Senior Software Engineer">Senior Software Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Customer Success Manager">Customer Success Manager</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Marketing Specialist">Marketing Specialist</option>
                <option value="Sales Representative">Sales Representative</option>
              </select>
            </div>

            {/* Applications Grid */}
            {activeTab === 'applications' ? (
              // Career Applications Tab
              <>
                {filteredApplications.length === 0 ? (
                  <div className="bg-white shadow rounded-lg p-12 text-center">
                    <div className="text-gray-400 text-6xl mb-4">📝</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                    <p className="text-gray-500">
                      {applications.length === 0 
                        ? "No career applications have been submitted yet."
                        : "No applications match your current filters."
                      }
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {filteredApplications.map((application) => (
                      <div key={application._id} className="bg-white shadow rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              {application.firstName} {application.lastName}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{application.position}</p>
                            <div className="flex items-center space-x-2 mb-2">
                              <HiMail className="h-4 w-4 text-gray-400" />
                              <p className="text-sm text-gray-500">{application.email}</p>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <HiPhone className="h-4 w-4 text-gray-400" />
                              <p className="text-sm text-gray-500">{application.phone}</p>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                              {application.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Experience:</span> {application.experience}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Applied:</span> {formatDate(application.appliedAt || application.applicationDate || '')}
                          </div>
                          {application.reviewedBy && (
                            <div className="text-sm">
                              <span className="font-medium text-gray-700">Reviewed by:</span> {application.reviewedBy.firstName} {application.reviewedBy.lastName}
                            </div>
                          )}
                          {application.reviewedAt && (
                            <div className="text-sm">
                              <span className="font-medium text-gray-700">Reviewed:</span> {formatDate(application.reviewedAt)}
                            </div>
                          )}
                        </div>

                        {application.coverLetter && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Cover Letter:</p>
                            <div className="text-sm text-gray-600 max-h-20 overflow-hidden">
                              {application.coverLetter.length > 150 
                                ? `${application.coverLetter.substring(0, 150)}...` 
                                : application.coverLetter
                              }
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
                            <a
                              href={application.resume?.url || application.resume?.path || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <HiDownload className="h-4 w-4 mr-1" />
                              Resume
                            </a>
                            <button
                              onClick={() => handleDelete(application._id)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <HiTrash className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Interview Candidates Tab
              <>
                {interviewCandidates.length === 0 ? (
                  <div className="bg-white shadow rounded-lg p-12 text-center">
                    <div className="text-gray-400 text-6xl mb-4">👥</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No interview candidates found</h3>
                    <p className="text-gray-500">
                      No candidates have been moved to the interview stage yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {interviewCandidates.map((candidate) => (
                      <div key={candidate._id} className="bg-white shadow rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              {candidate.careerApplication.firstName} {candidate.careerApplication.lastName}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{candidate.careerApplication.position}</p>
                            <div className="flex items-center space-x-2 mb-2">
                              <HiMail className="h-4 w-4 text-gray-400" />
                              <p className="text-sm text-gray-500">{candidate.careerApplication.email}</p>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidate.currentStage)}`}>
                              {candidate.currentStage}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Stage:</span> {candidate.currentStage}
                          </div>
                          {candidate.overallRating && (
                            <div className="text-sm">
                              <span className="font-medium text-gray-700">Rating:</span> {candidate.overallRating}/5
                            </div>
                          )}
                          {candidate.skillsAssessment && (
                            <div className="text-sm">
                              <span className="font-medium text-gray-700">Skills:</span> T:{candidate.skillsAssessment.technical} C:{candidate.skillsAssessment.communication} P:{candidate.skillsAssessment.problemSolving} F:{candidate.skillsAssessment.culturalFit}
                            </div>
                          )}
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Interviews:</span> {candidate.interviews.length}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <button
                            onClick={() => {
                              setSelectedCandidate(candidate);
                              setShowModal(true);
                            }}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <HiEye className="h-4 w-4 mr-1" />
                            View Details
                          </button>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDelete(candidate._id)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <HiTrash className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}


          </div>

          {/* Application Detail Modal */}
          {showModal && selectedApplication && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Application Details
                    </h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="text-sm text-gray-900">
                          {selectedApplication.firstName} {selectedApplication.lastName}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="text-sm text-gray-900">{selectedApplication.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-sm text-gray-900">{selectedApplication.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <p className="text-sm text-gray-900">{selectedApplication.position}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Experience</label>
                        <p className="text-sm text-gray-900">{selectedApplication.experience}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedApplication.status)}`}>
                          {selectedApplication.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900 max-h-32 overflow-y-auto">
                        {selectedApplication.coverLetter}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Resume</label>
                      <a
                        href={selectedApplication.resume?.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {selectedApplication.resume?.name || 'Download Resume'}
                      </a>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <select
                        value={selectedApplication.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as CareerApplication['status'];
                          handleStatusUpdate(selectedApplication._id, newStatus);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 