import React from 'react';

const Projects = () => {
  const projects = [
    { name: 'Agniastra', category: 'Competition Rocket', status: 'Active', description: 'Our flagship competition rocket designed for the 30,000ft altitude challenge', image: '/public/agni.png' },
    { name: 'Altair', category: 'Research Platform', status: 'Testing', description: 'Experimental testbed for new propulsion technologies', image: '/altair.png' },
    { name: 'Rayquaza', category: 'High Altitude', status: 'Complete', description: 'Record-breaking flight achieving 28,000ft altitude', image: '/ray.png' },
    { name: 'Phoenix', category: 'Reusable System', status: 'Development', description: 'Next-generation reusable rocket platform', image: '/pheo.png' },
    { name: 'Arya', category: 'Sounding Rocket', status: 'Active', description: 'Atmospheric research and data collection mission', image: '/arya.png' },
    { name: 'Vyom', category: 'Advanced Avionics', status: 'Testing', description: 'AI-powered flight control and navigation system', image: '/vyom.png' }
  ];

  // Font loading for Orbitron (similar to the heading font in the image)
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-4 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Our <span className="text-blue-600">Projects</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
          Discover our research and development projects, each pushing the limits of rocketry
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-600/50 hover:bg-white/10 transition-all group cursor-pointer">
              <div className="w-full h-32 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden ">
                <img 
                  src={project.image} 
                  alt={`${project.name} logo`}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.02em' }}>{project.name}</h3>
              <div className="flex items-center gap-2 mb-3">
              </div>
              <p className="text-sm text-gray-400 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;