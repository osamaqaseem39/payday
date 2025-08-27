'use client';

import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiEye, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { dashboardApi } from '../../../config/api';

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  applicationDeadline: string;
  status: string;
  createdAt: string;
  isRemote: boolean;
  isUrgent: boolean;
  numberOfPositions: number;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  tags: string[];
}

import DashboardLayout from '../../../components/DashboardLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await dashboardApi.jobs.list();
      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error('API returned non-array data:', data);
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (jobData: Partial<Job>) => {
    try {
      await dashboardApi.jobs.create(jobData);
      await fetchJobs();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleUpdateJob = async (id: string, jobData: Partial<Job>) => {
    try {
      await dashboardApi.jobs.update(id, jobData);
      await fetchJobs();
      setShowModal(false);
      setEditingJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await dashboardApi.jobs.delete(id);
        await fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const handlePublishJob = async (id: string) => {
    try {
      await dashboardApi.jobs.publish(id);
      await fetchJobs();
    } catch (error) {
      console.error('Error publishing job:', error);
    }
  };

  const handleCloseJob = async (id: string) => {
    try {
      await dashboardApi.jobs.close(id);
      await fetchJobs();
    } catch (error) {
      console.error('Error closing job:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-blue-100 text-blue-800';
      case 'part-time':
        return 'bg-yellow-100 text-yellow-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      case 'internship':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'all' || job.status === filter;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading jobs...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Jobs Management</h1>
                <p className="text-gray-600">Manage job postings and applications</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <HiPlus className="h-4 w-4 mr-2" />
                Add Job
              </button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All Jobs</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {filteredJobs.map((job) => (
                <div key={job._id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{job.department}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(job.employmentType)}`}>
                          {job.employmentType}
                        </span>
                        {job.isRemote && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Remote
                          </span>
                        )}
                        {job.isUrgent && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        {job.salary?.currency} {job.salary?.min?.toLocaleString()} - {job.salary?.max?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        {job.numberOfPositions} position{job.numberOfPositions > 1 ? 's' : ''} available
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingJob(job);
                          setShowModal(true);
                        }}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <HiPencil className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="inline-flex items-center px-3 py-1 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <HiTrash className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      {job.status === 'draft' && (
                        <button
                          onClick={() => handlePublishJob(job._id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <HiCheckCircle className="h-4 w-4 mr-1" />
                          Publish
                        </button>
                      )}
                      {job.status === 'active' && (
                        <button
                          onClick={() => handleCloseJob(job._id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <HiXCircle className="h-4 w-4 mr-1" />
                          Close
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No jobs found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 