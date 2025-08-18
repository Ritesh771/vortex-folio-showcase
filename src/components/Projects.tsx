import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowRight, Calendar, Building2, Code2 } from 'lucide-react';

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
  challenges?: string[];
  achievements?: string[];
  detailedDescription?: string;
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
      image: "/mock/undraw_mobile-development_tjxm.svg",
      challenges: [
        "Implementing accurate real-time location tracking with minimal battery consumption",
        "Creating a reliable alert system that works even in poor network conditions",
        "Ensuring user privacy while maintaining emergency functionality"
      ],
      achievements: [
        "Reduced alert delivery time by 40% compared to similar applications",
        "Implemented a fallback SMS system for areas with poor internet connectivity",
        "Optimized battery usage to less than 5% per day with active monitoring"
      ],
      detailedDescription: "Safe Space is a comprehensive women's safety application designed to provide immediate assistance during emergencies. The app features a one-tap panic button that, when activated, sends the user's real-time location to pre-configured emergency contacts and the nearest police station. The backend infrastructure is built on Django with PostgreSQL for reliable data storage, while the frontend uses React Native for a seamless cross-platform experience. To ensure reliability, we implemented a multi-channel notification system that uses both internet and SMS fallbacks."
    },
    {
      id: 2,
      title: "Slot Booking Platform",
      shortDescription: "Online slot booking system for sports with Razorpay integration",
      fullDescription: "Online slot booking system for sports with Razorpay integration. Features: Secure payments, transaction rollback, real-time dashboards.",
      duration: "Jun 2023 - Aug 2023",
      company: "Stalight Technology",
      technologies: ["React.js", "Django", "PostgreSQL", "Redis"],
      image: "/mock/undraw_web-development_0wdh.svg",
      links: {
        demo: "https://example.com/demo",
        github: "https://github.com/example/project"
      },
      challenges: [
        "Managing concurrent bookings to prevent double-booking issues",
        "Implementing secure payment processing with proper error handling",
        "Creating an intuitive calendar interface for slot selection"
      ],
      achievements: [
        "Successfully processed over 1,000 bookings in the first month",
        "Achieved 99.8% uptime with robust error handling",
        "Reduced booking abandonment rate by 35% with streamlined UI"
      ],
      detailedDescription: "The Slot Booking Platform is a comprehensive solution for sports facilities to manage their court and equipment reservations. It features an intuitive calendar interface where users can view availability and book slots in real-time. We integrated Razorpay for secure payment processing with automatic transaction rollback in case of booking failures. The system uses Redis for caching frequently accessed data and managing booking locks to prevent double-booking scenarios. A custom analytics dashboard provides facility owners with insights on usage patterns, popular time slots, and revenue metrics."
    },
    {
      id: 3,
      title: "Crack the Campus (Placement Guidance)",
      shortDescription: "Confidential platform under NDA – personal role included UI development and backend APIs",
      fullDescription: "Confidential platform under NDA – personal role included UI development and backend APIs.",
      duration: "Feb 2025 - Present",
      company: "Castle Rockin",
      technologies: ["HTML5", "CSS3", "React.js", "Django"],
      image: "/mock/undraw_developer-activity_4zqd.svg",
      challenges: [
        "Working within strict NDA constraints while delivering quality features",
        "Creating an adaptive UI for diverse user personas (students, recruiters, administrators)",
        "Implementing complex filtering algorithms for placement opportunities"
      ],
      achievements: [
        "Developed a modular component library reused across multiple sections",
        "Created secure API endpoints with comprehensive authentication",
        "Improved data loading performance by 65% through query optimization"
      ],
      detailedDescription: "While under NDA, I can share that this project focuses on connecting students with relevant placement opportunities. My role involved developing both frontend and backend components of the platform. On the frontend, I created responsive interfaces using React.js with a focus on intuitive navigation and information presentation. For the backend, I developed Django REST APIs for data retrieval, user authentication, and profile management. One notable achievement was implementing a recommendation algorithm that matched students with suitable opportunities based on their skills and preferences."
    },
    {
      id: 4,
      title: "AgriWe (Smart Farming Assistant)",
      shortDescription: "Suggests high-yield crops, fertilizers, and pesticides based on seasonal data",
      fullDescription: "Suggests high-yield crops, fertilizers, and pesticides based on seasonal data using NPK sensor integration.",
      duration: "Apr 2024",
      company: "T. John College of Engineering",
      technologies: ["Python", "HTML5", "CSS3"],
      image: "/mock/undraw_programming_65t2.svg",
      challenges: [
        "Integrating with various IoT sensors for soil data collection",
        "Building accurate prediction models with limited historical data",
        "Creating a simple interface accessible to farmers with varying tech literacy"
      ],
      achievements: [
        "Achieved 82% accuracy in crop recommendation predictions",
        "Successfully deployed in 5 farms for beta testing",
        "Reduced fertilizer usage by 30% while maintaining crop yields"
      ],
      detailedDescription: "AgriWe is a smart farming assistant designed to help farmers make data-driven decisions. The application connects to NPK (Nitrogen, Phosphorus, Potassium) sensors placed in the soil to gather real-time data on soil composition. Using historical weather data, current soil conditions, and crop databases, our predictive models suggest optimal crops for the season along with appropriate fertilizers and pesticides to maximize yield while minimizing resource usage. The interface was specifically designed to be accessible to users with limited technical expertise, featuring simple navigation and visual representations of recommendations."
    },
    {
      id: 5,
      title: "Anomaly Detection Surveillance System",
      shortDescription: "Real-time detection of suspicious activity using Python & Flask",
      fullDescription: "Real-time detection of suspicious activity using Python & Flask. Automatically reports with captured image to local police.",
      duration: "Jan 2024 - Mar 2024",
      company: "AMC College of Engineering",
      technologies: ["Flask", "MySQL", "Redis"],
      image: "/mock/undraw_real-time-collaboration_g4mc.svg",
      challenges: [
        "Processing video streams in real-time with limited computational resources",
        "Training the model to detect genuinely suspicious behavior with minimal false positives",
        "Creating secure communication channels for police reporting"
      ],
      achievements: [
        "Reduced false positive rate to below 5% through model optimization",
        "Implemented efficient frame processing that works on standard hardware",
        "Created an encrypted alert system compliant with local security protocols"
      ],
      detailedDescription: "The Anomaly Detection Surveillance System is designed to enhance security by automatically identifying suspicious activities in video feeds. Using computer vision and machine learning techniques, the system analyzes movement patterns, object recognition, and behavioral anomalies to flag potential security concerns. When a suspicious activity is detected, the system captures images of the incident, logs the event details, and sends an encrypted alert to designated security personnel or local police. The backend is built with Flask for API endpoints and uses Redis for caching frequently accessed data, while MySQL handles persistent storage of events and configuration."
    },
    {
      id: 6,
      title: "Navigation Guidance for the Visually Impaired",
      shortDescription: "TensorFlow-based navigation system providing audio cues",
      fullDescription: "TensorFlow-based navigation system providing audio cues. Targeted for embedded systems and IoT applications.",
      duration: "Jan 2025",
      company: "Stalight Technology",
      technologies: ["Python", "Flask", "TensorFlow"],
      image: "/mock/undraw_vibe-coding_mjme.svg",
      challenges: [
        "Optimizing neural networks to run efficiently on resource-constrained devices",
        "Creating reliable object detection in varied lighting and environmental conditions",
        "Designing intuitive audio cues that convey spatial information effectively"
      ],
      achievements: [
        "Reduced model size by 75% while maintaining 92% detection accuracy",
        "Created a comprehensive audio vocabulary for spatial navigation",
        "Successfully tested with visually impaired volunteers with positive feedback"
      ],
      detailedDescription: "This project aims to improve mobility and independence for visually impaired individuals through a wearable navigation system. Using a camera mounted on glasses or a cap, the system processes the visual environment through an optimized TensorFlow model, detecting objects, obstacles, paths, and potential hazards. This information is then converted into audio cues delivered through bone-conduction headphones, allowing users to perceive their surroundings without blocking their hearing. The audio cues use a combination of directional sounds and verbal descriptions to communicate spatial information clearly. The system is designed to work offline on embedded hardware, making it reliable in areas with poor connectivity."
    },
  ];

  const handleOpenDetails = (project: Project) => {
    console.log('Opening project details for:', project.title);
    setSelectedProject(project);
    setIsOpen(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-smooth');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.project-card-container').forEach((el, idx) => {
      (el as HTMLElement).style.transitionDelay = `${idx * 120}ms`;
      observer.observe(el);
    });
    return () => {
      document.querySelectorAll('.project-card-container').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
  <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-darkBg dark:to-darkCard relative overflow-hidden">
      {/* Modern floating background elements removed */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl">Key Projects</h2>
          <p className="text-portfolio-gray mt-4 text-lg max-w-2xl mx-auto">Showcasing innovative solutions and cutting-edge technology implementations</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card-container opacity-0 transition-opacity duration-700 ease-in-out"
            >
              <div className="project-card h-full group bg-white/90 dark:bg-darkCard/90 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-darkAccent/30 overflow-hidden transition-all duration-500 ease-in-out hover:shadow-2xl dark:hover:shadow-darkAccent hover:-translate-y-3 flex flex-col border border-portfolio-blue/10 dark:border-darkAccent/20">
                <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[3/2] overflow-hidden flex-shrink-0 bg-gradient-to-br from-portfolio-blue/5 to-portfolio-lightBlue/5 dark:from-darkAccent/10 dark:to-darkBg/10">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-contain p-8 transition-transform duration-700 ease-in-out group-hover:scale-110" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-portfolio-darkBlue/70 to-transparent dark:from-darkBg/80 flex items-end opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="p-3 sm:p-4 text-white dark:text-darkText">
                      <p className="text-xs sm:text-sm font-medium">{project.duration}</p>
                      <p className="text-xs opacity-80">{project.company}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 bg-white/80 dark:bg-darkCard/80 backdrop-blur-sm flex flex-col flex-grow">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-portfolio-darkBlue dark:text-darkAccent line-clamp-2">{project.title}</h3>
                  <p className="text-sm text-portfolio-gray dark:text-darkText/80 mb-4 line-clamp-3 flex-grow">{project.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={tech} className={`px-2 py-1 rounded-full text-xs hover:scale-105 transition-transform duration-200 dark:bg-darkAccent/10 dark:text-darkAccent dark:border-darkAccent/20
                        ${index === 0 ? 'bg-portfolio-blue/10 text-portfolio-blue border border-portfolio-blue/20' :
                          index === 1 ? 'bg-portfolio-lightBlue/10 text-portfolio-lightBlue border border-portfolio-lightBlue/20' :
                          'bg-portfolio-darkBlue/10 text-portfolio-darkBlue border border-portfolio-darkBlue/20'}
                      }`}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-portfolio-lightGray text-portfolio-gray px-2 py-1 rounded-full text-xs border border-portfolio-gray/20">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full mt-auto border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white dark:border-darkAccent dark:text-darkAccent dark:hover:bg-darkAccent dark:hover:text-darkText transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium py-2 px-4 rounded-xl group-hover:shadow-lg"
                    onClick={() => handleOpenDetails(project)}
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          {selectedProject && (
            <DialogContent className="sm:max-w-[90vw] lg:max-w-[900px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 mx-4 bg-white/95 dark:bg-darkCard/95 backdrop-blur-sm border border-portfolio-blue/20 dark:border-darkAccent/20 shadow-2xl dark:shadow-darkAccent/30 z-50 rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-portfolio-darkBlue dark:text-darkAccent pr-8 mb-2">{selectedProject.title}</DialogTitle>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-portfolio-blue dark:text-darkAccent">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedProject.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    <span>{selectedProject.company}</span>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="mt-4 space-y-4 sm:space-y-6">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-portfolio-blue/5 to-portfolio-lightBlue/5 dark:from-darkAccent/10 dark:to-darkBg/10 p-8">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-48 sm:h-64 lg:h-72 object-contain hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                </div>
                
                <div>
                  <h4 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2 dark:text-darkAccent">
                    <Code2 className="w-5 h-5 text-portfolio-blue dark:text-darkAccent" />
                    Project Overview
                  </h4>
                  <p className="text-portfolio-gray dark:text-darkText/80 leading-relaxed text-sm sm:text-base">{selectedProject.detailedDescription}</p>
                </div>
                
                {selectedProject.challenges && (
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-3 text-red-600 dark:text-red-400">Key Challenges</h4>
                    <ul className="space-y-2 text-portfolio-gray dark:text-darkText/80 text-sm sm:text-base">
                      {selectedProject.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2 transition-all hover:translate-x-1">
                          <span className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedProject.achievements && (
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-3 text-green-600 dark:text-green-400">Key Achievements</h4>
                    <ul className="space-y-2 text-portfolio-gray dark:text-darkText/80 text-sm sm:text-base">
                      {selectedProject.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2 transition-all hover:translate-x-1">
                          <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h4 className="text-base sm:text-lg font-semibold mb-3 dark:text-darkAccent">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={tech} className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 border dark:bg-darkAccent/10 dark:text-darkAccent dark:border-darkAccent/20
                        ${index % 3 === 0 ? 'bg-portfolio-blue/10 text-portfolio-blue border-portfolio-blue/20 hover:bg-portfolio-blue hover:text-white dark:hover:bg-darkAccent dark:hover:text-darkText' :
                          index % 3 === 1 ? 'bg-portfolio-lightBlue/10 text-portfolio-lightBlue border-portfolio-lightBlue/20 hover:bg-portfolio-lightBlue hover:text-white dark:hover:bg-darkAccent dark:hover:text-darkText' :
                          'bg-portfolio-darkBlue/10 text-portfolio-darkBlue border-portfolio-darkBlue/20 hover:bg-portfolio-darkBlue hover:text-white dark:hover:bg-darkAccent dark:hover:text-darkText'}
                      }`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-portfolio-blue/20 dark:border-darkAccent/20">
                  <Button 
                    className="flex items-center gap-2 bg-portfolio-blue dark:bg-darkAccent hover:bg-portfolio-darkBlue dark:hover:bg-darkCard transition-all duration-300 text-sm rounded-xl shadow-lg hover:shadow-xl dark:shadow-darkAccent dark:hover:shadow-darkCard"
                    onClick={() => window.open('https://github.com/Ritesh771', '_blank')}
                  >
                    <Github className="w-4 h-4" />
                    View GitHub Profile
                  </Button>
                  {selectedProject.links?.demo && (
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 border-portfolio-lightBlue text-portfolio-lightBlue hover:bg-portfolio-lightBlue hover:text-white dark:border-darkAccent dark:text-darkAccent dark:hover:bg-darkAccent dark:hover:text-darkText text-sm rounded-xl"
                      onClick={() => window.open(selectedProject.links!.demo, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Demo
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;
