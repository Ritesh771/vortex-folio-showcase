
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-portfolio-darkBlue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Ritesh N</h3>
            <p className="text-gray-300">Full-Stack Developer | AI Innovator | Startup Founder</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/Ritesh771" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className="hover:text-portfolio-lightBlue transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/ritesh-n-5113b328a/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="hover:text-portfolio-lightBlue transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:riteshnvisonex@gmail.com" 
              aria-label="Email"
              className="hover:text-portfolio-lightBlue transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p className="text-gray-400">&copy; {currentYear} Ritesh N. All rights reserved.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap justify-center space-x-4 text-sm text-gray-400">
              <li><a href="#home" onClick={(e) => handleNavLinkClick(e, '#home')} className="hover:text-portfolio-lightBlue transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => handleNavLinkClick(e, '#about')} className="hover:text-portfolio-lightBlue transition-colors">About</a></li>
              <li><a href="#experience" onClick={(e) => handleNavLinkClick(e, '#experience')} className="hover:text-portfolio-lightBlue transition-colors">Experience</a></li>
              <li><a href="#projects" onClick={(e) => handleNavLinkClick(e, '#projects')} className="hover:text-portfolio-lightBlue transition-colors">Projects</a></li>
              <li><a href="#certificates" onClick={(e) => handleNavLinkClick(e, '#certificates')} className="hover:text-portfolio-lightBlue transition-colors">Certificates</a></li>
              <li><a href="#contact" onClick={(e) => handleNavLinkClick(e, '#contact')} className="hover:text-portfolio-lightBlue transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        {/* Removed the "Built with React, Tailwind CSS, and Shadcn UI" line */}
      </div>
    </footer>
  );
};

export default Footer;
