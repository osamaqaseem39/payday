'use client';

import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiEye, HiCheckCircle, HiXCircle, HiX, HiSearch } from 'react-icons/hi';
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
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    employmentType: 'full-time',
    experienceLevel: 'entry',
    salary: {
      min: 0,
      max: 0,
      currency: 'USD'
    },
    description: '',
    applicationDeadline: '',
    status: 'draft',
    isRemote: false,
    isUrgent: false,
    numberOfPositions: 1,
    requirements: [''],
    responsibilities: [''],
    benefits: [''],
    tags: ['']
  });

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
      resetForm();
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
      resetForm();
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

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: '',
      employmentType: 'full-time',
      experienceLevel: 'entry',
      salary: {
        min: 0,
        max: 0,
        currency: 'USD'
      },
      description: '',
      applicationDeadline: '',
      status: 'draft',
      isRemote: false,
      isUrgent: false,
      numberOfPositions: 1,
      requirements: [''],
      responsibilities: [''],
      benefits: [''],
      tags: ['']
    });
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      employmentType: job.employmentType,
      experienceLevel: job.experienceLevel,
      salary: job.salary,
      description: job.description,
      applicationDeadline: job.applicationDeadline,
      status: job.status,
      isRemote: job.isRemote,
      isUrgent: job.isUrgent,
      numberOfPositions: job.numberOfPositions,
      requirements: job.requirements.length > 0 ? job.requirements : [''],
      responsibilities: job.responsibilities.length > 0 ? job.responsibilities : [''],
      benefits: job.benefits.length > 0 ? job.benefits : [''],
      tags: job.tags.length > 0 ? job.tags : ['']
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty strings from arrays
    const cleanFormData = {
      ...formData,
      requirements: formData.requirements.filter(req => req.trim() !== ''),
      responsibilities: formData.responsibilities.filter(resp => resp.trim() !== ''),
      benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
      tags: formData.tags.filter(tag => tag.trim() !== '')
    };

    if (editingJob) {
      await handleUpdateJob(editingJob._id, cleanFormData);
    } else {
      await handleCreateJob(cleanFormData);
    }
  };

  const addArrayItem = (field: 'requirements' | 'responsibilities' | 'benefits' | 'tags') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayItem = (field: 'requirements' | 'responsibilities' | 'benefits' | 'tags', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const updateArrayItem = (field: 'requirements' | 'responsibilities' | 'benefits' | 'tags', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-yellow-100 text-yellow-800';
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
                onClick={() => {
                  setEditingJob(null);
                  resetForm();
                  setShowModal(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <HiPlus className="h-4 w-4 mr-2" />
                Add Job
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
                  placeholder="Search jobs by title, department, or location..."
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
                <option value="all">All Jobs</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Jobs List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location & Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Salary & Positions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredJobs.map((job) => (
                      <tr key={job._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900">{job.title}</h3>
                            <p className="text-sm text-gray-600">{job.department}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              {job.isRemote && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  Remote
                                </span>
                              )}
                              {job.isUrgent && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Urgent
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{job.location}</div>
                          <div className="text-sm text-gray-600">{job.employmentType}</div>
                          <div className="text-sm text-gray-600">{job.experienceLevel}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {job.salary?.currency} {job.salary?.min?.toLocaleString()} - {job.salary?.max?.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {job.numberOfPositions} position{job.numberOfPositions > 1 ? 's' : ''} available
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(job.employmentType)}`}>
                              {job.employmentType}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col space-y-2">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(job)}
                                className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <HiPencil className="h-3 w-3 mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteJob(job._id)}
                                className="inline-flex items-center px-2 py-1 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                <HiTrash className="h-3 w-3 mr-1" />
                                Delete
                              </button>
                            </div>
                            <div className="flex space-x-2">
                              {job.status === 'draft' && (
                                <button
                                  onClick={() => handlePublishJob(job._id)}
                                  className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                  <HiCheckCircle className="h-3 w-3 mr-1" />
                                  Publish
                                </button>
                              )}
                              {job.status === 'published' && (
                                <button
                                  onClick={() => handleCloseJob(job._id)}
                                  className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  <HiXCircle className="h-3 w-3 mr-1" />
                                  Close
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No jobs found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Job Form Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      {editingJob ? 'Edit Job' : 'Create New Job'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setEditingJob(null);
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
                        <label className="block text-sm font-medium text-gray-700">Job Title *</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Department *</label>
                        <input
                          type="text"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location *</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Employment Type *</label>
                        <select
                          value={formData.employmentType}
                          onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="full-time">Full-time</option>
                          <option value="part-time">Part-time</option>
                          <option value="contract">Contract</option>
                          <option value="internship">Internship</option>
                          <option value="freelance">Freelance</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Experience Level *</label>
                        <select
                          value={formData.experienceLevel}
                          onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="entry">Entry Level</option>
                          <option value="mid">Mid Level</option>
                          <option value="senior">Senior Level</option>
                          <option value="expert">Expert Level</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Number of Positions *</label>
                        <input
                          type="number"
                          min="1"
                          value={formData.numberOfPositions}
                          onChange={(e) => setFormData({ ...formData, numberOfPositions: parseInt(e.target.value) })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Application Deadline *</label>
                        <input
                          type="date"
                          value={formData.applicationDeadline}
                          onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Salary Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Currency</label>
                        <select
                          value={formData.salary.currency}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            salary: { ...formData.salary, currency: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          <option value="CAD">CAD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Minimum Salary</label>
                        <input
                          type="number"
                          min="0"
                          value={formData.salary.min}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            salary: { ...formData.salary, min: parseInt(e.target.value) }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Maximum Salary</label>
                        <input
                          type="number"
                          min="0"
                          value={formData.salary.max}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            salary: { ...formData.salary, max: parseInt(e.target.value) }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10"
                        />
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="flex space-x-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.isRemote}
                          onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">Remote Position</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.isUrgent}
                          onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">Urgent Hiring</label>
                      </div>
                    </div>

                    {/* Job Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Job Description *</label>
                      <textarea
                        rows={8}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>

                    {/* Requirements */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Requirements</label>
                      {formData.requirements.map((req, index) => (
                        <div key={index} className="flex space-x-2 mt-2">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => updateArrayItem('requirements', index, e.target.value)}
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10"
                            placeholder="Enter requirement"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('requirements', index)}
                            className="px-3 py-2 text-red-600 hover:text-red-800"
                          >
                            <HiX className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('requirements')}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Requirement
                      </button>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
                      {formData.responsibilities.map((resp, index) => (
                        <div key={index} className="flex space-x-2 mt-2">
                          <input
                            type="text"
                            value={resp}
                            onChange={(e) => updateArrayItem('responsibilities', index, e.target.value)}
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10"
                            placeholder="Enter responsibility"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('responsibilities', index)}
                            className="px-3 py-2 text-red-600 hover:text-red-800"
                          >
                            <HiX className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('responsibilities')}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Responsibility
                      </button>
                    </div>

                    {/* Benefits */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Benefits</label>
                      {formData.benefits.map((benefit, index) => (
                        <div key={index} className="flex space-x-2 mt-2">
                          <input
                            type="text"
                            value={benefit}
                            onChange={(e) => updateArrayItem('benefits', index, e.target.value)}
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10"
                            placeholder="Enter benefit"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('benefits', index)}
                            className="px-3 py-2 text-red-600 hover:text-red-800"
                          >
                            <HiX className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('benefits')}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Benefit
                      </button>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tags</label>
                      {formData.tags.map((tag, index) => (
                        <div key={index} className="flex space-x-2 mt-2">
                          <input
                            type="text"
                            value={tag}
                            onChange={(e) => updateArrayItem('tags', index, e.target.value)}
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10"
                            placeholder="Enter tag"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('tags', index)}
                            className="px-3 py-2 text-red-600 hover:text-red-800"
                          >
                            <HiX className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('tags')}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Tag
                      </button>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="closed">Closed</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          setEditingJob(null);
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
                        {editingJob ? 'Update Job' : 'Create Job'}
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