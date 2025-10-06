'use client';

import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiEye, HiBookOpen, HiCalendar, HiTag } from 'react-icons/hi';
import ProtectedRoute from '../../../components/ProtectedRoute';
import DashboardLayout from '../../../components/DashboardLayout';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  readTime: string;
  image?: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  views: number;
  likes: number;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
}

const categories = [
  'Financial Education', 'Financial Planning', 'Debt Management', 'Credit Education',
  'Business Finance', 'Student Finance', 'Investment', 'Insurance', 'Tax Planning'
];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    readTime: '',
    image: '',
    tags: [] as string[],
    isPublished: false,
    isFeatured: false,
    seoTitle: '',
    seoDescription: ''
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (data.success) {
        setBlogPosts(data.data);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingPost 
        ? `/api/blog/${editingPost._id}`
        : '/api/blog';
      
      const method = editingPost ? 'PUT' : 'POST';
      
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
        fetchBlogPosts();
        setShowForm(false);
        setEditingPost(null);
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          author: '',
          category: '',
          readTime: '',
          image: '',
          tags: [],
          isPublished: false,
          isFeatured: false,
          seoTitle: '',
          seoDescription: ''
        });
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      readTime: post.readTime,
      image: post.image || '',
      tags: post.tags || [],
      isPublished: post.isPublished,
      isFeatured: post.isFeatured,
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          fetchBlogPosts();
        }
      } catch (error) {
        console.error('Error deleting blog post:', error);
      }
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}/publish`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchBlogPosts();
      }
    } catch (error) {
      console.error('Error publishing blog post:', error);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blog posts...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
                <p className="text-gray-600">Manage blog posts and content</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <HiPlus className="h-4 w-4 mr-2" />
                Add Blog Post
              </button>
            </div>

            {/* Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title *</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Excerpt *</label>
                        <textarea
                          value={formData.excerpt}
                          onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                          rows={3}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Content *</label>
                        <textarea
                          value={formData.content}
                          onChange={(e) => setFormData({...formData, content: e.target.value})}
                          rows={8}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Author *</label>
                          <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({...formData, author: e.target.value})}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Category *</label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Read Time *</label>
                          <input
                            type="text"
                            value={formData.readTime}
                            onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="5 min read"
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
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tags</label>
                        <div className="mt-1 flex flex-wrap gap-2 mb-2">
                          {formData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex">
                          <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            className="flex-1 border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Add a tag"
                          />
                          <button
                            type="button"
                            onClick={addTag}
                            className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">SEO Title</label>
                          <input
                            type="text"
                            value={formData.seoTitle}
                            onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            maxLength={60}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">SEO Description</label>
                          <textarea
                            value={formData.seoDescription}
                            onChange={(e) => setFormData({...formData, seoDescription: e.target.value})}
                            rows={2}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            maxLength={160}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.isPublished}
                            onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                          />
                          <span className="ml-2 text-sm text-gray-700">Published</span>
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
                            setEditingPost(null);
                            setFormData({
                              title: '',
                              excerpt: '',
                              content: '',
                              author: '',
                              category: '',
                              readTime: '',
                              image: '',
                              tags: [],
                              isPublished: false,
                              isFeatured: false,
                              seoTitle: '',
                              seoDescription: ''
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
                          {editingPost ? 'Update' : 'Create'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Blog Posts List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {blogPosts.map((post) => (
                  <li key={post._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {post.image ? (
                            <img
                              className="h-16 w-16 rounded-lg object-cover"
                              src={post.image}
                              alt={post.title}
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-lg bg-blue-100 flex items-center justify-center">
                              <HiBookOpen className="h-8 w-8 text-blue-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{post.title}</p>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              post.isPublished 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.isPublished ? 'Published' : 'Draft'}
                            </span>
                            {post.isFeatured && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{post.author} • {post.category}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <HiCalendar className="h-4 w-4 mr-1" />
                              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}
                            </div>
                            <div className="flex items-center">
                              <HiEye className="h-4 w-4 mr-1" />
                              {post.views} views
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1">❤️</span>
                              {post.likes} likes
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1">{post.readTime}</span>
                            </div>
                          </div>
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {post.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  <HiTag className="h-3 w-3 mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!post.isPublished && (
                          <button
                            onClick={() => handlePublish(post._id)}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                          >
                            Publish
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(post)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <HiPencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
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
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
