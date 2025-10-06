'use client';

import { useState, useEffect } from 'react';
import { HiEye, HiCalendar, HiPhone, HiMail, HiSearch, HiUser, HiAcademicCap, HiBriefcase, HiDocumentText, HiClock, HiCheckCircle, HiXCircle } from 'react-icons/hi';
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
  email: string;
  primaryApplication: CareerApplication;
  careerApplications: CareerApplication[];
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
    location?: string;
    meetingLink?: string;
  }>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

import DashboardLayout from '../../../components/DashboardLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function CandidateDashboardPage() {
  const [candidate, setCandidate] = useState<InterviewCandidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCandidateData();
  }, []);

  const fetchCandidateData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get user email from localStorage or context
      const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
      
      if (!userEmail) {
        setError('User email not found. Please log in again.');
        return;
      }

      // Fetch candidate data by email
      const data = await dashboardApi.interviewCandidates.getByEmail(userEmail);
      
      if (data) {
        setCandidate(data);
      } else {
        setError('No candidate profile found for your email address.');
      }
    } catch (error) {
      console.error('Error fetching candidate data:', error);
      setError('Failed to load your candidate profile. Please try again.');
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
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInterviewStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <HiClock className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <HiCheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <HiXCircle className="h-5 w-5 text-red-500" />;
      case 'rescheduled':
        return <HiCalendar className="h-5 w-5 text-yellow-500" />;
      default:
        return <HiClock className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNextInterview = () => {
    if (!candidate?.interviews) return null;
    
    const upcomingInterviews = candidate.interviews.filter(interview => 
      interview.status === 'scheduled' && new Date(interview.scheduledAt) > new Date()
    );
    
    return upcomingInterviews.length > 0 ? upcomingInterviews[0] : null;
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <HiXCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (!candidate) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Your Candidate Dashboard</h1>
              <p className="text-gray-600 mb-8">You haven't applied for any positions yet.</p>
              <a
                href="/career"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Open Positions
              </a>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  const nextInterview = getNextInterview();

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Candidate Dashboard</h1>
            <p className="mt-2 text-gray-600">Track your applications and interview progress</p>
          </div>

          {/* Current Status Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Current Status: {candidate.primaryApplication.firstName} {candidate.primaryApplication.lastName}
                </h2>
                <p className="text-gray-600 mb-4">{candidate.primaryApplication.email}</p>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStageColor(candidate.currentStage)}`}>
                    {candidate.currentStage.replace('-', ' ').toUpperCase()}
                  </span>
                  {candidate.overallRating && (
                    <span className="text-sm text-gray-600">
                      Overall Rating: {candidate.overallRating}/5
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Applications</p>
                <p className="text-2xl font-bold text-blue-600">{candidate.careerApplications.length}</p>
              </div>
            </div>
          </div>

          {/* Next Interview Card */}
          {nextInterview && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Next Interview</h3>
                  <p className="text-blue-700 mb-1">
                    <strong>Type:</strong> {nextInterview.stage.replace('-', ' ').toUpperCase()}
                  </p>
                  <p className="text-blue-700 mb-1">
                    <strong>Date:</strong> {formatDate(nextInterview.scheduledAt)}
                  </p>
                  {nextInterview.location && (
                    <p className="text-blue-700 mb-1">
                      <strong>Location:</strong> {nextInterview.location}
                    </p>
                  )}
                  {nextInterview.meetingLink && (
                    <p className="text-blue-700">
                      <strong>Meeting Link:</strong>{' '}
                      <a href={nextInterview.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Join Meeting
                      </a>
                    </p>
                  )}
                </div>
                <HiCalendar className="h-12 w-12 text-blue-500" />
              </div>
            </div>
          )}

          {/* Applications Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">My Applications</h3>
            <div className="space-y-4">
              {candidate.careerApplications.map((application, index) => (
                <div key={application._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        {application.position}
                        {index === 0 && <span className="ml-2 text-sm text-blue-600">(Primary)</span>}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Experience:</span>
                          <p className="font-medium">{application.experience}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-1 ${getStatusColor(application.status)}`}>
                            {application.status}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Applied:</span>
                          <p className="font-medium">{formatDate(application.appliedAt || application.applicationDate || '')}</p>
                        </div>
                        {application.reviewedAt && (
                          <div>
                            <span className="text-gray-500">Reviewed:</span>
                            <p className="font-medium">{formatDate(application.reviewedAt)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interview History */}
          {candidate.interviews && candidate.interviews.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Interview History</h3>
              <div className="space-y-4">
                {candidate.interviews.map((interview, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getInterviewStatusIcon(interview.status)}
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {interview.stage.replace('-', ' ').toUpperCase()}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {formatDate(interview.scheduledAt)}
                          </p>
                          {interview.location && (
                            <p className="text-sm text-gray-600">Location: {interview.location}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(interview.status)}`}>
                          {interview.status}
                        </span>
                        {interview.rating && (
                          <p className="text-sm text-gray-600 mt-1">Rating: {interview.rating}/5</p>
                        )}
                      </div>
                    </div>
                    {interview.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">{interview.notes}</p>
                      </div>
                    )}
                    {interview.feedback && (
                      <div className="mt-3 p-3 bg-blue-50 rounded">
                        <p className="text-sm font-medium text-blue-900 mb-1">Feedback:</p>
                        <p className="text-sm text-blue-700">{interview.feedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Assessment */}
          {candidate.skillsAssessment && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Skills Assessment</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(candidate.skillsAssessment).map(([skill, rating]) => (
                  <div key={skill} className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{rating}/5</div>
                    <div className="text-sm text-gray-600 capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {candidate.notes && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Notes</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{candidate.notes}</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 