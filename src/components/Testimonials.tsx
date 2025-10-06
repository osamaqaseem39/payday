'use client';

import { useState } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Toronto, ON",
    rating: 5,
    text: "PaydayExpress made getting a loan so simple and fast. I was approved within minutes and had the money in my account the same day. The process was transparent and the customer service was excellent.",
    image: "/images/testimonials/sarah.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Vancouver, BC",
    rating: 5,
    text: "I was skeptical about online loans, but PaydayExpress exceeded my expectations. The interest rates were fair, and I didn't feel trapped in a cycle of debt like with other lenders.",
    image: "/images/testimonials/michael.jpg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Montreal, QC",
    rating: 5,
    text: "When I had an unexpected medical expense, PaydayExpress was there for me. The application was straightforward, and I received the funds quickly. Highly recommend their services.",
    image: "/images/testimonials/emily.jpg"
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Calgary, AB",
    rating: 5,
    text: "The best part about PaydayExpress is their transparency. No hidden fees, no surprises. They clearly explained everything upfront, and I felt confident in my decision to borrow from them.",
    image: "/images/testimonials/david.jpg"
  },
  {
    id: 5,
    name: "Lisa Wang",
    location: "Ottawa, ON",
    rating: 5,
    text: "I've used PaydayExpress multiple times and they've always been reliable. The online platform is user-friendly, and their customer support team is knowledgeable and helpful.",
    image: "/images/testimonials/lisa.jpg"
  },
  {
    id: 6,
    name: "James Wilson",
    location: "Halifax, NS",
    rating: 5,
    text: "Fast, reliable, and trustworthy. PaydayExpress helped me through a tough financial situation without making me feel judged. Their process is designed with the customer in mind.",
    image: "/images/testimonials/james.jpg"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what real customers have to say about their experience with PaydayExpress.
          </p>
        </div>

        <div className="relative">
          {/* Main testimonial display */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-8 left-8 text-blue-100 text-6xl">
              <FaQuoteLeft />
            </div>
            
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-2xl" />
                ))}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Customer info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="text-xl font-semibold text-gray-900">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentIndex].location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow text-gray-600 hover:text-blue-600"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow text-gray-600 hover:text-blue-600"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  );
}
