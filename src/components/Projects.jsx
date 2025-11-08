import React, { useEffect } from 'react';
import { Rocket, Clock, Users, MapPin, ChevronRight, ArrowLeft, Gauge, Zap, Package, Layers } from 'lucide-react';

const Projects = ({ onNavigateToProject }) => {
  const projects = [
    { 
      id: 'agniastra',
      name: 'Agniastra', 
      category: 'Competition Rocket', 
      description: 'Our most ambitious project to date, Horizon Alpha shattered altitude records and demonstrated the capabilities of student-built rocketry. This high-altitude research rocket reached an unprecedented 30,000 feet while carrying advanced scientific instruments.',
      image: 'projects/agni.png',
      details: {
        maxAltitude: '30,000 ft',
        duration: '18 months',
        teamSize: '25 members',
        launchSite: 'New Mexico',
      }
    },
    { 
      id: 'altair',
      name: 'Altair', 
      category: 'Research Platform', 
      description: 'Experimental testbed for new propulsion technologies, designed to validate next-generation hybrid motor configurations and advanced flight control systems.',
      image: 'projects/altair.png',
      details: {
        maxAltitude: '22,000 ft',
        duration: '14 months',
        teamSize: '18 members',
        launchSite: 'California',
      }
    },
    { 
      id: 'rayquaza',
      name: 'Rayquaza', 
      category: 'High Altitude', 
      description: 'Record-breaking flight achieving 28,000ft altitude with innovative aerodynamic design and state-of-the-art recovery systems.',
      image: 'projects/ray.png',
      details: {
        maxAltitude: '28,000 ft',
        duration: '16 months',
        teamSize: '22 members',
        launchSite: 'Nevada',
      }
    },
    { 
      id: 'phoenix',
      name: 'Phoenix', 
      category: 'Reusable System', 
      description: 'Next-generation reusable rocket platform focusing on rapid turnaround capabilities and sustainable launch operations.',
      image: 'projects/pheo.png',
      details: {
        maxAltitude: '15,000 ft',
        duration: '12 months',
        teamSize: '20 members',
        launchSite: 'Texas',
      }
    },
    { 
      id: 'arya',
      name: 'Arya', 
      category: 'Sounding Rocket', 
      description: 'Atmospheric research and data collection mission designed for educational outreach and scientific investigation.',
      image: 'projects/arya.png',
      details: {
        maxAltitude: '18,000 ft',
        duration: '10 months',
        teamSize: '15 members',
        launchSite: 'Arizona',
      }
    },
    { 
      id: 'vyom',
      name: 'Vyom', 
      category: 'Advanced Avionics', 
      description: 'AI-powered flight control and navigation system representing the future of autonomous rocket guidance.',
      image: 'projects/vyom.png',
      details: {
        maxAltitude: '25,000 ft',
        duration: '15 months',
        teamSize: '24 members',
        launchSite: 'Utah',
      }
    }
  ];

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Our <span className="text-blue-600">Projects</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
          Discover our research and development projects, each pushing the limits of rocketry
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div 
              key={i} 
              onClick={() => onNavigateToProject && onNavigateToProject(project.id)}
              className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50 rounded-3xl overflow-hidden hover:border-blue-600/50 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/20"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gradient-to-br from-blue-600/20 to-blue-800/20 flex items-center justify-center border-b border-gray-800/50 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={`${project.name} logo`}
                  className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {project.name}
                </h3>
                <p className="text-blue-400 text-sm mb-3 uppercase tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                  {project.category}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mb-6" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                  {project.description}
                </p>

                {/* Learn More Button */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group/btn" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                    <span>Learn More</span>
                    <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;