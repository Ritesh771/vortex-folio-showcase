
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
          <span className="text-sm font-medium text-portfolio-blue bg-portfolio-lightBlue bg-opacity-10 px-3 py-1 rounded-full inline-block">{period}</span>
        </div>
        <div className="lg:w-2/3 lg:pl-6 border-l-2 border-portfolio-lightBlue relative mt-2 lg:mt-0">
          {/* Timeline dot */}
          <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-portfolio-blue"></div>
          
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-lg sm:text-xl font-semibold mb-1 text-portfolio-darkBlue">{title}</h4>
            <p className="text-portfolio-blue font-medium mb-3 text-sm sm:text-base">{organization}</p>
            <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 mb-3 text-gray-700 text-sm sm:text-base">
              {description.map((item, i) => (
                <li key={i} className="transition-all hover:translate-x-1 leading-relaxed">{item}</li>
              ))}
            </ul>
            {technologies && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                {technologies.map((tech) => (
                  <span key={tech} className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-portfolio-lightBlue hover:text-white transition-colors">
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
    }
  ];

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 relative scroll-mt-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl animate-on-scroll">Experience & Education</h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="work" className="w-full">
            <div className="flex justify-center mb-8 sm:mb-10">
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/80 backdrop-blur-sm animate-on-scroll">
                <TabsTrigger value="work" className="data-[state=active]:bg-portfolio-blue data-[state=active]:text-white text-sm sm:text-base">
                  Work Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-portfolio-blue data-[state=active]:text-white text-sm sm:text-base">
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
