'use client';

import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiEye, HiCheckCircle, HiXCircle, HiChatAlt } from 'react-icons/hi';
import ProtectedRoute from '../../../components/ProtectedRoute';
import DashboardLayout from '../../../components/DashboardLayout';

interface Feedback {
  _id: string;
  rating: number;
  feedback: string;
  feedbackType: 'positive' | 'negative';
  name?: string;
  email?: string;
  isProcessed: boolean;
  processedBy?: string;
  processedAt?: string;
  response?: string;
  createdAt: string;
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [formData, setFormData] = useState({
    rating: 5,
    feedback: '',
    feedbackType: 'positive' as 'positive' | 'negative',
    name: '',
    email: '',
    response: ''
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch('/api/feedback');
      const data = await response.json();
      if (data.success) {
        setFeedback(data.data);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingFeedback 
        ? `/api/feedback/${editingFeedback._id}`
        : '/api/feedback';
      
      const method = editingFeedback ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        fetchFeedback();
        setShowForm(false);
        setEditingFeedback(null);
        setFormData({
          rating: 5,
          feedback: '',
          feedbackType: 'positive',
          name: '',
          email: '',
          response: ''
        });
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  const handleEdit = (feedbackItem: Feedback) => {
    setEditingFeedback(feedbackItem);
    setFormData({
      rating: feedbackItem.rating,
      feedback: feedbackItem.feedback,
      feedbackType: feedbackItem.feedbackType,
      name: feedbackItem.name || '',
      email: feedbackItem.email || '',
      response: feedbackItem.response || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      try {
        const response = await fetch(`/api/feedback/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          fetchFeedback();
        }
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  const handleProcess = async (id: string) => {
    try {
      const response = await fetch(`/api/feedback/${id}/process`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ response: formData.response })
      });

      if (response.ok) {
        fetchFeedback();
      }
    } catch (error) {
      console.error('Error processing feedback:', error);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading feedback...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Feedback Management</h1>
                <p className="text-gray-600">Manage customer feedback and responses</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700"
              >
                <HiPlus className="h-4 w-4 mr-2" />
                Add Feedback
              </button>
            </div>

            {/* Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border-t-4 border-rose-500 w-96 shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {editingFeedback ? 'Edit Feedback' : 'Add New Feedback'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Rating</label>
                        <select
                          value={formData.rating}
                          onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={1}>1 Star</option>
                          <option value={2}>2 Stars</option>
                          <option value={3}>3 Stars</option>
                          <option value={4}>4 Stars</option>
                          <option value={5}>5 Stars</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Feedback Type</label>
                        <select
                          value={formData.feedbackType}
                          onChange={(e) => setFormData({...formData, feedbackType: e.target.value as 'positive' | 'negative'})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="positive">Positive</option>
                          <option value="negative">Negative</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Feedback Text</label>
                        <textarea
                          value={formData.feedback}
                          onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                          rows={4}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name (Optional)</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      {editingFeedback && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Response</label>
                          <textarea
                            value={formData.response}
                            onChange={(e) => setFormData({...formData, response: e.target.value})}
                            rows={3}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Add a response to this feedback..."
                          />
                        </div>
                      )}
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => {
                            setShowForm(false);
                            setEditingFeedback(null);
                            setFormData({
                              rating: 5,
                              feedback: '',
                              feedbackType: 'positive',
                              name: '',
                              email: '',
                              response: ''
                            });
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
                        >
                          {editingFeedback ? 'Update' : 'Create'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Feedback List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {feedback.map((feedbackItem) => (
                  <li key={feedbackItem._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            feedbackItem.feedbackType === 'positive' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            <HiChatAlt className={`h-5 w-5 ${
                              feedbackItem.feedbackType === 'positive' ? 'text-green-600' : 'text-red-600'
                            }`} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900">
                              {feedbackItem.name || 'Anonymous'}
                            </p>
                            <span className="ml-2 text-sm text-gray-500">
                              ({feedbackItem.email || 'No email'})
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < feedbackItem.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                            <span className="ml-2 text-sm text-gray-500">
                              ({feedbackItem.rating}/5)
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {feedbackItem.feedback}
                          </p>
                          {feedbackItem.response && (
                            <div className="mt-2 p-2 bg-blue-50 rounded-md">
                              <p className="text-sm text-blue-800">
                                <strong>Response:</strong> {feedbackItem.response}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          feedbackItem.isProcessed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {feedbackItem.isProcessed ? 'Processed' : 'Pending'}
                        </span>
                        <div className="flex space-x-1">
                          {!feedbackItem.isProcessed && (
                            <button
                              onClick={() => handleProcess(feedbackItem._id)}
                              className="text-green-600 hover:text-green-900"
                              title="Mark as Processed"
                            >
                              <HiCheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleEdit(feedbackItem)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <HiPencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(feedbackItem._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <HiTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
