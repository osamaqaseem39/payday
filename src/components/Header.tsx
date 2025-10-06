'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoansDropdownOpen, setIsLoansDropdownOpen] = useState(false);
  const [isPaydayExpressDropdownOpen, setIsPaydayExpressDropdownOpen] = useState(false);
  const [isLendingTypesDropdownOpen, setIsLendingTypesDropdownOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'}`}>
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="PaydayExpress Logo"
                width={isScrolled ? 240 : 400}
                height={isScrolled ? 60 : 100}
                className={`w-auto transition-all duration-300 ${isScrolled ? 'h-12' : 'h-20'}`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-900 hover:text-gray-600 transition-colors font-medium">
              Home
            </Link>
            
            {/* Loans Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLoansDropdownOpen(!isLoansDropdownOpen)}
                className="text-gray-900 hover:text-gray-600 transition-colors font-medium flex items-center"
              >
                Loans
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLoansDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <Link href="/payday-loans" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Payday Loans
                    </Link>
                    <Link href="/personal-loans" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Personal Loans
                    </Link>
                    <Link href="/student-loans" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Student Loans
                    </Link>
                    <Link href="/vacation-loans" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Vacation Loans
                    </Link>
                    <Link href="/small-business-loans" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Small Business Loans
                    </Link>
                    <Link href="/home-improvement-loans" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Home Improvement Loans
                    </Link>
                    <Link href="/medical-loans" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Medical Loans
                    </Link>
                    <Link href="/wedding-loans" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Wedding Loans
                    </Link>
                    <Link href="/p2p-lending" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      P2P Lending
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/partners" className="text-gray-900 hover:text-gray-600 transition-colors font-medium">
              Partners
            </Link>
            
            {/* Lending Types Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLendingTypesDropdownOpen(!isLendingTypesDropdownOpen)}
                className="text-gray-900 hover:text-gray-600 transition-colors font-medium flex items-center"
              >
                Lending Types
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLendingTypesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <Link href="/payday-loans" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Payday Loans
                    </Link>
                    <Link href="/p2p-lending" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      P2P Loans
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Payday Express Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsPaydayExpressDropdownOpen(!isPaydayExpressDropdownOpen)}
                className="text-gray-900 hover:text-gray-600 transition-colors font-medium flex items-center"
              >
                Payday Express
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isPaydayExpressDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <Link href="/about" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      About
                    </Link>
                    <Link href="/contact" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Contact
                    </Link>
                    <Link href="/privacy" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Privacy
                    </Link>
                    <Link href="/loan-calculator" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Loan Calculator
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Explore Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
                className="text-gray-900 hover:text-gray-600 transition-colors font-medium flex items-center"
              >
                Explore
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isExploreDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <Link href="/testimonials" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Testimonials
                    </Link>
                    <Link href="/team" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Team
                    </Link>
                    <Link href="/blog" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Blog
                    </Link>
                    <Link href="/news" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      News
                    </Link>
                    <Link href="/feedback" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Feedback
                    </Link>
                    <Link href="/career" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
                      Career
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-white text-gray-900 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-white text-gray-900 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
                >
                  Sign in
                </Link>
                <Link
                  href="/candidate-login"
                  className="bg-blue-50 text-blue-600 px-6 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors font-medium"
                >
                  Candidate Login
                </Link>
                <Link
                  href="/apply"
                  className="bg-gray-900 text-green-500 px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Apply now
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-900 hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Loans Section */}
              <div className="px-3 py-2">
                <div className="text-gray-900 font-medium mb-2">Loans</div>
                <div className="pl-4 space-y-1">
                  <Link
                    href="/payday-loans"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Payday Loans
                  </Link>
                  <Link
                    href="/personal-loans"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Personal Loans
                  </Link>
                  <Link
                    href="/student-loans"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Student Loans
                  </Link>
                  <Link
                    href="/vacation-loans"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vacation Loans
                  </Link>
                  <Link
                    href="/small-business-loans"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Small Business Loans
                  </Link>
                  <Link
                    href="/home-improvement-loans"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home Improvement Loans
                  </Link>
                  <Link
                    href="/medical-loans"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Medical Loans
                  </Link>
                  <Link
                    href="/wedding-loans"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Wedding Loans
                  </Link>
                  <Link
                    href="/p2p-lending"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    P2P Lending
                  </Link>
                </div>
              </div>

              <Link
                href="/partners"
                className="block px-3 py-2 text-gray-900 hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Partners
              </Link>
              
              {/* Mobile Lending Types Section */}
              <div className="px-3 py-2">
                <div className="text-gray-900 font-medium mb-2">Lending Types</div>
                <div className="pl-4 space-y-1">
                  <Link
                    href="/payday-loans"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Payday Loans
                  </Link>
                  <Link
                    href="/p2p-lending"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    P2P Loans
                  </Link>
                </div>
              </div>
              
              {/* Mobile Payday Express Section */}
              <div className="px-3 py-2">
                <div className="text-gray-900 font-medium mb-2">Payday Express</div>
                <div className="pl-4 space-y-1">
                  <Link
                    href="/about"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/privacy"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/loan-calculator"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Loan Calculator
                  </Link>
                </div>
              </div>
              
              {/* Mobile Explore Section */}
              <div className="px-3 py-2">
                <div className="text-gray-900 font-medium mb-2">Explore</div>
                <div className="pl-4 space-y-1">
                  <Link
                    href="/testimonials"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="/team"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Team
                  </Link>
                  <Link
                    href="/blog"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/news"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    News
                  </Link>
                  <Link
                    href="/feedback"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Feedback
                  </Link>
                  <Link
                    href="/career"
                    className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Career
                  </Link>
                </div>
              </div>
              
              <div className="px-3 py-2 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full bg-white text-gray-900 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-center"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block bg-white text-gray-900 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/candidate-login"
                      className="block bg-blue-50 text-blue-600 px-6 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Candidate Login
                    </Link>
                    <Link
                      href="/apply"
                      className="block bg-gray-900 text-green-500 px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Apply now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Close dropdowns when clicking outside */}
      {isLoansDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsLoansDropdownOpen(false)}
        />
      )}
      {isPaydayExpressDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsPaydayExpressDropdownOpen(false)}
        />
      )}
      {isLendingTypesDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsLendingTypesDropdownOpen(false)}
        />
      )}
      {isExploreDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsExploreDropdownOpen(false)}
        />
      )}
    </header>
  );
} 