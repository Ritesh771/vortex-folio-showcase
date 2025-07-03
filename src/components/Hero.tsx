import React, { useEffect, useRef } from 'react';
import { ArrowDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const profileImageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const vortexRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (profileImageRef.current && containerRef.current) {
        const scrollTop = window.scrollY;
        const containerHeight = containerRef.current.offsetHeight;
        const triggerPoint = containerHeight * 0.5; // Trigger earlier
        
        // Enhanced Macbook scroll effect for profile image
        if (scrollTop < triggerPoint * 2) { // Extend the effect range
          const progress = Math.min(scrollTop / triggerPoint, 1);
          
          // Enhanced 3D effect values
          const scale = 1 + (progress * 0.2); // More pronounced scaling
          const translateZ = scrollTop * 0.9; // Stronger Z-axis movement
          const translateY = -scrollTop * 0.15;
          const rotateX = progress * 3; // Subtle X rotation
          const rotateY = Math.sin(progress * Math.PI) * 2; // Subtle sine-based Y rotation
          const brightness = 1 + (progress * 0.25);
          
          // Apply advanced 3D transform
          profileImageRef.current.style.transform = `
            perspective(1200px) 
            translateZ(${translateZ}px) 
            translateY(${translateY}px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(${scale})
          `;
          
          // Enhanced visual effects
          profileImageRef.current.style.filter = `brightness(${brightness}) contrast(${1 + progress * 0.1})`;
          profileImageRef.current.style.boxShadow = `
            0 ${10 + progress * 40}px ${30 + progress * 70}px rgba(0, 0, 0, ${0.2 + progress * 0.4}),
            0 0 ${15 + progress * 25}px rgba(59, 130, 246, ${0.3 + progress * 0.4})
          `;
        }

        // Animate vortex based on scroll
        if (vortexRef.current) {
          const rotateSpeed = scrollTop * 0.05;
          const scaleVal = 1 + (scrollTop * 0.001);
          vortexRef.current.style.transform = `rotate(${rotateSpeed}deg) scale(${scaleVal})`;
          vortexRef.current.style.opacity = `${Math.min(0.35, 0.1 + (scrollTop * 0.0005))}`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/lovable-uploads/RITESH N.pdf';
    link.download = 'RITESH_N_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center pt-16 overflow-hidden"
    >
      {/* Dynamic vortex background */}
      <div 
        ref={vortexRef} 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(30, 58, 138, 0.15) 0%, rgba(59, 130, 246, 0.08) 25%, transparent 60%)`,
          borderRadius: '40%',
          transform: 'rotate(0deg)',
          transition: 'transform 0.5s ease-out',
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-radial from-portfolio-blue/5 via-transparent to-transparent z-0"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-20 flex flex-col items-center text-center z-10">
        <div className="relative mb-6 sm:mb-8 md:mb-12 overflow-visible">
          {/* Enhanced profile image with 3D effect */}
          <div 
            ref={profileImageRef} 
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl transform-gpu"
            style={{ 
              transformStyle: 'preserve-3d',
              transition: 'filter 0.5s ease-out, box-shadow 0.5s ease-out'
            }}
          >
            <img 
              src="/profile.png" 
              alt="Ritesh N" 
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          
          {/* Enhanced glow effect */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-portfolio-blue via-portfolio-lightBlue to-portfolio-blue opacity-20 blur-lg -z-10 animate-pulse-subtle"></div>
          
          {/* Animated particle effect around the image */}
          <div className="absolute inset-0 rounded-full -z-5 overflow-hidden">
            <div className="absolute inset-[-10px] opacity-20 animate-spin-slow" style={{ animationDuration: '25s' }}>
              <div className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rounded-full top-1/4 left-[5%] blur-sm"></div>
              <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-blue-300 rounded-full top-2/3 right-[10%] blur-sm"></div>
              <div className="absolute w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full bottom-1/4 left-[20%] blur-sm"></div>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-portfolio-darkBlue mb-4 sm:mb-6 animate-fade-in tracking-tight">
          Hi, I'm <span className="text-gradient-blue font-extrabold">Ritesh N</span>
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
            className="glowing-btn inline-flex items-center gap-2 bg-portfolio-blue hover:bg-portfolio-darkBlue transition-all px-6 py-3 rounded-md text-white"
          >
            More About Me
            <ArrowDown className="w-4 h-4 animate-bounce-subtle" />
          </a>
          
          <Button
            variant="outline"
            className="border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white transition-all group"
            onClick={handleDownloadResume}
          >
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
