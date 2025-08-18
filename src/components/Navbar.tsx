import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setIsMenuOpen(false);
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-white/95 dark:bg-darkBg/95 backdrop-blur-md shadow-lg dark:shadow-darkAccent py-2'
          : 'bg-transparent dark:bg-darkBg/80 py-4'}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#home" className="text-portfolio-blue dark:text-darkAccent font-bold text-xl sm:text-2xl">Ritesh N</a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className="text-gray-700 hover:text-portfolio-blue dark:text-darkText/80 dark:hover:text-darkAccent font-medium transition-colors text-sm xl:text-base"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <a href="https://github.com/Ritesh771" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5 text-gray-700 hover:text-portfolio-blue dark:text-darkText/80 dark:hover:text-darkAccent transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/ritesh-n-5113b328a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-gray-700 hover:text-portfolio-blue dark:text-darkText/80 dark:hover:text-darkAccent transition-colors" />
              </a>
              <a href="mailto:riteshnvisonex@gmail.com" aria-label="Email">
                <Mail className="w-5 h-5 text-gray-700 hover:text-portfolio-blue dark:text-darkText/80 dark:hover:text-darkAccent transition-colors" />
              </a>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme} 
                aria-label="Toggle theme"
                className="text-gray-700 hover:text-portfolio-blue dark:text-darkText/80 dark:hover:text-darkAccent transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
              className="text-gray-700 hover:text-portfolio-blue dark:text-darkText/80 dark:hover:text-darkAccent transition-colors mr-2"
            >
              {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </Button>
            <button 
              className="text-gray-700 dark:text-darkText/80 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-darkBg/95 backdrop-blur-md border-t border-gray-200 dark:border-darkAccent/20 py-4 px-4 shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-portfolio-blue dark:text-darkText/80 dark:hover:text-darkAccent font-medium transition-colors py-2 text-base"
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-darkAccent/20">
                <a href="https://github.com/Ritesh771" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="w-6 h-6 text-gray-700 hover:text-portfolio-blue dark:text-darkText/80 dark:hover:text-darkAccent transition-colors" />
                </a>
                <a href="https://www.linkedin.com/in/ritesh-n-5113b328a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="w-6 h-6 text-gray-700 hover:text-portfolio-blue dark:text-darkText/80 dark:hover:text-darkAccent transition-colors" />
                </a>
                <a href="mailto:riteshnvisonex@gmail.com" aria-label="Email">
                  <Mail className="w-6 h-6 text-gray-700 hover:text-portfolio-blue dark:text-darkText/80 dark:hover:text-darkAccent transition-colors" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;