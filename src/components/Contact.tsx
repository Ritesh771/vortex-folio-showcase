import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Mail, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { SiGmail, SiWhatsapp, SiLinkedin, SiGithub } from "react-icons/si";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "✅ Message Sent!",
      description: "Thanks for reaching out. I'll reply soon!",
    });
  };

  return (
  <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-darkBg dark:via-darkCard dark:to-darkBg relative overflow-hidden">
      {/* Modern background elements */}
  <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-10 z-0"></div>
  {/* Floating bubble background elements removed */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portfolio-darkBlue dark:text-darkAccent mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-darkText/80 mt-3 max-w-2xl mx-auto text-lg">
            Connect with me for collaborations, opportunities, or just to say hi!
          </p>
          
          
        </div>

        {/* Modern Bento Grid with blue theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Email */}
          <Card 
            gradient="dark:from-darkAccent/10 dark:via-darkCard/5 dark:to-darkBg from-portfolio-blue/10 via-portfolio-lightBlue/5 to-white" 
            border="dark:border-darkAccent/30 border-portfolio-blue/30" 
            href="mailto:riturithesh66@gmail.com"
          >
            <IconBox color="dark:from-darkAccent dark:to-indigo-500 bg-gradient-to-r from-portfolio-blue to-portfolio-lightBlue shadow-lg shadow-portfolio-blue/25">
              <Mail className="text-white w-6 h-6 drop-shadow-sm" />
            </IconBox>
            <CardTitle>Email</CardTitle>
            <CardDesc>Perfect for detailed discussions</CardDesc>
            <CardButton color="dark:from-darkAccent dark:to-indigo-500 bg-gradient-to-r from-portfolio-blue to-portfolio-lightBlue hover:from-portfolio-lightBlue hover:to-portfolio-blue hover:shadow-lg hover:shadow-portfolio-blue/30">
              send an email
            </CardButton>
          </Card>

          {/* WhatsApp */}
          <Card 
            gradient="dark:from-green-500/10 dark:via-darkCard/5 dark:to-darkBg from-green-100/50 via-green-50/30 to-white" 
            border="dark:border-green-400/30 border-green-300/40" 
            href="https://wa.me/918660144040"
          >
            <IconBox color="dark:from-green-500 dark:to-green-600 bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/25">
              <SiWhatsapp className="text-white w-6 h-6 drop-shadow-sm" />
            </IconBox>
            <CardTitle>WhatsApp</CardTitle>
            <CardDesc>Quick messages</CardDesc>
            <CardButton color="dark:from-green-500 dark:to-green-600 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-500 hover:shadow-lg hover:shadow-green-500/30">
              chat with me
            </CardButton>
          </Card>

          {/* LinkedIn */}
          <Card 
            gradient="dark:from-blue-500/10 dark:via-darkCard/5 dark:to-darkBg from-blue-100/50 via-blue-50/30 to-white" 
            border="dark:border-blue-400/30 border-blue-400/40" 
            href="https://linkedin.com/in/ritesh-n-5113b328a"
          >
            <IconBox color="dark:from-blue-600 dark:to-blue-700 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-600/25">
              <SiLinkedin className="text-white w-6 h-6 drop-shadow-sm" />
            </IconBox>
            <CardTitle>LinkedIn</CardTitle>
            <CardDesc>Professional network</CardDesc>
            <CardButton color="dark:from-blue-600 dark:to-blue-700 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-600/30">
              Connect
            </CardButton>
          </Card>

          {/* GitHub */}
          <Card 
            gradient="dark:from-slate-500/10 dark:via-darkCard/5 dark:to-darkBg from-portfolio-darkBlue/10 via-gray-100/30 to-white" 
            border="dark:border-slate-400/30 border-portfolio-darkBlue/30" 
            href="https://github.com/Ritesh771"
          >
            <IconBox color="dark:from-slate-600 dark:to-gray-800 bg-gradient-to-r from-portfolio-darkBlue to-gray-800 shadow-lg shadow-portfolio-darkBlue/25">
              <Github className="text-white w-6 h-6 drop-shadow-sm" />
            </IconBox>
            <CardTitle>GitHub</CardTitle>
            <CardDesc>Explore my projects</CardDesc>
            <CardButton color="dark:from-slate-600 dark:to-gray-800 bg-gradient-to-r from-portfolio-darkBlue to-gray-800 hover:from-gray-800 hover:to-portfolio-darkBlue hover:shadow-lg hover:shadow-portfolio-darkBlue/30">
              Explore
            </CardButton>
          </Card>
        </div>
      </div>
    </section>
  );
};

/* Reusable Card Components */
const Card = ({ children, gradient, border, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group rounded-2xl p-6 bg-gradient-to-br ${gradient} border ${border} shadow-lg hover:shadow-2xl transform hover:scale-[1.05] transition-all duration-500 backdrop-blur-sm cursor-pointer block hover:-translate-y-2 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 dark:bg-darkCard dark:border-darkAccent/20 dark:hover:shadow-darkAccent`}
  >
    {children}
  </a>
);

const IconBox = ({ children, color }) => (
  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 shadow-lg hover:scale-110 transition-all duration-300 group-hover:rotate-3 group-hover:shadow-xl`}>
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-bold text-portfolio-darkBlue dark:text-darkAccent mb-2 group-hover:text-portfolio-blue dark:group-hover:text-darkAccent transition-colors duration-300">
    {children}
  </h3>
);

const CardDesc = ({ children }) => (
  <p className="text-gray-600 dark:text-darkText/80 mb-4 text-sm group-hover:text-gray-700 dark:group-hover:text-darkText transition-colors duration-300">
    {children}
  </p>
);

const CardButton = ({ children, color }) => (
  <div
    className={`inline-flex items-center px-4 py-2 rounded-xl text-white dark:text-darkText font-medium transition-all duration-300 ${color} cursor-pointer shadow-md hover:shadow-lg dark:hover:shadow-darkAccent transform group-hover:scale-105 group-hover:-translate-y-1`}
  >
    <span className="mr-2">{children}</span>
    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
  </div>
);

export default Contact;
