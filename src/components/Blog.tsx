'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaCalendar, FaUser, FaArrowRight, FaTag } from 'react-icons/fa';

const blogPosts = [
  {
    id: 1,
    title: "Understanding Payday Loans: A Complete Guide for Canadians",
    excerpt: "Learn everything you need to know about payday loans in Canada, including regulations, costs, and alternatives to consider before borrowing.",
    content: "Payday loans can be a helpful financial tool when used responsibly, but it's important to understand the terms, costs, and regulations before applying...",
    author: "Sarah Mitchell",
    date: "2024-01-15",
    category: "Financial Education",
    readTime: "5 min read",
    image: "/images/blog/payday-loans-guide.jpg",
    featured: true
  },
  {
    id: 2,
    title: "How to Build an Emergency Fund: A Step-by-Step Guide",
    excerpt: "Building an emergency fund is one of the most important financial steps you can take. Here's how to get started with practical tips and strategies.",
    content: "An emergency fund acts as a financial safety net, helping you cover unexpected expenses without going into debt...",
    author: "Michael Chen",
    date: "2024-01-12",
    category: "Financial Planning",
    readTime: "7 min read",
    image: "/images/blog/emergency-fund.jpg",
    featured: false
  },
  {
    id: 3,
    title: "Debt Consolidation: Is It Right for You?",
    excerpt: "Explore the pros and cons of debt consolidation and learn when it might be a good strategy for managing multiple debts.",
    content: "Debt consolidation can simplify your financial life by combining multiple debts into a single payment...",
    author: "Emily Rodriguez",
    date: "2024-01-10",
    category: "Debt Management",
    readTime: "6 min read",
    image: "/images/blog/debt-consolidation.jpg",
    featured: false
  },
  {
    id: 4,
    title: "Understanding Credit Scores: What You Need to Know",
    excerpt: "Your credit score affects your ability to borrow money and the interest rates you'll pay. Learn how to improve and maintain a good credit score.",
    content: "Credit scores are three-digit numbers that lenders use to assess your creditworthiness...",
    author: "David Thompson",
    date: "2024-01-08",
    category: "Credit Education",
    readTime: "8 min read",
    image: "/images/blog/credit-scores.jpg",
    featured: false
  },
  {
    id: 5,
    title: "Small Business Loans: Funding Your Entrepreneurial Dreams",
    excerpt: "Discover the different types of small business loans available in Canada and learn how to choose the right financing option for your business.",
    content: "Starting or expanding a business often requires capital, and small business loans can provide the funding you need...",
    author: "Lisa Wang",
    date: "2024-01-05",
    category: "Business Finance",
    readTime: "9 min read",
    image: "/images/blog/small-business-loans.jpg",
    featured: false
  },
  {
    id: 6,
    title: "Student Loan Repayment Strategies: What Works Best?",
    excerpt: "Navigate the complex world of student loan repayment with these proven strategies to help you pay off your debt faster and save money.",
    content: "Student loans can feel overwhelming, but with the right strategy, you can manage them effectively...",
    author: "James Wilson",
    date: "2024-01-03",
    category: "Student Finance",
    readTime: "6 min read",
    image: "/images/blog/student-loans.jpg",
    featured: false
  }
];

const categories = [
  "All",
  "Financial Education",
  "Financial Planning",
  "Debt Management",
  "Credit Education",
  "Business Finance",
  "Student Finance"
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Education Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with expert insights, tips, and guides to help you make better financial decisions.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && currentPage === 1 && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-80 bg-blue-600 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold">
                    {featuredPost.title.charAt(0)}
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FaUser />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCalendar />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <span>Read Full Article</span>
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-blue-600 flex items-center justify-center">
                <div className="text-white text-4xl font-bold">
                  {post.title.charAt(0)}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <FaTag className="text-blue-600 text-sm" />
                  <span className="text-blue-600 text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <FaUser />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaCalendar />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <span>Read More</span>
                    <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Stay Updated with Our Latest Posts
            </h3>
            <p className="text-xl mb-8 text-blue-100">
              Get our latest financial tips and insights delivered directly to your inbox.
            </p>
            <Link
              href="/#email-signup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
