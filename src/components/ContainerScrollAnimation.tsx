
import React, { useEffect, useRef } from 'react';

interface ContainerScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerScrollAnimation: React.FC<ContainerScrollAnimationProps> = ({ 
  children, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = rect.height;
      
      // Calculate scroll progress relative to the container
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + containerHeight)
      ));

      // 3D rotation values based on scroll progress
      const rotateX = (scrollProgress - 0.5) * 15; // -7.5 to 7.5 degrees
      const rotateY = (scrollProgress - 0.5) * 10; // -5 to 5 degrees
      const scale = 0.95 + (scrollProgress * 0.1); // 0.95 to 1.05
      const translateZ = scrollProgress * 50; // 0 to 50px

      // Apply 3D transforms
      container.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(${scale})
        translateZ(${translateZ}px)
      `;

      // Adjust opacity and blur based on scroll
      const opacity = 0.7 + (scrollProgress * 0.3); // 0.7 to 1
      const blur = (1 - scrollProgress) * 2; // 2px to 0px

      container.style.opacity = opacity.toString();
      container.style.filter = `blur(${blur}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`transform-gpu transition-all duration-200 ease-out ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity, filter'
      }}
    >
      {children}
    </div>
  );
};

export default ContainerScrollAnimation;
