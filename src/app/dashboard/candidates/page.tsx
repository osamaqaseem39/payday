'use client';

import { useState, useEffect } from 'react';
import { HiEye, HiCalendar, HiPhone, HiMail, HiSearch, HiUser, HiAcademicCap, HiBriefcase } from 'react-icons/hi';
import { dashboardApi } from '../../../config/api';

interface InterviewCandidate {
  _id: string;
  candidateName: string;
  candidateEmail: string;
  phoneNumber?: string;
  jobTitle: string;
  jobId: string;
  stage: string;
  status: string;
  scheduledDate?: string;
  interviewerId?: string;
  interviewerName?: string;
  notes?: string;
  experience: string;
  education: string;
  skills: string[];
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  communicationHistory?: Array<{
    type: string;
    message: string;
    date: string;
  }>;
  decisions?: Array<{
    decision: string;
    reason: string;
    date: string;
  }>;
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
      case 'first-interview':
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

  const filteredCandidates = candidates.filter(candidate => {
    const matchesFilter = filter === 'all' || candidate.stage === filter;
    const matchesSearch = candidate.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase());
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
                  placeholder="Search candidates..."
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
                <option value="first-interview">First Interview</option>
                <option value="technical-interview">Technical Interview</option>
                <option value="final-interview">Final Interview</option>
                <option value="offer">Offer</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {filteredCandidates.map((candidate) => (
                <div key={candidate._id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{candidate.candidateName}</h3>
                      <p className="text-sm text-gray-600 mb-2">{candidate.jobTitle}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <HiMail className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-500">{candidate.candidateEmail}</p>
                      </div>
                      {candidate.phoneNumber && (
                        <div className="flex items-center space-x-2 mb-2">
                          <HiPhone className="h-4 w-4 text-gray-400" />
                          <p className="text-sm text-gray-500">{candidate.phoneNumber}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(candidate.stage)}`}>
                        {candidate.stage.replace('-', ' ')}
                      </span>
                      {candidate.status && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                          {candidate.status}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Experience:</span> {candidate.experience}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Education:</span> {candidate.education}
                    </div>
                    {candidate.scheduledDate && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Interview:</span> {new Date(candidate.scheduledDate).toLocaleDateString()}
                      </div>
                    )}
                    {candidate.interviewerName && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Interviewer:</span> {candidate.interviewerName}
                      </div>
                    )}
                  </div>

                  {candidate.skills && candidate.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{candidate.skills.length - 3} more
                          </span>
                        )}
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
                      {candidate.stage === 'screening' && (
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <HiCalendar className="h-4 w-4 mr-1" />
                          Schedule Interview
                        </button>
                      )}
                      {candidate.stage === 'first-interview' && (
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          <HiAcademicCap className="h-4 w-4 mr-1" />
                          Technical Round
                        </button>
                      )}
                      {candidate.stage === 'technical-interview' && (
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <HiUser className="h-4 w-4 mr-1" />
                          Final Round
                        </button>
                      )}
                      {candidate.stage === 'final-interview' && (
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          <HiBriefcase className="h-4 w-4 mr-1" />
                          Make Offer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCandidates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No candidates found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 