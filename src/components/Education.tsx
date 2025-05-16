
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
        { id: 1, label: "CGPA", value: "SEM1 – 9.05 | SEM2 – 8.6 | SEM3 – 9.0 | SEM4 – 9.26" },
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
    <div className="space-y-6">
      {educationData.map((edu) => (
        <Card key={edu.id} className="animate-on-scroll opacity-0">
          <CardContent className="pt-6">
            <h4 className="text-xl font-semibold text-portfolio-darkBlue">{edu.degree}</h4>
            <p className="text-portfolio-blue mt-1">{edu.institution}</p>
            <Badge variant="outline" className="mt-2">{edu.duration}</Badge>
            
            <div className="mt-4 space-y-2">
              {edu.highlights.map((highlight) => (
                <div key={highlight.id} className="flex flex-col md:flex-row md:items-center">
                  <span className="font-medium text-gray-700 md:w-28">{highlight.label}:</span>
                  <span className="text-gray-600">{highlight.value}</span>
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
