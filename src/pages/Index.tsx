import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Certificates from '../components/Certificates';
import Footer from '../components/Footer';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [loading, setLoading] = useState(true);

  // Fade in animation (default upward movement)
  useAnimateOnScroll({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    once: true,
    selector: '.animate-on-scroll',
    stagger: true,
    staggerDelay: 150
  });

  // Slide in from left
  useAnimateOnScroll({
    threshold: 0.1,
    rootMargin: '0px',
    once: true,
    selector: '.slide-in-left',
    stagger: true,
    staggerDelay: 100,
    direction: 'left'
  });

  // Slide in from right
  useAnimateOnScroll({
    threshold: 0.1,
    rootMargin: '0px',
    once: true,
    selector: '.slide-in-right',
    stagger: true,
    staggerDelay: 100,
    direction: 'right'
  });

  // Scale animation
  useAnimateOnScroll({
    threshold: 0.1,
    rootMargin: '0px',
    once: true,
    selector: '.scale-in',
    stagger: true,
    staggerDelay: 50,
    direction: 'scale'
  });

  // Rotation animation
  useAnimateOnScroll({
    threshold: 0.1,
    rootMargin: '0px',
    once: true,
    selector: '.rotate-in',
    stagger: true,
    staggerDelay: 50,
    direction: 'rotate'
  });

  // 3D flip animation
  useAnimateOnScroll({
    threshold: 0.1,
    rootMargin: '0px',
    once: true,
    selector: '.flip-in',
    stagger: true,
    staggerDelay: 150,
    direction: 'flip'
  });

  useEffect(() => {
    // Update the document title
    document.title = "Ritesh N - Full-Stack Developer | AI Innovator | Startup Founder";

    // Apply a global theme based on the profile photo colors (blue shirt)
    document.documentElement.style.setProperty('--theme-primary', '#1E3A8A');  // Dark blue from shirt
    document.documentElement.style.setProperty('--theme-secondary', '#3B82F6'); // Lighter blue
    document.documentElement.style.setProperty('--theme-accent', '#93c5fd'); // Very light blue
    document.documentElement.style.setProperty('--theme-background', '#f0f4f8'); // Light blue-gray background

    // Apply a subtle blue tint to the body background
    document.body.classList.add('bg-gradient-to-br', 'from-blue-50', 'via-white', 'to-blue-50');

    // Apply styles for smooth scrolling and better section positioning
    const style = document.createElement('style');
    style.innerHTML = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 80px; /* Adjust based on navbar height */
      }
      section {
        scroll-margin-top: 80px; /* Adjust based on navbar height */
      }

      /* Improve animations */
      .section-title {
        position: relative;
        display: inline-block;
        font-size: 2.25rem;
        font-weight: 700;
        color: #1E3A8A;
        margin-bottom: 1rem;
        text-align: center;
      }

      .section-title::after {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 4px;
        background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 1), rgba(59, 130, 246, 0.2));
        border-radius: 2px;
      }

      /* Apply enhanced smooth transitions globally */
      * {
        transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 200ms;
      }

      /* Custom scrollbar for a more polished look */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(247, 250, 252, 0.8);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(59, 130, 246, 0.6);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: rgba(59, 130, 246, 0.8);
      }

      /* Enhanced Apple-style card transitions */
      .certificate-carousel .embla__slide {
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      /* Add subtle depth and dimension to cards */
      .certificate-card {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .certificate-card:hover {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07), 0 6px 10px rgba(0, 0, 0, 0.05);
        transform: translateY(-5px) scale(1.02);
      }

      /* Enhanced smooth animations */
      @media (prefers-reduced-motion: no-preference) {
        .smooth-appear {
          animation: smooth-appear 0.8s ease forwards;
        }

        @keyframes smooth-appear {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      }

      /* Ensure modal content is scrollable */
      .DialogContent {
        max-height: 80vh;
        overflow-y: auto;
      }

      /* Ensure the modal content container is scrollable */
      .DialogContent > div {
        max-height: inherit;
        overflow-y: auto;
      }
    `;
    document.head.appendChild(style);

    // Update the scroll-progress indicator
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      document.body.style.setProperty('--scroll-progress', `${scrollPercentage}%`);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-blue-100/50">
      {/* Background patterns and effects */}
      <div className="bg-pattern absolute inset-0 opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-gradient-radial from-portfolio-blue/5 via-transparent to-transparent z-0"></div>

      {/* Dynamic vortex background */}
      <div className="absolute top-0 left-0 right-0 h-[300px] overflow-hidden z-0 pointer-events-none">
        <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-gradient-conic from-portfolio-blue/3 via-portfolio-lightBlue/1 to-portfolio-blue/3 animate-vortex"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-portfolio-blue via-portfolio-lightBlue to-portfolio-blue z-50 progress-indicator" style={{width: 'var(--scroll-progress, 0%)'}}></div>
    </div>
  );
};

export default Index;
