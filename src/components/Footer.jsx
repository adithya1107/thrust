import React, { useEffect } from 'react';
import { Rocket } from 'lucide-react';

const Footer = () => {
  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>thrustMIT</span>
            </div>
            <p className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Pushing the boundaries of rocket propulsion and aerospace engineering at MIT.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>Quick Links</h4>
            <div className="space-y-2 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              <a href="#about" className="block text-gray-400 hover:text-blue-600 transition-colors">About</a>
              <a href="#subsystems" className="block text-gray-400 hover:text-blue-600 transition-colors">Subsystems</a>
              <a href="#projects" className="block text-gray-400 hover:text-blue-600 transition-colors">Projects</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>Resources</h4>
            <div className="space-y-2 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              <a href="#" className="block text-gray-400 hover:text-blue-600 transition-colors">Documentation</a>
              <a href="#" className="block text-gray-400 hover:text-blue-600 transition-colors">Blog</a>
              <a href="#sponsors" className="block text-gray-400 hover:text-blue-600 transition-colors">Sponsors</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>Connect</h4>
            <div className="space-y-2 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              <a href="#" className="block text-gray-400 hover:text-blue-600 transition-colors">Instagram</a>
              <a href="#" className="block text-gray-400 hover:text-blue-600 transition-colors">LinkedIn</a>
              <a href="#" className="block text-gray-400 hover:text-blue-600 transition-colors">GitHub</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          <p>© 2025 thrustMIT. All rights reserved. | Defying Gravity Beyond Mach.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;