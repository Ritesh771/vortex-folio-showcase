import React, { useEffect, useRef } from 'react';
import { BentoGrid, BentoGridItem } from './BentoGrid';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  skill: string;
  percentage: number;
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, percentage, delay }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && progressRef.current) {
            setTimeout(() => {
              if (progressRef.current) {
                progressRef.current.style.width = `${percentage}%`;
              }
            }, delay);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (progressRef.current) {
      observer.observe(progressRef.current);
    }
    
    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, [percentage, delay]);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium text-gray-700">{skill}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div
          ref={progressRef}
          className="progress-bar-fill"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
};

const About = () => {
  const skills = [
    { id: 1, name: "Backend Development", percentage: 75, delay: 400 },
    { id: 2, name: "Frontend Development", percentage: 65, delay: 600 },
    { id: 3, name: "DevOps & Deployment", percentage: 60, delay: 800 },
    { id: 4, name: "Software Engineering", percentage: 50, delay: 200 }
  ];

  const animateOnScroll = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(animateOnScroll, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  const techStacks = [
    {
      title: "Languages & Frameworks",
      items: ["Python", "JavaScript", "TypeScript", "HTML5", "CSS3", "Django", "Django REST Framework", "Flask", "TensorFlow"]
    },
    {
      title: "Frontend Technologies", 
      items: ["React.js", "Redux Toolkit", "Tailwind CSS"]
    },
    {
      title: "Databases & DevOps",
      items: ["PostgreSQL", "MySQL", "Redis", "Git", "Postman"]
    },
    {
      title: "Tools & Platforms",
      items: ["Visual Studio Code", "GitHub", "AWS (basic)", "Android Studio"]
    }
  ];

  const aboutItems = [
    {
      title: "Professional Summary",
      content: "I bring hands-on experience in backend development using Django and REST APIs, along with a keen eye for building responsive and engaging frontends using React.js and Tailwind CSS. Passionate about building scalable tech solutions with real-world impact, especially in the education and security sectors.",
      className: "md:col-span-2"
    },
    {
      title: "Soft Skills",
      content: ["Team Leadership", "Agile Collaboration", "Technical Mentoring"],
      className: ""
    },
    {
      title: "Technical Skills",
      content: techStacks,
      className: "md:col-span-2 md:row-span-2"
    },
    {
      title: "Proficiency Level",
      content: skills,
      className: "md:row-span-2"
    },
    {
      title: "Preferred Job Roles",
      content: ["Software Engineer", "Backend Developer", "Frontend Developer", "DevOps Engineer"],
      className: "md:col-span-2"
    },
    {
      title: "Location Preference",
      content: "Bengaluru, India",
      className: ""
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-12 text-center">About Me</h2>
        
        <BentoGrid className="max-w-6xl mx-auto">
          {aboutItems.map((item, index) => (
            <BentoGridItem
              key={index}
              title={item.title}
              className={cn(
                "bg-white border border-gray-200 hover:border-portfolio-blue/30 animate-on-scroll opacity-0",
                item.className
              )}
            >
              {item.title === "Professional Summary" && (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.content as string}
                </p>
              )}
              
              {item.title === "Soft Skills" && (
                <div className="flex flex-wrap gap-2">
                  {(item.content as string[]).map((skill) => (
                    <span key={skill} className="bg-portfolio-lightBlue bg-opacity-10 text-portfolio-blue px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              
              {item.title === "Technical Skills" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(item.content as typeof techStacks).map((stack) => (
                    <div key={stack.title}>
                      <h4 className="font-medium mb-2 text-portfolio-blue text-sm">{stack.title}</h4>
                      <div className="flex flex-wrap gap-1">
                        {stack.items.map((tech) => (
                          <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {item.title === "Proficiency Level" && (
                <div className="space-y-3">
                  {(item.content as typeof skills).map((skill) => (
                    <SkillBar
                      key={skill.id}
                      skill={skill.name}
                      percentage={skill.percentage}
                      delay={skill.delay}
                    />
                  ))}
                </div>
              )}
              
              {item.title === "Preferred Job Roles" && (
                <div className="flex flex-wrap gap-2">
                  {(item.content as string[]).map((role) => (
                    <span key={role} className="bg-portfolio-lightBlue bg-opacity-10 text-portfolio-blue px-3 py-1 rounded-full text-sm">
                      {role}
                    </span>
                  ))}
                </div>
              )}
              
              {item.title === "Location Preference" && (
                <p className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-portfolio-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.content as string}
                </p>
              )}
            </BentoGridItem>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default About;
