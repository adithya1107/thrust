import React, { useEffect } from 'react';
import { Rocket, Target, Users, TrendingUp } from 'lucide-react';
import MediaEngagement from './MediaEngagement';

const About = () => {
  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const highlights = [
    { icon: Rocket, label: 'Advanced Propulsion', value: 'Custom Motors' },
    { icon: Target, label: 'Record Altitude', value: '30,000 ft' },
    { icon: Users, label: 'Team Members', value: '50+ Students' },
    { icon: TrendingUp, label: 'Success Rate', value: '95% Flights' }
  ];

  return (
    <>
      <section id="about" className="relative py-24 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            About <span className="text-blue-600">thrustMIT</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-3xl mx-auto text-lg leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, letterSpacing: '0.05em' }}>
            India's Top Rocketry Team
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-3xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>Our Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                thrustMIT started off in early 2016 as a group of rocket enthusiasts with the aim of promoting High-Power-Rocketry in India. The team takes part in the International Rocket Engineering Competition (previously called the Spaceport America Cup), which is the largest international platform in the world for students to showcase their rocketry skills. We are currently the top team in India and one of the top teams in Asia.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-600/20 rounded-2xl p-6">
              <p className="text-gray-300 leading-relaxed text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                In 2025, Vayuvega reached 29,432 ft, placing 4th in the 30K COTS category and 2nd in the SDL Payload Challenge. In 2024, the team built AgniAstra, India’s first student 30K-ft-class rocket, ranking 7th globally and top in Asia at the SA Cup. The team also earned notable past awards, including 4th in the James Barrowman Award (2022) and design/professionalism recognitions in 2018–19.
              </p>
            </div>

          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-600/20 to-blue-900/20 rounded-3xl overflow-hidden border border-blue-600/30 shadow-2xl shadow-blue-600/20">
              <img 
                src="https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/about/team.JPG" 
                alt="Team Photo" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-3 md:p-4">
                <p className="text-xs md:text-sm text-gray-400 mb-1" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                  Team thrustMIT
                </p>
                <p className="text-base md:text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Building Tomorrow's Rockets Today
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />
          </div>
        </div>
      <MediaEngagement />
      </div>
      </section>

    </>
  );
};

export default About;