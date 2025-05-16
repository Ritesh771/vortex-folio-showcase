
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  company: string;
  technologies: string[];
  image: string;
  links?: {
    demo?: string;
    github?: string;
  };
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const projects: Project[] = [
    {
      id: 1,
      title: "Safe Space (Women's Safety App)",
      shortDescription: "Mobile app with location tracking, panic button, and emergency alerts",
      fullDescription: "Mobile app with location tracking, panic button, and emergency alerts. Alerts routed to nearest police stations and family members in real time.",
      duration: "Apr 2025 - Present",
      company: "Stalight Technology",
      technologies: ["React.js", "Django", "PostgreSQL", "AWS", "Android"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
    {
      id: 2,
      title: "Slot Booking Platform",
      shortDescription: "Online slot booking system for sports with Razorpay integration",
      fullDescription: "Online slot booking system for sports with Razorpay integration. Features: Secure payments, transaction rollback, real-time dashboards.",
      duration: "Jun 2023 - Aug 2023",
      company: "Stalight Technology",
      technologies: ["React.js", "Django", "PostgreSQL", "Redis"],
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      links: {
        demo: "https://example.com/demo",
        github: "https://github.com/example/project"
      }
    },
    {
      id: 3,
      title: "Crack the Campus (Placement Guidance)",
      shortDescription: "Confidential platform under NDA – personal role included UI development and backend APIs",
      fullDescription: "Confidential platform under NDA – personal role included UI development and backend APIs.",
      duration: "Feb 2025 - Present",
      company: "Castle Rockin",
      technologies: ["HTML5", "CSS3", "React.js", "Django"],
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    },
    {
      id: 4,
      title: "AgriWe (Smart Farming Assistant)",
      shortDescription: "Suggests high-yield crops, fertilizers, and pesticides based on seasonal data",
      fullDescription: "Suggests high-yield crops, fertilizers, and pesticides based on seasonal data using NPK sensor integration.",
      duration: "Apr 2024",
      company: "T. John College of Engineering",
      technologies: ["Python", "HTML5", "CSS3"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
    {
      id: 5,
      title: "Anomaly Detection Surveillance System",
      shortDescription: "Real-time detection of suspicious activity using Python & Flask",
      fullDescription: "Real-time detection of suspicious activity using Python & Flask. Automatically reports with captured image to local police.",
      duration: "Jan 2024 - Mar 2024",
      company: "AMC College of Engineering",
      technologies: ["Flask", "MySQL", "Redis"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      id: 6,
      title: "Navigation Guidance for the Visually Impaired",
      shortDescription: "TensorFlow-based navigation system providing audio cues",
      fullDescription: "TensorFlow-based navigation system providing audio cues. Targeted for embedded systems and IoT applications.",
      duration: "Jan 2025",
      company: "Stalight Technology",
      technologies: ["Python", "Flask", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
  ];

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.project-card-container').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.project-card-container').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-12">Key Projects</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card-container opacity-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="project-card h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm font-medium">{project.duration}</p>
                      <p className="text-sm opacity-80">{project.company}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-portfolio-darkBlue">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="bg-portfolio-lightBlue bg-opacity-10 text-portfolio-blue px-2 py-1 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white"
                    onClick={() => handleOpenDetails(project)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          {selectedProject && (
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-portfolio-darkBlue">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-portfolio-blue font-medium">
                  {selectedProject.duration} | {selectedProject.company}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <div className="mb-6">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-64 object-cover rounded-md" 
                  />
                </div>
                <h4 className="text-lg font-medium mb-2">Description</h4>
                <p className="text-gray-700 mb-4">{selectedProject.fullDescription}</p>
                
                <h4 className="text-lg font-medium mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="bg-portfolio-lightBlue bg-opacity-10 text-portfolio-blue px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {selectedProject.links && (
                  <div className="flex gap-4">
                    {selectedProject.links.demo && (
                      <Button className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View Demo
                      </Button>
                    )}
                    {selectedProject.links.github && (
                      <Button variant="outline" className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        View Code
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;
