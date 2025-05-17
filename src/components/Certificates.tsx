
import React, { useEffect, useState, useRef } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, GraduationCap } from "lucide-react";

interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  type: 'certification' | 'course' | 'award';
  imageSrc?: string;
}

const Certificates = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const certificates: CertificateItem[] = [
    {
      id: 1,
      title: "AWS Academy Cloud Foundations",
      issuer: "AWS Academy",
      date: "October 2024",
      type: "certification",
      imageSrc: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    },
    {
      id: 2,
      title: "Android Developer Virtual Internship",
      issuer: "Google for Developers",
      date: "July - September 2024",
      type: "certification",
      imageSrc: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    },
    {
      id: 3,
      title: "AI-ML Virtual Internship",
      issuer: "Google for Developers",
      date: "April - June 2024",
      type: "certification",
      imageSrc: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    },
    {
      id: 4,
      title: "Figma Bootcamp",
      issuer: "LetsUpgrade",
      date: "September - October 2024",
      type: "course",
      imageSrc: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    },
    {
      id: 5,
      title: "Placement Prep Bootcamp",
      issuer: "LetsUpgrade",
      date: "October 2024",
      type: "course",
      imageSrc: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    },
    {
      id: 6,
      title: "Python Bootcamp",
      issuer: "LetsUpgrade",
      date: "November 2024",
      type: "course",
      imageSrc: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    },
    {
      id: 7,
      title: "React Bootcamp",
      issuer: "LetsUpgrade",
      date: "February 2025",
      type: "course",
      imageSrc: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    },
    {
      id: 8,
      title: "SQL Bootcamp",
      issuer: "LetsUpgrade",
      date: "January 2025",
      type: "course",
      imageSrc: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    }
  ];

  useEffect(() => {
    // Apple-style animation effect
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
      { threshold: 0.5, rootMargin: "-100px" }
    );

    document.querySelectorAll('.certificate-card').forEach((el) => {
      observer.observe(el);
    });

    // Set up automatic carousel scrolling
    let scrollInterval: NodeJS.Timeout;
    
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (carouselRef.current) {
          const scrollContainer = carouselRef.current.querySelector('.embla__container');
          if (scrollContainer) {
            const scrollAmount = 1; // pixels to scroll each interval
            scrollContainer.scrollLeft += scrollAmount;
            
            // Reset scroll position when we reach the end to create infinite effect
            const scrollWidth = scrollContainer.scrollWidth;
            const containerWidth = scrollContainer.clientWidth;
            
            if (scrollContainer.scrollLeft + containerWidth >= scrollWidth) {
              scrollContainer.scrollLeft = 0;
            }
          }
        }
      }, 30); // smoother animation with shorter interval
    };
    
    startAutoScroll();
    
    return () => {
      observer.disconnect();
      clearInterval(scrollInterval);
    };
  }, []);

  const getIconByType = (type: string) => {
    switch (type) {
      case 'certification':
        return <GraduationCap className="w-6 h-6 text-portfolio-blue" />;
      case 'course':
        return <Award className="w-6 h-6 text-amber-500" />;
      case 'award':
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      default:
        return <GraduationCap className="w-6 h-6 text-portfolio-blue" />;
    }
  };

  return (
    <section id="certificates" className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title mb-12">Certificates & Achievements</h2>
        
        <div className="relative overflow-hidden py-10">
          {/* Apple-style glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-10"></div>
          
          <Carousel 
            className="w-full max-w-5xl mx-auto certificate-carousel"
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
              containScroll: false
            }}
            ref={carouselRef}
          >
            <CarouselContent className="py-4">
              {/* Duplicate certificates array to create illusion of infinite scroll */}
              {[...certificates, ...certificates].map((cert, index) => (
                <CarouselItem key={`${cert.id}-${index}`} className="md:basis-1/3 lg:basis-1/4 pl-4 transition-all duration-500">
                  <Card className="certificate-card transform transition-all duration-500 hover:scale-105 hover:shadow-lg border border-gray-100 h-full flex flex-col">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-gray-50 rounded-md">
                          {getIconByType(cert.type)}
                        </div>
                        <span className="text-sm text-gray-400">{cert.date}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 text-portfolio-darkBlue">{cert.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">Issued by: {cert.issuer}</p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-xs uppercase tracking-wider text-gray-400">
                            {cert.type === 'certification' ? 'Certification' : cert.type === 'course' ? 'Course Completion' : 'Award'}
                          </span>
                          <span className="text-portfolio-blue text-sm cursor-pointer hover:underline">View</span>
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
        
        <style>
          {`
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
            }
            
            /* Smooth scroll enhancements */
            html {
              scroll-behavior: smooth;
              scroll-padding-top: 100px;
            }
            
            /* Custom animation for continuously moving cards */
            @keyframes slideLeft {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-100%);
              }
            }
            
            .certificate-carousel .embla__container {
              display: flex;
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
            
            .certificate-carousel .embla__container::-webkit-scrollbar {
              display: none;
            }
            
            .embla__slide {
              transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
            }
            
            .embla__slide:hover {
              z-index: 5;
            }
          `}
        </style>
      </div>
    </section>
  );
};

export default Certificates;
