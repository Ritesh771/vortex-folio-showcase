
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
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-12">Get In Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="animate-on-scroll opacity-0">
            <h3 className="text-2xl font-semibold mb-6 text-portfolio-darkBlue">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-portfolio-blue mr-4 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a href="mailto:riteshnvisonex@gmail.com" className="text-gray-700 hover:text-portfolio-blue transition-colors">
                    riteshnvisonex@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Github className="w-6 h-6 text-portfolio-blue mr-4 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">GitHub</h4>
                  <a 
                    href="https://github.com/Ritesh771" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-700 hover:text-portfolio-blue transition-colors"
                  >
                    github.com/Ritesh771
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Linkedin className="w-6 h-6 text-portfolio-blue mr-4 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">LinkedIn</h4>
                  <a 
                    href="https://linkedin.com/in/ritesh-n" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-700 hover:text-portfolio-blue transition-colors"
                  >
                    linkedin.com/in/ritesh-n
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="font-medium mb-3">Preferred Location</h4>
              <p className="text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-portfolio-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Bengaluru, India
              </p>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0">
            <h3 className="text-2xl font-semibold mb-6 text-portfolio-darkBlue">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                <Input id="name" placeholder="Your name" required />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="Your email" required />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
                <Input id="subject" placeholder="Subject" required />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                <Textarea id="message" placeholder="Your message" className="min-h-[120px]" required />
              </div>
              
              <Button 
                type="submit" 
                className="glowing-btn w-full mt-2 bg-portfolio-blue hover:bg-portfolio-darkBlue transition-colors"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
