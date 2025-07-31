import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// WhatsApp SVG Icon
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 32 32" fill="none" width={props.width || 24} height={props.height || 24} {...props}>
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <path d="M23.47 8.53A8.94 8.94 0 0 0 16 6a9 9 0 0 0-7.8 13.5l-1.1 4.02a1 1 0 0 0 1.22 1.22l4.02-1.1A9 9 0 1 0 23.47 8.53Zm-7.47 13.2a7.2 7.2 0 0 1-3.67-1l-.26-.15-2.18.6.58-2.13-.17-.27A7.2 7.2 0 1 1 16 21.73Z" fill="#fff" />
  </svg>
);

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
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto text-lg">
            Connect with me for collaborations, opportunities, or just to say hi!
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Email */}
          <Card gradient="from-blue-50 to-blue-100" border="border-blue-200" href="mailto:riteshnvisonex@gmail.com">
            <IconBox color="bg-blue-500"><Mail className="text-white w-6 h-6" /></IconBox>
            <CardTitle>Email</CardTitle>
            <CardDesc>Perfect for detailed discussions</CardDesc>
            <CardButton color="bg-blue-500 hover:bg-blue-600">send an email</CardButton>
          </Card>

          {/* WhatsApp */}
          <Card gradient="from-green-50 to-green-100" border="border-green-200" href="https://wa.me/918660144040">
            <IconBox color="bg-green-500"><WhatsAppIcon width={24} height={24} /></IconBox>
            <CardTitle>WhatsApp</CardTitle>
            <CardDesc>Quick messages</CardDesc>
            <CardButton color="bg-green-500 hover:bg-green-600">chat with me</CardButton>
          </Card>

          {/* LinkedIn */}
          <Card gradient="from-indigo-50 to-indigo-100" border="border-indigo-200" href="https://linkedin.com/in/ritesh-n-5113b328a">
            <IconBox color="bg-indigo-500"><Linkedin className="text-white w-6 h-6" /></IconBox>
            <CardTitle>LinkedIn</CardTitle>
            <CardDesc>Professional network</CardDesc>
            <CardButton color="bg-indigo-500 hover:bg-indigo-600">Connect</CardButton>
          </Card>

          {/* GitHub */}
          <Card gradient="from-gray-50 to-gray-100" border="border-gray-300" href="https://github.com/Ritesh771">
            <IconBox color="bg-gray-700"><Github className="text-white w-6 h-6" /></IconBox>
            <CardTitle>GitHub</CardTitle>
            <CardDesc>Explore my projects</CardDesc>
            <CardButton color="bg-gray-700 hover:bg-gray-800">Explore</CardButton>
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
    className={`rounded-2xl p-6 bg-gradient-to-br ${gradient} border ${border} shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm cursor-pointer block`}
  >
    {children}
  </a>
);

const IconBox = ({ children, color }) => (
  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-3 shadow-md`}>{children}</div>
);

const CardTitle = ({ children }) => <h3 className="text-lg font-bold text-gray-900 dark:text-white">{children}</h3>;
const CardDesc = ({ children }) => <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{children}</p>;
const CardButton = ({ children, color }) => (
  <div
    className={`inline-block px-4 py-2 rounded-xl text-white font-medium transition-all duration-300 ${color} cursor-pointer`}
  >
    {children}
  </div>
);

export default Contact;
