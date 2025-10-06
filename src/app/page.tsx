'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import LoanCalculator from '@/components/LoanCalculator';
import ApplicationForm from '@/components/ApplicationForm';
import Testimonials from '@/components/Testimonials';
import Feedback from '@/components/Feedback';
import Team from '@/components/Team';
import YouTubeDemo from '@/components/YouTubeDemo';
import Blog from '@/components/Blog';
import News from '@/components/News';
import EmailSignup from '@/components/EmailSignup';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

                return (
                <main className="min-h-screen bg-white pt-16">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator" 
        style={{ width: `${scrollProgress}%` }}
      ></div>
      
      <Header />
      <Hero /> 
      <HowItWorks />
      <Features />
      <Testimonials />
      <YouTubeDemo />
      <Team />
      <Blog />
      <News />
      <LoanCalculator />
      <ApplicationForm />
      <Feedback />
      <EmailSignup />
      <Contact />
      <Footer />
    </main>
  );
}
