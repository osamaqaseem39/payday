'use client';

import { useState } from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const teamMembers = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Chief Executive Officer",
    department: "Executive",
    bio: "Sarah brings over 15 years of experience in financial services and fintech. She previously led digital transformation initiatives at major Canadian banks and is passionate about making financial services more accessible to all Canadians.",
    image: "/images/team/sarah-mitchell.jpg",
    linkedin: "https://linkedin.com/in/sarah-mitchell",
    twitter: "https://twitter.com/sarah_mitchell",
    email: "sarah@paydayexpress.ca"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Chief Technology Officer",
    department: "Technology",
    bio: "Michael is a technology visionary with expertise in building scalable fintech platforms. He has led engineering teams at several successful startups and holds a Master's degree in Computer Science from the University of Toronto.",
    image: "/images/team/michael-chen.jpg",
    linkedin: "https://linkedin.com/in/michael-chen",
    twitter: "https://twitter.com/michael_chen",
    email: "michael@paydayexpress.ca"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Chief Financial Officer",
    department: "Finance",
    bio: "Emily oversees all financial operations and risk management. With a CPA designation and 12 years in financial services, she ensures our lending practices are both profitable and responsible.",
    image: "/images/team/emily-rodriguez.jpg",
    linkedin: "https://linkedin.com/in/emily-rodriguez",
    twitter: "https://twitter.com/emily_rodriguez",
    email: "emily@paydayexpress.ca"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Head of Customer Experience",
    department: "Customer Success",
    bio: "David leads our customer success team and is dedicated to ensuring every customer has an exceptional experience. He has a background in customer service and user experience design.",
    image: "/images/team/david-thompson.jpg",
    linkedin: "https://linkedin.com/in/david-thompson",
    twitter: "https://twitter.com/david_thompson",
    email: "david@paydayexpress.ca"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Head of Compliance",
    department: "Legal & Compliance",
    bio: "Lisa ensures we maintain the highest standards of regulatory compliance. She is a licensed lawyer with expertise in financial regulations and consumer protection laws.",
    image: "/images/team/lisa-wang.jpg",
    linkedin: "https://linkedin.com/in/lisa-wang",
    twitter: "https://twitter.com/lisa_wang",
    email: "lisa@paydayexpress.ca"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Head of Marketing",
    department: "Marketing",
    bio: "James leads our marketing efforts and brand strategy. He has extensive experience in digital marketing and has helped build several successful fintech brands in the Canadian market.",
    image: "/images/team/james-wilson.jpg",
    linkedin: "https://linkedin.com/in/james-wilson",
    twitter: "https://twitter.com/james_wilson",
    email: "james@paydayexpress.ca"
  }
];

const departments = [
  { name: "All", value: "all" },
  { name: "Executive", value: "Executive" },
  { name: "Technology", value: "Technology" },
  { name: "Finance", value: "Finance" },
  { name: "Customer Success", value: "Customer Success" },
  { name: "Legal & Compliance", value: "Legal & Compliance" },
  { name: "Marketing", value: "Marketing" }
];

export default function Team() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  const filteredMembers = selectedDepartment === "all" 
    ? teamMembers 
    : teamMembers.filter(member => member.department === selectedDepartment);

  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team of financial experts, technologists, and customer advocates work together to provide you with the best possible lending experience.
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {departments.map((dept) => (
            <button
              key={dept.value}
              onClick={() => setSelectedDepartment(dept.value)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedDepartment === dept.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-1">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.department}
                </p>
              </div>

              {/* Bio Toggle */}
              <div className="mb-6">
                <button
                  onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
                  className="flex items-center justify-center w-full text-blue-600 hover:text-blue-700 font-medium"
                >
                  {expandedMember === member.id ? (
                    <>
                      <span className="mr-2">Show Less</span>
                      <FaChevronUp />
                    </>
                  ) : (
                    <>
                      <span className="mr-2">Learn More</span>
                      <FaChevronDown />
                    </>
                  )}
                </button>
                
                {expandedMember === member.id && (
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaEnvelope className="text-xl" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Want to Join Our Team?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our mission of making financial services more accessible and transparent.
            </p>
            <a
              href="/career"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
