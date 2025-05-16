
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

const Index = () => {
  // Fade in animation (default upward movement)
  useAnimateOnScroll({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    once: true,
    selector: '.animate-on-scroll',
    stagger: true,
    staggerDelay: 150,
    duration: 800,
    direction: 'up'
  });
  
  // Slide in from left
  useAnimateOnScroll({
    threshold: 0.1,
    rootMargin: '0px',
    once: true,
    selector: '.slide-in-left',
    stagger: true,
    staggerDelay: 100,
    duration: 800,
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
    duration: 800,
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
    duration: 600,
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
    duration: 800,
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
    duration: 1000,
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
    
    // Smooth scroll to section when clicking on nav links
    const handleHashLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (target && target.tagName === 'A' && target.hash) {
        const section = document.querySelector(target.hash);
        if (section) {
          event.preventDefault();
          section.scrollIntoView({ behavior: 'smooth' });
          
          // Update the URL without causing a new page load
          window.history.pushState(null, '', target.hash);
        }
      }
    };
    
    document.addEventListener('click', handleHashLinkClick);
    
    // Add a scroll indicator on the body
    const body = document.body;
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      body.style.setProperty('--scroll-progress', `${scrollPercentage}%`);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleHashLinkClick);
      window.removeEventListener('scroll', handleScroll);
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
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-portfolio-blue via-portfolio-lightBlue to-portfolio-blue z-50 progress-indicator"></div>
    </div>
  );
};

export default Index;
