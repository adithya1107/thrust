import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Cpu, Flame, Box, Wind, Package, Users } from 'lucide-react';

const Subsystems = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  const subsystems = [
    {
      id: 'about',
      name: 'About thrustMIT',
      icon: Rocket,
      tagline: 'Our Mission',
      description: 'A multidisciplinary team at MIT',
      details: 'We design, manufacture, and launch advanced rocket systems while fostering innovation across six core subsystems. Our team combines cutting-edge technology with hands-on engineering to compete nationally and conduct groundbreaking research.',
      glowAll: true
    },
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
      
      const sections = sectionsRef.current;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const viewportCenter = scrollTop + windowHeight / 2;
      
      // Find which section is closest to the center of the viewport
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionCenter = scrollTop + rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - sectionCenter);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });
      
      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine which icons should glow
  const shouldGlow = (subsystemId) => {
    if (activeIndex === 0) return true; // About section - all glow
    return subsystems[activeIndex].id === subsystemId;
  };

  return (
    <section ref={containerRef} className="relative bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-4 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          About <span className="text-blue-600">Us</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
          Founded in 2016, we are MIT's premier student rocketry organization dedicated <br />to advancing space technology through hands-on innovation.
        </p>
        {/* Sticky container for the right side */}
        <div className="min-h-screen relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left side - Scrolling content */}
            <div className="space-y-[100vh] py-20">
              {subsystems.map((subsystem, index) => (
                <div
                  key={index}
                  ref={el => sectionsRef.current[index] = el}
                  className={`transition-opacity duration-700 ${
                    activeIndex === index ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <div className="mb-8">
                    
                    <h3 className="text-5xl md:text-6xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {subsystem.tagline}
                    </h3>
                    
                    <p className="text-xl text-gray-300 mb-6 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {subsystem.details}
                    </p>
                    
                    {subsystem.features && (
                      <ul className="space-y-3 mb-8">
                        {subsystem.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                            <span className={`w-1.5 h-1.5 rounded-full mt-2 transition-colors ${
                              activeIndex === index ? 'bg-blue-600' : 'bg-gray-600'
                            }`}></span>
                            <span className="text-lg">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                  </div>
                </div>
              ))}
            </div>

            {/* Right side - Fixed isometric grid layout */}
            <div className="hidden lg:block">
              <div className="sticky top-20 h-[calc(100vh-3rem)] flex items-center justify-center p-8">
                <div className="relative w-full max-w-3xl h-full">
                  {/* Grid container matching Snyk's exact layout */}
                  <div className="grid grid-cols-3 grid-rows-3 gap-6 h-full">
                    {/* Top Row - 3 items */}
                    <div className={`bg-gradient-to-br from-blue-600/40 to-blue-800/30 rounded-2xl border backdrop-blur-sm transition-all duration-700 flex items-center justify-center relative overflow-hidden ${
                      shouldGlow('aerodynamics')
                        ? 'border-blue-400/70 shadow-2xl shadow-blue-500/60 scale-105' 
                        : 'border-blue-600/30 opacity-40'
                    }`}>
                      <Wind className={`w-16 h-16 z-10 transition-all duration-700 ${
                        shouldGlow('aerodynamics') ? 'text-cyan-300' : 'text-blue-500/50'
                      }`} />
                    </div>
                    
                    <div className={`bg-gradient-to-br from-blue-600/40 to-purple-800/30 rounded-2xl border backdrop-blur-sm transition-all duration-700 flex items-center justify-center relative overflow-hidden ${
                      shouldGlow('avionics')
                        ? 'border-blue-400/70 shadow-2xl shadow-blue-500/60 scale-105' 
                        : 'border-blue-600/30 opacity-40'
                    }`}>
                      <Cpu className={`w-16 h-16 z-10 transition-all duration-700 ${
                        shouldGlow('avionics') ? 'text-cyan-300' : 'text-blue-500/50'
                      }`} />
                    </div>
                    
                    <div className={`bg-gradient-to-br from-cyan-600/40 to-purple-800/30 rounded-2xl border backdrop-blur-sm transition-all duration-700 flex items-center justify-center relative overflow-hidden ${
                      shouldGlow('propulsion')
                        ? 'border-cyan-400/70 shadow-2xl shadow-cyan-500/60 scale-105' 
                        : 'border-cyan-600/30 opacity-40'
                    }`}>
                      <Flame className={`w-16 h-16 z-10 transition-all duration-700 ${
                        shouldGlow('propulsion') ? 'text-cyan-300' : 'text-cyan-500/50'
                      }`} />
                    </div>
                    
                    {/* Middle Row - Left item, Center circle (2 rows), Right item */}
                    <div className={`bg-gradient-to-br from-blue-600/40 to-blue-800/30 rounded-2xl border backdrop-blur-sm transition-all duration-700 flex items-center justify-center relative overflow-hidden ${
                      shouldGlow('payload')
                        ? 'border-blue-400/70 shadow-2xl shadow-blue-500/60 scale-105' 
                        : 'border-blue-600/30 opacity-40'
                    }`}>
                      <Package className={`w-16 h-16 z-10 transition-all duration-700 ${
                        shouldGlow('payload') ? 'text-cyan-300' : 'text-blue-500/50'
                      }`} />
                    </div>
                    

                    <div className={`bg-gradient-to-br from-purple-600/40 to-blue-800/30 rounded-2xl border backdrop-blur-sm transition-all duration-700 flex items-center justify-center relative overflow-hidden ${
                      shouldGlow('management')
                        ? 'border-purple-400/70 shadow-2xl shadow-purple-500/60 scale-105' 
                        : 'border-purple-600/30 opacity-40'
                    }`}>
                      <Users className={`w-16 h-16 z-10 transition-all duration-700 ${
                        shouldGlow('management') ? 'text-purple-300' : 'text-purple-500/50'
                      }`} />
                    </div>
                    
                    {/* Bottom Row - 3 items */}
                    <div className={`bg-gradient-to-br from-blue-600/40 to-cyan-800/30 rounded-2xl border backdrop-blur-sm transition-all duration-700 flex items-center justify-center relative overflow-hidden ${
                      shouldGlow('structures')
                        ? 'border-cyan-400/70 shadow-2xl shadow-cyan-500/60 scale-105' 
                        : 'border-cyan-600/30 opacity-40'
                    }`}>
                      <Box className={`w-16 h-16 z-10 transition-all duration-700 ${
                        shouldGlow('structures') ? 'text-cyan-300' : 'text-cyan-500/50'
                      }`} />
                    </div>
                    
                  </div>
                
                </div>
              </div>
            </div>
            
            <style jsx>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) translateX(0px); }
                50% { transform: translateY(-20px) translateX(10px); }
              }
            `}</style>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Subsystems;