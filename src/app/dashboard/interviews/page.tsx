'use client';

import { useState, useEffect } from 'react';
import { HiEye, HiPencil, HiTrash, HiCalendar, HiClock, HiCheckCircle, HiXCircle } from 'react-icons/hi';

const API_BASE_URL = 'https://payday-server.vercel.app/api';

interface Interview {
  _id: string;
  candidateId: {
    _id: string;
    name: string;
    email: string;
  };
  jobId: {
    _id: string;
    title: string;
  };
  date: string;
  type: string;
  interviewer: string;
  status: string;
  notes: string;
}

import DashboardLayout from '../../../components/DashboardLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/interviews`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Ensure data is an array
      if (Array.isArray(data)) {
        setInterviews(data);
      } else {
        console.error('API returned non-array data:', data);
        setInterviews([]);
      }
    } catch (error) {
      console.error('Error fetching interviews:', error);
      // Fallback to mock data for development
      const mockInterviews = [
        {
          _id: '1',
          candidateId: { _id: '1', name: 'John Doe', email: 'john@example.com' },
          jobId: { _id: '1', title: 'Software Developer' },
          date: '2024-01-20T10:00:00Z',
          type: 'technical',
          interviewer: 'Sarah Johnson',
          status: 'scheduled',
          notes: 'Technical skills assessment'
        },
        {
          _id: '2',
          candidateId: { _id: '2', name: 'Jane Smith', email: 'jane@example.com' },
          jobId: { _id: '2', title: 'UI/UX Designer' },
          date: '2024-01-21T14:00:00Z',
          type: 'behavioral',
          interviewer: 'Mike Chen',
          status: 'completed',
          notes: 'Cultural fit interview'
        }
      ];
      setInterviews(mockInterviews);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technical':
        return 'bg-purple-100 text-purple-800';
      case 'behavioral':
        return 'bg-yellow-100 text-yellow-800';
      case 'final':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <HiClock className="h-4 w-4" />;
      case 'completed':
        return <HiCheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <HiXCircle className="h-4 w-4" />;
      default:
        return <HiClock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading interviews...</p>
        </div>
      </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
              <p className="text-gray-600">Schedule and manage candidate interviews.</p>
            </div>
          </div>

          {/* Interviews Table */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">All Interviews</h3>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {interviews && interviews.length > 0 ? (
                    interviews.map((interview) => (
                      <tr key={interview._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{interview.candidateId.name}</div>
                            <div className="text-sm text-gray-500">{interview.candidateId.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interview.jobId.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <HiCalendar className="h-4 w-4 text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm text-gray-900">
                                {new Date(interview.date).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(interview.date).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(interview.type)}`}>
                            {interview.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interview.interviewer}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                            {getStatusIcon(interview.status)}
                            <span className="ml-1 capitalize">{interview.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <HiEye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <HiPencil className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <HiTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                        No interviews found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 