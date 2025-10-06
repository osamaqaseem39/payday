'use client';

import { useState } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaCheckCircle } from 'react-icons/fa';

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the feedback to your backend
    console.log({
      rating,
      feedback,
      name,
      email,
      feedbackType
    });
    
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Feedback!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Your feedback helps us improve our services. We appreciate you taking the time to share your experience.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setRating(0);
                setFeedback('');
                setName('');
                setEmail('');
                setFeedbackType(null);
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Another Feedback
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Experience
          </h2>
          <p className="text-xl text-gray-600">
            Help us improve by sharing your feedback about our services
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Overall Rating */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                How would you rate your overall experience?
              </label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-4xl transition-colors ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    } hover:text-yellow-400`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Type */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                What type of feedback would you like to share?
              </label>
              <div className="flex justify-center space-x-6">
                <button
                  type="button"
                  onClick={() => setFeedbackType('positive')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-colors ${
                    feedbackType === 'positive'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-600 hover:border-green-300'
                  }`}
                >
                  <FaThumbsUp />
                  <span>Positive</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('negative')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-colors ${
                    feedbackType === 'negative'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 text-gray-600 hover:border-red-300'
                  }`}
                >
                  <FaThumbsDown />
                  <span>Needs Improvement</span>
                </button>
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Tell us more about your experience
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please share your detailed feedback about our services, what you liked, or what we could improve..."
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={rating === 0 || !feedback.trim()}
                className="bg-blue-600 text-white px-12 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
