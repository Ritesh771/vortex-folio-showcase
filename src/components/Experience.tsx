
import React, { useState } from 'react';
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
    <div className={`mb-8 animate-on-scroll opacity-0`} style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-2 md:mb-0">
          <span className="text-sm font-medium text-portfolio-blue">{period}</span>
        </div>
        <div className="md:w-2/3 md:pl-6 border-l-2 border-portfolio-lightBlue relative">
          {/* Timeline dot */}
          <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-portfolio-blue"></div>
          
          <h4 className="text-xl font-semibold mb-1">{title}</h4>
          <p className="text-portfolio-blue font-medium mb-3">{organization}</p>
          <ul className="list-disc list-inside space-y-2 mb-3 text-gray-700">
            {description.map((item, i) => (
              <li key={i} className="transition-all hover:translate-x-1">{item}</li>
            ))}
          </ul>
          {technologies && (
            <div className="flex flex-wrap gap-2 mt-3">
              {technologies.map((tech) => (
                <span key={tech} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-portfolio-lightBlue hover:text-white transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [activeTab, setActiveTab] = useState("work");
  
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
    <section id="experience" className="py-20 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title mb-12 animate-on-scroll">Experience & Education</h2>
        
        <Tabs defaultValue="work" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-10 bg-white/80 backdrop-blur-sm animate-on-scroll">
            <TabsTrigger value="work" className="data-[state=active]:bg-portfolio-blue data-[state=active]:text-white">
              Work Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-portfolio-blue data-[state=active]:text-white">
              Education
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="work" className="animate-on-scroll opacity-0">
            <div className="space-y-6">
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
          
          <TabsContent value="education">
            <div className="animate-on-scroll opacity-0">
              <Education />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Experience;
