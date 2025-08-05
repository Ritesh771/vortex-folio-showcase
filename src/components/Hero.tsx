import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast, toast } from '@/components/ui/use-toast';

const Hero = () => {
  const profileImageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const vortexRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  useEffect(() => {
    let animationFrameId: number;
    
    const handleScroll = () => {
      // Cancel previous animation frame to improve performance
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        if (profileImageRef.current && containerRef.current) {
          const scrollTop = window.scrollY;
          const containerHeight = containerRef.current.offsetHeight;
          const triggerPoint = containerHeight * 0.5;
          
          // Enhanced Macbook scroll effect for profile image with smoother calculations
          if (scrollTop < triggerPoint * 2) {
            const progress = Math.min(scrollTop / triggerPoint, 1);
            
            // Smoother easing function for more natural animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const easeInOutCubic = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            // Enhanced 3D effect values with smoother transitions
            const scale = 1 + (easeOutQuart * 0.2);
            const translateZ = scrollTop * 0.8; // Slightly reduced for smoother effect
            const translateY = -scrollTop * 0.12; // Smoother vertical movement
            const rotateX = easeInOutCubic * 2.5; // Smoother rotation
            const rotateY = Math.sin(easeInOutCubic * Math.PI) * 1.5; // Reduced rotation intensity
            const brightness = 1 + (easeOutQuart * 0.2);
            
            // Apply advanced 3D transform with GPU acceleration
            profileImageRef.current.style.transform = `
              perspective(1200px) 
              translateZ(${translateZ}px) 
              translateY(${translateY}px) 
              rotateX(${rotateX}deg) 
              rotateY(${rotateY}deg) 
              scale(${scale})
            `;
            
            // Enhanced visual effects with smoother transitions
            profileImageRef.current.style.filter = `brightness(${brightness}) contrast(${1 + easeOutQuart * 0.08})`;
            profileImageRef.current.style.boxShadow = `
              0 ${10 + easeOutQuart * 35}px ${30 + easeOutQuart * 60}px rgba(30, 58, 138, ${0.15 + easeOutQuart * 0.35}),
              0 0 ${15 + easeOutQuart * 20}px rgba(59, 130, 246, ${0.25 + easeOutQuart * 0.35})
            `;
          }

          // Animate vortex based on scroll with smoother movement
          if (vortexRef.current) {
            const rotateSpeed = scrollTop * 0.03; // Reduced for smoother rotation
            const scaleVal = 1 + (scrollTop * 0.0008); // Smoother scaling
            vortexRef.current.style.transform = `rotate(${rotateSpeed}deg) scale(${scaleVal})`;
            vortexRef.current.style.opacity = `${Math.min(0.3, 0.08 + (scrollTop * 0.0004))}`;
          }
        }
      });
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/lovable-uploads/RITESH N.pdf';
    link.download = 'RITESH_N_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: 'Download started',
      description: 'Your resume download has been triggered.',
      duration: 1000,
    });
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center pt-16 overflow-hidden"
    >
      {/* Modern floating elements and background */}
      <div 
        ref={vortexRef} 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(30, 58, 138, 0.15) 0%, rgba(59, 130, 246, 0.08) 25%, transparent 60%)`,
          borderRadius: '40%',
          transform: 'rotate(0deg)',
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-radial from-portfolio-blue/5 via-transparent to-transparent z-0"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      {/* Floating decorative elements */}
      <div className="floating-icon top-20 left-10 w-12 h-12 bg-portfolio-blue rounded-full opacity-10"></div>
      <div className="floating-icon top-40 right-20 w-8 h-8 bg-portfolio-lightBlue rounded-full opacity-15"></div>
      <div className="floating-icon bottom-32 left-20 w-16 h-16 bg-portfolio-darkBlue rounded-full opacity-10"></div>
      <div className="floating-icon top-1/3 right-1/3 w-6 h-6 bg-portfolio-lightBlue rounded-full opacity-20"></div>
      
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-20 flex flex-col items-center text-center z-10">
        <div className="relative mb-6 sm:mb-8 md:mb-12 overflow-visible">
          {/* Skeleton for profile image */}
          {!imgLoaded && (
            <Skeleton className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full border-4 border-white shadow-xl mb-2" />
          )}
          <div
            ref={profileImageRef}
            className={`w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl transform-gpu transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform, filter, box-shadow',
              transition: 'filter 0.2s ease-out, box-shadow 0.2s ease-out, opacity 0.7s ease-out',
              backfaceVisibility: 'hidden',
              perspective: '1200px',
            }}
          >
            <img
              src="/profile.png"
              alt="Ritesh N"
              className="w-full h-full object-cover"
              loading="eager"
              onLoad={() => setImgLoaded(true)}
              style={{ display: imgLoaded ? 'block' : 'none' }}
            />
          </div>
          
          {/* Enhanced gradient glow effect with original blue theme */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-portfolio-blue via-portfolio-lightBlue to-portfolio-blue opacity-20 blur-lg -z-10 animate-pulse-subtle"></div>
          
          {/* Animated particle effect around the image with original colors */}
          <div className="absolute inset-0 rounded-full -z-5 overflow-hidden">
            <div className="absolute inset-[-10px] opacity-20 animate-spin-slow" style={{ animationDuration: '25s' }}>
              <div className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rounded-full top-1/4 left-[5%] blur-sm"></div>
              <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-blue-300 rounded-full top-2/3 right-[10%] blur-sm"></div>
              <div className="absolute w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full bottom-1/4 left-[20%] blur-sm"></div>
            </div>
          </div>
        </div>
        
        {/* Skeleton for main text */}
        <div className={imgLoaded ? 'opacity-100 transition-opacity duration-700' : 'opacity-0 transition-opacity duration-700'}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-portfolio-darkBlue mb-4 sm:mb-6 animate-fade-in tracking-tight">
            Hi, I'm <span className="text-gradient-blue font-extrabold">Ritesh N</span>
          </h1>
          <p className="text-xl md:text-2xl text-portfolio-gray max-w-2xl mx-auto mb-8 animate-fade-in animate-delay-200">
            Full-Stack Developer | AI Innovator | Startup Founder
          </p>
          <p className="text-portfolio-gray max-w-3xl mx-auto mb-10 animate-fade-in animate-delay-300 leading-relaxed">
            Enthusiastic and driven Full-Stack Developer with a strong foundation in Artificial Intelligence
            and Machine Learning, currently pursuing a B.E. in CSE (AI & ML) from A.M.C. Engineering College,
            Bangalore. Founder and CEO of Stalight Technology Pvt Ltd, a tech startup focused on campus
            automation and AI-driven applications.
          </p>
        </div>
        {/* Skeletons for text */}
        {!imgLoaded && (
          <>
            <Skeleton className="w-64 h-8 mb-4 mx-auto" />
            <Skeleton className="w-80 h-6 mb-2 mx-auto" />
            <Skeleton className="w-80 h-6 mb-2 mx-auto" />
            <Skeleton className="w-80 h-6 mb-2 mx-auto" />
            <Skeleton className="w-40 h-6 mb-2 mx-auto" />
          </>
        )}
        
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in animate-delay-400">
          <a 
            href="#about" 
            className="glowing-btn inline-flex items-center gap-2 transition-all px-8 py-4 rounded-xl text-white font-semibold"
          >
            More About Me
            <ArrowDown className="w-4 h-4 animate-bounce-gentle" />
          </a>
          
          <Button
            variant="outline"
            className="border-portfolio-primary text-portfolio-primary hover:bg-portfolio-primary hover:text-white transition-all group rounded-xl px-8 py-4 font-semibold"
            onClick={handleDownloadResume}
          >
            <Download className="w-4 h-4 mr-2 transition-transform group-hover:translate-y-0.5" />
            Download Resume
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <a href="#about" aria-label="Scroll down" className="p-3 rounded-full bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 border border-portfolio-primary/20">
          <ArrowDown className="w-6 h-6 text-portfolio-primary" />
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-portfolio-background to-transparent"></div>
    </section>
  );
};

export default Hero;
