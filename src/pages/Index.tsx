
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
    
    return () => {
      document.removeEventListener('click', handleHashLinkClick);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
