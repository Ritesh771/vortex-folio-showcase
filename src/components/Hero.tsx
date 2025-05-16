
import React, { useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  useEffect(() => {
    const handleScroll = () => {
      const profileImage = document.getElementById('profile-image');
      const scrollTop = window.scrollY;
      const triggerPoint = 200;
      
      if (profileImage && scrollTop < triggerPoint) {
        const scale = 1 + (scrollTop / triggerPoint * 0.2);
        const translateZ = scrollTop / 2;
        profileImage.style.transform = `perspective(1000px) translateZ(${translateZ}px) scale(${scale})`;
        profileImage.style.opacity = `${1 - scrollTop / 400}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center pt-16 overflow-hidden">
      <div className="vortex-bg absolute inset-0 -z-10"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center">
        <div className="relative mb-8 md:mb-12 overflow-visible perspective-1000">
          <div 
            id="profile-image" 
            className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl macbook-scroll in-view"
          >
            <img 
              src="/lovable-uploads/fd7db455-f9ec-4fd9-9156-ce563858b01f.png" 
              alt="Ritesh N" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-portfolio-darkBlue mb-6 animate-fade-in">
          Hi, I'm <span className="text-portfolio-blue">Ritesh N</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-8 animate-fade-in animate-delay-200">
          Full-Stack Developer | AI Innovator | Startup Founder
        </p>
        
        <p className="text-gray-600 max-w-3xl mx-auto mb-10 animate-fade-in animate-delay-300">
          Enthusiastic and driven Full-Stack Developer with a strong foundation in Artificial Intelligence 
          and Machine Learning, currently pursuing a B.E. in CSE (AI & ML) from A.M.C. Engineering College, 
          Bangalore. Founder and CEO of Stalight Technology Pvt Ltd, a tech startup focused on campus 
          automation and AI-driven applications.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in animate-delay-400">
          <a 
            href="#about" 
            className="glowing-btn inline-flex items-center gap-2 bg-portfolio-blue hover:bg-portfolio-darkBlue transition-colors"
          >
            More About Me
            <ArrowDown className="w-4 h-4" />
          </a>
          
          <Button variant="outline" className="border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white">
            Download Resume
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <ArrowDown className="w-6 h-6 text-portfolio-blue" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
