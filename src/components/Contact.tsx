import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. I'll get back to you soon.",
      variant: "default",
    });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl">Get In Touch</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="animate-on-scroll opacity-0 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-portfolio-darkBlue">Contact Information</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-portfolio-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1 text-sm sm:text-base">Email</h4>
                    <a href="mailto:riteshnvisonex@gmail.com" className="text-gray-700 hover:text-portfolio-blue transition-colors text-sm sm:text-base break-all">
                      riteshnvisonex@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 text-portfolio-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1 text-sm sm:text-base">GitHub</h4>
                    <a 
                      href="https://github.com/Ritesh771"
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-700 hover:text-portfolio-blue transition-colors text-sm sm:text-base break-all"
                    >
                      github.com/Ritesh771
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-portfolio-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1 text-sm sm:text-base">LinkedIn</h4>
                    <a 
                      href="https://www.linkedin.com/in/ritesh-n-5113b328a/"
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-700 hover:text-portfolio-blue transition-colors text-sm sm:text-base break-all"
                    >
                      linkedin.com/Ritesh.N
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
              <h4 className="font-medium mb-3 text-base sm:text-lg text-portfolio-darkBlue">Preferred Location</h4>
              <p className="flex items-center text-gray-700 text-sm sm:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-portfolio-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Bengaluru, India
              </p>
            </div>
          </div>
          
          {/* Static CTA Card */}
          <div className="animate-on-scroll opacity-0">
            <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-lg p-8 sm:p-12 shadow-lg flex flex-col items-center justify-center text-center border border-blue-100">
              <div className="mb-6">
                <svg width="64" height="64" fill="none" viewBox="0 0 64 64" className="mx-auto mb-4">
                  <rect width="64" height="64" rx="16" fill="#3B82F6" fillOpacity="0.08"/>
                  <path d="M20 28c0-4.418 3.582-8 8-8h8c4.418 0 8 3.582 8 8v8c0 4.418-3.582 8-8 8h-8c-4.418 0-8-3.582-8-8v-8z" fill="#3B82F6"/>
                  <path d="M32 36a4 4 0 100-8 4 4 0 000 8z" fill="#1E3A8A"/>
                </svg>
                <h3 className="text-2xl sm:text-3xl font-bold text-portfolio-darkBlue mb-2">Let's Connect!</h3>
                <p className="text-gray-700 max-w-md mx-auto mb-4 text-base sm:text-lg">
                  I love meeting new people, collaborating on exciting projects, and exploring innovative ideas. Whether you want to discuss tech, share an opportunity, or just say hello—I'm always open to connect!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="mailto:riteshnvisonex@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-portfolio-blue text-white font-medium shadow hover:bg-portfolio-darkBlue transition-colors">
                  <Mail className="w-5 h-5" /> Email Me
                </a>
                <a href="https://github.com/Ritesh771" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-portfolio-blue text-portfolio-blue font-medium shadow hover:bg-portfolio-blue hover:text-white transition-colors">
                  <Github className="w-5 h-5" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/ritesh-n-5113b328a/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-blue-400 text-blue-700 font-medium shadow hover:bg-blue-600 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
              </div>
              <p className="mt-8 text-gray-500 text-sm">Or just drop me an email—I'll get back to you as soon as possible!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
