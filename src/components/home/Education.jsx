import { 
  GraduationCap, 
  Calendar, 
  BookOpen,
  MapPin, 
  Star
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Education = () => {
  const { theme } = useTheme();
  const education = [
    {
      id: 1,
      degree: "Bachelor of Technology in Computer Science & Technology",
      institution: "Indian Institute of Engineering Science and Technology, Shibpur",
      location: "Howrah, India",
      period: "2022 - 2026",
      gpa: "8.99/10",
      // achievements: [
      //   "Published research paper on AI algorithms",
      //   "Teaching Assistant for Web Development course",
      //   "Won Best Graduate Project Award"
      // ],

      relevantCourses: [
        "Data Structures",
        "Design and Analysis of Algorithms",
        "Programming Paradigms",

        "Computer Architecture and Organization",
        "Microprocessor based Systems",
        "Operating Systems",
        "Database Management Systems",
        "Software Engineering",
        "Computer Networks",
        "Introduction to Data Science",
      ],
      skills: ["Data Structures & Algorithms", 'Data Science', 'Object Oriented Programming', 'Database Management', 'Computer Architecture'],
    }
  ];


  return (
    <section id="education" className="relative py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: theme === 'light' 
            ? 'radial-gradient(circle at 25px 25px, black 1px, transparent 0)'
            : 'radial-gradient(circle at 25px 25px, white 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title dark:text-dark-text">Education & Certifications</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My academic background and professional certifications
          </p>
        </div>

        {/* Education Cards */}
        <div className="space-y-8 mb-16">
          {education.map((edu, index) => (
            <div 
              key={edu.id}
              className="bg-white dark:bg-dark-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text">{edu.degree}</h3>
                    <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                      <GraduationCap className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                      <span className="font-medium">{edu.institution}</span>
                    </div>
                  </div>
                   <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
                    <Star className="w-5 h-5" />
                    <span className="font-medium">GPA: {edu.gpa}</span>
                  </div> 
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="w-5 h-5 mr-2" />
                      {edu.period}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="w-5 h-5 mr-2" />
                      {edu.location}
                    </div>
                    
                    {/* <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 dark:text-dark-text flex items-center">
                        <Award className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                        Key Achievements
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                        {edu.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div> */}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 dark:text-dark-text flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                        Relevant Coursework
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {edu.relevantCourses.map((course, index) => (
                          <div 
                            key={index}
                            className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-bg rounded-lg p-2"
                          >
                            {course}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-dark-text mb-2">Key Skills Gained</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;