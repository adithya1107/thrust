import React, { useState, useEffect } from 'react';
import { Rocket, Clock, Users, MapPin, ChevronRight, ArrowLeft, Gauge, Zap, Package, Layers, Settings } from 'lucide-react';
import VarunaModal from './VarunaModal';

const Projects = ({ onNavigateToProject }) => {
  const [varunaModalOpen, setVarunaModalOpen] = useState(false);

  const projects = [
    {
      id: 'varuna',
      name: 'Varuna', 
      category: 'Current Project', 
      description: "Varuna is thrustMIT's current flagship project, representing our next generation of high-power rocketry. Stay tuned for more updates as we push the boundaries of innovation and performance.",
      image: 'question-mark', 
      details: {
        maxAltitude: 'TBA',
        duration: '2025-26',
        motor: 'TBA',
        payload: 'TBA',
      },
      comingSoon: true
    },
    {
      id: 'vayuvega',
      name: 'Vayuvega', 
      category: '30K COTS', 
      description: "Vayuvega was thrustMIT's latest project and second 30K COTS class rocket, launched at the 2025 IREC. Vayuvega achieved an apogee of 29,432 feet and was subsequently recovered with no damage to the airframe and systems. Vayuvega featured a payload experiment aiming to validate real-time visual tracking in extreme flight conditions, for which the team won the 2nd Place Prize in the SDL Payload Challenge.",
      image: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/projects/vayu.png',
      details: {
        maxAltitude: '29,432 ft',
        duration: '2024-25',
        motor: 'Aerotech 05500X-PS',
        payload: 'Real-time 3D Visual Tracking System',
      }
    },
    { 
      id: 'agniastra',
      name: 'AgniAstra', 
      category: '30K COTS', 
      description: "AgniAstra was thrustMIT's debut entry in the 2024 Spaceport America Cup under the 30K COTS category. Featuring a glass fibre and carbon fibre airframe with an Aluminium 6061 internal structure, it carried a CanSat payload to conduct real-time pose estimation via computer vision. The SRAD modular flight computer managed recovery, data logging, and telemetry.",
      image: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/projects/agni.png',
      details: {
        maxAltitude: '17,010 ft',
        duration: '2023-24',
        motor: 'Cesaroni N5800-P',
        payload: '3D Vision & Pose Estimation'
      }
    },
    { 
      id: 'altair',
      name: 'Altair', 
      category: '10K COTS', 
      description: "Altair was thrustMIT's 10K COTS submission to the 2023 Spaceport America Cup. The rocket featured leading-edge extended fins and crankshaft-airbrakes to optimize flow separation. Project Altair was our most accurate launch with a 0.51% percentage error in apogee, reaching 10,331 ft.",
      image: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/projects/altair.png',
      details: {
        maxAltitude: '10,331 ft',
        duration: '2022-23',
        motor: 'Cesaroni M3400-P',
        payload: '3-DoF Stewart Platform'
      }
    },
    { 
      id: 'rayquaza',
      name: 'Rayquaza', 
      category: '10K COTS', 
      description: "Rayquaza was thrustMIT's 4th developed rocket and project entry to the 2022 Spaceport America Cup. Comprising a carbon fibre airframe and Aluminium 6063 internal structure, Project Rayquaza was our first ever rocket to reach 10,000 ft. Rayquaza came 4th in the James Barrowman Award with a percentage error of less than 0.3%.",
      image: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/projects/ray.png',
      details: {
        maxAltitude: '11,662 ft',
        duration: '2021-22',
        motor: 'Cesaroni M3400-P',
        payload: 'Acoustic Dampening of CNT'
      }
    },
    { 
      id: 'phoenix',
      name: 'Phoenix', 
      category: '10K COTS', 
      description: "Phoenix was thrustMIT's 3rd rocket and official entry to the 2021 Spaceport America Cup. With a carbon fibre airframe and glass fibre Avionics Bay, the rocket featured a functional payload experiment aiming to accurately measure and log vibrations experienced by a CanSat during flight using a piezoelectric transducer.",
      image: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/projects/pheo.png',
      details: {
        maxAltitude: '10,000 ft',
        duration: '2020-21',
        motor: 'Cesaroni N2200-P',
        payload: 'Piezo-Electric Device to detect Vibrations'
      }
    },
    { 
      id: 'arya',
      name: 'Arya', 
      category: '10K COTS', 
      description: "Arya, launched at the 2019 Spaceport America Cup, was our 2nd rocket made entirely out of carbon fibre with a target apogee of 3 km. It featured Aluminium 6061-T6 bulkheads and centering rings. The team successfully launched Lapwing II, a subscale rocket used to test recovery systems.",
      image: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/projects/arya.png',
      details: {
        maxAltitude: '2,047 ft',
        duration: '2018-19',
        motor: 'Aerotech M1845-P',
        payload: 'Non-Newtonian Fluid Damper'
      }
    },
    { 
      id: 'vyom',
      name: 'Vyom', 
      category: 'Debut Rocket', 
      description: "Vyom was our first rocket, launched at the 2018 Spaceport America Cup. It featured a glass fibre airframe, couplers and fin attachments, and a nose tip made of ABS. It reached an apogee of 1.2 km. Project Vyom won the Best Debutant Award at the 2018 SA Cup.",
      image: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/projects/vyom.png',
      details: {
        maxAltitude: '3,937 ft',
        duration: '2017-18',
        motor: 'Aerotech M1845-P',
        payload: 'Non Functional'
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

        {(() => {
          const many = projects.length >= 3;
          return (
            <div className={many ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex justify-center flex-wrap gap-8'}>
              {projects.map((project, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    if (project.comingSoon) {
                      setVarunaModalOpen(true);
                    } else {
                      onNavigateToProject && onNavigateToProject(project.id);
                    }
                  }}
                  className={`${many ? '' : 'w-full sm:w-80 md:w-96'} group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50 rounded-3xl overflow-hidden hover:border-blue-600/50 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/20`}
                >
                  {/* Coming Soon Badge */}
                  {project.comingSoon && (
                    <div className="absolute top-4 right-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      Coming Soon
                    </div>
                  )}
                  
                  {/* Image Container */}
                  <div className="relative h-64 flex items-center justify-center border-b border-gray-800/50 overflow-hidden">
                    {project.image === 'question-mark' ? (
                      <div className="relative flex items-center justify-center w-full h-full">
                        {/* Animated background circles */}
                        <div className="absolute w-32 h-32 rounded-full bg-blue-600/10 blur-xl group-hover:bg-blue-600/20 transition-all duration-500" />
                        <div className="absolute w-40 h-40 rounded-full border-2 border-blue-600/20 group-hover:border-blue-600/40 transition-all duration-500 group-hover:scale-110" />
                        <div className="absolute w-48 h-48 rounded-full border border-blue-600/10 group-hover:border-blue-600/20 transition-all duration-500 group-hover:scale-125" />
                        
                        {/* Question mark */}
                        <div className="relative">
                          <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600 group-hover:from-blue-300 group-hover:to-blue-500 transition-all duration-500 group-hover:scale-110" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            ?
                          </div>
                          {/* Glow effect */}
                          <div className="absolute inset-0 text-8xl font-black text-blue-600 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            ?
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={project.image} 
                        alt={`${project.name} logo`}
                        className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {project.name}
                    </h3>
                    <p className="text-blue-600 text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                      {project.category}
                    </p>

                    {/* Stats Grid - 2x2 */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-1 text-blue-600 mb-1">
                          <Gauge size={16} />
                          <span className="text-xs text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Altitude</span>
                        </div>
                        <p className="text-sm font-bold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{project.details.maxAltitude}</p>
                      </div>
                      
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-1 text-blue-600 mb-1">
                          <Clock size={16} />
                          <span className="text-xs text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Year</span>
                        </div>
                        <p className="text-sm font-bold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{project.details.duration}</p>
                      </div>
                      
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-1 text-blue-600 mb-1">
                          <Settings size={16} />
                          <span className="text-xs text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Motor</span>
                        </div>
                        <p className="text-xs font-bold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{project.details.motor}</p>
                      </div>
                      
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-1 text-blue-600 mb-1">
                          <Package size={16} />
                          <span className="text-xs text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Payload</span>
                        </div>
                        <p className="text-xs font-bold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{project.details.payload}</p>
                      </div>
                    </div>

                    {/* Learn More Button */}
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (project.comingSoon) {
                            setVarunaModalOpen(true);
                          } else {
                            onNavigateToProject && onNavigateToProject(project.id);
                          }
                        }} 
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-300 transition-colors group/btn" 
                        style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
                      >
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
          );
        })()}
      </div>

      {/* Varuna Modal */}
      <VarunaModal open={varunaModalOpen} onClose={() => setVarunaModalOpen(false)} />
    </section>
  );
};

export default Projects;