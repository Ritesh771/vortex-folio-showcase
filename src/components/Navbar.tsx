import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];


  const scrollToSection = (href) => {
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        setIsOpen(false);
      } else {
        console.log('Element not found:', href);
      }
    }, 100);
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className="fixed top-2 left-0 right-0 z-50 flex justify-center px-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.6, velocity: 2 }}
      >
        <motion.div
          ref={navbarRef}
          layout
          initial={false}
          animate={{
            width: scrolled ? "85%" : "auto",
            borderRadius: "9999px",
            paddingLeft: scrolled ? "2rem" : "1rem",
            paddingRight: scrolled ? "2rem" : "1rem",
            paddingTop: scrolled ? "0.75rem" : "0.5rem",
            paddingBottom: scrolled ? "0.75rem" : "0.5rem",
          }}
          transition={{
            layout: { type: "spring", stiffness: 120, damping: 18, mass: 0.6, restDelta: 0.001 },
            default: { duration: 0.5, ease: [0.45, 0, 0.55, 1] },
          }}
          className="flex flex-row items-center justify-between shadow-lg backdrop-blur-md border border-border/50 glass-card bg-background/70 overflow-hidden relative z-50"
        >
          {/* Logo */}
          <motion.div
            className="text-xl font-bold mr-6 whitespace-nowrap min-w-[130px]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
          >
            <span className="text-gradient-blue font-extrabold">Ritesh N</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-foreground transition-smooth relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, type: "spring", stiffness: 180, damping: 20 }}
                whileHover={{ y: -2, scale: 1.05 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Hamburger */}
          <div className="flex flex-row items-center space-x-2 md:hidden ml-auto relative">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          // Backdrop
          <motion.div
            className="fixed inset-0 z-40 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)} // click outside closes
          >
            {/* Mobile Dropdown */}
            <motion.div
              className="fixed top-[90px] left-1/2 -translate-x-1/2 w-52 bg-background/70 dark:bg-background/50 backdrop-blur-md border border-border/50 shadow-lg flex flex-col items-center space-y-2 p-4 z-50 rounded-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href);
                    setIsOpen(false);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-smooth px-4 py-2 rounded-lg w-full text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;