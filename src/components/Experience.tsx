import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Education from './Education';

interface TimelineItemProps {
  title: string;
  organization: string;
  period: string;
  description: string[];
  technologies?: string[];
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, organization, period, description, technologies, index }) => {
  return (
    <div className={`mb-6 sm:mb-8 animate-on-scroll opacity-0`} style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 mb-2 lg:mb-0 flex-shrink-0">
          <span className="text-sm font-medium text-portfolio-blue bg-portfolio-blue/10 px-3 py-1 rounded-full inline-block border border-portfolio-blue/20 dark:text-darkAccent dark:bg-darkAccent/10 dark:border-darkAccent/20">{period}</span>
        </div>
        <div className="lg:w-2/3 lg:pl-6 border-l-2 border-portfolio-lightBlue relative mt-2 lg:mt-0">
          {/* Timeline dot */}
          <div className="absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-gradient-to-r from-portfolio-blue to-portfolio-lightBlue dark:from-darkAccent dark:to-indigo-400"></div>
          
          <div className="card-modern p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h4 className="text-lg sm:text-xl font-semibold mb-1 text-portfolio-darkBlue dark:text-darkText">{title}</h4>
            <p className="text-portfolio-blue dark:text-darkAccent font-medium mb-3 text-sm sm:text-base">{organization}</p>
            <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 mb-3 text-gray-600 dark:text-darkText/80 text-sm sm:text-base">
              {description.map((item, i) => (
                <li key={i} className="transition-all hover:translate-x-1 leading-relaxed">{item}</li>
              ))}
            </ul>
            {technologies && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                {technologies.map((tech, techIndex) => (
                  <span key={tech} className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm transition-all hover:scale-105 duration-200 border ${
                    techIndex % 4 === 0 ? 'bg-portfolio-blue/10 text-portfolio-blue border-portfolio-blue/20 hover:bg-portfolio-blue hover:text-white dark:bg-darkAccent/10 dark:text-darkAccent dark:border-darkAccent/20 dark:hover:bg-darkAccent dark:hover:text-white' :
                    techIndex % 4 === 1 ? 'bg-portfolio-lightBlue/10 text-portfolio-lightBlue border-portfolio-lightBlue/20 hover:bg-portfolio-lightBlue hover:text-white dark:bg-indigo-400/10 dark:text-indigo-400 dark:border-indigo-400/20 dark:hover:bg-indigo-400 dark:hover:text-white' :
                    techIndex % 4 === 2 ? 'bg-portfolio-darkBlue/10 text-portfolio-darkBlue border-portfolio-darkBlue/20 hover:bg-portfolio-darkBlue hover:text-white dark:bg-slate-500/10 dark:text-slate-500 dark:border-slate-500/20 dark:hover:bg-slate-500 dark:hover:text-white' :
                    'bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500 hover:text-white dark:bg-sky-500/10 dark:text-sky-500 dark:border-sky-500/20 dark:hover:bg-sky-500 dark:hover:text-white'
                  }`}>
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const workExperience = [
    {
      id: 1,
      title: "Technical Intern & Team Lead",
      organization: "Castle Rockin",
      period: "Feb 2025 - Present",
      description: [
        "Promoted to Team Lead within 2 months of joining",
        "Led end-to-end development for a placement guidance platform (under NDA)",
        "Collaborated with cross-functional teams using Git, React, and Django stack",
        "Worked on PostgreSQL-based dynamic dashboards and secure backend services"
      ],
      technologies: ["React.js", "Django", "PostgreSQL", "Git"]
    },
    {
      id: 2,
      title: "Founder & CEO",
      organization: "Stalight Technology Pvt Ltd",
      period: "Feb 2025 - Present",
      description: [
        "Bootstrapped an AI-based education tech startup",
        "Leading product design and development of an AI-enabled Campus Management System",
        "Developed multiple MVPs including real-time attendance systems, navigation aids for the visually impaired, and women's safety apps",
      ],
      technologies: ["React.js", "Django", "PostgreSQL", "AWS", "Android"]
    },
    {
      id: 3,
      title: "Python Development Intern",
      organization: "Codetech IT Solutions",
      period: "Jan 2023 - Jan 2024",
      description: [
        "Built and deployed ML models using TensorFlow",
        "Designed and implemented smart attendance tracking with performance prediction",
        "Conducted data analysis for business insights",
        "Improved data processing efficiency across student datasets"
      ],
      technologies: ["Python", "TensorFlow", "Data Analysis"]
    },
    {
      id: 4,
      title: "Bootcamp Trainee (Multiple Tracks)",
      organization: "LetsUpgrade",
      period: "Feb 2023 – Jun 2023",
      description: [
        "Completed intensive bootcamps in Figma (UI/UX), Python, React, SQL, and Placement Preparation.",
        "Mastered UX/UI design principles and Figma tools for creating interactive prototypes and design systems.",
        "Prepared for technical interviews with data structures, algorithms, and system design principles.",
        "Comprehensive Python programming course covering fundamentals to advanced concepts like OOP and data analysis.",
        "Built complex React applications with hooks, context API, and modern state management techniques.",
        "Mastered database design, complex queries, and performance optimization for relational databases."
      ],
      technologies: ["Figma", "Python", "React.js", "SQL", "Data Structures", "Algorithms", "UI/UX"]
    },
  ];

  return (
  <section id="experience" className="py-12 sm:py-16 lg:py-20 relative scroll-mt-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-darkBg dark:via-darkCard dark:to-darkBg overflow-hidden">
  <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-10 z-0"></div>
  {/* Floating bubble background elements removed */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl animate-on-scroll dark:text-darkAccent">Experience & Education</h2>
          <p className="text-gray-600 dark:text-darkText/80 mt-4 text-lg max-w-2xl mx-auto">My professional journey and educational background</p>
          
          {/* Add work illustration */}
          <div className="mt-8 flex justify-center">
            <img 
              src="/mock/undraw_project-completed_fwjq.svg" 
              alt="Experience" 
              className="w-64 h-48 object-contain hover:scale-105 transition-transform duration-300 dark:brightness-90"
            />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="work" className="w-full">
            <div className="flex justify-center mb-8 sm:mb-10">
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/90 dark:bg-darkCard/90 backdrop-blur-sm animate-on-scroll rounded-2xl p-1 border border-portfolio-blue/20 dark:border-darkAccent/20 shadow-lg dark:shadow-darkAccent/30">
                <TabsTrigger 
                  value="work" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-portfolio-blue data-[state=active]:to-portfolio-lightBlue data-[state=active]:text-white data-[state=active]:shadow-lg text-portfolio-darkBlue dark:text-darkAccent font-medium text-sm sm:text-base rounded-xl transition-all duration-300 hover:bg-portfolio-blue/5 dark:hover:bg-darkAccent/10"
                >
                  Work Experience
                </TabsTrigger>
                <TabsTrigger 
                  value="education" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-portfolio-lightBlue data-[state=active]:to-portfolio-darkBlue data-[state=active]:text-white data-[state=active]:shadow-lg text-portfolio-darkBlue dark:text-darkAccent font-medium text-sm sm:text-base rounded-xl transition-all duration-300 hover:bg-portfolio-lightBlue/5 dark:hover:bg-darkAccent/10"
                >
                  Education
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="work" className="mt-2">
              <div className="space-y-4 sm:space-y-6">
                {workExperience.map((item, index) => (
                  <TimelineItem
                    key={item.id}
                    title={item.title}
                    organization={item.organization}
                    period={item.period}
                    description={item.description}
                    technologies={item.technologies}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="mt-2">
              <Education />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Experience;
