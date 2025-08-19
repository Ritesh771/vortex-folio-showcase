import React, { useEffect, useRef, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, GraduationCap, Eye, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  type: 'certification' | 'course' | 'award';
  imageSrc: string;
  description?: string;
}

const Certificates = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);
  const autoScrollIntervalRef = useRef<number | null>(null);

  const certificates: CertificateItem[] = [
    {
      id: 1,
      title: "AWS Academy Cloud Foundations",
      issuer: "AWS Academy",
      date: "October 2024",
      type: "certification",
      imageSrc: "/lovable-uploads/2e76645b-cd19-474a-a96d-0a062e010060.png",
      description: "Comprehensive foundation in AWS Cloud concepts, services, security, architecture, pricing, and support."
    },
    {
      id: 2,
      title: "Android Developer Virtual Internship",
      issuer: "Google for Developers",
      date: "July - September 2024",
      type: "certification",
      imageSrc: "/lovable-uploads/0d981e4c-6539-4124-8a7f-b9175943347a.png",
      description: "Gained hands-on experience developing Android applications using Kotlin and implementing Material Design principles."
    },
    {
      id: 3,
      title: "AI-ML Virtual Internship",
      issuer: "Google for Developers",
      date: "April - June 2024",
      type: "certification",
      imageSrc: "/lovable-uploads/f58513e8-4a21-4965-8eb1-6fb36dffbdac.png",
      description: "Worked on machine learning models and AI applications using TensorFlow and Google Cloud AI services."
    },
    {
      id: 4,
      title: "Figma Bootcamp",
      issuer: "LetsUpgrade",
      date: "September - October 2024",
      type: "course",
      imageSrc: "/lovable-uploads/5d06b6c2-ffe6-431b-a012-c47551cd94c5.png",
      description: "Mastered UX/UI design principles and Figma tools for creating interactive prototypes and design systems."
    },
    {
      id: 5,
      title: "Placement Prep Bootcamp",
      issuer: "LetsUpgrade",
      date: "October 2024",
      type: "course",
      imageSrc: "/lovable-uploads/8ded9581-fe7c-4d9d-8dd7-0d4924f0b403.png",
      description: "Prepared for technical interviews with data structures, algorithms, and system design principles."
    },
    {
      id: 6,
      title: "Python Bootcamp",
      issuer: "LetsUpgrade",
      date: "November 2024",
      type: "course",
      imageSrc: "/lovable-uploads/2f60887c-421e-42fd-b023-3b7a0e2cab61.png",
      description: "Comprehensive Python programming course covering fundamentals to advanced concepts like OOP and data analysis."
    },
    {
      id: 7,
      title: "React Bootcamp",
      issuer: "LetsUpgrade",
      date: "February 2025",
      type: "course",
      imageSrc: "/lovable-uploads/dfb6e82e-4854-4734-8fab-62b635c21dfc.png",
      description: "Built complex React applications with hooks, context API, and modern state management techniques."
    },
    {
      id: 8,
      title: "SQL Bootcamp",
      issuer: "LetsUpgrade",
      date: "January 2025",
      type: "course",
      imageSrc: "/lovable-uploads/edc85877-7b81-41eb-aa14-b1fbcf2a3f6c.png",
      description: "Mastered database design, complex queries, and performance optimization for relational databases."
    },
    {
      id: 9,
      title: "Technical Internship Offer",
      issuer: "Net Ninja Solutions",
      date: "February 2025",
      type: "certification",
      imageSrc: "/lovable-uploads/86787c2a-3f5f-43a0-9573-0524ac48ae08.png",
      description: "Technical Intern position at Net Ninja Solutions Private Limited with a stipend of INR 3,000 per month."
    },
    {
      id: 10,
      title: "Artificial Intelligence Internship",
      issuer: "CodSoft",
      date: "January 2024",
      type: "certification",
      imageSrc: "/lovable-uploads/5d274e86-f713-460f-bc10-65475bf84534.png",
      description: "Virtual internship position in Artificial Intelligence at CodSoft for 4 weeks."
    },
    {
      id: 11,
      title: "Text to Speech Using IBM Watson",
      issuer: "IBM SkillsBuild",
      date: "October 2024",
      type: "certification",
      imageSrc: "/lovable-uploads/6b9add63-dda6-44cd-b763-ed763a73b700.png",
      description: "Exploration of Text to Speech capabilities using IBM Watson technology."
    },
    {
      id: 12,
      title: "JavaScript Bootcamp",
      issuer: "LetsUpgrade",
      date: "26 March 2025 – 28 March 2025",
      type: "course",
      imageSrc: "/lovable-uploads/javascriptbootcamp.png",
      description: "Successfully completed JavaScript Bootcamp (3 days)."
    },
    {
      id: 13,
      title: "People Skills for Professional Success Bootcamp",
      issuer: "LetsUpgrade",
      date: "1 April 2025 – 3 April 2025",
      type: "course",
      imageSrc: "/lovable-uploads/peopleskills.png",
      description: "Successfully completed People Skills for Professional Success Bootcamp (3 days)."
    },
    {
      id: 14,
      title: "Gemini AI Clone using HTML CSS & JavaScript",
      issuer: "LetsUpgrade",
      date: "6 June 2025 – 7 June 2025",
      type: "course",
      imageSrc: "/lovable-uploads/gemini ai.png",
      description: "Successfully completed Gemini AI Clone using HTML CSS & JavaScript (2 days)."
    },
    {
      id: 15,
      title: "Emotional Intelligence Bootcamp",
      issuer: "LetsUpgrade",
      date: "14 April 2025 – 16 April 2025",
      type: "course",
      imageSrc: "/lovable-uploads/emotionalint.png",
      description: "Successfully completed Emotional Intelligence Bootcamp (3 days)."
    },
    {
      id: 16,
      title: "Technology Job Simulation",
      issuer: "Deloitte",
      date: "20 July 2025",
      type: "certification",
      imageSrc: "/lovable-uploads/delloite .png",
      description: "Completed practical tasks(2) in Coding and Development as part of the Deloitte Technology Job Simulation."
    }
  ];

  // Use Embla API to scroll to next slide every 2.5 seconds
  useEffect(() => {
    if (!emblaApi) return;
    if (autoScrollIntervalRef.current !== null) {
      window.clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    autoScrollIntervalRef.current = window.setInterval(() => {
      if (emblaApi) {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
      }
    }, 2500);
    return () => {
      if (autoScrollIntervalRef.current !== null) {
        window.clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };
  }, [emblaApi]);

  const handleDownload = (certificate: CertificateItem) => {
    const link = document.createElement('a');
    link.href = certificate.imageSrc;
    link.download = `${certificate.title.replace(/\s+/g, '-')}-Certificate.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
          } else {
            entry.target.classList.remove('card-visible');
          }
        });
      },
      { threshold: 0.2, rootMargin: "-100px" }
    );

    document.querySelectorAll('.certificate-card').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const getIconByType = (type: string) => {
    switch (type) {
      case 'certification':
        return <GraduationCap className="w-6 h-6" />;
      case 'course':
        return <Award className="w-6 h-6" />;
      case 'award':
        return <Trophy className="w-6 h-6" />;
      default:
        return <GraduationCap className="w-6 h-6" />;
    }
  };

  return (
  <section id="certificates" className="py-20 bg-gradient-to-br from-portfolio-background via-white to-portfolio-lightGray dark:from-darkBg dark:via-darkCard dark:to-darkBg relative overflow-hidden">
  <div className="absolute inset-0 bg-pattern-modern opacity-[0.02] dark:opacity-10 z-0"></div>
  {/* Floating bubble background elements removed */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4 dark:text-darkAccent">Certificates & Achievements</h2>
          <p className="text-portfolio-gray dark:text-darkText/80 text-lg max-w-2xl mx-auto mb-8">Continuous learning and professional development milestones</p>
          
          {/* Add learning illustration */}
          <div className="flex justify-center mb-8">
            <img 
              src="/mock/Online learning.gif" 
              alt="Online Learning" 
              className="w-48 h-36 object-contain hover:scale-105 transition-transform duration-300 dark:brightness-90"
            />
          </div>
        </div>
        
        <div className="relative overflow-hidden py-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent dark:from-darkBg/40 dark:via-darkBg/10 pointer-events-none z-10"></div>
          <Carousel
            className="w-full max-w-5xl mx-auto certificate-carousel"
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
              containScroll: false
            }}
            ref={carouselRef}
            setApi={setEmblaApi}
          >
            <CarouselContent className="py-4 infinite-scroll-content">
              {[...certificates, ...certificates].map((cert, index) => (
                <CarouselItem key={`${cert.id}-${index}`} className="md:basis-1/3 lg:basis-1/4 pl-4 transition-all duration-500">
                  <Card className="certificate-card transform transition-all duration-500 hover:scale-105 hover:shadow-2xl card-modern h-full flex flex-col border-portfolio-primary/10 dark:bg-darkCard dark:border-darkAccent/20 dark:hover:shadow-darkAccent">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-xl transition-all hover:scale-110 duration-200
                          ${index % 4 === 0 ? 'bg-portfolio-primary/10 text-portfolio-primary dark:bg-darkAccent/10 dark:text-darkAccent' :
                            index % 4 === 1 ? 'bg-portfolio-secondary/10 text-portfolio-secondary dark:bg-secondary/10 dark:text-secondary' :
                            index % 4 === 2 ? 'bg-portfolio-accent/10 text-portfolio-accent dark:bg-accent/10 dark:text-accent' :
                            'bg-portfolio-blue/10 text-portfolio-blue dark:bg-primary/10 dark:text-primary'}
                        }`}>
                          {getIconByType(cert.type)}
                        </div>
                        <span className="text-sm text-portfolio-gray dark:text-darkText/80 font-medium">{cert.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-portfolio-darkBlue dark:text-darkAccent">{cert.title}</h3>
                      <p className="text-sm text-portfolio-gray dark:text-darkText/80 mb-4">Issued by: <span className="font-medium text-portfolio-primary dark:text-darkAccent">{cert.issuer}</span></p>
                      <div className="mt-auto pt-4 border-t border-portfolio-primary/20 dark:border-darkAccent/20">
                        <div className="flex justify-between items-center">
                          <span className={`text-xs uppercase tracking-wider font-medium
                            ${cert.type === 'certification' ? 'text-portfolio-primary dark:text-darkAccent' :
                              cert.type === 'course' ? 'text-portfolio-secondary dark:text-secondary' :
                              'text-portfolio-accent dark:text-accent'}
                          }`}>
                            {cert.type === 'certification' ? 'Certification' : cert.type === 'course' ? 'Course Completion' : 'Award'}
                          </span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="link" className="text-portfolio-primary dark:text-darkAccent hover:text-portfolio-secondary dark:hover:text-darkAccent text-sm p-0 h-auto transition-colors">
                                <span className="flex items-center gap-1">
                                  View <Eye className="w-3.5 h-3.5" />
                                </span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white/95 dark:bg-darkCard/95 backdrop-blur-sm border border-portfolio-primary/20 dark:border-darkAccent/20 rounded-3xl">
                              <DialogHeader>
                                <DialogTitle className="text-xl text-portfolio-primary dark:text-darkAccent">{cert.title}</DialogTitle>
                                <DialogDescription>
                                  <div className="flex items-center justify-between my-2">
                                    <span>Issued by: <strong className="text-portfolio-darkBlue dark:text-darkAccent">{cert.issuer}</strong></span>
                                    <span>Date: <strong className="text-portfolio-darkBlue dark:text-darkAccent">{cert.date}</strong></span>
                                  </div>
                                </DialogDescription>
                              </DialogHeader>
                              <div className="mt-4 space-y-4">
                                {cert.imageSrc && (
                                  <div className="relative w-full aspect-auto bg-gray-100 dark:bg-darkBg rounded-lg overflow-hidden border border-gray-200 dark:border-darkBorder">
                                    <img
                                      src={cert.imageSrc}
                                      alt={`${cert.title} certificate`}
                                      className="w-full h-auto object-contain"
                                      onError={e => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                                    />
                                  </div>
                                )}
                                <div className="bg-gray-50 dark:bg-darkCard p-6 rounded-lg border border-gray-100 dark:border-darkBorder">
                                  <h4 className="font-medium text-gray-800 dark:text-darkAccent mb-2">Description</h4>
                                  <p className="text-gray-600 dark:text-darkText/80">{cert.description}</p>
                                </div>
                                <div className="flex justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="p-2 bg-gray-50 dark:bg-darkCard rounded-md">
                                      {getIconByType(cert.type)}
                                    </div>
                                    <span className="text-sm font-medium dark:text-darkAccent">
                                      {cert.type === 'certification' ?
                                       'Certification' :
                                       cert.type === 'course' ? 'Course Completion' : 'Award'}
                                    </span>
                                  </div>
                                  <Button
                                    variant="outline"
                                    className="text-portfolio-blue dark:text-darkAccent border-portfolio-blue/50 dark:border-darkAccent/50 hover:bg-portfolio-blue/10 dark:hover:bg-darkAccent/10"
                                    onClick={() => handleDownload(cert)}
                                  >
                                    <Download className="w-4 h-4 mr-2" /> Download
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative -translate-y-0 left-0 rounded-full" />
              <CarouselNext className="relative -translate-y-0 right-0 rounded-full" />
            </div>
          </Carousel>
        </div>
        <style>{`
          @keyframes fadeSlideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .card-visible {
            animation: fadeSlideUp 0.7s ease forwards;
          }

          .certificate-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .certificate-card:hover {
            z-index: 10;
            transform: translateY(-5px) scale(1.03);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          }

          /* Smooth scroll enhancements */
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 100px;
          }

          /* Enhanced infinite scroll effect */
          .infinite-scroll-content {
            scroll-behavior: smooth;
          }

          .certificate-carousel .embla__container {
            display: flex;
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }

          .certificate-carousel .embla__container::-webkit-scrollbar {
            display: none;
          }

          /* Enhanced carousel interactions */
          .embla__slide {
            transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
          }

          .embla__slide:hover {
            z-index: 5;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Certificates;
