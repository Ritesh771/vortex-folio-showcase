
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const Education = () => {
  const educationData = [
    {
      id: 1,
      degree: "Bachelor of Engineering in Computer Science (AI & ML)",
      institution: "A.M.C. Engineering College, Bangalore",
      duration: "Aug 2022 – Present",
      highlights: [
        { id: 1, label: "SGPA", value: "SEM1 – 9.05 | SEM2 – 8.6 | SEM3 – 9.0 | SEM4 – 9.26 | SEM5 - 9.15 | SEM6 - 9.2 " },
        { id: 2, label: "Activities", value: "Actively involved in technical projects and hackathons" },
        { id: 3, label: "Backlogs", value: "No active backlogs" }
      ]
    },
    {
      id: 2,
      degree: "Pre-University (11th–12th)",
      institution: "Narayana PU College, Bangalore",
      duration: "Jun 2020 – Jun 2022",
      highlights: [
        { id: 1, label: "Overall Score", value: "92%" },
        { id: 2, label: "Achievements", value: "2nd Place – Inter-Narayana Basketball Tournament, Subject Topper in Mathematics" }
      ]
    },
    {
      id: 3,
      degree: "High School (1st–10th Grade)",
      institution: "Sri Krishna International School, Bangalore",
      duration: "May 2006 – Jun 2020",
      highlights: [
        { id: 1, label: "Overall Score", value: "89%" },
        { id: 2, label: "Activities", value: "Active participant in sports – Throwball & Basketball" }
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-on-scroll opacity-0 max-w-4xl mx-auto">
      {/* Add education illustration */}
     
      
      {educationData.map((edu, index) => (
        <Card key={edu.id} className="overflow-visible mb-6 hover:shadow-xl transition-all duration-300 card-modern border-l-4 border-l-portfolio-blue">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
              <div className="flex-1 mb-3 sm:mb-0">
                <h4 className="text-lg sm:text-xl font-semibold text-portfolio-darkBlue mb-2 leading-tight">{edu.degree}</h4>
                <p className="text-portfolio-blue text-sm sm:text-base font-medium mb-2">{edu.institution}</p>
              </div>
              <Badge variant="outline" className={`self-start sm:self-center text-xs sm:text-sm whitespace-nowrap border-portfolio-blue/20 text-portfolio-blue ${
                index === 0 ? 'bg-portfolio-blue/10' :
                index === 1 ? 'bg-portfolio-lightBlue/10 border-portfolio-lightBlue/20 text-portfolio-lightBlue' :
                'bg-portfolio-darkBlue/10 border-portfolio-darkBlue/20 text-portfolio-darkBlue'
              }`}>
                {edu.duration}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {edu.highlights.map((highlight, highlightIndex) => (
                <div key={highlight.id} className={`rounded-xl p-3 sm:p-4 border transition-all hover:scale-[1.02] duration-200 ${
                  highlightIndex % 3 === 0 ? 'bg-portfolio-blue/5 border-portfolio-blue/20' :
                  highlightIndex % 3 === 1 ? 'bg-portfolio-lightBlue/5 border-portfolio-lightBlue/20' :
                  'bg-portfolio-darkBlue/5 border-portfolio-darkBlue/20'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    <span className={`font-medium text-sm sm:text-base mb-1 sm:mb-0 sm:w-32 flex-shrink-0 ${
                      highlightIndex % 3 === 0 ? 'text-portfolio-blue' :
                      highlightIndex % 3 === 1 ? 'text-portfolio-lightBlue' :
                      'text-portfolio-darkBlue'
                    }`}>
                      {highlight.label}:
                    </span>
                    <span className="text-gray-600 text-sm sm:text-base sm:flex-1 leading-relaxed">
                      {highlight.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Education;
