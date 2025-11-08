import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = ({ 
  onNavigateToTeam, 
  onNavigateToAlumni, 
  onNavigateToJoin,
  onNavigateToRocketWiki,
  onScrollToSection,
  onNavigateHome,
  currentPage = 'home'
}) => {
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

  const alumniYears = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];

  const handleAlumniClick = () => {
    setDropdownOpen(null);
    setIsMenuOpen(false);
    if (onNavigateToAlumni) {
      onNavigateToAlumni();
    }
  };

  const handleTeamClick = () => {
    setIsMenuOpen(false);
    if (onNavigateToTeam) {
      onNavigateToTeam();
    }
  };

  const handleJoinClick = () => {
    setIsMenuOpen(false);
    if (onNavigateToJoin) {
      onNavigateToJoin();
    }
  };

  const handleRocketWikiClick = () => {
    setIsMenuOpen(false);
    if (onNavigateToRocketWiki) {
      onNavigateToRocketWiki();
    }
  };

  // Universal section click handler - navigates home first if needed
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    setDropdownOpen(null);
    setIsMenuOpen(false);
    
    // If we're on the home page, just scroll to section
    if (currentPage === 'home') {
      if (onScrollToSection) {
        onScrollToSection(sectionId);
      }
    } else {
      // If we're on another page, navigate home first, then scroll
      if (onNavigateHome) {
        onNavigateHome(sectionId);
      }
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-xl border-b border-blue-600/20 shadow-lg shadow-blue-600/5' 
        : 'bg-black/80 backdrop-blur-md border-b border-white/5'
    }`}>
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={(e) => handleSectionClick(e, 'home')}
            className="flex items-center gap-3 group"
          >
            <img 
              src="/logo.png" 
              alt="thrustMIT Logo" 
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
            />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            <button 
              onClick={(e) => handleSectionClick(e, 'home')}
              className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Home
            </button>
            <button 
              onClick={(e) => handleSectionClick(e, 'about')}
              className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              About
            </button>
            <button 
              onClick={(e) => handleSectionClick(e, 'subsystems')}
              className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Subsystems
            </button>

            <button 
              onClick={(e) => handleSectionClick(e, 'projects')}
              className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Projects
            </button>

            <button 
              onClick={(e) => handleSectionClick(e, 'sponsors')}
              className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Sponsors
            </button>
            <button 
              onClick={handleTeamClick}
              className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Team
            </button>

            <button 
              onClick={handleAlumniClick}
              className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Alumni
            </button>

            <button 
              onClick={(e) => handleSectionClick(e, 'gallery')}
              className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Gallery
            </button>

            <button 
              onClick={(e) => handleSectionClick(e, 'contact')}
              className="px-5 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Contacts
            </button>
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
            <button 
              onClick={(e) => handleSectionClick(e, 'home')}
              className="text-left px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Home
            </button>
            <button 
              onClick={(e) => handleSectionClick(e, 'about')}
              className="text-left px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              About
            </button>
            <button 
              onClick={(e) => handleSectionClick(e, 'subsystems')}
              className="text-left px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Subsystems
            </button>
            <button 
              onClick={(e) => handleSectionClick(e, 'projects')}
              className="text-left px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Projects
            </button>
            <button 
              onClick={(e) => handleSectionClick(e, 'sponsors')}
              className="text-left px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Sponsors
            </button>
            <button 
              onClick={handleTeamClick}
              className="text-left px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Team
            </button>

            <button 
              onClick={handleAlumniClick}
              className="text-left px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Alumni
            </button>
            
            <button 
              onClick={(e) => handleSectionClick(e, 'gallery')}
              className="text-left px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Gallery
            </button>

            <button 
              onClick={(e) => handleSectionClick(e, 'contact')}
              className="text-left px-5 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Contacts
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;