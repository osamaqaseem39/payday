'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaCalendar, FaUser, FaArrowRight, FaExternalLinkAlt, FaNewspaper } from 'react-icons/fa';

const newsArticles = [
  {
    id: 1,
    title: "PaydayExpress Launches New AI-Powered Loan Assessment Tool",
    excerpt: "The innovative tool uses machine learning to provide faster, more accurate loan decisions while maintaining responsible lending practices.",
    content: "PaydayExpress has announced the launch of its new AI-powered loan assessment tool, designed to streamline the application process...",
    author: "Press Release",
    date: "2024-01-20",
    category: "Company News",
    readTime: "3 min read",
    image: "/images/news/ai-loan-tool.jpg",
    featured: true,
    external: false
  },
  {
    id: 2,
    title: "Canadian Financial Regulator Updates Payday Loan Regulations",
    excerpt: "New regulations aim to provide better protection for consumers while maintaining access to short-term credit options.",
    content: "The Financial Consumer Agency of Canada has announced updated regulations for payday lending...",
    author: "Financial News Canada",
    date: "2024-01-18",
    category: "Regulatory",
    readTime: "4 min read",
    image: "/images/news/regulations.jpg",
    featured: false,
    external: true,
    externalUrl: "https://example.com/regulatory-update"
  },
  {
    id: 3,
    title: "PaydayExpress Partners with Major Canadian Banks for Better Integration",
    excerpt: "The partnership will allow for seamless account verification and faster loan processing for customers.",
    content: "PaydayExpress has announced a strategic partnership with several major Canadian banks...",
    author: "Business Wire",
    date: "2024-01-15",
    category: "Partnerships",
    readTime: "3 min read",
    image: "/images/news/bank-partnership.jpg",
    featured: false,
    external: false
  },
  {
    id: 4,
    title: "Study Shows Canadians Increasingly Turning to Online Lending",
    excerpt: "New research reveals that 67% of Canadians prefer online lending platforms over traditional banks for short-term loans.",
    content: "A comprehensive study by the Canadian Financial Services Association shows a significant shift...",
    author: "CFSA Research",
    date: "2024-01-12",
    category: "Industry Trends",
    readTime: "5 min read",
    image: "/images/news/online-lending-trends.jpg",
    featured: false,
    external: true,
    externalUrl: "https://example.com/online-lending-study"
  },
  {
    id: 5,
    title: "PaydayExpress Receives Excellence in Customer Service Award",
    excerpt: "The company has been recognized for its outstanding customer service and commitment to financial education.",
    content: "PaydayExpress has been honored with the Excellence in Customer Service Award by the Canadian Financial Services Association...",
    author: "Awards Committee",
    date: "2024-01-10",
    category: "Awards",
    readTime: "2 min read",
    image: "/images/news/customer-service-award.jpg",
    featured: false,
    external: false
  },
  {
    id: 6,
    title: "New Financial Literacy Program Launched for Canadian Students",
    excerpt: "PaydayExpress partners with educational institutions to provide financial education resources to students across Canada.",
    content: "A new financial literacy program aimed at Canadian students has been launched in partnership with...",
    author: "Education News",
    date: "2024-01-08",
    category: "Education",
    readTime: "4 min read",
    image: "/images/news/financial-literacy.jpg",
    featured: false,
    external: false
  },
  {
    id: 7,
    title: "Interest Rates and Their Impact on Short-Term Lending",
    excerpt: "Financial experts weigh in on how changing interest rates affect the payday lending industry and consumers.",
    content: "As the Bank of Canada adjusts interest rates, the impact on short-term lending becomes a topic of discussion...",
    author: "Financial Times Canada",
    date: "2024-01-05",
    category: "Market Analysis",
    readTime: "6 min read",
    image: "/images/news/interest-rates.jpg",
    featured: false,
    external: true,
    externalUrl: "https://example.com/interest-rates-analysis"
  },
  {
    id: 8,
    title: "PaydayExpress Expands Services to Include Credit Building Tools",
    excerpt: "The new tools help customers improve their credit scores while managing their short-term financial needs.",
    content: "PaydayExpress has expanded its service offerings to include comprehensive credit building tools...",
    author: "Company News",
    date: "2024-01-03",
    category: "Product Updates",
    readTime: "3 min read",
    image: "/images/news/credit-building.jpg",
    featured: false,
    external: false
  }
];

const categories = [
  "All",
  "Company News",
  "Regulatory",
  "Partnerships",
  "Industry Trends",
  "Awards",
  "Education",
  "Market Analysis",
  "Product Updates"
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredArticles = selectedCategory === "All" 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const totalPages = Math.ceil(filteredArticles.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + postsPerPage);

  const featuredArticle = newsArticles.find(article => article.featured);

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <FaNewspaper className="text-blue-600 text-4xl mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              Latest News & Updates
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about the latest developments in financial services, regulatory changes, and industry trends.
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && selectedCategory === "All" && currentPage === 1 && (
          <div className="mb-16">
            <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-80 bg-blue-600 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold">
                    {featuredArticle.title.charAt(0)}
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Breaking News
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredArticle.category}
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FaUser />
                        <span>{featuredArticle.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCalendar />
                        <span>{new Date(featuredArticle.date).toLocaleDateString()}</span>
                      </div>
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>
                  {featuredArticle.external ? (
                    <a
                      href={featuredArticle.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <span>Read Full Article</span>
                      <FaExternalLinkAlt />
                    </a>
                  ) : (
                    <Link
                      href={`/news/${featuredArticle.id}`}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <span>Read Full Article</span>
                      <FaArrowRight />
                    </Link>
                  )}
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
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedArticles.map((article) => (
            <article key={article.id} className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-blue-600 flex items-center justify-center">
                <div className="text-white text-4xl font-bold">
                  {article.title.charAt(0)}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                  {article.external && (
                    <FaExternalLinkAlt className="text-gray-400 text-sm" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <FaUser />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaCalendar />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                  {article.external ? (
                    <a
                      href={article.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <span>Read More</span>
                      <FaExternalLinkAlt className="text-sm" />
                    </a>
                  ) : (
                    <Link
                      href={`/news/${article.id}`}
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <span>Read More</span>
                      <FaArrowRight className="text-sm" />
                    </Link>
                  )}
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

        {/* Press Contact */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Media Inquiries
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              For press inquiries, media kits, or interview requests, please contact our media relations team.
            </p>
            <a
              href="mailto:press@paydayexpress.ca"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Contact Press Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
