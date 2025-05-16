
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
              href="https://linkedin.com/in/ritesh-n" 
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
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Ritesh N. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with React, Tailwind CSS, and Shadcn UI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
