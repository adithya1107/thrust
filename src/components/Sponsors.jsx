import React, { useState, useEffect } from 'react';

const Sponsors = () => {
  const sponsors = [
    {
      name: "MAHE",
      logo: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/sponsors/mahe.png",
      description: "Manipal Academy of Higher Education (MAHE) is a prestigious private university in India, renowned for its excellence in education, research, and innovation across diverse fields including engineering, medicine, and management. MAHE fosters a vibrant academic environment that nurtures talent and drives impactful advancements.",
      angle: 0,
      website: "https://manipal.edu",
    },
    {
      name: "Ansys",
      logo: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/sponsors/ansys.png",
      description: "Ansys provides engineering simulation software for product design and testing. Used across aerospace, automotive, and electronics industries for structural, fluid, electromagnetic, and systems simulation.",
      angle: 51.4,
      website: "https://www.ansys.com",
    },
    {
      name: "Altium",
      logo: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/sponsors/altium.png",
      description: "Altium is the world's leading PCB design software that combines schematic, layout, and everything else needed in one environment to effortlessly design printed circuit boards. Used across industries from aerospace and defense to automotive and consumer electronics, Altium empowers designers to develop electronics products faster and more efficiently than ever before.",
      angle: 102.8,
      website: "https://www.altium.com",
    },
    {
      name: "easyEDA",
      logo: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/sponsors/easyEDA.png",
      description: "EasyEDA is a web-based EDA tool that allows users to design, simulate, and share electronic circuits and PCBs. It offers an intuitive interface for schematic capture, PCB layout, and circuit simulation, making it accessible for both beginners and professionals in electronics design.",
      angle: 154.2,
      website: "https://easyeda.com",
    },
    {
      name: "JCLPCB",
      logo: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/sponsors/JCL.png",
      description: "JCLPCB is a leading PCB manufacturer that provides high-quality printed circuit board fabrication and assembly services. With advanced manufacturing capabilities and a commitment to quality, JCLPCB serves customers worldwide, offering fast turnaround times and competitive pricing for PCB production.",
      angle: 205.6,
      website: "https://jlcpcb.com",
    },
    {
      name: "Funique Composites",
      logo: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/sponsors/Funique-Logo.png",
      description: "Funique Composites is a leading provider of advanced composite materials and solutions for aerospace, automotive, and industrial applications. With a focus on innovation and sustainability, Funique delivers high-performance composites that enable lighter, stronger, and more efficient products across various industries.",
      angle: 257,
      website: "",
    },
    {
      name: "RC Engineering Works",
      logo: null,
      description: "RC Engineering Works is a premier provider of precision engineering services and solutions for the aerospace, defense, and industrial sectors. With a commitment to quality and innovation, RC Engineering Works delivers custom machining, fabrication, and assembly services that meet the highest standards of performance and reliability.",
      angle: 308.4,
      website: "",
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (hoveredIndex === null) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % sponsors.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [hoveredIndex, sponsors.length]);

  const activeSponsor = sponsors[hoveredIndex !== null ? hoveredIndex : activeIndex];
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const radius = isMobile ? 160 : 370;

  const handleSponsorClick = (sponsor, index) => {
    setActiveIndex(index);
    if (sponsor.website) {
      window.open(sponsor.website, '_blank', 'noopener,noreferrer');
    }
  };

  // Styled text logo for sponsors without an image
  // Accepts optional customInitials, customSuffix, and large (bool) to scale up
  const TextLogo = ({ name, isActive, customInitials, customSuffix, large }) => {
    const words = name.split(' ');
    const initials = customInitials ?? words.map(w => w[0]).join('');
    const suffix = customSuffix ?? words[words.length - 1].toUpperCase();

    const initialsSize = large
      ? (isMobile ? '26px' : '32px')
      : (isMobile ? '18px' : '22px');
    const suffixSize = large
      ? (isMobile ? '9px' : '11px')
      : (isMobile ? '7px' : '8px');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          padding: '4px 8px',
        }}
      >
        {/* Large initials */}
        <div
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: initialsSize,
            fontWeight: 900,
            letterSpacing: '0.12em',
            color: isActive ? '#60a5fa' : '#94a3b8',
            lineHeight: 1,
            transition: 'color 0.3s',
          }}
        >
          {initials}
        </div>
        {/* Thin separator line */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: isActive
              ? 'linear-gradient(90deg, transparent, #3b82f6, transparent)'
              : 'linear-gradient(90deg, transparent, #475569, transparent)',
            transition: 'background 0.3s',
          }}
        />
        {/* Bottom label */}
        <div
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: suffixSize,
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: isActive ? '#93c5fd' : '#64748b',
            textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}
        >
          {suffix}
        </div>
      </div>
    );
  };

  // Helper to resolve TextLogo props per sponsor
  const getTextLogoProps = (sponsor) => {
    if (sponsor.name === 'RC Engineering Works') {
      return { customInitials: 'RC', customSuffix: 'WORKS', large: true };
    }
    return {};
  };

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
            <span
              className="px-4 py-2 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium border border-blue-600/20"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
            >
              Partnership Excellence
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Our <span className="text-blue-600">Sponsors</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Powering innovation through strategic partnerships that drive the future of aerospace technology.
          </p>
        </div>

        {/* Sponsors Wheel */}
        <div className="relative w-full max-w-6xl mx-auto mb-20">
          {!isMobile ? (
            <div className="relative w-full aspect-square max-w-4xl mx-auto">
              {sponsors.map((sponsor, index) => {
                const angle = sponsor.angle;
                const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
                const isActive = hoveredIndex !== null ? hoveredIndex === index : index === activeIndex;

                return (
                  <div
                    key={sponsor.name}
                    className="absolute top-1/2 left-1/2 transition-all duration-700 z-20"
                    style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                  >
                    <button
                      onClick={() => handleSponsorClick(sponsor, index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => { setHoveredIndex(null); setActiveIndex(index); }}
                      title={`Visit ${sponsor.name}`}
                      className={`p-2 md:p-4 rounded-lg border transition-all duration-300 hover:scale-110 cursor-pointer ${
                        isActive
                          ? "bg-blue-600/20 border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.5)] scale-110"
                          : "bg-gray-900/80 backdrop-blur-sm border-gray-700/50 hover:border-blue-400/50 hover:bg-gray-800/80"
                      }`}
                    >
                      {sponsor.logo ? (
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className={`w-auto object-contain transition-all duration-500 ${
                            sponsor.name === "MAHE" ? "h-14 md:h-28" :
                            sponsor.name === "easyEDA" || sponsor.name === "JCLPCB" ? "h-10 md:h-24" :
                            sponsor.name === "Funique Composites" ? "h-10 md:h-20" :
                            "h-6 md:h-16"
                          } ${isActive ? "brightness-125" : "brightness-90 hover:brightness-110"}`}
                        />
                      ) : (
                        <div className="h-10 md:h-20 flex items-center justify-center" style={{ minWidth: isMobile ? '56px' : '90px' }}>
                          <TextLogo name={sponsor.name} isActive={isActive} {...getTextLogoProps(sponsor)} />
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}

              {/* Center Description Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[160px] md:w-[420px]">
                <div className="bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl border border-blue-600/30 rounded-2xl md:rounded-3xl p-3 md:p-8 shadow-2xl transition-all duration-300">
                  <div className="flex items-center justify-center mb-2 md:mb-4 transition-all duration-300">
                    <div className="w-12 h-12 md:w-24 md:h-24 bg-gray-800/50 rounded-xl md:rounded-2xl flex items-center justify-center p-2 md:p-3 transition-all duration-300">
                      {activeSponsor.logo ? (
                        <img
                          src={activeSponsor.logo}
                          alt={activeSponsor.name}
                          className="w-full h-full object-contain transition-all duration-300"
                        />
                      ) : (
                        <TextLogo name={activeSponsor.name} isActive={true} {...getTextLogoProps(activeSponsor)} />
                      )}
                    </div>
                  </div>

                  <h3
                    className="text-sm md:text-2xl font-bold text-center mb-1 md:mb-3 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent transition-all duration-300"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {activeSponsor.name}
                  </h3>

                  <p
                    className="text-[10px] md:text-sm text-gray-400 leading-relaxed text-center transition-all duration-300"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {activeSponsor.description}
                  </p>

                </div>
              </div>
            </div>
          ) : (
            /* Mobile list */
            <div className="flex flex-col gap-4">
              {sponsors.map((sponsor, index) => (
                <a
                  key={sponsor.name}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 items-start bg-gray-900/60 border border-white/5 rounded-2xl p-4 hover:border-blue-400/30 hover:bg-gray-800/60 transition-all duration-300"
                >
                  <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gray-800/30 rounded-md p-2">
                    {sponsor.logo ? (
                      <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-contain" />
                    ) : (
                      <TextLogo name={sponsor.name} isActive={false} {...getTextLogoProps(sponsor)} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>{sponsor.name}</h4>
                    <p className="text-gray-400 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{sponsor.description}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;