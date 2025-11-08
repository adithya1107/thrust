import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const Alumni = ({ initialYear, onNavigateHome }) => {
  const [selectedYear, setSelectedYear] = useState(initialYear || '2025');
  const [hoveredAlumni, setHoveredAlumni] = useState(null);

  // Update selected year when initialYear prop changes
  useEffect(() => {
    if (initialYear) {
      setSelectedYear(initialYear);
    }
  }, [initialYear]);

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const alumniData = {
    '2025': {
      members: [
        {
          id: 1,
          name: 'Satvik Agrawal',
          image: '/alumni-2025/satvik.webp',
          atThrustMIT: 'Team Leader',
          currentWork: 'Aerospace Engineer at SpaceX',
          socials: {
            linkedin: '#',
            github: '#',
            instagram: '#',
            email: 'parth@alumni.thrustmit.in'
          }
        },
        {
          id: 2,
          name: 'Geethika Ravu',
          image: '/alumni-2025/geetika.webp',
          atThrustMIT: 'Team Manager',
          currentWork: 'Robotics Engineer at Blue Origin',
          socials: {
            linkedin: '#',
            twitter: '#',
            instagram: '#',
            email: 'sarah@alumni.thrustmit.in'
          }
        },
        {
          id: 3,
          name: 'Ajinkya Sathe',
          image: '/alumni-2025/ajinkya.webp',
          atThrustMIT: 'Aerodynamics Head',
          currentWork: 'Design Engineer at ISRO',
          socials: {
            linkedin: '#',
            github: '#',
            email: 'david@alumni.thrustmit.in'
          }
        },
        {
          id: 13,
          name: 'Ayyan Bhartia',
          image: '/alumni-2025/ayyan.webp',
          atThrustMIT: 'Aerodynamics Member',
          currentWork: 'Aerospace Intern at NASA',
          socials: {
            linkedin: '#',
            instagram: '#',
            email: ''
          }
        },
        {
          id: 14,
          name: 'Samarth Vinod',
          image: '/alumni-2025/samarth.webp',
          atThrustMIT: 'Avionics Head',
          currentWork: 'Mechanical Engineer at Rocket Lab',
          socials: {
            linkedin: '#',
            twitter: '#',
            email: ''
          }
        },
        {
          id: 20,
          name: 'Adithi Shetty N',
          image: '/alumni-2025/adithi.webp',
          atThrustMIT: 'Avionics Member',
          currentWork: 'Systems Engineer at Blue Origin',
          socials: {
            linkedin: '#',
            instagram: '#',
            email: ''
          }
        },
        {
          id: 21,
          name: 'Jahnavi U',
          image: '/alumni-2025/jahnavi.webp',
          atThrustMIT: 'Avionics Member',
          currentWork: 'Aerospace Intern at SpaceX',
          socials: {
            linkedin: '#',
            twitter: '#',
            email: ''
          }
        },
        {
          id: 22,
          name: 'Tejas Patil',
          image: '/alumni-2025/tejas.webp',
          atThrustMIT: 'Payload Head',
          currentWork: 'Mechanical Engineer at ISRO',
          socials: {
            linkedin: '#',
            github: '#',
            email: ''
          }
        },
        {
          id: 23,
          name: 'Mohul Podder',
          image: '/alumni-2025/mohul.webp',
          atThrustMIT: 'Payload Member',
          currentWork: 'Aerospace Intern at NASA',
          socials: {
            linkedin: '#',
            instagram: '#',
            email: ''
          }
        }
      ]
    },
    '2024': {
      members: [
        {
          id: 4,
          name: 'Parth Jain',
          image: '/alumni-2024/parth.webp',
          atThrustMIT: 'Team Leader',
          currentWork: 'Systems Engineer at NASA',
          socials: {
            linkedin: '#',
            instagram: '#',
            email: 'emily@alumni.thrustmit.in'
          }
        },
        {
          id: 5,
          name: 'Vinoy S',
          image: '/alumni-2024/vinoy.webp',
          atThrustMIT: 'Team Manager',
          currentWork: 'Propulsion Specialist at Rocket Lab',
          socials: {
            linkedin: '#',
            twitter: '#',
            github: '#',
            email: 'michael@alumni.thrustmit.in'
          }
        },
        {
          id: 15,
          name: 'Vedang Bhosale',
          image: '/alumni-2024/vedang.webp',
          atThrustMIT: 'Aerodynamics Head',
          currentWork: 'Aerospace Engineer at SpaceX',
          socials: {
            linkedin: '#',
            github: '#',
            email: ''
          }
        },
        {
          id: 16,
          name: 'Aiyaz Karani',
          image: '/alumni-2024/aiyaz.webp',
          atThrustMIT: 'Recovery Head',
          currentWork: 'Rocket Propulsion Intern at Blue Origin',
          socials: {
            linkedin: '#',
            instagram: '#',
            email: ''
          }
        },
        {
          id: 17,
          name: 'Monish Anne',
          image: '/alumni-2024/monish.webp',
          atThrustMIT: 'Avionics Head',
          currentWork: 'Structural Engineer at Virgin Galactic',
          socials: {
            linkedin: '#',
            twitter: '#',
            email: ''
          }
        },
        {
          id: 24,
          name: 'Satwik Agarwal',
          image: '/alumni-2024/satwik.webp',
          atThrustMIT: 'Avionics Member',
          currentWork: 'Aerospace Intern at ISRO',
          socials: {
            linkedin: '#',
            github: '#',
            email: ''
          }
        },
        {
          id: 25,
          name: 'Keeratraj Singh',
          image: '/alumni-2024/keeratraj.webp',
          atThrustMIT: 'Avionics Member',
          currentWork: 'Mechanical Engineer at Rocket Lab',
          socials: {
            linkedin: '#',
            instagram: '#',
            email: ''
          }
        },
        {
          id: 26,
          name: 'Aman Soni',
          image: '/alumni-2024/aman.webp',
          atThrustMIT: 'Avionics Member',
          currentWork: 'Aerospace Intern at NASA',
          socials: {
            linkedin: '#',
            twitter: '#',
            email: ''
          }
        },
        {
          id: 27,
          name: 'Hrishikesh Singh Yadav',
          image: '/alumni-2024/hrishikesh.webp',
          atThrustMIT: 'Payload Head',
          currentWork: 'Systems Engineer at SpaceX',
          socials: {
            linkedin: '#',
            github: '#',
            email: ''
          }
        }
      ]
    },
    '2023': {
      members: [
        {
          id: 6,
          name: 'Jessica Turner',
          role: 'Software Lead',
          image: '/api/placeholder/400/400',
          atThrustMIT: 'Software Lead',
          currentWork: 'Flight Software Engineer at Boeing',
          socials: {
            linkedin: '#',
            github: '#',
            email: 'jessica@alumni.thrustmit.in'
          }
        },
        {
          id: 7,
          name: 'Ryan Patel',
          role: 'Aerodynamics Lead',
          image: '/api/placeholder/400/400',
          atThrustMIT: 'Aerodynamics Lead',
          currentWork: 'Research Scientist at MIT',
          socials: {
            linkedin: '#',
            instagram: '#',
            email: 'ryan@alumni.thrustmit.in'
          }
        }
      ]
    },
    '2022': {
      members: [
        {
          id: 8,
          name: 'Amanda Lee',
          role: 'Technical Lead',
          image: '/api/placeholder/400/400',
          atThrustMIT: 'Technical Lead',
          currentWork: 'Senior Engineer at Virgin Galactic',
          socials: {
            linkedin: '#',
            twitter: '#',
            email: 'amanda@alumni.thrustmit.in'
          }
        }
      ]
    },
    '2021': {
      members: [
        {
          id: 9,
          name: 'James Kumar',
          role: 'Team Manager',
          image: '/api/placeholder/400/400',
          atThrustMIT: 'Team Manager',
          currentWork: 'Project Manager at Lockheed Martin',
          socials: {
            linkedin: '#',
            github: '#',
            email: 'james@alumni.thrustmit.in'
          }
        }
      ]
    },
    '2020': {
      members: [
        {
          id: 10,
          name: 'Sophia Martinez',
          role: 'Structures Engineer',
          image: '/api/placeholder/400/400',
          atThrustMIT: 'Structures Engineer',
          currentWork: 'Structural Analyst at Northrop Grumman',
          socials: {
            linkedin: '#',
            instagram: '#',
            email: 'sophia@alumni.thrustmit.in'
          }
        }
      ]
    },
    '2019': {
      members: [
        {
          id: 11,
          name: 'Kevin Zhang',
          role: 'Avionics Engineer',
          image: '/api/placeholder/400/400',
          atThrustMIT: 'Avionics Engineer',
          currentWork: 'Electronics Engineer at Aerojet Rocketdyne',
          socials: {
            linkedin: '#',
            github: '#',
            email: 'kevin@alumni.thrustmit.in'
          }
        }
      ]
    },
    '2018': {
      members: [
        {
          id: 12,
          name: 'Rachel Johnson',
          role: 'Founding Member',
          image: '/api/placeholder/400/400',
          atThrustMIT: 'Founding Member',
          currentWork: 'Chief Engineer at Relativity Space',
          socials: {
            linkedin: '#',
            twitter: '#',
            instagram: '#',
            email: 'rachel@alumni.thrustmit.in'
          }
        }
      ]
    }
  };

  const years = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];

  const SocialIcon = ({ type, url }) => {
    const icons = {
      linkedin: Linkedin,
      github: Github,
      instagram: Instagram,
      twitter: Twitter,
      facebook: Facebook,
      email: Mail
    };
    
    const Icon = icons[type];
    
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-110 group"
        onClick={(e) => e.stopPropagation()}
      >
        <Icon size={18} className="text-blue-400 group-hover:text-white transition-colors" />
      </a>
    );
  };

  const AlumniCard = ({ alumni }) => (
    <div
      className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden hover:border-blue-600/50 transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setHoveredAlumni(alumni.id)}
      onMouseLeave={() => setHoveredAlumni(null)}
    >
      {/* Image Container */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-800/20">
          <img 
            src={alumni.image} 
            alt={alumni.name}
            className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
        
        {/* Social Icons - Show on Hover */}
        <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-500 ${
          hoveredAlumni === alumni.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          {Object.entries(alumni.socials).map(([type, url]) => (
            <SocialIcon key={type} type={type} url={url} />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          {alumni.name}
        </h3>
        <p className="text-blue-400 text-sm mb-3" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500, letterSpacing: '0.05em' }}>
          {alumni.atThrustMIT}
        </p>
        <p className="text-gray-400 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
          {alumni.currentWork}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onNavigateHome={onNavigateHome} />
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Our <span className="text-blue-600">Legacy</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, letterSpacing: '0.05em' }}>
              Celebrating the brilliant minds who paved the way and continue to reach for the stars in their careers.
            </p>
          </div>

          {/* Year Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-bold ${
                  selectedYear === year
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Class Info */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Class of <span className="text-blue-600">{selectedYear}</span>
            </h2>
            <p className="text-gray-400 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
              {alumniData[selectedYear].tagline}
            </p>
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumniData[selectedYear].members.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Alumni;