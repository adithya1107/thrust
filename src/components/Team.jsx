import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: 'Shaunak Purkayastha',
      role: 'Team Leader',
      tag: 'leader',
      image: '/team/shaunak.webp',
      socials: {
        linkedin: 'https://www.linkedin.com/in/shaunak-p-552o2',
        github: '#',
        email: 'shaunakp1709@gmail.com'
      }
    },
    {
      id: 2,
      name: 'Anushka Prabhutendolkar',
      role: 'Team Manager',
      tag: 'leader',
      image: '/team/anushka.webp',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: 'anushka@thrustmit.in'
      }
    },
    {
      id: 3,
      name: 'Shaurya Mittal',
      role: 'Aerodynamics Head',
      tag: 'aero',
      image: '/team/shaurya.webp',
      socials: {
        linkedin: '#',
        github: '#',
        email: 'james@thrustmit.in'
      }
    },
    {
      id: 4,
      name: 'Samrudh Raja',
      role: 'Head of Recovery',
      tag: 'aero',
      image: '/team/samrudh.webp',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: 'rachel@thrustmit.in'
      }
    },
    {
      id: 5,
      name: 'Sanskruti Ginde',
      role: 'Avionics Head',
      tag: 'avionics',
      image: '/team/sanskruti.webp',
      socials: {
        linkedin: '#',
        github: '#',
        twitter: '#',
        email: 'thomas@thrustmit.in'
      }
    },
    {
      id: 6,
      name: 'Dhruv Phalod',
      role: 'Ground Systems Head',
      tag: 'avionics',
      image: '/team/dhruv.webp',
      socials: {
        linkedin: '#',
        github: '#',
        twitter: '#',
        email: 'michael@thrustmit.in'
      }
    },
    {
      id: 7,
      name: 'Krishanu Dey',
      role: 'Senior Member',
      tag: 'avionics',
      image: '/team/krishanu.webp',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: 'emily@thrustmit.in'
      }
    },
    {
      id: 8,
      name: 'Shawn Chris D Silva',
      role: 'Senior Member',
      tag: 'avionics',
      image: '/team/shawn.webp',
      socials: {
        linkedin: '#',
        github: '#',
        email: 'kevin@thrustmit.in'
      }
    },
    {
      id: 9,
      name: 'Vanshdeep Trivedi',
      role: 'Senior Member',
      tag: 'avionics',
      image: '/team/vansh.webp',
      socials: {
        linkedin: '#',
        github: '#',
        email: 'alex@thrustmit.in'
      }
    },
    {
      id: 10,
      name: 'Mutra Sai Tharun',
      role: 'Head of Payload',
      tag: 'payload',
      image: '/team/mutra.webp',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: 'sarah@thrustmit.in'
      }
    },
    {
      id: 11,
      name: 'Adi Narayan',
      role: 'Senior Member',
      tag: 'payload',
      image: '/team/adi.webp',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'marcus@thrustmit.in'
      }
    },
    {
      id: 12,
      name: 'Rudra Rajpurohit',
      role: 'Senior Member',
      tag: 'payload',
      image: '/team/rudra.webp',
      socials: {
        linkedin: '#',
        github: '#',
        email: 'david@thrustmit.in'
      }
    },
    {
      id: 13,
      name: 'Dhruv Jadhav',
      role: 'Head of Propulsion',
      tag: 'propulsion',
      image: '/team/dhruv_jadhav.webp',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: 'sophia@thrustmit.in'
      }
    },
    {
      id: 14,
      name: 'Varun PV',
      role: 'Senior Member',
      tag: 'propulsion',
      image: '/team/varun.webp',
      socials: {
        linkedin: '#',
        instagram: '#',
        twitter: '#',
        email: 'lisa@thrustmit.in'
      }
    },
    {
      id: 15,
      name: 'Tushit Chatterjee',
      role: 'Head of Structures',
      tag: 'structures',
      image: '/team/tushit.webp',
      socials: {
        linkedin: '#',
        github: '#',
        email: 'nathan@thrustmit.in'
      }
    },
    {
      id: 16,
      name: 'Avnish Kaur',
      role: 'Senior Member',
      tag: 'structures',
      image: '/team/avnish.webp',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: ''
      }
    },
    {
      id: 17,
      name: 'Vedant Pankaj Totla',
      role: 'Head of Management',
      tag: 'management',
      image: '/team/vedant.webp',
      socials: {
        linkedin: '#',
        github: '#',
        email: ''
      }
    },
    {
      id: 18,
      name: 'Swara Sule',
      role: 'Senior Member',
      tag: 'management',
      image: '/team/swara.webp',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: ''
      }
    },
    {
      id: 19,
      name: 'Aayush Sinha',
      role: 'Senior Member',
      tag: 'management',
      image: '/team/aayush.webp',
      socials: {
        linkedin: '#',
        github: '#',
        email: ''
      }
    },
    {
      id: 20,
      name: 'Shubhendu Arya',
      role: 'Senior Member',
      tag: 'management',
      image: '/team/shubhendu.webp',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: ''
      }
    },
    {
      id: 21,
      name: 'Prasanna K',
      role: 'Senior Member',
      tag: 'management',
      image: '/team/prasanna.webp',
      socials: {
        linkedin: '#',
        github: '#',
        email: ''
      }
    },
    {
      id: 22,
      name: 'Adithya M Adiga',
      role: 'Senior Member',
      tag: 'management',
      image: '/team/adithya.webp',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: ''
      }
    }
  ];

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

  const MemberCard = ({ member }) => (
    <div
      className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden hover:border-blue-600/50 transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setHoveredMember(member.id)}
      onMouseLeave={() => setHoveredMember(null)}
    >
      {/* Image Container */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-800/20">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
        
        {/* Social Icons - Show on Hover */}
        <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-500 ${
          hoveredMember === member.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          {Object.entries(member.socials).map(([type, url]) => (
            <SocialIcon key={type} type={type} url={url} />
          ))}
        </div>

        {/* Bio - Show on Hover */}
        <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 transition-all duration-500 ${
          hoveredMember === member.id ? 'opacity-100' : 'opacity-0'
        }`}>
          <p className="text-gray-300 text-sm leading-relaxed text-center" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
            {member.bio}
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          {member.name}
        </h3>
        <p className="text-blue-400 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500, letterSpacing: '0.05em' }}>
          {member.role}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Our <span className="text-blue-600">Team</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, letterSpacing: '0.05em' }}>
              Meet the brilliant minds behind thrustMIT - passionate engineers, innovators, and dreamers who are literally reaching for the stars.
            </p>
          </div>

          {/* Leadership Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.filter(m => m.tag === 'leader').map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          {/* Aerodynamics Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="text-blue-600">Aerodynamics</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.filter(m => m.tag === 'aero').map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          {/* Avionics Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="text-blue-600">Avionics</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.filter(m => m.tag === 'avionics').map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          {/* Payload Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="text-blue-600">Payload</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.filter(m => m.tag === 'payload').map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          {/* Propulsion Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="text-blue-600">Propulsion</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.filter(m => m.tag === 'propulsion').map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          {/* Structures Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="text-blue-600">Structures</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.filter(m => m.tag === 'structures').map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          {/* Management Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="text-blue-600">Management</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.filter(m => m.tag === 'management').map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
          {/* Faculty Advisors Section */}
          

          {/* Join Team CTA */}
          <div className="mt-20 text-center">
            <div className="inline-block bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-blue-600/30 rounded-3xl p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Want to <span className="text-blue-600">Join Us?</span>
              </h3>
              <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                We're always looking for passionate individuals who want to push the boundaries of rocket science
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Team;