import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Cpu, Flame, Box, Wind, Package, Users } from 'lucide-react';

const Subsystems = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const subsystems = [
    {
      id: 'aerodynamics',
      name: 'Aerodynamics',
      icon: Wind,
      tagline: 'Aerodynamics',
      description: 'Advanced computational fluid dynamics',
      details: 'Our aerodynamics team uses CFD simulations and wind tunnel testing to optimize rocket stability and minimize drag. We design custom nose cones, fins, and body profiles for maximum performance.',
      features: ['CFD simulations', 'Wind tunnel testing', 'Stability analysis', 'Drag optimization']
    },
    {
      id: 'avionics',
      name: 'Avionics',
      icon: Cpu,
      tagline: 'Avionics',
      description: 'Custom flight computers and telemetry',
      details: 'We design and manufacture custom PCBs with real-time data acquisition, GPS tracking, and autonomous flight control. Our systems handle sensor fusion, state estimation, and mission-critical decision making.',
      features: ['Custom PCB design', 'Real-time telemetry', 'Sensor integration', 'Flight control algorithms']
    },
    {
      id: 'propulsion',
      name: 'Propulsion',
      icon: Flame,
      tagline: 'Propulsion',
      description: 'Hybrid and solid rocket motors',
      details: 'Our propulsion team designs high-performance hybrid rocket motors combining solid fuel grains with liquid oxidizers. We conduct static fire tests, optimize combustion efficiency, and push the limits of thrust-to-weight ratios.',
      features: ['Hybrid motor design', 'Static fire testing', 'Nozzle optimization', 'Thrust vectoring']
    },
    {
      id: 'payload',
      name: 'Payload',
      icon: Package,
      tagline: 'Payload',
      description: 'Custom payloads and experiments',
      details: 'We design specialized payload bays for scientific experiments, atmospheric data collection, and technology demonstrations. Our modular systems enable rapid payload swaps and mission flexibility.',
      features: ['Modular bay design', 'Data logging', 'Experiment integration', 'Deployment mechanisms']
    },
    {
      id: 'management',
      name: 'Management',
      icon: Users,
      tagline: 'Management',
      description: 'Project management and integration',
      details: 'Our management team coordinates across all subsystems, handles logistics, manages timelines and budgets, and ensures seamless integration. We maintain documentation, organize outreach, and drive the project forward.',
      features: ['Project coordination', 'Budget management', 'Systems integration', 'Outreach programs']
    },
    {
      id: 'structures',
      name: 'Structures',
      icon: Box,
      tagline: 'Structures',
      description: 'Airframe and mechanical systems',
      details: 'We design lightweight yet robust structures using advanced composite materials. Our team handles stress analysis, manufacturing processes, and ensures structural integrity throughout the flight envelope.',
      features: ['Carbon fiber layup', 'FEA stress analysis', 'Manufacturing', 'Recovery systems']
    }
  ];

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Start calculating when section enters viewport
      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        // Section is in view and scrolling
        const scrolled = -rect.top;
        const scrollRange = containerHeight - viewportHeight;
        const progress = Math.min(1, scrolled / scrollRange);
        setScrollProgress(progress);
      } else if (rect.top > 0) {
        // Section hasn't entered yet - show first slide
        setScrollProgress(0);
      } else if (rect.bottom < viewportHeight) {
        // Section has passed - show last slide
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section id='subsystems' ref={containerRef} className="relative bg-black" style={{ height: `${(subsystems.length + 1) * 100}vh` }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container mx-auto px-6 h-full flex flex-col">
          {/* Fixed Header */}
          <div className="pt-32 pb-16">
            <h2 className="text-5xl md:text-6xl font-black text-center tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Our <span className="text-blue-600">Subsystems</span>
            </h2>
          </div>
          
          {/* Subsystem slides */}
          <div className="relative flex-1 flex items-center">
            {subsystems.map((subsystem, index) => {
              const Icon = subsystem.icon;
              
              // Calculate position for this slide
              const totalSlides = subsystems.length;
              const slideProgress = scrollProgress * (totalSlides - 1);
              const slideIndex = index;
              const distance = slideProgress - slideIndex;
              
              // Slide positioning: each slide should be centered when its index matches slideProgress
              const translateX = -distance * 100;
              
              // Smooth opacity with overlapping transitions
              let opacity = 0;
              if (distance >= -0.5 && distance <= 1.5) {
                if (distance < 0) {
                  // Fade in from right (approaching)
                  opacity = 1 + (distance * 2); // 0 at -0.5, 1 at 0
                } else if (distance > 1) {
                  // Fade out to left (leaving)
                  opacity = (1.5 - distance) * 2; // 1 at 1, 0 at 1.5
                } else {
                  // Fully visible between 0 and 1
                  opacity = 1;
                }
              }
              
              // Ensure opacity is between 0 and 1
              opacity = Math.max(0, Math.min(1, opacity));
              
              // Gentle scale effect
              const scaleFactor = 1 - Math.abs(distance - 0.5) * 0.15;
              const scale = Math.max(0.85, Math.min(1, scaleFactor));
              
              // Z-index for proper layering
              const zIndex = Math.round(100 - Math.abs(distance - 0.5) * 100);
              
              return (
                <div
                  key={index}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    transform: `translateX(${translateX}%) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
                  }}
                >
                  <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center px-8">
                    {/* Left side - Content */}
                    <div className="space-y-8 pointer-events-auto">
                      
                      <h3 className="text-5xl font-bold leading-tight text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {subsystem.tagline}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed text-xl" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                        {subsystem.details}
                      </p>
                      
                      {subsystem.features && (
                        <ul className="space-y-5 pt-8">
                          {subsystem.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-4 text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                              <span className="w-2.5 h-2.5 rounded-full mt-2.5 bg-blue-600 flex-shrink-0"></span>
                              <span className="text-xl">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Right side - Visual Grid */}
                    <div className="hidden lg:flex items-center justify-center pointer-events-auto">
                      <div className="relative w-full max-w-3xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
                        <div className="relative grid grid-cols-3 gap-8 p-10">

                          <div className={`bg-blue-600 rounded-2xl border backdrop-blur-sm transition-all duration-700 flex items-center justify-center relative overflow-hidden aspect-square ${
                            subsystem.id === 'aerodynamics'
                              ? 'border-blue-400/70 shadow-2xl shadow-blue-500/60 scale-110' 
                              : 'border-blue-600/30 opacity-30'
                          }`}>
                            <Wind className={`w-20 h-20 z-10 transition-all duration-700 ${
                              subsystem.id === 'aerodynamics' ? 'text-cyan-300' : 'text-blue-500/50'
                            }`} />
                          </div>
                          
                          <div className={`bg-blue-600 rounded-2xl border backdrop-blur-sm transition-all duration-700 flex items-center justify-center relative overflow-hidden aspect-square ${
                            subsystem.id === 'avionics'
                              ? 'border-blue-400/70 shadow-2xl shadow-blue-500/60 scale-110' 
                              : 'border-blue-600/30 opacity-30'
                          }`}>
                            <Cpu className={`w-20 h-20 z-10 transition-all duration-700 ${
                              subsystem.id === 'avionics' ? 'text-cyan-300' : 'text-blue-500/50'
                            }`} />
                          </div>
                          
                          <div className={`bg-blue-600 rounded-2xl border backdrop-blur-sm transition-all duration-700 flex items-center justify-center relative overflow-hidden aspect-square ${
                            subsystem.id === 'propulsion'
                              ? 'border-cyan-400/70 shadow-2xl shadow-cyan-500/60 scale-110' 
                              : 'border-cyan-600/30 opacity-30'
                          }`}>
                            <Flame className={`w-20 h-20 z-10 transition-all duration-700 ${
                              subsystem.id === 'propulsion' ? 'text-cyan-300' : 'text-cyan-500/50'
                            }`} />
                          </div>
                          
                          <div className={`bg-blue-600 rounded-2xl border backdrop-blur-sm transition-all duration-700 flex items-center justify-center relative overflow-hidden aspect-square ${
                            subsystem.id === 'payload'
                              ? 'border-blue-400/70 shadow-2xl shadow-blue-500/60 scale-110' 
                              : 'border-blue-600/30 opacity-30'
                          }`}>
                            <Package className={`w-20 h-20 z-10 transition-all duration-700 ${
                              subsystem.id === 'payload' ? 'text-cyan-300' : 'text-blue-500/50'
                            }`} />
                          </div>

                          <div className={`bg-blue-600 rounded-2xl border backdrop-blur-sm transition-all duration-700 flex items-center justify-center relative overflow-hidden aspect-square ${
                            subsystem.id === 'management'
                              ? 'border-purple-400/70 shadow-2xl shadow-purple-500/60 scale-110' 
                              : 'border-purple-600/30 opacity-30'
                          }`}>
                            <Users className={`w-20 h-20 z-10 transition-all duration-700 ${
                              subsystem.id === 'management' ? 'text-purple-300' : 'text-purple-500/50'
                            }`} />
                          </div>
                          
                          <div className={`bg-blue-600 rounded-2xl border backdrop-blur-sm transition-all duration-700 flex items-center justify-center relative overflow-hidden aspect-square ${
                            subsystem.id === 'structures'
                              ? 'border-cyan-400/70 shadow-2xl shadow-cyan-500/60 scale-110' 
                              : 'border-cyan-600/30 opacity-30'
                          }`}>
                            <Box className={`w-20 h-20 z-10 transition-all duration-700 ${
                              subsystem.id === 'structures' ? 'text-cyan-300' : 'text-cyan-500/50'
                            }`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subsystems;