import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Subsystems from './components/Subsystems';
import Projects from './components/Projects';
import Sponsors from './components/Sponsors';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <Hero />
      <Subsystems />
      <Projects />
      <Sponsors />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}