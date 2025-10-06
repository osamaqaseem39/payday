'use client';

import { useState } from 'react';
import { FaPlay, FaYoutube, FaExternalLinkAlt, FaClock, FaUsers, FaThumbsUp } from 'react-icons/fa';

const demoVideos = [
  {
    id: 1,
    title: "How to Apply for a Payday Loan - Complete Walkthrough",
    description: "Learn how to apply for a payday loan with PaydayExpress in this step-by-step video guide. We'll walk you through the entire process from start to finish.",
    duration: "4:32",
    views: "125K",
    likes: "2.1K",
    thumbnail: "/images/demo/apply-loan-thumbnail.jpg",
    videoId: "dQw4w9WgXcQ", // This would be replaced with actual YouTube video ID
    featured: true,
    category: "Application Process"
  },
  {
    id: 2,
    title: "Understanding Loan Terms and Conditions",
    description: "Get a clear explanation of loan terms, interest rates, fees, and repayment schedules to make informed borrowing decisions.",
    duration: "6:15",
    views: "89K",
    likes: "1.8K",
    thumbnail: "/images/demo/loan-terms-thumbnail.jpg",
    videoId: "dQw4w9WgXcQ",
    featured: false,
    category: "Financial Education"
  },
  {
    id: 3,
    title: "PaydayExpress Mobile App Tutorial",
    description: "Discover all the features of our mobile app, including loan applications, account management, and payment tracking.",
    duration: "5:47",
    views: "67K",
    likes: "1.5K",
    thumbnail: "/images/demo/mobile-app-thumbnail.jpg",
    videoId: "dQw4w9WgXcQ",
    featured: false,
    category: "Mobile App"
  },
  {
    id: 4,
    title: "Customer Success Stories - Real Experiences",
    description: "Hear from real customers about their positive experiences with PaydayExpress and how we've helped them in times of need.",
    duration: "8:22",
    views: "156K",
    likes: "3.2K",
    thumbnail: "/images/demo/customer-stories-thumbnail.jpg",
    videoId: "dQw4w9WgXcQ",
    featured: false,
    category: "Customer Stories"
  },
  {
    id: 5,
    title: "Financial Planning and Budgeting Tips",
    description: "Expert advice on managing your finances, creating budgets, and building emergency funds to reduce reliance on short-term loans.",
    duration: "7:18",
    views: "203K",
    likes: "4.1K",
    thumbnail: "/images/demo/financial-planning-thumbnail.jpg",
    videoId: "dQw4w9WgXcQ",
    featured: false,
    category: "Financial Education"
  },
  {
    id: 6,
    title: "Security and Privacy - How We Protect Your Data",
    description: "Learn about our advanced security measures, data encryption, and privacy protection to keep your personal information safe.",
    duration: "4:56",
    views: "78K",
    likes: "1.9K",
    thumbnail: "/images/demo/security-thumbnail.jpg",
    videoId: "dQw4w9WgXcQ",
    featured: false,
    category: "Security"
  }
];

const categories = [
  "All",
  "Application Process",
  "Financial Education",
  "Mobile App",
  "Customer Stories",
  "Security"
];

export default function YouTubeDemo() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const filteredVideos = selectedCategory === "All" 
    ? demoVideos 
    : demoVideos.filter(video => video.category === selectedCategory);

  const featuredVideo = demoVideos.find(video => video.featured);

  const openVideo = (videoId: string) => {
    // In a real implementation, this would open the video in a modal or redirect to YouTube
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <FaYoutube className="text-red-600 text-4xl mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              Video Tutorials & Demos
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch our comprehensive video guides to learn how to use PaydayExpress effectively and make informed financial decisions.
          </p>
        </div>

        {/* Featured Video */}
        {featuredVideo && selectedCategory === "All" && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-80 bg-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-red-700 transition-colors cursor-pointer"
                         onClick={() => openVideo(featuredVideo.videoId)}>
                      <FaPlay className="text-white text-2xl ml-1" />
                    </div>
                    <p className="text-white text-lg font-medium">Click to watch on YouTube</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredVideo.category}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FaClock />
                        <span>{featuredVideo.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaUsers />
                        <span>{featuredVideo.views} views</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredVideo.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {featuredVideo.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <FaThumbsUp />
                      <span>{featuredVideo.likes} likes</span>
                    </div>
                    <button
                      onClick={() => openVideo(featuredVideo.videoId)}
                      className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      <FaYoutube />
                      <span>Watch on YouTube</span>
                      <FaExternalLinkAlt className="text-sm" />
                    </button>
                  </div>
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
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 hover:bg-red-700 transition-colors cursor-pointer"
                       onClick={() => openVideo(video.videoId)}>
                    <FaPlay className="text-white text-xl ml-1" />
                  </div>
                  <p className="text-white text-sm">Click to watch</p>
                </div>
                <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {video.category}
                  </span>
                  <FaYoutube className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {video.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <FaUsers />
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaThumbsUp />
                    <span>{video.likes}</span>
                  </div>
                </div>
                <button
                  onClick={() => openVideo(video.videoId)}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <FaYoutube />
                  <span>Watch Video</span>
                  <FaExternalLinkAlt className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube Channel CTA */}
        <div className="text-center">
          <div className="bg-red-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Subscribe to Our YouTube Channel
            </h3>
            <p className="text-xl mb-8 text-red-100">
              Get notified when we publish new videos with financial tips, tutorials, and company updates.
            </p>
            <a
              href="https://youtube.com/@paydayexpress"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-white text-red-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
            >
              <FaYoutube className="text-2xl" />
              <span>Subscribe Now</span>
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
