'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import News from '@/components/News';
import Footer from '@/components/Footer';

export default function NewsPage() {
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
      <News />
      <Footer />
    </main>
  );
}
