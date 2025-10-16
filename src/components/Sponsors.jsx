import React, { useState, useEffect } from 'react';

const Sponsors = () => {
  const sponsors = [
    {
      name: "SolidWorks",
      logo: "/public/solidworks.png",
      description: "SOLIDWORKS is a software used for creating 3D models and simulations, primarily for product development and engineering applications. It's a powerful tool used in industries like automotive, aerospace, and manufacturing, offering features for design, analysis, and manufacturing.",
      angle: 0,
    },
    {
      name: "Ansys",
      logo: "public/ansys.png",
      description: "Ansys provides engineering simulation software for product design and testing. Used across aerospace, automotive, and electronics industries for structural, fluid, electromagnetic, and systems simulation.",
      angle: 45,
    },
    {
      name: "Anaconda",
      logo: "public/anaconda.png",
      description: "Anaconda is a distribution platform for Python and R programming, widely used in data science, machine learning, and scientific computing. It simplifies package management and deployment.",
      angle: 90,
    },
    {
      name: "Microplacer",
      logo: "public/microplacer.png",
      description: "Microplacer specializes in precision microelectronics placement and assembly solutions for aerospace and defense applications, delivering high-reliability components.",
      angle: 135,
    },
    {
      name: "Precision",
      logo: "public/precision.png",
      description: "Precision provides advanced manufacturing solutions and components for aerospace applications, focusing on high-accuracy machining and assembly processes.",
      angle: 180,
    },
    {
      name: "ROBU.IN",
      logo: "public/robu.png",
      description: "ROBU.IN is an online platform offering robotics and electronics components, serving makers, hobbyists, and professionals in India with a wide range of sensors, controllers, and development boards.",
      angle: 225,
    },
    {
      name: "Babaji shivram",
      logo: "public/babaji.png",
      description: "Babaji Shivram specializes in aerospace components and systems integration, providing innovative solutions for satellite and spacecraft development.",
      angle: 270,
    },
    {
      name: "Sensomatic",
      logo: "public/sensomatic.png",
      description: "Sensomatic develops advanced sensor technologies for aerospace applications, offering high-precision measurement and monitoring systems for critical mission parameters.",
      angle: 315,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % sponsors.length);
        setIsTransitioning(false);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeSponsor = sponsors[activeIndex];
  const needleAngle = activeSponsor.angle;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const radius = isMobile ? 160 : 300;

  return (
    <section id="sponsors" className="relative min-h-screen bg-black py-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-600/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium border border-blue-600/20" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
              Partnership Excellence
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Our <span className="text-blue-600">Sponsors</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Powering innovation through strategic partnerships that drive the future of aerospace technology.
          </p>
        </div>

        {/* Sponsors Wheel with Center Description */}
        <div className="relative w-full max-w-6xl mx-auto mb-20">
          <div className="relative w-full aspect-square max-w-4xl mx-auto">
            {/* Sponsor logos in circle */}
            {sponsors.map((sponsor, index) => {
              const angle = sponsor.angle;
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
              const isActive = index === activeIndex;

              return (
                <div
                  key={sponsor.name}
                  className="absolute top-1/2 left-1/2 transition-all duration-700 z-20"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <button
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setActiveIndex(index);
                        setIsTransitioning(false);
                      }, 400);
                    }}
                    className={`p-3 md:p-4 rounded-lg border transition-all duration-500 hover:scale-110 ${
                      isActive
                        ? "bg-blue-600/20 border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.5)] scale-110"
                        : "bg-gray-900/80 backdrop-blur-sm border-gray-700/50 hover:border-blue-400/50 hover:bg-gray-800/80"
                    }`}
                  >
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      className={`h-8 md:h-12 w-auto object-contain transition-all duration-500 ${
                        isActive ? "brightness-125" : "brightness-90 hover:brightness-110"
                      }`}
                    />
                  </button>
                </div>
              );
            })}

            {/* Center Description Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[280px] md:w-[420px]">
              <div
                className={`bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl border border-blue-600/30 rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-500 ${
                  isTransitioning ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
              >
                {/* Icon/Logo placeholder */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-800/50 rounded-2xl flex items-center justify-center p-3">
                    <img 
                      src={activeSponsor.logo} 
                      alt={activeSponsor.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Company name */}
                <h3 className="text-xl md:text-2xl font-bold text-center mb-3 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {activeSponsor.name}
                </h3>
                
                {/* Description */}
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed text-center" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {activeSponsor.description}
                </p>
                
              </div>
            </div>
          </div>
        </div>

        {/* Become a Partner CTA */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>Become a Partner</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Join our mission to advance aerospace technology and shape the future of space exploration.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(37,99,235,0.3)] hover:shadow-[0_0_35px_rgba(37,99,235,0.5)]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Partnership Opportunities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;