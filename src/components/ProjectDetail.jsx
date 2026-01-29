import React, { useEffect } from 'react';
import { Rocket, Clock, Users, MapPin, ChevronRight, ArrowLeft, Gauge, Zap, Package, Layers, ChevronLeft, FileText } from 'lucide-react';

const ProjectDetail = ({ Header, Footer, projectId, onNavigateHome, onNavigateToProjects, onNavigateToProject, headerProps, onScrollToSection, onNavigateToRocketWiki, onNavigateToBlog }) => {
  const projects = [
    {
      id: 'vayuvega',
      name: 'Vayuvega', 
      category: '30K COTS', 
      description: "Vayuvega was thrustMIT's latest project and second 30K COTS class rocket, launched at the 2025 IREC. Vayuvega achieved an apogee of 29,432 feet and was subsequently recovered with no damage to the airframe and systems. Vayuvega featured a payload experiment aiming to validate real-time visual tracking in extreme flight conditions, for which the team won the 2nd Place Prize in the SDL Payload Challenge. Project Vayuvega is our most successful rocket yet, achieving 4th position in the 30K COTS category and 22nd overall at the 2025 IREC.",
      image: 'https://ik.imagekit.io/wns4q4r9n2/Projects/Renders/vayuvega_Uo8rkzyzy.png?updatedAt=1753918489502',
      reportUrl: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/technical-report/Vayuvega.pdf',
      details: {
        maxAltitude: '29,432 ft',
        duration: '2024-25',
        height: '3.50 m',
        diameter: '126 mm',
        wetMass: '36.80 kg',
        motor: 'Aerotech 05500X-PS',
        payload: 'Real-time 3D Visual Tracking System',
        totalLength: '3.50 m',
        totalDiameter: '126 mm',
        totalWeight: '36.80 kg',
        category: '30K COTS',
        achievement: '4th in 30K COTS, 2nd Place SDL Payload Challenge'
      }
    },
    { 
      id: 'agniastra',
      name: 'AgniAstra', 
      category: '30K COTS', 
      description: "AgniAstra was thrustMIT's debut entry in the 2024 Spaceport America Cup under the 30K COTS category. Featuring a glass fibre and carbon fibre airframe with an Aluminium 6061 internal structure, it carried a CanSat payload to conduct real-time pose estimation via computer vision. The SRAD modular flight computer managed recovery, data logging, and telemetry. Project AgniAstra ranked as Asia's top 30K COTS team.",
      image: 'https://ik.imagekit.io/wns4q4r9n2/Projects/Renders/rocket%20render%20thrustmit_TNOILvtU5.png?updatedAt=1753908331004',
      reportUrl: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/technical-report/agniastra.pdf',
      details: {
        maxAltitude: '17,010 ft',
        duration: '2023-24',
        height: '3.19 m',
        diameter: '124 mm',
        wetMass: '32.21 kg',
        motor: 'Cesaroni N5800-P',
        payload: '3D Vision & Pose Estimation',
        totalLength: '3.19 m',
        totalDiameter: '124 mm',
        totalWeight: '32.21 kg',
        category: '30K COTS',
        achievement: "Asia's Top 30K COTS Team"
      }
    },
    { 
      id: 'altair',
      name: 'Altair', 
      category: '10K COTS', 
      description: "Altair was thrustMIT's 10K COTS submission to the 2023 Spaceport America Cup. The rocket featured leading-edge extended fins and crankshaft-airbrakes to optimize flow separation. Project Altair was our most accurate launch with a 0.51% percentage error in apogee, reaching 10,331 ft.",
      image: 'https://ik.imagekit.io/wns4q4r9n2/Projects/Renders/altair_IoG2kLg-73.png?updatedAt=1753914870160',
      reportUrl: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/technical-report/Altair.pdf',
      details: {
        maxAltitude: '10,331 ft',
        duration: '2022-23',
        height: '2.71 m',
        diameter: '150 mm',
        wetMass: '30.20 kg',
        motor: 'Cesaroni M3400-P',
        payload: '3-DoF Stewart Platform',
        totalLength: '2.71 m',
        totalDiameter: '150 mm',
        totalWeight: '30.20 kg',
        category: '10K COTS',
        achievement: '0.51% Apogee Error'
      }
    },
    { 
      id: 'rayquaza',
      name: 'Rayquaza', 
      category: '10K COTS', 
      description: "Rayquaza was thrustMIT's 4th developed rocket and project entry to the 2022 Spaceport America Cup. Comprising a carbon fibre airframe and Aluminium 6063 internal structure, Project Rayquaza was our first ever rocket to reach 10,000 ft. Rayquaza came 4th in the James Barrowman Award with a percentage error of less than 0.3%.",
      image: 'https://ik.imagekit.io/wns4q4r9n2/Projects/Renders/rayquaza_2-xs2pG3B.png?updatedAt=1753914869235',
      details: {
        maxAltitude: '11,662 ft',
        duration: '2021-22',
        height: '2.76 m',
        diameter: '150 mm',
        wetMass: '29.73 kg',
        motor: 'Cesaroni M3400-P',
        payload: 'Acoustic Dampening of CNT',
        totalLength: '2.76 m',
        totalDiameter: '150 mm',
        totalWeight: '29.73 kg',
        category: '10K COTS',
        achievement: '4th James Barrowman Award'
      }
    },
    { 
      id: 'phoenix',
      name: 'Phoenix', 
      category: '10K COTS', 
      description: "Phoenix was thrustMIT's 3rd rocket and official entry to the 2021 Spaceport America Cup. With a carbon fibre airframe and glass fibre Avionics Bay, the rocket featured a functional payload experiment aiming to accurately measure and log vibrations experienced by a CanSat during flight using a piezoelectric transducer. Project Phoenix achieved 7th position in the 10K COTS category and 16th position overall.",
      image: 'https://ik.imagekit.io/wns4q4r9n2/Projects/Renders/phoenix_8Nh7jG9bA_8isaJXVLu.png?updatedAt=1753914869369',
      details: {
        maxAltitude: '10,000 ft',
        duration: '2020-21',
        height: '3.20 m',
        diameter: '150 mm',
        wetMass: '38.10 kg',
        motor: 'Cesaroni N2200-P',
        payload: 'Piezo-Electric Device to detect Vibrations',
        totalLength: '3.20 m',
        totalDiameter: '150 mm',
        totalWeight: '38.10 kg',
        category: '10K COTS',
        achievement: '7th in 10K COTS, 16th Overall'
      }
    },
    { 
      id: 'arya',
      name: 'Arya', 
      category: 'Sounding Rocket', 
      description: "Arya, launched at the 2019 Spaceport America Cup, was our 2nd rocket made entirely out of carbon fibre with a target apogee of 3 km. It featured Aluminium 6061-T6 bulkheads and centering rings. The team successfully launched Lapwing II, a subscale rocket used to test recovery systems. Project Arya featured an in-house reefing mechanism to optimize recovery operations.",
      image: 'https://ik.imagekit.io/wns4q4r9n2/Projects/Renders/arya_K-kwONsP_.png?updatedAt=1753914869619',
      details: {
        maxAltitude: '2,047 ft',
        duration: '2018-19',
        height: '2.45 m',
        diameter: '140 mm',
        wetMass: '22.36 kg',
        motor: 'Aerotech M1845-P',
        payload: 'Non-Newtonian Fluid Damper',
        totalLength: '2.45 m',
        totalDiameter: '140 mm',
        totalWeight: '22.36 kg',
        category: '10K COTS',
        achievement: 'Carbon Fibre Construction'
      }
    },
    { 
      id: 'vyom',
      name: 'Vyom', 
      category: 'Debut Rocket', 
      description: "Vyom was our first rocket, launched at the 2018 Spaceport America Cup. It featured a glass fibre airframe, couplers and fin attachments, and a nose tip made of ABS. It reached an apogee of 1.2 km. Project Vyom won the Best Debutant Award at the 2018 SA Cup.",
      image: 'https://ik.imagekit.io/wns4q4r9n2/Projects/Renders/vyom_hcjagHclU_JJM559muPW.png?updatedAt=1753914869355',
      reportUrl: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/technical-report/Vyom.pdf',
      details: {
        maxAltitude: '3,937 ft',
        duration: '2017-18',
        height: '2.54 m',
        diameter: '150 mm',
        wetMass: '26.00 kg',
        motor: 'Aerotech M1845-P',
        payload: 'Non Functional',
        totalLength: '2.54 m',
        totalDiameter: '150 mm',
        totalWeight: '26.00 kg',
        category: '10K COTS',
        achievement: 'Best Debutant Award 2018'
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

  // Find the project based on projectId
  const project = projects.find(p => p.id === projectId);

  // compute index and prev/next ids
  const currentIndex = projects.findIndex(p => p.id === projectId);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Determine rotation degree based on project name
  const getRotationDegree = (projectName) => {
    const reverseRotationProjects = ['Rayquaza', 'Arya', 'Vyom'];
    return reverseRotationProjects.includes(projectName) ? -90 : 90;
  };

  // Handle technical report click
  const handleViewReport = () => {
    if (project.reportUrl) {
      window.open(project.reportUrl, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

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

  // Coming Soon Page for Varuna
  if (project.comingSoon) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Fullscreen Background Video */}
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="../video/vid2.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Header {...headerProps} />

          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center px-4 pt-32 md:pt-40 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {project.name}
                  </h1>
                  
                  <div className="inline-block bg-blue-600/30 backdrop-blur-md border border-blue-400/50 rounded-full px-6 py-3 mb-6">
                    <p className="text-xl md:text-2xl font-bold text-blue-300 drop-shadow-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      Coming Soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="relative">
            <Footer />
          </div>
        </div>

        {/* Side Navigation Arrows */}
        <button
          onClick={() => prevProject && onNavigateToProject && onNavigateToProject(prevProject.id)}
          disabled={!prevProject}
          className={`fixed left-4 md:left-8 top-20 md:top-1/2 md:-translate-y-1/2 z-30 p-3 rounded-lg backdrop-blur-md transition-all ${prevProject ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:scale-110' : 'opacity-20 cursor-not-allowed'}`}
          aria-label="Previous project"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => nextProject && onNavigateToProject && onNavigateToProject(nextProject.id)}
          disabled={!nextProject}
          className={`fixed right-4 md:right-8 top-20 md:top-1/2 md:-translate-y-1/2 z-30 p-3 rounded-lg backdrop-blur-md transition-all ${nextProject ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:scale-110' : 'opacity-20 cursor-not-allowed'}`}
          aria-label="Next project"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    );
  }

  // Regular Project Detail Page
  const rotationDegree = getRotationDegree(project.name);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header {...headerProps} />

      {/* Hero Section with Description and Specs on Left, Rocket on Right */}
      <section className="relative pt-32 md:pt-40 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Title, Description, and Specs */}
            <div className="space-y-8">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <h1 className="text-5xl md:text-7xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {project.name}
                  </h1>
                  {project.reportUrl && (
                    <a
                      href={project.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/50"
                      aria-label="View Technical Report"
                    >
                      <FileText size={18} className="group-hover:rotate-12 transition-transform" />
                      <span className="text-sm font-semibold whitespace-nowrap" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        Technical Report
                      </span>
                    </a>
                  )}
                </div>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, letterSpacing: '0.03em' }}>
                  {project.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Technical <span className="text-blue-600">Specifications</span>
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-xl p-4 hover:border-blue-600/50 transition-all">
                    <p className="text-gray-400 text-xs mb-1" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Height</p>
                    <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.totalLength}</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-xl p-4 hover:border-blue-600/50 transition-all">
                    <p className="text-gray-400 text-xs mb-1" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Diameter</p>
                    <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.totalDiameter}</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-xl p-4 hover:border-blue-600/50 transition-all">
                    <p className="text-gray-400 text-xs mb-1" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Wet Mass</p>
                    <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.totalWeight}</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-xl p-4 hover:border-blue-600/50 transition-all">
                    <p className="text-gray-400 text-xs mb-1" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Motor</p>
                    <p className="text-xl font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.motor}</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-xl p-4 hover:border-blue-600/50 transition-all">
                    <p className="text-gray-400 text-xs mb-1" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Category</p>
                    <p className="text-lg font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.category}</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-xl p-4 hover:border-blue-600/50 transition-all">
                    <p className="text-gray-400 text-xs mb-1" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Achievement</p>
                    <p className="text-base font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{project.details.achievement}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Rocket Image */}
            <div className="relative flex items-center justify-center min-h-[700px]">
              <div className="relative rounded-3xl p-8 flex items-center justify-center">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="max-w-full max-h-[700px] object-contain"
                  style={{ 
                    width: 'auto', 
                    height: '700px',
                    transform: `rotate(${rotationDegree}deg)`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer 
        onNavigateHome={onNavigateHome}
        onScrollToSection={onScrollToSection}
        onNavigateToRocketWiki={onNavigateToRocketWiki}
        onNavigateToBlog={onNavigateToBlog}
      />

      {/* Side Navigation Arrows */}
      <button
        onClick={() => prevProject && onNavigateToProject && onNavigateToProject(prevProject.id)}
        disabled={!prevProject}
        className={`fixed left-4 md:left-8 top-20 md:top-1/2 md:-translate-y-1/2 z-30 p-3 rounded-lg backdrop-blur-md transition-all ${prevProject ? 'bg-white/5 hover:bg-white/6 text-white hover:scale-110' : 'opacity-20 cursor-not-allowed'}`}
        aria-label="Previous project"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => nextProject && onNavigateToProject && onNavigateToProject(nextProject.id)}
        disabled={!nextProject}
        className={`fixed right-4 md:right-8 top-20 md:top-1/2 md:-translate-y-1/2 z-30 p-3 rounded-lg backdrop-blur-md transition-all ${nextProject ? 'bg-white/5 hover:bg-white/6 text-white hover:scale-110' : 'opacity-20 cursor-not-allowed'}`}
        aria-label="Next project"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ProjectDetail;