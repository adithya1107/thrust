import React, { useEffect } from 'react';
import { Rocket, Clock, Users, MapPin, ChevronRight, ArrowLeft, Gauge, Zap, Package, Layers } from 'lucide-react';

const ProjectDetail = ({ Header, Footer, projectId, onNavigateHome, onNavigateToProjects, headerProps }) => {
  const projects = [
    { 
      id: 'agniastra',
      name: 'Agniastra', 
      category: 'Competition Rocket', 
      description: 'Our most ambitious project to date, Horizon Alpha shattered altitude records and demonstrated the capabilities of student-built rocketry. This high-altitude research rocket reached an unprecedented 30,000 feet while carrying advanced scientific instruments.',
      image: '/projects/agni.png',
      details: {
        maxAltitude: '30,000 ft',
        duration: '18 months',
        teamSize: '25 members',
        launchSite: 'New Mexico',
        totalLength: '12.5 ft',
        diameter: '6 inches',
        totalWeight: '45 lbs',
        propellant: 'Hybrid (HTPB/N2O)',
        recovery: 'Dual Deploy',
        avionics: 'Custom Flight Computer',
        payload: 'Scientific Instruments',
        maxVelocity: 'Mach 2.1'
      }
    },
    { 
      id: 'altair',
      name: 'Altair', 
      category: 'Research Platform', 
      description: 'Experimental testbed for new propulsion technologies, designed to validate next-generation hybrid motor configurations and advanced flight control systems.',
      image: '/projects/altair.png',
      details: {
        maxAltitude: '22,000 ft',
        duration: '14 months',
        teamSize: '18 members',
        launchSite: 'California',
        totalLength: '10.8 ft',
        diameter: '5.5 inches',
        totalWeight: '38 lbs',
        propellant: 'Experimental Hybrid',
        recovery: 'Dual Deploy',
        avionics: 'Custom Telemetry',
        payload: 'Research Equipment',
        maxVelocity: 'Mach 1.8'
      }
    },
    { 
      id: 'rayquaza',
      name: 'Rayquaza', 
      category: 'High Altitude', 
      description: 'Record-breaking flight achieving 28,000ft altitude with innovative aerodynamic design and state-of-the-art recovery systems.',
      image: '/projects/ray.png',
      details: {
        maxAltitude: '28,000 ft',
        duration: '16 months',
        teamSize: '22 members',
        launchSite: 'Nevada',
        totalLength: '11.2 ft',
        diameter: '6 inches',
        totalWeight: '42 lbs',
        propellant: 'Solid Motor',
        recovery: 'Triple Deploy',
        avionics: 'Advanced GPS',
        payload: 'Atmospheric Sensors',
        maxVelocity: 'Mach 2.0'
      }
    },
    { 
      id: 'phoenix',
      name: 'Phoenix', 
      category: 'Reusable System', 
      description: 'Next-generation reusable rocket platform focusing on rapid turnaround capabilities and sustainable launch operations.',
      image: '/projects/pheo.png',
      details: {
        maxAltitude: '15,000 ft',
        duration: '12 months',
        teamSize: '20 members',
        launchSite: 'Texas',
        totalLength: '9.5 ft',
        diameter: '5 inches',
        totalWeight: '35 lbs',
        propellant: 'Reusable Hybrid',
        recovery: 'Controlled Landing',
        avionics: 'AI Flight Control',
        payload: 'Reusability Test',
        maxVelocity: 'Mach 1.5'
      }
    },
    { 
      id: 'arya',
      name: 'Arya', 
      category: 'Sounding Rocket', 
      description: 'Atmospheric research and data collection mission designed for educational outreach and scientific investigation.',
      image: '/projects/arya.png',
      details: {
        maxAltitude: '18,000 ft',
        duration: '10 months',
        teamSize: '15 members',
        launchSite: 'Arizona',
        totalLength: '8.8 ft',
        diameter: '4.5 inches',
        totalWeight: '28 lbs',
        propellant: 'Solid Motor',
        recovery: 'Dual Deploy',
        avionics: 'Education Platform',
        payload: 'Weather Instruments',
        maxVelocity: 'Mach 1.4'
      }
    },
    { 
      id: 'vyom',
      name: 'Vyom', 
      category: 'Advanced Avionics', 
      description: 'AI-powered flight control and navigation system representing the future of autonomous rocket guidance.',
      image: '/projects/vyom.png',
      details: {
        maxAltitude: '25,000 ft',
        duration: '15 months',
        teamSize: '24 members',
        launchSite: 'Utah',
        totalLength: '11.8 ft',
        diameter: '6.5 inches',
        totalWeight: '48 lbs',
        propellant: 'Advanced Hybrid',
        recovery: 'Smart Deploy',
        avionics: 'AI Neural Network',
        payload: 'ML Computing',
        maxVelocity: 'Mach 2.2'
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

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={onNavigateToProjects}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header {...headerProps} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden pt-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative max-w-7xl mx-auto">
          <button
            onClick={onNavigateToProjects}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
            style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}
          >
            <ArrowLeft size={20} />
            Back to Projects
          </button>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {project.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, letterSpacing: '0.03em' }}>
                {project.description}
              </p>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <Gauge size={20} />
                    <span className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Max Altitude</span>
                  </div>
                  <p className="text-2xl font-bold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.maxAltitude}</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <Clock size={20} />
                    <span className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Duration</span>
                  </div>
                  <p className="text-2xl font-bold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.duration}</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <Users size={20} />
                    <span className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Team Size</span>
                  </div>
                  <p className="text-2xl font-bold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.teamSize}</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <MapPin size={20} />
                    <span className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Launch Site</span>
                  </div>
                  <p className="text-2xl font-bold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.launchSite}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="max-w-full max-h-[350px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Technical <span className="text-blue-600">Specifications</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-2xl p-6 hover:border-blue-600/50 transition-all">
              <p className="text-gray-400 text-sm mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Total Length</p>
              <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.totalLength}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-2xl p-6 hover:border-blue-600/50 transition-all">
              <p className="text-gray-400 text-sm mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Diameter</p>
              <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.diameter}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-2xl p-6 hover:border-blue-600/50 transition-all">
              <p className="text-gray-400 text-sm mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Total Weight</p>
              <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.totalWeight}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-2xl p-6 hover:border-blue-600/50 transition-all">
              <p className="text-gray-400 text-sm mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Propellant</p>
              <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.propellant}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-2xl p-6 hover:border-blue-600/50 transition-all">
              <p className="text-gray-400 text-sm mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Recovery</p>
              <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.recovery}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-2xl p-6 hover:border-blue-600/50 transition-all">
              <p className="text-gray-400 text-sm mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Avionics</p>
              <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.avionics}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-2xl p-6 hover:border-blue-600/50 transition-all">
              <p className="text-gray-400 text-sm mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Payload</p>
              <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.payload}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-2xl p-6 hover:border-blue-600/50 transition-all">
              <p className="text-gray-400 text-sm mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Max Velocity</p>
              <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.maxVelocity}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;