'use client';

import { useState, useEffect } from 'react';
import { HiMail, HiTrash, HiDownload, HiRefresh } from 'react-icons/hi';
import ProtectedRoute from '../../../components/ProtectedRoute';
import DashboardLayout from '../../../components/DashboardLayout';

interface EmailSubscription {
  _id: string;
  email: string;
  name?: string;
  isActive: boolean;
  subscriptionType: string;
  subscribedAt: string;
  unsubscribedAt?: string;
  source?: string;
  preferences: {
    frequency: string;
    categories: string[];
  };
  createdAt: string;
}

const subscriptionTypes = ['newsletter', 'updates', 'promotions', 'all'];
const frequencies = ['daily', 'weekly', 'monthly'];
const categories = ['financial-tips', 'company-news', 'product-updates', 'promotions', 'industry-news'];

export default function EmailSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<EmailSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSubscriptions();
    fetchStatistics();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/email-subscriptions');
      const data = await response.json();
      if (data.success) {
        setSubscriptions(data.data);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/email-subscriptions/statistics');
      const data = await response.json();
      if (data.success) {
        setStatistics(data.data[0]);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      try {
        const response = await fetch(`/api/email-subscriptions/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          fetchSubscriptions();
          fetchStatistics();
        }
      } catch (error) {
        console.error('Error deleting subscription:', error);
      }
    }
  };

  const handleUnsubscribe = async (id: string) => {
    try {
      const response = await fetch(`/api/email-subscriptions/${id}/unsubscribe`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchSubscriptions();
        fetchStatistics();
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  const handleResubscribe = async (id: string) => {
    try {
      const response = await fetch(`/api/email-subscriptions/${id}/resubscribe`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchSubscriptions();
        fetchStatistics();
      }
    } catch (error) {
      console.error('Error resubscribing:', error);
    }
  };

  const exportSubscriptions = () => {
    const csvContent = [
      ['Email', 'Name', 'Type', 'Status', 'Subscribed At', 'Source', 'Frequency', 'Categories'].join(','),
      ...subscriptions.map(sub => [
        sub.email,
        sub.name || '',
        sub.subscriptionType,
        sub.isActive ? 'Active' : 'Inactive',
        new Date(sub.subscribedAt).toLocaleDateString(),
        sub.source || '',
        sub.preferences.frequency,
        sub.preferences.categories.join(';')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && sub.isActive) || 
      (filter === 'inactive' && !sub.isActive) ||
      (filter === sub.subscriptionType);
    
    const matchesSearch = !searchTerm || 
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading subscriptions...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Email Subscriptions</h1>
                <p className="text-gray-600">Manage newsletter and email subscriptions</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={exportSubscriptions}
                  className="inline-flex items-center px-4 py-2 border border-cyan-200 text-sm font-medium rounded-md shadow-sm text-cyan-700 bg-cyan-50 hover:bg-cyan-100"
                >
                  <HiDownload className="h-4 w-4 mr-2" />
                  Export CSV
                </button>
                <button
                  onClick={() => { fetchSubscriptions(); fetchStatistics(); }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700"
                >
                  <HiRefresh className="h-4 w-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>

            {/* Statistics */}
            {statistics && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <HiMail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Subscriptions</dt>
                          <dd className="text-lg font-medium text-gray-900">{statistics.totalSubscriptions}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                          <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Active</dt>
                          <dd className="text-lg font-medium text-gray-900">{statistics.activeSubscriptions}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center">
                          <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Unsubscribed</dt>
                          <dd className="text-lg font-medium text-gray-900">{statistics.unsubscribedCount}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">This Month</dt>
                          <dd className="text-lg font-medium text-gray-900">{statistics.thisMonthSubscriptions}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="bg-cyan-50 p-4 rounded-lg shadow border border-cyan-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by email or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Subscriptions</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    {subscriptionTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Subscriptions List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md border-t-4 border-cyan-500">
              <ul className="divide-y divide-gray-200">
                {filteredSubscriptions.map((subscription) => (
                  <li key={subscription._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            subscription.isActive ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            <HiMail className={`h-5 w-5 ${
                              subscription.isActive ? 'text-green-600' : 'text-red-600'
                            }`} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900">{subscription.email}</p>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              subscription.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {subscription.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {subscription.name || 'No name provided'}
                          </p>
                          <div className="flex items-center mt-1 space-x-4 text-sm text-gray-500">
                            <span>Type: {subscription.subscriptionType}</span>
                            <span>Frequency: {subscription.preferences.frequency}</span>
                            <span>Subscribed: {new Date(subscription.subscribedAt).toLocaleDateString()}</span>
                            {subscription.source && <span>Source: {subscription.source}</span>}
                          </div>
                          {subscription.preferences.categories.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {subscription.preferences.categories.map((category, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {category}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {subscription.isActive ? (
                          <button
                            onClick={() => handleUnsubscribe(subscription._id)}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 hover:bg-red-200"
                          >
                            Unsubscribe
                          </button>
                        ) : (
                          <button
                            onClick={() => handleResubscribe(subscription._id)}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                          >
                            Resubscribe
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(subscription._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <HiTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {filteredSubscriptions.length === 0 && (
                <div className="text-center py-12">
                  <HiMail className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No subscriptions found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm || filter !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'No email subscriptions have been created yet.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
