
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
  useAnimateOnScroll({
    animationClass: 'animate-fade-in',
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    once: true,
    selector: '.animate-on-scroll',
    stagger: true,
    staggerDelay: 150
  });
  
  useEffect(() => {
    // Update the document title
    document.title = "Ritesh N - Full-Stack Developer | AI Innovator | Startup Founder";
    
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
    <div className="min-h-screen bg-gradient-to-br from-portfolio-lightBlue/5 via-white to-portfolio-blue/5">
      <div className="bg-pattern absolute inset-0 opacity-5 z-0"></div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
      <div className="fixed top-0 left-0 h-1 bg-portfolio-blue z-50 progress-indicator"></div>
    </div>
  );
};

export default Index;
