'use client';

import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiEye, HiCheckCircle, HiXCircle, HiStar } from 'react-icons/hi';
import ProtectedRoute from '../../../components/ProtectedRoute';
import DashboardLayout from '../../../components/DashboardLayout';

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  isApproved: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    text: '',
    image: '',
    isApproved: false,
    isFeatured: false,
    order: 0
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingTestimonial 
        ? `/api/testimonials/${editingTestimonial._id}`
        : '/api/testimonials';
      
      const method = editingTestimonial ? 'PUT' : 'POST';
      
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
        fetchTestimonials();
        setShowForm(false);
        setEditingTestimonial(null);
        setFormData({
          name: '',
          location: '',
          rating: 5,
          text: '',
          image: '',
          isApproved: false,
          isFeatured: false,
          order: 0
        });
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      location: testimonial.location,
      rating: testimonial.rating,
      text: testimonial.text,
      image: testimonial.image || '',
      isApproved: testimonial.isApproved,
      isFeatured: testimonial.isFeatured,
      order: testimonial.order
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const response = await fetch(`/api/testimonials/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          fetchTestimonials();
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials/${id}/approve`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error approving testimonial:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials/${id}/reject`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error rejecting testimonial:', error);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading testimonials...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
                <p className="text-gray-600">Manage customer testimonials and reviews</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <HiPlus className="h-4 w-4 mr-2" />
                Add Testimonial
              </button>
            </div>

            {/* Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
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
                        <label className="block text-sm font-medium text-gray-700">Testimonial Text</label>
                        <textarea
                          value={formData.text}
                          onChange={(e) => setFormData({...formData, text: e.target.value})}
                          rows={4}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                          type="url"
                          value={formData.image}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.isApproved}
                            onChange={(e) => setFormData({...formData, isApproved: e.target.checked})}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                          />
                          <span className="ml-2 text-sm text-gray-700">Approved</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.isFeatured}
                            onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                          />
                          <span className="ml-2 text-sm text-gray-700">Featured</span>
                        </label>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => {
                            setShowForm(false);
                            setEditingTestimonial(null);
                            setFormData({
                              name: '',
                              location: '',
                              rating: 5,
                              text: '',
                              image: '',
                              isApproved: false,
                              isFeatured: false,
                              order: 0
                            });
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                          {editingTestimonial ? 'Update' : 'Create'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Testimonials List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {testimonials.map((testimonial) => (
                  <li key={testimonial._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                            <span className="ml-2 text-sm text-gray-500">({testimonial.location})</span>
                            {testimonial.isFeatured && (
                              <HiStar className="ml-2 h-4 w-4 text-yellow-400" />
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <HiStar
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{testimonial.text}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          testimonial.isApproved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {testimonial.isApproved ? 'Approved' : 'Pending'}
                        </span>
                        <div className="flex space-x-1">
                          {!testimonial.isApproved && (
                            <button
                              onClick={() => handleApprove(testimonial._id)}
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                            >
                              <HiCheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          {testimonial.isApproved && (
                            <button
                              onClick={() => handleReject(testimonial._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                            >
                              <HiXCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleEdit(testimonial)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <HiPencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial._id)}
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
