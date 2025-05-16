
import React, { useEffect, useRef } from 'react';
import { ArrowDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const profileImageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (profileImageRef.current && containerRef.current) {
        const scrollTop = window.scrollY;
        const containerHeight = containerRef.current.offsetHeight;
        const triggerPoint = containerHeight * 0.6;
        
        if (scrollTop < triggerPoint) {
          const progress = Math.min(scrollTop / triggerPoint, 1);
          const scale = 1 + (progress * 0.15);
          const translateZ = scrollTop * 0.6;
          const translateY = -scrollTop * 0.2;
          const brightness = 1 + (progress * 0.2);
          
          profileImageRef.current.style.transform = `perspective(1000px) translateZ(${translateZ}px) translateY(${translateY}px) scale(${scale})`;
          profileImageRef.current.style.filter = `brightness(${brightness})`;
          profileImageRef.current.style.boxShadow = `0 ${10 + progress * 30}px ${30 + progress * 60}px rgba(0, 0, 0, ${0.2 + progress * 0.3})`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center pt-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-portfolio-blue/5 via-transparent to-transparent z-0"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center z-10">
        <div className="relative mb-8 md:mb-12 overflow-visible">
          <div 
            ref={profileImageRef} 
            className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl macbook-scroll transform-gpu"
          >
            <img 
              src="/lovable-uploads/fd7db455-f9ec-4fd9-9156-ce563858b01f.png" 
              alt="Ritesh N" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-portfolio-blue to-portfolio-lightBlue opacity-20 blur-lg -z-10"></div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-portfolio-darkBlue mb-6 animate-fade-in tracking-tight">
          Hi, I'm <span className="text-gradient-blue">Ritesh N</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-8 animate-fade-in animate-delay-200">
          Full-Stack Developer | AI Innovator | Startup Founder
        </p>
        
        <p className="text-gray-600 max-w-3xl mx-auto mb-10 animate-fade-in animate-delay-300 leading-relaxed">
          Enthusiastic and driven Full-Stack Developer with a strong foundation in Artificial Intelligence 
          and Machine Learning, currently pursuing a B.E. in CSE (AI & ML) from A.M.C. Engineering College, 
          Bangalore. Founder and CEO of Stalight Technology Pvt Ltd, a tech startup focused on campus 
          automation and AI-driven applications.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in animate-delay-400">
          <a 
            href="#about" 
            className="glowing-btn inline-flex items-center gap-2 bg-portfolio-blue hover:bg-portfolio-darkBlue transition-all"
          >
            More About Me
            <ArrowDown className="w-4 h-4 animate-bounce-subtle" />
          </a>
          
          <Button variant="outline" className="border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white transition-all group">
            <Download className="w-4 h-4 mr-2 transition-transform group-hover:translate-y-0.5" />
            Download Resume
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll down" className="p-2 rounded-full bg-white/80 shadow-lg hover:shadow-xl transition-shadow">
          <ArrowDown className="w-6 h-6 text-portfolio-blue" />
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
