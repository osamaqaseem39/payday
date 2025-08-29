'use client';

import { useState, useEffect } from 'react';
import { HiEye, HiCalendar, HiPhone, HiMail, HiSearch, HiUser, HiAcademicCap, HiBriefcase, HiDocumentText } from 'react-icons/hi';
import { dashboardApi } from '../../../config/api';

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

import DashboardLayout from '../../../components/DashboardLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<InterviewCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<InterviewCandidate | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data = await dashboardApi.interviewCandidates.list();
      if (Array.isArray(data)) {
        setCandidates(data);
      } else {
        console.error('API returned non-array data:', data);
        setCandidates([]);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'screening':
        return 'bg-blue-100 text-blue-800';
      case 'phone-interview':
        return 'bg-yellow-100 text-yellow-800';
      case 'technical-interview':
        return 'bg-purple-100 text-purple-800';
      case 'final-interview':
        return 'bg-indigo-100 text-indigo-800';
      case 'offer':
        return 'bg-green-100 text-green-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCandidates = (candidates || []).filter(candidate => {
    // Safely handle potentially undefined properties
    if (!candidate) return false;
    
    const safeSearchTerm = searchTerm || '';
    
    // Check if careerApplication is properly populated
    const isPopulated = candidate.careerApplication && 
      typeof candidate.careerApplication === 'object' && 
      candidate.careerApplication.firstName;
    
    if (!isPopulated) return false; // Skip candidates without proper data
    
    const candidateName = `${candidate.careerApplication.firstName} ${candidate.careerApplication.lastName}`;
    const jobTitle = candidate.careerApplication.position || '';
    const candidateEmail = candidate.careerApplication.email || '';
    
    const matchesFilter = filter === 'all' || (candidate.currentStage || '') === filter;
    const matchesSearch = candidateName.toLowerCase().includes(safeSearchTerm.toLowerCase()) ||
                         jobTitle.toLowerCase().includes(safeSearchTerm.toLowerCase()) ||
                         candidateEmail.toLowerCase().includes(safeSearchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading candidates...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Interview Candidates</h1>
                <p className="text-gray-600">Manage interview candidates and scheduling</p>
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
                  placeholder="Search candidates by name, position, or email..."
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
                <option value="all">All Stages</option>
                <option value="screening">Screening</option>
                <option value="phone-interview">Phone Interview</option>
                <option value="technical-interview">Technical Interview</option>
                <option value="final-interview">Final Interview</option>
                <option value="offer">Offer</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {(filteredCandidates || []).map((candidate) => {
                // Check if careerApplication is properly populated
                const isPopulated = candidate.careerApplication && 
                  typeof candidate.careerApplication === 'object' && 
                  candidate.careerApplication.firstName;
                
                if (!isPopulated) return null; // Skip candidates without proper data
                
                return (
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
                      {candidate.careerApplication.phone && (
                        <div className="flex items-center space-x-2 mb-2">
                          <HiPhone className="h-4 w-4 text-gray-400" />
                          <p className="text-sm text-gray-500">{candidate.careerApplication.phone}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(candidate.currentStage || 'screening')}`}>
                        {(candidate.currentStage || 'screening').replace('-', ' ')}
                      </span>
                      {/* Show if candidate was created from application */}
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✅ From Application
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Experience:</span> {candidate.careerApplication.experience}
                    </div>
                    {candidate.overallRating && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Rating:</span> {candidate.overallRating}/5
                      </div>
                    )}
                    {candidate.skillsAssessment && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Skills Assessment:</span>
                        <div className="mt-1 space-y-1">
                          <div className="text-xs">Technical: {candidate.skillsAssessment.technical || 0}/5</div>
                          <div className="text-xs">Communication: {candidate.skillsAssessment.communication || 0}/5</div>
                          <div className="text-xs">Problem Solving: {candidate.skillsAssessment.problemSolving || 0}/5</div>
                          <div className="text-xs">Cultural Fit: {candidate.skillsAssessment.culturalFit || 0}/5</div>
                        </div>
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Interviews:</span> {candidate.interviews?.length || 0}
                    </div>
                    {candidate.notes && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Notes:</span> {candidate.notes}
                      </div>
                    )}
                  </div>

                  {/* Cover Letter Preview */}
                  {candidate.careerApplication.coverLetter && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Cover Letter:</p>
                      <div className="text-sm text-gray-600 max-h-20 overflow-hidden">
                        {candidate.careerApplication.coverLetter.length > 150 
                          ? `${candidate.careerApplication.coverLetter.substring(0, 150)}...` 
                          : candidate.careerApplication.coverLetter
                        }
                      </div>
                    </div>
                  )}
                  
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
                      {candidate.currentStage === 'screening' && (
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <HiCalendar className="h-4 w-4 mr-1" />
                          Schedule Interview
                        </button>
                      )}
                      {candidate.currentStage === 'phone-interview' && (
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          <HiAcademicCap className="h-4 w-4 mr-1" />
                          Technical Round
                        </button>
                      )}
                      {candidate.currentStage === 'technical-interview' && (
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <HiUser className="h-4 w-4 mr-1" />
                          Final Round
                        </button>
                      )}
                      {candidate.currentStage === 'final-interview' && (
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          <HiBriefcase className="h-4 w-4 mr-1" />
                          Make Offer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                );
              })}
            </div>

            {filteredCandidates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No candidates found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Candidate Detail Modal */}
          {showModal && selectedCandidate && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Candidate Details
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
                    {/* Basic Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Basic Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Full Name</label>
                          <p className="text-sm text-gray-900">
                            {selectedCandidate.careerApplication.firstName} {selectedCandidate.careerApplication.lastName}
                          </p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Email</label>
                          <p className="text-sm text-gray-900">{selectedCandidate.careerApplication.email}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Phone</label>
                          <p className="text-sm text-gray-900">{selectedCandidate.careerApplication.phone}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Current Stage</label>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(selectedCandidate.currentStage)}`}>
                            {selectedCandidate.currentStage}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Job Information */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-700 mb-3">Job Applied For</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-blue-600">Position</label>
                          <p className="text-sm text-blue-900 font-medium">{selectedCandidate.careerApplication.position}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-blue-600">Experience Level</label>
                          <p className="text-sm text-blue-900">{selectedCandidate.careerApplication.experience}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-blue-600">Application Status</label>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedCandidate.careerApplication.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            selectedCandidate.careerApplication.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                            selectedCandidate.careerApplication.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                            selectedCandidate.careerApplication.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {selectedCandidate.careerApplication.status}
                          </span>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-blue-600">Applied Date</label>
                          <p className="text-sm text-blue-900">
                            {new Date(selectedCandidate.careerApplication.appliedAt || selectedCandidate.careerApplication.applicationDate || '').toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900 max-h-32 overflow-y-auto">
                        {selectedCandidate.careerApplication.coverLetter}
                      </div>
                    </div>

                    {/* Resume */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
                      <a
                        href={selectedCandidate.careerApplication.resume?.url || selectedCandidate.careerApplication.resume?.path || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                      >
                        <HiDocumentText className="h-4 w-4 mr-1" />
                        {selectedCandidate.careerApplication.resume?.name || 'Download Resume'}
                      </a>
                    </div>

                    {/* Interview Information */}
                    {selectedCandidate.interviews && selectedCandidate.interviews.length > 0 && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-green-700 mb-3">Interview History</h4>
                        <div className="space-y-2">
                          {selectedCandidate.interviews.map((interview, index) => (
                            <div key={index} className="border-l-4 border-green-400 pl-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm font-medium text-green-900 capitalize">
                                    {interview.stage.replace('-', ' ')} Interview
                                  </p>
                                  <p className="text-xs text-green-700">
                                    {new Date(interview.scheduledAt).toLocaleDateString()} - {interview.status}
                                  </p>
                                </div>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(interview.status)}`}>
                                  {interview.status}
                                </span>
                              </div>
                              {interview.notes && (
                                <p className="text-xs text-green-600 mt-1">{interview.notes}</p>
                              )}
                              {interview.feedback && (
                                <p className="text-xs text-green-600 mt-1">Feedback: {interview.feedback}</p>
                              )}
                              {interview.rating && (
                                <p className="text-xs text-green-600 mt-1">Rating: {interview.rating}/5</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills Assessment */}
                    {selectedCandidate.skillsAssessment && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-purple-700 mb-3">Skills Assessment</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-purple-600">Technical Skills</label>
                            <div className="flex items-center mt-1">
                              <div className="flex-1 bg-purple-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-purple-600 h-2 rounded-full" 
                                  style={{ width: `${(selectedCandidate.skillsAssessment.technical / 5) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-purple-700">{selectedCandidate.skillsAssessment.technical}/5</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-purple-600">Communication</label>
                            <div className="flex items-center mt-1">
                              <div className="flex-1 bg-purple-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-purple-600 h-2 rounded-full" 
                                  style={{ width: `${(selectedCandidate.skillsAssessment.communication / 5) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-purple-700">{selectedCandidate.skillsAssessment.communication}/5</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-purple-600">Problem Solving</label>
                            <div className="flex items-center mt-1">
                              <div className="flex-1 bg-purple-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-purple-600 h-2 rounded-full" 
                                  style={{ width: `${(selectedCandidate.skillsAssessment.problemSolving / 5) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-purple-700">{selectedCandidate.skillsAssessment.problemSolving}/5</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-purple-600">Cultural Fit</label>
                            <div className="flex items-center mt-1">
                              <div className="flex-1 bg-purple-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-purple-600 h-2 rounded-full" 
                                  style={{ width: `${(selectedCandidate.skillsAssessment.culturalFit / 5) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-purple-700">{selectedCandidate.skillsAssessment.culturalFit}/5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Overall Rating */}
                    {selectedCandidate.overallRating && (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-yellow-700 mb-3">Overall Assessment</h4>
                        <div className="flex items-center">
                          <div className="flex-1 bg-yellow-200 rounded-full h-3 mr-3">
                            <div 
                              className="bg-yellow-600 h-3 rounded-full" 
                              style={{ width: `${(selectedCandidate.overallRating / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-lg font-bold text-yellow-700">{selectedCandidate.overallRating}/5</span>
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {selectedCandidate.notes && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                        <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900">
                          {selectedCandidate.notes}
                        </div>
                      </div>
                    )}

                    {/* Close Button */}
                    <div className="pt-4">
                      <button
                        onClick={() => setShowModal(false)}
                        className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
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