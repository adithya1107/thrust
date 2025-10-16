import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Rocket } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => (prev === key ? null : key));
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown")) {
      setDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const projects = [
    'AgniAstra',
    'Altair',
    'Rayquaza',
    'Pheonix',
    'Arya',
    'Vyom'
  ];

  const alumniYears = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-xl border-b border-blue-600/20 shadow-lg shadow-blue-600/5' 
        : 'bg-black/80 backdrop-blur-md border-b border-white/5'
    }`}>
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <span className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              thrustMIT
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            <a href="#home" className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
              Home
            </a>
            <a href="#about" className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
              About
            </a>
            <a href="#subsystems" className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
              Subsystems
            </a>

            {/* Projects Dropdown */}
            <div className="relative dropdown">
              <button
                onClick={() => toggleDropdown('projects')}
                className="flex items-center gap-1.5 px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 focus:outline-none group"
              >
                Projects 
                <ChevronDown size={18} className={`transition-transform duration-300 ${dropdownOpen === 'projects' ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen === 'projects' && (
                <div className="absolute left-0 mt-2 w-64 backdrop-blur-xl bg-black/30 border border-blue-600/20 shadow-2xl shadow-blue-600/10 rounded-2xl py-2 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  {projects.map((project, index) => (
                    <a 
                      key={project} 
                      href={`#${project.toLowerCase()}`}
                      className="block px-4 py-2.5 mx-2 my-1 text-sm font-medium text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-700/20 rounded-xl transition-all duration-200 group"
                      style={{ animationDelay: `${index * 30}ms` }}
                      onClick={() => setDropdownOpen(null)}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-150 transition-transform duration-200"></span>
                        {project}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#sponsors" className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
              Sponsors
            </a>
            <a href="#team" className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
              Team
            </a>

            {/* Alumni Dropdown */}
            <div className="relative dropdown">
              <button
                onClick={() => toggleDropdown('alumni')}
                className="flex items-center gap-1.5 px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 focus:outline-none"
              >
                Alumni 
                <ChevronDown size={18} className={`transition-transform duration-300 ${dropdownOpen === 'alumni' ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen === 'alumni' && (
                <div className="absolute left-0 mt-2 w-64 backdrop-blur-xl bg-black/30 border border-blue-600/20 shadow-2xl shadow-blue-600/10 rounded-2xl py-2 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  {alumniYears.map((year, index) => (
                    <a 
                      key={year} 
                      href={`#alumni-${year}`}
                      className="block px-4 py-2.5 mx-2 my-1 text-sm font-medium text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-700/20 rounded-xl transition-all duration-200 group"
                      style={{ animationDelay: `${index * 30}ms` }}
                      onClick={() => setDropdownOpen(null)}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-150 transition-transform duration-200"></span>
                        Class of {year}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Media Dropdown */}
            <div className="relative dropdown">
              <button
                onClick={() => toggleDropdown('media')}
                className="flex items-center gap-1.5 px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 focus:outline-none"
              >
                Media 
                <ChevronDown size={18} className={`transition-transform duration-300 ${dropdownOpen === 'media' ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen === 'media' && (
                <div className="absolute left-0 mt-2 w-64 backdrop-blur-xl bg-black/30 border border-blue-600/20 shadow-2xl shadow-blue-600/10 rounded-2xl py-2 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <a href="#images" className="block px-4 py-2.5 mx-2 my-1 text-sm font-medium text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-700/20 rounded-xl transition-all duration-200 group" onClick={() => setDropdownOpen(null)}>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-150 transition-transform duration-200"></span>
                      Images
                    </span>
                  </a>
                  <a href="#blogs" className="block px-4 py-2.5 mx-2 my-1 text-sm font-medium text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-700/20 rounded-xl transition-all duration-200 group" style={{ animationDelay: '30ms' }} onClick={() => setDropdownOpen(null)}>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-150 transition-transform duration-200"></span>
                      Blogs
                    </span>
                  </a>
                </div>
              )}
            </div>

            <a href="#contacts" className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
              Contacts
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-3 text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-white/5 backdrop-blur-xl bg-black/98">
          <nav className="container mx-auto px-8 py-6 flex flex-col gap-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            <a href="#home" className="px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a href="#about" className="px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
              About
            </a>
            <a href="#subsystems" className="px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
              Subsystems
            </a>
            <a href="#projects" className="px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
              Projects
            </a>
            <a href="#sponsors" className="px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
              Sponsors
            </a>
            <a href="#team" className="px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
              Team
            </a>
            <a href="#alumni" className="px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
              Alumni
            </a>
            <a href="#media" className="px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
              Media
            </a>
            <a href="#contacts" className="px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
              Contacts
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;