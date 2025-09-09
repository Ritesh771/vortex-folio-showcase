import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  // Typewriter effect states
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  // Words to cycle through
  const words = ['Ritesh N', 'Developer', 'AI Enthusiast', 'Innovator'];
  const typingSpeed = 150; // ms per character
  const deletingSpeed = 100; // ms per character when deleting
  const pauseTime = 2000; // ms to pause at end of word

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

  // Typewriter effect
  useEffect(() => {
    const currentWord = words[currentIndex];
    
    if (isDeleting) {
      // Deleting characters
      if (currentText.length > 0) {
        setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      // Typing characters
      if (currentText.length < currentWord.length) {
        setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, pause then start deleting
        setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    }
  }, [currentText, currentIndex, isDeleting, words]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
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
            <a href="#home" className="text-gradient-blue font-extrabold text-xl sm:text-2xl">
              {currentText}
              <span className={`inline-block w-0.5 h-6 sm:h-8 bg-gradient-to-b from-portfolio-blue to-portfolio-lightBlue ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
            </a>
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
            <div className="flex items-center">
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;