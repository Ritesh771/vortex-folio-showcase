
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

interface BentoGridProps {
  projects: Array<{
    id: number;
    title: string;
    shortDescription: string;
    technologies: string[];
    image: string;
    size?: 'small' | 'medium' | 'large';
  }>;
  onProjectClick: (project: any) => void;
}

const BentoGrid: React.FC<BentoGridProps> = ({ projects, onProjectClick }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in');
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = gridRef.current?.querySelectorAll('.bento-item');
    items?.forEach((item) => observer.observe(item));

    return () => {
      items?.forEach((item) => observer.unobserve(item));
    };
  }, []);

  const getBentoSize = (index: number) => {
    const pattern = ['large', 'small', 'small', 'medium', 'small', 'large'];
    return pattern[index % pattern.length];
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-1 md:col-span-2 row-span-1 md:row-span-2';
      case 'medium':
        return 'col-span-1 md:col-span-2 row-span-1';
      case 'small':
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <div 
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]"
    >
      {projects.map((project, index) => {
        const size = getBentoSize(index);
        const sizeClasses = getSizeClasses(size);
        
        return (
          <div
            key={project.id}
            className={`bento-item opacity-0 group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer ${sizeClasses}`}
            onClick={() => onProjectClick(project)}
            style={{
              background: `linear-gradient(135deg, rgba(30, 58, 138, 0.05), rgba(59, 130, 246, 0.1))`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/20 z-10" />
            
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
            
            <div className="relative z-30 h-full flex flex-col justify-end p-4 md:p-6">
              <h3 className={`font-bold text-white mb-2 line-clamp-2 ${
                size === 'large' ? 'text-xl md:text-2xl' : 'text-lg'
              }`}>
                {project.title}
              </h3>
              
              <p className={`text-gray-200 mb-3 line-clamp-2 ${
                size === 'large' ? 'text-base' : 'text-sm'
              }`}>
                {project.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.slice(0, size === 'large' ? 4 : 2).map((tech) => (
                  <span 
                    key={tech} 
                    className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > (size === 'large' ? 4 : 2) && (
                  <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                    +{project.technologies.length - (size === 'large' ? 4 : 2)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <Button 
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                >
                  View Details
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BentoGrid;
