'use client';

import { useState, useEffect } from 'react';
import { HiEye, HiPencil, HiTrash, HiCalendar, HiClock, HiCheckCircle, HiXCircle, HiSearch, HiUser, HiBriefcase, HiPlus, HiX } from 'react-icons/hi';
import { dashboardApi, getAuthHeaders } from '../../../config/api';

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

interface Candidate {
  _id: string;
  name: string;
  email: string;
}

interface Job {
  _id: string;
  title: string;
}

import DashboardLayout from '../../../components/DashboardLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [formData, setFormData] = useState({
    candidateId: '',
    jobId: '',
    date: '',
    time: '',
    type: 'technical',
    interviewer: '',
    status: 'scheduled',
    notes: ''
  });

  useEffect(() => {
    fetchInterviews();
    fetchCandidates();
    fetchJobs();
  }, []);

  const fetchInterviews = async () => {
    try {
      const data = await dashboardApi.interviewCandidates.list();
      if (Array.isArray(data)) {
        // Extract interviews from candidates
        const allInterviews: Interview[] = [];
        data.forEach((candidate: any) => {
          if (candidate.interviews && Array.isArray(candidate.interviews)) {
            candidate.interviews.forEach((interview: any) => {
              allInterviews.push({
                _id: interview._id || `${candidate._id}-${interview.scheduledAt}`,
                candidateId: {
                  _id: candidate._id,
                  name: candidate.candidateName,
                  email: candidate.candidateEmail
                },
                jobId: {
                  _id: candidate.jobId,
                  title: candidate.jobTitle
                },
                date: interview.scheduledAt,
                type: interview.type || 'technical',
                interviewer: interview.interviewer || '',
                status: interview.status || 'scheduled',
                notes: interview.notes || ''
              });
            });
          }
        });
        setInterviews(allInterviews);
      } else {
        console.error('API returned non-array data:', data);
        setInterviews([]);
      }
    } catch (error) {
      console.error('Error fetching interviews:', error);
      setInterviews([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidates = async () => {
    try {
      const data = await dashboardApi.interviewCandidates.list();
      if (Array.isArray(data)) {
        setCandidates(data.map((candidate: any) => ({
          _id: candidate._id,
          name: candidate.candidateName,
          email: candidate.candidateEmail
        })));
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const data = await dashboardApi.jobs.list();
      if (Array.isArray(data)) {
        setJobs(data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleCreateInterview = async (interviewData: any) => {
    try {
      // Since interviews are part of candidates, we need to add the interview to the candidate
      const candidateId = interviewData.candidateId;
      const interviewToAdd = {
        scheduledAt: `${interviewData.date}T${interviewData.time}`,
        type: interviewData.type,
        interviewer: interviewData.interviewer,
        status: interviewData.status,
        notes: interviewData.notes
      };
      
      // This would need to be implemented on the server side
      // For now, we'll just refresh the data
      await fetchInterviews();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating interview:', error);
    }
  };

  const handleUpdateInterview = async (id: string, interviewData: any) => {
    try {
      // Since interviews are part of candidates, we need to update the interview within the candidate
      // This would need to be implemented on the server side
      // For now, we'll just refresh the data
      await fetchInterviews();
      setShowModal(false);
      setEditingInterview(null);
      resetForm();
    } catch (error) {
      console.error('Error updating interview:', error);
    }
  };

  const handleDeleteInterview = async (id: string) => {
    if (confirm('Are you sure you want to delete this interview?')) {
      try {
        // Since interviews are part of candidates, we need to remove the interview from the candidate
        // This would need to be implemented on the server side
        // For now, we'll just refresh the data
        await fetchInterviews();
      } catch (error) {
        console.error('Error deleting interview:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      candidateId: '',
      jobId: '',
      date: '',
      time: '',
      type: 'technical',
      interviewer: '',
      status: 'scheduled',
      notes: ''
    });
  };

  const handleEdit = (interview: Interview) => {
    setEditingInterview(interview);
    const interviewDate = new Date(interview.date);
    setFormData({
      candidateId: interview.candidateId._id,
      jobId: interview.jobId._id,
      date: interviewDate.toISOString().split('T')[0],
      time: interviewDate.toTimeString().split(' ')[0].substring(0, 5),
      type: interview.type,
      interviewer: interview.interviewer,
      status: interview.status,
      notes: interview.notes
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const interviewData = {
      ...formData,
      date: `${formData.date}T${formData.time}:00.000Z`
    };

    if (editingInterview) {
      await handleUpdateInterview(editingInterview._id, interviewData);
    } else {
      await handleCreateInterview(interviewData);
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

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = 
      interview.candidateId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.jobId.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    const matchesType = typeFilter === 'all' || interview.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading interviews...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
                <p className="text-gray-600">Schedule and manage candidate interviews</p>
              </div>
              <button
                onClick={() => {
                  setEditingInterview(null);
                  resetForm();
                  setShowModal(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <HiPlus className="h-4 w-4 mr-2" />
                Schedule Interview
              </button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search interviews by candidate, position, or interviewer..."
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
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="block w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All Types</option>
                <option value="technical">Technical</option>
                <option value="behavioral">Behavioral</option>
                <option value="final">Final</option>
              </select>
            </div>

            {/* Interviews Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {filteredInterviews.map((interview) => (
                <div key={interview._id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {interview.candidateId.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{interview.jobId.title}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <HiUser className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-500">{interview.candidateId.email}</p>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <HiBriefcase className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-500">{interview.interviewer}</p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                        {getStatusIcon(interview.status)}
                        <span className="ml-1 capitalize">{interview.status}</span>
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(interview.type)}`}>
                        {interview.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <HiCalendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(interview.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(interview.date).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    {interview.notes && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Notes:</span>
                        <div className="text-gray-600 max-h-20 overflow-hidden">
                          {interview.notes.length > 100 
                            ? `${interview.notes.substring(0, 100)}...` 
                            : interview.notes
                          }
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        // Handle view details
                        console.log('View interview details:', interview._id);
                      }}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <HiEye className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(interview)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <HiPencil className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteInterview(interview._id)}
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

            {filteredInterviews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No interviews found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Interview Form Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      {editingInterview ? 'Edit Interview' : 'Schedule New Interview'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setEditingInterview(null);
                        resetForm();
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <HiX className="h-6 w-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Candidate *</label>
                        <select
                          value={formData.candidateId}
                          onChange={(e) => setFormData({ ...formData, candidateId: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          required
                        >
                          <option value="">Select Candidate</option>
                          {candidates.map((candidate) => (
                            <option key={candidate._id} value={candidate._id}>
                              {candidate.name} ({candidate.email})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Job Position *</label>
                        <select
                          value={formData.jobId}
                          onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          required
                        >
                          <option value="">Select Job</option>
                          {jobs.map((job) => (
                            <option key={job._id} value={job._id}>
                              {job.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Interview Date *</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Interview Time *</label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Interview Type *</label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="technical">Technical</option>
                          <option value="behavioral">Behavioral</option>
                          <option value="final">Final</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Interviewer *</label>
                        <input
                          type="text"
                          value={formData.interviewer}
                          onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Enter interviewer name"
                          required
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <textarea
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter interview notes or instructions..."
                      />
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          setEditingInterview(null);
                          resetForm();
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                      >
                        {editingInterview ? 'Update Interview' : 'Schedule Interview'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 