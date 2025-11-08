import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Subsystems from './components/Subsystems';
import Projects from './components/Projects';
import Sponsors from './components/Sponsors';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SponsorshipTiers from './components/SponsorshipTiers';
import RocketWiki from './components/RocketWiki';
import JoinTeam from './components/JoinTeam';
import Team from './components/Team';
import Alumni from './components/Alumni';
import WikiCard from './components/WikiCard';
import ProjectDetail from './components/ProjectDetail';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedAlumniYear, setSelectedAlumniYear] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [pendingSection, setPendingSection] = useState(null);

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
      } else if (path.includes('/projects/')) {
        const projectId = path.split('/projects/')[1];
        setCurrentPage('project-detail');
        setSelectedProjectId(projectId);
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
      // Small delay to ensure DOM is ready
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
    } else if (page === 'project-detail') {
      if (dataParam) {
        setSelectedProjectId(dataParam);
        window.history.pushState({}, '', `/projects/${dataParam}`);
      }
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
    // Clear any hash from URL
    window.history.replaceState({}, '', '/');
    
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header height
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
    onNavigateHome: navigateHome,
    currentPage: currentPage
  };

  // Render different pages based on current route
  if (currentPage === 'project-detail') {
    return (
      <ProjectDetail 
        Header={Header}
        Footer={Footer}
        projectId={selectedProjectId}
        onNavigateHome={() => navigate('home')}
        onNavigateToProjects={() => navigateHome('projects')}
        headerProps={commonHeaderProps}
      />
    );
  }

  if (currentPage === 'rocket-wiki') {
    return (
      <RocketWiki 
        Header={Header}
        Footer={Footer}
        onNavigateHome={() => navigate('home')}
        onNavigateToAlumni={(year) => navigate('alumni', year)}
        headerProps={commonHeaderProps}
      />
    );
  }

  if (currentPage === 'team') {
    return (
      <Team 
        Header={Header}
        Footer={Footer}
        onNavigateHome={() => navigate('home')}
        onNavigateToAlumni={(year) => navigate('alumni', year)}
        headerProps={commonHeaderProps}
      />
    );
  }

  if (currentPage === 'alumni') {
    return (
      <Alumni 
        Header={Header}
        Footer={Footer}
        initialYear={selectedAlumniYear} 
        onNavigateHome={() => navigate('home')}
        onNavigateToAlumni={(year) => navigate('alumni', year)}
        headerProps={commonHeaderProps}
      />
    );
  }

  if (currentPage === 'join') {
    return (
      <JoinTeam 
        Header={Header}
        Footer={Footer}
        onNavigateHome={() => navigate('home')}
        headerProps={commonHeaderProps}
      />
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Header 
        {...commonHeaderProps}
        onScrollToSection={scrollToSection}
      />
      <Hero 
        onNavigateToRocketWiki={() => navigate('rocket-wiki')}
        onNavigateToJoinTeam={() => navigate('join')}
      />
      <About />
      <Subsystems />
      <Projects onNavigateToProject={(projectId) => navigate('project-detail', projectId)} />
      <Sponsors />
      <SponsorshipTiers />
      <Gallery />
      <Contact />
      <WikiCard onNavigateToRocketWiki={() => navigate('rocket-wiki')} />
      <Footer/>
    </div>
  );
}