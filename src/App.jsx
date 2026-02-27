import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Subsystems from './components/Subsystems';
import Projects from './components/Projects';
import Sponsors from './components/Sponsors';
import Gallery from './components/Gallery';
import GalleryPage from './components/GalleryPage';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SponsorshipTiers from './components/SponsorshipTiers';
import RocketWiki from './components/RocketWiki'; 
// import ComingSoon from './components/ComingSoon'; 
import JoinTeam from './components/JoinTeam';
import Team from './components/Team';
import Alumni from './components/Alumni';
import WikiCard from './components/WikiCard';
import ProjectDetail from './components/ProjectDetail';
import Blog from './components/Blog';
import RecruitmentModal from './components/RecruitmentModal';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedAlumniYear, setSelectedAlumniYear] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [pendingSection, setPendingSection] = useState(null);
  const [recruitmentModalOpen, setRecruitmentModalOpen] = useState(false);
  const [recruitmentModalMessage, setRecruitmentModalMessage] = useState('Recruitments have not yet started. Stay tuned!');

  // Initialize AOS and prevent overscroll bounce effect
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
    
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';
    
    return () => {
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.overscrollBehavior = '';
    };
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/rocket-wiki' || path.includes('rocket-wiki')) {
        setCurrentPage('rocket-wiki');
      } else if (path === '/team' || path.includes('team')) {
        setCurrentPage('team');
      } else if (path === '/alumni' || path.includes('alumni')) {
        setCurrentPage('alumni');
      } else if (path === '/join' || path.includes('join')) {
        setCurrentPage('join');
      } else if (path === '/blog' || path.includes('blog')) {
        setCurrentPage('blog');
      } else if (path.includes('/projects/')) {
        const projectId = path.split('/projects/')[1];
        setCurrentPage('project-detail');
        setSelectedProjectId(projectId);
      } else if (path === '/gallery' || path.includes('/gallery')) {
        setCurrentPage('gallery');
      } else {
        setCurrentPage('home');
        setSelectedAlumniYear(null);
        setSelectedProjectId(null);
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to section after page loads
  useEffect(() => {
    if (currentPage === 'home' && pendingSection) {
      setTimeout(() => {
        scrollToSection(pendingSection);
        setPendingSection(null);
      }, 100);
    }
  }, [currentPage, pendingSection]);

  // Navigate function to change pages
  const navigate = (page, dataParam) => {
    setCurrentPage(page);
    
    if (page === 'rocket-wiki') {
      window.history.pushState({}, '', '/rocket-wiki');
    } else if (page === 'team') {
      window.history.pushState({}, '', '/team');
    } else if (page === 'alumni') {
      window.history.pushState({}, '', '/alumni');
      if (dataParam) {
        setSelectedAlumniYear(dataParam);
      }
    } else if (page === 'join') {
      window.history.pushState({}, '', '/join');
    } else if (page === 'blog') {
      window.history.pushState({}, '', '/blog');
    } else if (page === 'project-detail') {
      if (dataParam) {
        setSelectedProjectId(dataParam);
        window.history.pushState({}, '', `/projects/${dataParam}`);
      }
    } else if (page === 'gallery') {
      window.history.pushState({}, '', '/gallery');
    } else {
      window.history.pushState({}, '', '/');
      setSelectedAlumniYear(null);
      setSelectedProjectId(null);
    }
    
    window.scrollTo(0, 0);
  };

  // Enhanced navigate home that can also scroll to a section
  const navigateHome = (sectionId = null) => {
    if (sectionId) {
      setPendingSection(sectionId);
    }
    navigate('home');
  };

  // Handle section scrolling on home page
  const scrollToSection = (sectionId) => {
    window.history.replaceState({}, '', '/');
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Common navigation props for all pages
  const commonHeaderProps = {
    onNavigateToTeam: () => navigate('team'),
    onNavigateToAlumni: (year) => navigate('alumni', year),
    onNavigateToJoin: () => navigate('join'),
    onNavigateToRocketWiki: () => navigate('rocket-wiki'),
    onNavigateToBlog: () => navigate('blog'),
    onNavigateToGallery: () => navigate('gallery'),
    onNavigateHome: navigateHome,
    onScrollToSection: scrollToSection,
    currentPage: currentPage
  };

  // Recruitment modal controls
  const openRecruitmentModal = (message) => {
    if (message) setRecruitmentModalMessage(message);
    setRecruitmentModalOpen(true);
  };

  const closeRecruitmentModal = () => {
    setRecruitmentModalOpen(false);
  };

  commonHeaderProps.onShowRecruitmentModal = openRecruitmentModal;

  const renderRecruitmentModal = () => (
    <RecruitmentModal open={recruitmentModalOpen} message={recruitmentModalMessage} onClose={closeRecruitmentModal} />
  );

  // Render different pages based on current route
  if (currentPage === 'project-detail') {
    return (
      <>
        <CustomCursor />
        <ProjectDetail 
          Header={Header}
          Footer={Footer}
          projectId={selectedProjectId}
          onNavigateHome={() => navigate('home')}
          onNavigateToProjects={() => navigateHome('projects')}
          onNavigateToProject={(projectId) => navigate('project-detail', projectId)}
          headerProps={commonHeaderProps}
        />
        {renderRecruitmentModal()}
      </>
    );
  }

  if (currentPage === 'rocket-wiki') {
    return (
      <>
        <CustomCursor />
        <RocketWiki 
          Header={Header}
          Footer={Footer}
          onNavigateHome={() => navigate('home')}
          onNavigateToAlumni={(year) => navigate('alumni', year)}
          headerProps={commonHeaderProps}
        />
      </>
    );
  }

  if (currentPage === 'team') {
    return (
      <>
        <CustomCursor />
        <Team 
          Header={Header}
          Footer={Footer}
          onNavigateHome={() => navigate('home')}
          onNavigateToJoinTeam={() => navigate('join')} 
          headerProps={commonHeaderProps}
        />
        {renderRecruitmentModal()}
      </>
    );
  }

  if (currentPage === 'alumni') {
    return (
      <>
        <CustomCursor />
        <Alumni 
          Header={Header}
          Footer={Footer}
          initialYear={selectedAlumniYear} 
          onNavigateHome={() => navigate('home')}
          onNavigateToAlumni={(year) => navigate('alumni', year)}
          headerProps={commonHeaderProps}
        />
        {renderRecruitmentModal()}
      </>
    );
  }

  if (currentPage === 'join') {
    return (
      <>
        <CustomCursor />
        <JoinTeam 
          Header={Header}
          Footer={Footer}
          onNavigateHome={() => navigate('home')}
          headerProps={commonHeaderProps}
        />
        {renderRecruitmentModal()}
      </>
    );
  }

  if (currentPage === 'blog') {
    return (
      <>
        <CustomCursor />
        <Blog 
          Header={Header}
          Footer={Footer}
          onNavigateHome={() => navigate('home')}
          headerProps={commonHeaderProps}
        />
        {renderRecruitmentModal()}
      </>
    );
  }

  if (currentPage === 'gallery') {
    return (
      <>
        <CustomCursor />
        <GalleryPage
          Header={Header}
          Footer={Footer}
          onNavigateHome={() => navigate('home')}
          headerProps={commonHeaderProps}
        />
        {renderRecruitmentModal()}
      </>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen w-full relative" style={{ overflowX: 'clip' }}>
      <CustomCursor />
      <Header 
        {...commonHeaderProps}
        onScrollToSection={scrollToSection}
      />
      <Hero 
        onNavigateToRocketWiki={() => navigate('rocket-wiki')}
        onShowRecruitmentModal={openRecruitmentModal}
      />
      <About />
      <Subsystems />
      <Projects onNavigateToProject={(projectId) => navigate('project-detail', projectId)} />
      <Sponsors />
      <SponsorshipTiers />
      <Gallery onNavigateToGallery={() => navigate('gallery')} />
      <Contact />
      <WikiCard 
        onNavigateToRocketWiki={() => navigate('rocket-wiki')}
        onScrollToSection={scrollToSection}
        onNavigateHome={navigateHome}
        currentPage={currentPage}
      />
      <Footer
        onNavigateToRocketWiki={() => navigate('rocket-wiki')}
        onNavigateToBlog={() => navigate('blog')}
        onScrollToSection={scrollToSection}
        onNavigateHome={navigateHome}
      />
      {renderRecruitmentModal()}
    </div>
  );
}