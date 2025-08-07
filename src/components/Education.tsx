import React from "react";
import { MapPin} from "lucide-react"; 
// import { Star } from "lucide-react"; 


type ColorKey = "blue" | "purple";

type EducationType = {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  // gpa: string;
  color: ColorKey;
};

const colorStyles: Record<ColorKey, Record<string, string>> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-600",
    accent: "bg-blue-600",
    text: "text-blue-700",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "text-purple-600",
    accent: "bg-purple-600",
    text: "text-purple-700",
  },
};

const educationData: EducationType[] = [
  {
    degree: "Master of Business Administration (MBA)",
    institution: "University of Dhaka",
    location: "Bangladesh",
    duration: "2018 - 2020",
    // gpa: "CGPA: 3.89 / 4.00",
    color: "purple",
  },
  {
    degree: "BSc in Information Technology",
    institution: "University of Information Technology & Sciences",
    location: "Bangladesh",
    duration: "2010 - 2015",
    // gpa: "CGPA: 3.96 / 4.00",
    color: "blue",
  },
];

const EducationCard: React.FC<{ edu: EducationType }> = ({ edu }) => {
  const colors = colorStyles[edu.color];

  return (
    <div
      className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden w-full md:max-w-[450px] flex-1`}
    >
      {/* Decorative corner */}
      <div
        aria-hidden="true"
        className={`absolute top-0 right-0 w-20 h-20 ${colors.accent} opacity-10 rounded-full -mr-10 -mt-10`}
      />

      {/* Degree */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {edu.degree}
      </h3>

      {/* Institution */}
      <p className={`text-lg ${colors.text} font-semibold mb-3 text-center`}>
        {edu.institution}
      </p>

      {/* Location and CGPA (separate lines) */}
      <div className="flex flex-col items-center gap-2 text-lg text-gray-600 mb-2">
        <span className="flex items-center">
          <MapPin size={20} className="mr-2" />
          {edu.location}
        </span>
        {/* <span className="flex items-center">
          <Star size={20} className="mr-2" />
          {edu.gpa}
        </span> */}
      </div>
    </div>
  );
};

const Education: React.FC = () => (
  <section id="education" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <header className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Education
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Strong academic foundation in computer science and engineering,
          complemented by continuous professional development.
        </p>
      </header>

      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-start gap-8">
        {educationData.map((edu, i) => (
          <EducationCard key={i} edu={edu} />
        ))}
      </div>
    </div>
  </section>
);

export default Education;
