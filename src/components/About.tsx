
import React, { useEffect, useRef } from 'react';

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
        <span className="font-medium text-gray-700 text-sm sm:text-base">{skill}</span>
        <span className="text-xs sm:text-sm text-gray-500">{percentage}%</span>
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

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl">About Me</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Column - Professional Summary & Skills */}
          <div className="animate-on-scroll opacity-0 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-portfolio-darkBlue">Professional Summary</h3>
              <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
                I bring hands-on experience in backend development using Django and REST APIs, along with a keen eye for building responsive and engaging frontends using React.js and Tailwind CSS. Passionate about building scalable tech solutions with real-world impact, especially in the education and security sectors.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-portfolio-darkBlue">Technical Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2 text-portfolio-blue text-sm sm:text-base">Languages & Frameworks</h4>
                    <p className="text-gray-700 text-xs sm:text-sm">Python, JavaScript, TypeScript, HTML5, CSS3, Django, Django REST Framework, Flask, TensorFlow</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-portfolio-blue text-sm sm:text-base">Databases & DevOps</h4>
                    <p className="text-gray-700 text-xs sm:text-sm">PostgreSQL, MySQL, Redis, Git, Postman</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2 text-portfolio-blue text-sm sm:text-base">Frontend Technologies</h4>
                    <p className="text-gray-700 text-xs sm:text-sm">React.js, Redux Toolkit, Tailwind CSS</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-portfolio-blue text-sm sm:text-base">Tools & Platforms</h4>
                    <p className="text-gray-700 text-xs sm:text-sm">Visual Studio Code, GitHub, AWS (basic), Android Studio</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2 text-portfolio-blue text-sm sm:text-base">Soft Skills</h4>
                <p className="text-gray-700 text-xs sm:text-sm">Team Leadership, Agile Collaboration, Technical Mentoring</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Proficiency & Preferences */}
          <div className="animate-on-scroll opacity-0 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-portfolio-darkBlue">Proficiency Level</h3>
              <div className="space-y-3 sm:space-y-4">
                {skills.map((skill) => (
                  <SkillBar
                    key={skill.id}
                    skill={skill.name}
                    percentage={skill.percentage}
                    delay={skill.delay}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-portfolio-darkBlue">Preferred Job Roles</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Software Engineer", "Backend Developer", "Frontend Developer", "DevOps Engineer"].map((role) => (
                  <span key={role} className="bg-portfolio-lightBlue bg-opacity-10 text-portfolio-blue px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap">
                    {role}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-portfolio-darkBlue">Location Preference</h3>
              <p className="flex items-center text-gray-700 text-sm sm:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-portfolio-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Bengaluru, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
