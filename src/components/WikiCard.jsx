import React, { useEffect } from 'react';
import { Rocket, Book, ArrowRight, ExternalLink } from 'lucide-react';

const WikiCard = ({ onNavigateToRocketWiki }) => {
  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleRocketWikiClick = (e) => {
    e.preventDefault();
    if (onNavigateToRocketWiki) {
      // Use internal navigation if provided
      onNavigateToRocketWiki();
    } else {
      // Fallback to opening in new tab
      window.open('/rocket-wiki', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* Rocket Wiki CTA Section - Before Footer */}
      <section className="relative bg-black py-20 px-4 border-t border-white/10">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-blue-600/30 rounded-3xl p-8 md:p-12 overflow-hidden">

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-600/30 mb-4">
                  <span className="text-blue-600 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500, letterSpacing: '0.05em' }}>
                    Knowledge Base
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Explore Our <span className="text-blue-600">Rocket Encyclopedia</span>
                </h2>
                <p className="text-gray-400 text-lg mb-6" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, letterSpacing: '0.05em' }}>
                  Dive deep into our complete fleet of rockets. Learn about technical specifications, design philosophies, and the innovations that power each mission.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    Detailed technical specifications
                  </li>
                  <li className="flex items-center gap-3 text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    Design features and innovations
                  </li>
                  <li className="flex items-center gap-3 text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    Mission status and launch history
                  </li>
                </ul>
                <button
                  onClick={handleRocketWikiClick}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group cursor-pointer"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}
                >
                  View Rocket Wiki
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Right Visual */}
              <div className="relative hidden md:block">
                <div className="relative">
                  {/* Floating Cards */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-600/30 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30">
                      <div className="flex items-center gap-4 mb-3">
                        <div>
                          <h4 className="font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>6 Rockets</h4>
                          <p className="text-xs text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Complete Fleet</p>
                        </div>
                      </div>
                      <div className="h-1 bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
                    </div>

                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-600/30 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30 ml-8">
                      <div className="flex items-center gap-4 mb-3">
                        <div>
                          <h4 className="font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>Tech Specs</h4>
                          <p className="text-xs text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Detailed Data</p>
                        </div>
                      </div>
                      <div className="h-1 bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
                    </div>

                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-600/30 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30 ml-4">
                      <div className="flex items-center gap-4 mb-3">
                        <div>
                          <h4 className="font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>Live Updates</h4>
                          <p className="text-xs text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Real-time Status</p>
                        </div>
                      </div>
                      <div className="h-1 bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WikiCard;