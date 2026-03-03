import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ 
  onNavigateToTeam, 
  onNavigateToAlumni, 
  onNavigateToJoin,
  onNavigateToRocketWiki,
  onNavigateToBlog,
  onNavigateToGallery,
  onScrollToSection,
  onNavigateHome,
  onShowRecruitmentModal,
  currentPage = 'home'
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // If we're on the home page, avoid switching to the stronger scrolled background
  // to keep the header visually consistent over the hero/slider.
  const showSolid = isScrolled && currentPage !== 'home';

  const handleAlumniClick = () => {
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
    if (onShowRecruitmentModal) {
      onShowRecruitmentModal();
    } else if (onNavigateToJoin) {
      onNavigateToJoin();
    }
  };

  const handleRocketWikiClick = () => {
    setIsMenuOpen(false);
    if (onNavigateToRocketWiki) {
      onNavigateToRocketWiki();
    }
  };

  const handleBlogClick = () => {
    setIsMenuOpen(false);
    if (onNavigateToBlog) {
      onNavigateToBlog();
    }
  };

  const handleGalleryClick = () => {
    setIsMenuOpen(false);
    if (onNavigateToGallery) {
      onNavigateToGallery();
    }
  };

  const handleHomeClick = () => {
    setIsMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  // Section click handler
  const handleSectionClick = (sectionId) => {
    setIsMenuOpen(false);
    // If we're on the home page, just scroll to the section
    if (currentPage === 'home') {
      if (onScrollToSection) {
        onScrollToSection(sectionId);
      }
    } else {
      // If we're on another page, navigate home first and then scroll to the section
      if (onNavigateHome) {
        onNavigateHome(sectionId);
      }
    }
  };

    return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
      showSolid 
        ? 'bg-black/95 backdrop-blur-xl shadow-lg shadow-blue-600/5' 
        : 'bg-gradient-to-b from-black via-black/90 to-transparent backdrop-blur-md'
    }`}>
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-center">
        <div className="max-w-7xl w-full flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={handleHomeClick}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <img 
              src="https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/logo.png" 
              alt="thrustMIT Logo" 
              className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-110"
            />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-wrap justify-center" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            <button 
              onClick={handleHomeClick}
              className="px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Home
            </button>
            <button 
              onClick={() => handleSectionClick('about')}
              className="px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              About
            </button>
            <button 
              onClick={() => handleSectionClick('subsystems')}
              className="px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Subsystems
            </button>
            <button 
              onClick={() => handleSectionClick('projects')}
              className="px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Projects
            </button>
            <button 
              onClick={() => handleSectionClick('sponsors')}
              className="px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Sponsors
            </button>
            <button 
              onClick={handleTeamClick}
              className="px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Team
            </button>
            <button 
              onClick={handleAlumniClick}
              className="px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Alumni
            </button>
            <button 
              onClick={handleGalleryClick}
              className="px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Gallery
            </button>
            <button 
              onClick={handleBlogClick}
              className="px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Blog
            </button>
            <button 
              onClick={() => handleSectionClick('contact')}
              className="px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Contacts
            </button>
            <button 
              onClick={handleRocketWikiClick}
              className="px-4 py-2 text-base font-bold text-white rounded-lg transition-all duration-200 whitespace-nowrap bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-600/50 transform hover:scale-105"
            >
              Rocket Wiki
            </button>
            
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 sm:p-3 text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Menu size={24} className="sm:w-7 sm:h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-white/5 backdrop-blur-xl bg-black/98 flex justify-center max-h-[70vh] overflow-y-auto">
          <nav className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 flex flex-col gap-1 sm:gap-2 max-w-7xl w-full" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            <button 
              onClick={handleHomeClick}
              className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => handleSectionClick('about')}
              className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              About
            </button>
            <button 
              onClick={() => handleSectionClick('subsystems')}
              className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Subsystems
            </button>
            <button 
              onClick={() => handleSectionClick('projects')}
              className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Projects
            </button>
            <button 
              onClick={() => handleSectionClick('sponsors')}
              className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Sponsors
            </button>
            <button 
              onClick={handleTeamClick}
              className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Team
            </button>
            <button 
              onClick={handleAlumniClick}
              className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Alumni
            </button>
            <button 
              onClick={handleGalleryClick}
              className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Gallery
            </button>
            <button 
              onClick={handleBlogClick}
              className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Blog
            </button>
            <button 
              onClick={() => handleSectionClick('contact')}
              className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Contacts
            </button>
            <button 
              onClick={handleRocketWikiClick}
              className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200"
            >
              Rocket Wiki
            </button>
            
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;