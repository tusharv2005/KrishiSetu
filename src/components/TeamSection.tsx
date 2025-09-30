import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  User, 
  Code, 
  Palette, 
  Database, 
  Settings,
  ExternalLink,
  Github,
  Linkedin,
  Mail
} from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  icon: React.ReactNode;
  description: string;
  expertise: string[];
  color: string;
}

const TeamSection = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Manthan Varma",
      role: "Team Leader",
      icon: <User className="w-6 h-6" />,
      description: "Project vision and strategic planning, team coordination and project management",
      expertise: ["Project Management", "Leadership", "Agricultural Technology"],
      color: "bg-blue-500"
    },
    {
      name: "Yuval Shah",
      role: "Technical Lead/Co-lead",
      icon: <Code className="w-6 h-6" />,
      description: "Technical architecture and system design, code review and quality assurance",
      expertise: ["Full-Stack Development", "System Architecture", "React", "Node.js"],
      color: "bg-green-500"
    },
    {
      name: "Tushar Varshney",
      role: "Frontend Architect",
      icon: <Code className="w-6 h-6" />,
      description: "Frontend architecture and component design, user interface implementation",
      expertise: ["React", "TypeScript", "Tailwind CSS", "UI/UX Implementation"],
      color: "bg-purple-500"
    },
    {
      name: "Aanannya Asati",
      role: "UI/UX Designer",
      icon: <Palette className="w-6 h-6" />,
      description: "User experience design and research, visual design and branding",
      expertise: ["User Experience Design", "Visual Design", "Figma", "Adobe Creative Suite"],
      color: "bg-pink-500"
    },
    {
      name: "Vedant Pandey",
      role: "Database Engineer",
      icon: <Database className="w-6 h-6" />,
      description: "Database design and optimization, data modeling and architecture",
      expertise: ["Database Design", "SQL", "NoSQL", "Data Architecture"],
      color: "bg-orange-500"
    },
    {
      name: "Mokshika Jain",
      role: "DevOps Engineer",
      icon: <Settings className="w-6 h-6" />,
      description: "Deployment and infrastructure management, CI/CD pipeline setup",
      expertise: ["DevOps", "Cloud Infrastructure", "Docker", "Kubernetes"],
      color: "bg-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl mb-6 shadow-2xl">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-4">
            Our Team
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the talented individuals behind Crop Kisan Sahayyak - a dedicated team working to revolutionize agriculture through technology.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${member.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {member.icon}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                  {member.name}
                </CardTitle>
                <Badge variant="secondary" className="w-fit mx-auto bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-200">
                  {member.role}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  {member.description}
                </p>
                
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm">Expertise:</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-200 text-center">
              🚀 Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">What We're Committed To:</h4>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Empowering Farmers:</strong> Providing accessible technology solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Bridging Gaps:</strong> Connecting farmers with markets and resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Innovation:</strong> Leveraging cutting-edge technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Impact:</strong> Creating measurable positive change</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">Platform Impact:</h4>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Democratizes Access:</strong> Advanced tools for all farmers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Improves Efficiency:</strong> Streamlined cultivation to market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Enhances Decisions:</strong> Data-driven insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Connects Communities:</strong> Farmers and buyers</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're always open to collaboration and feedback. Connect with us!
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://github.com/Manthan3006/crop-kisan-sahayyak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a 
              href="mailto:team@cropkisansahayyak.com"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
