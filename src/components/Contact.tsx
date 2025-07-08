import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// WhatsApp SVG Icon
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    {...props}
  >
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <path
      d="M23.47 8.53A8.94 8.94 0 0 0 16 6a9 9 0 0 0-7.8 13.5l-1.1 4.02a1 1 0 0 0 1.22 1.22l4.02-1.1A9 9 0 1 0 23.47 8.53Zm-7.47 13.2a7.2 7.2 0 0 1-3.67-1l-.26-.15-2.18.6.58-2.13-.17-.27A7.2 7.2 0 1 1 16 21.73Zm3.94-4.13c-.22-.11-1.3-.64-1.5-.71-.2-.07-.34-.11-.48.11-.14.22-.55.71-.67.85-.12.14-.25.16-.47.05-.22-.11-.92-.34-1.75-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.14-.22.22-.36.07-.14.04-.27-.02-.39-.07-.11-.48-1.16-.66-1.59-.17-.41-.34-.35-.48-.36-.12-.01-.27-.01-.42-.01-.15 0-.39.06-.6.27-.21.21-.8.78-.8 1.9 0 1.12.82 2.2.94 2.35.12.15 1.61 2.46 3.91 3.35.55.19.98.3 1.31.38.55.13 1.05.11 1.45.07.44-.05 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.05-.09-.2-.14-.42-.25Z"
      fill="#fff"
    />
  </svg>
);

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
          <div className="animate-on-scroll opacity-0 space-y-6 sm:space-y-8 order-2 lg:order-1">
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
                  <span className="mr-4 mt-1 flex-shrink-0"><WhatsAppIcon width={24} height={24} /></span>
                  <div>
                    <h4 className="font-medium mb-1 text-sm sm:text-base">WhatsApp</h4>
                    <a
                      href="https://wa.me/918660144040" // <-- Replace with your WhatsApp number
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-green-500 transition-colors text-sm sm:text-base break-all"
                    >
                      +91 8660144040
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
            
            {/* Review Button (Blue Gradient) */}
            <div className="bg-gradient-to-r from-portfolio-blue via-portfolio-lightBlue to-blue-200 rounded-lg p-4 sm:p-6 md:p-8 shadow-sm flex flex-col items-center justify-center w-full">
              <h4 className="font-medium mb-3 text-sm sm:text-base md:text-lg text-white text-center w-full">Share Your Feedback</h4>
              <a
                href="https://forms.gle/PmXwRUbqmtSEjftA7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 md:px-7 md:py-3 rounded-md bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:from-blue-700 hover:via-blue-500 hover:to-blue-300 transition-colors text-base sm:text-lg border border-blue-800 w-full max-w-xs sm:max-w-md justify-center"
                style={{ boxShadow: '0 4px 24px 0 rgba(30,58,138,0.10)' }}
              >
                <span role="img" aria-label="star">⭐</span> Leave a Review
              </a>
              <p className="mt-3 text-blue-50 text-xs sm:text-sm text-center w-full max-w-xs sm:max-w-sm">Your feedback helps me improve and showcase my work better. Thank you!</p>
            </div>
          </div>
          
          {/* Static CTA Card */}
          <div className="animate-on-scroll opacity-0 order-1 lg:order-2">
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4 w-full max-w-xs sm:max-w-none mx-auto">
                <a href="mailto:riteshnvisonex@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-portfolio-blue text-white font-medium shadow hover:bg-portfolio-darkBlue transition-colors w-full sm:w-auto justify-center h-12">
                  <Mail className="w-5 h-5" /> Email
                </a>
              
                <a href="https://www.linkedin.com/in/ritesh-n-5113b328a/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-blue-400 text-blue-700 font-medium shadow hover:bg-blue-600 hover:text-white transition-colors w-full sm:w-auto justify-center h-12">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
                <a
                  href="https://wa.me/918660144040"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-green-400 text-green-700 font-medium shadow hover:bg-green-500 hover:text-white transition-colors w-full sm:w-auto justify-center h-12"
                >
                  <WhatsAppIcon width={20} height={20} /> WhatsApp
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
