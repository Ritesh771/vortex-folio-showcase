
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
        <span className="font-medium text-portfolio-darkBlue text-sm sm:text-base">{skill}</span>
        <span className="text-xs sm:text-sm text-portfolio-gray">{percentage}%</span>
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
    <section id="about" className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0"></div>
  {/* Floating bubble background elements removed */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl">About Me</h2>
          <p className="text-portfolio-gray mt-3 text-base sm:text-lg max-w-2xl mx-auto">Passionate developer with a drive for innovation and creating impactful solutions</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {/* Left Column - Professional Summary */}
          <div className="lg:col-span-2 animate-on-scroll opacity-0">
            <div className="card-modern p-4 sm:p-6 h-full">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-portfolio-darkBlue">Professional Summary</h3>
              <p className="text-portfolio-gray mb-4 text-sm sm:text-base leading-relaxed">
                I bring hands-on experience in backend development using Django and REST APIs, along with a keen eye for building responsive and engaging frontends using React.js and Tailwind CSS. Passionate about building scalable tech solutions with real-world impact, especially in the education and security sectors.
              </p>
            </div>
          </div>

          {/* Right Column - Developer illustration */}
          <div className="animate-on-scroll opacity-0">
            <div className="card-modern p-4 sm:p-6 text-center h-full flex flex-col justify-center">
              <img 
                src="/mock/undraw_developer-avatar_f6ac.svg" 
                alt="Developer Avatar" 
                className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-3 object-contain hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-lg font-semibold text-portfolio-darkBlue">Creative Problem Solver</h3>
              <p className="text-portfolio-gray mt-2 text-sm">Building the future, one line of code at a time</p>
            </div>
          </div>
          
          {/* Technical Skills - Full Width */}
          <div className="lg:col-span-3 animate-on-scroll opacity-0">
            <div className="card-modern p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-portfolio-darkBlue">Technical Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <h4 className="font-medium mb-2 text-portfolio-blue text-sm sm:text-base">Languages & Frameworks</h4>
                  <p className="text-portfolio-gray text-xs sm:text-sm">Python, JavaScript, TypeScript, HTML5, CSS3, Django, Django REST Framework, Flask, TensorFlow</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-portfolio-blue text-sm sm:text-base">Frontend Technologies</h4>
                  <p className="text-portfolio-gray text-xs sm:text-sm">React.js, Redux Toolkit, Tailwind CSS</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-portfolio-blue text-sm sm:text-base">Databases & DevOps</h4>
                  <p className="text-portfolio-gray text-xs sm:text-sm">PostgreSQL, MySQL, Redis, Git, Postman</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-portfolio-blue text-sm sm:text-base">Tools & Platforms</h4>
                  <p className="text-portfolio-gray text-xs sm:text-sm">Visual Studio Code, GitHub, AWS (basic), Android Studio</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium mb-2 text-portfolio-darkBlue text-sm sm:text-base">Soft Skills</h4>
                <p className="text-portfolio-gray text-xs sm:text-sm">Team Leadership, Agile Collaboration, Technical Mentoring</p>
              </div>
            </div>
          </div>

          {/* Skills Proficiency */}
          <div className="lg:col-span-2 animate-on-scroll opacity-0">
            <div className="card-modern p-4 sm:p-6 h-full">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-portfolio-darkBlue">Proficiency Level</h3>
              <div className="space-y-3">
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
          </div>
          
          {/* Job Roles & Location */}
          <div className="animate-on-scroll opacity-0">
            <div className="card-modern p-4 sm:p-6 h-full">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-portfolio-darkBlue">Preferred Roles</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Software Engineer", "Backend Developer", "Frontend Developer", "DevOps Engineer"].map((role, index) => (
                  <span key={role} className={`px-2 py-1 rounded-full text-xs whitespace-nowrap transition-all hover:scale-105 duration-200 ${
                    index % 4 === 0 ? 'bg-portfolio-blue/10 text-portfolio-blue border border-portfolio-blue/20' :
                    index % 4 === 1 ? 'bg-portfolio-lightBlue/10 text-portfolio-lightBlue border border-portfolio-lightBlue/20' :
                    index % 4 === 2 ? 'bg-portfolio-darkBlue/10 text-portfolio-darkBlue border border-portfolio-darkBlue/20' :
                    'bg-portfolio-blue/10 text-portfolio-blue border border-portfolio-blue/20'
                  }`}>
                    {role}
                  </span>
                ))}
              </div>
              
              <h4 className="text-base font-semibold mb-2 text-portfolio-darkBlue">Location</h4>
              <p className="flex items-center text-portfolio-gray text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-portfolio-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
