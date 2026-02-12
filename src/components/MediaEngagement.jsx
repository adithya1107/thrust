import React, { useState, useEffect, useRef } from 'react';
import { Youtube, Instagram, Sparkles, Play, Eye, Heart, MessageCircle, Send } from 'lucide-react';
import { motion } from "framer-motion";

const mediaItems = [
  { 
    type: 'youtube', 
    id: 'cdoSWKQIHuc', 
    title: 'Launch To Survive',
    subtitle: 'Episode 1: Pilot',
    size: 'large'
  },
  { 
    type: 'youtube', 
    id: 'PFUFqONfS50', 
    title: 'AgniAstra',
    subtitle: 'Video Challenge',
    size: 'medium'
  },
  { 
    type: 'video', 
    url: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/video/spark.mp4', 
    title: 'Working on it',
    subtitle: 'Mom: What do you even do in college??',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=800&fit=crop',
    size: 'medium'
  }
];


const GlitchText = ({ children, className = "" }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 text-blue-600 opacity-60" style={{ 
        transform: 'translate(-1px, -1px)',
        clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
      }}>
        {children}
      </span>
      <span className="absolute top-0 left-0 text-blue-600 opacity-60" style={{ 
        transform: 'translate(1px, 1px)',
        clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
      }}>
        {children}
      </span>
    </span>
  );
};

const MediaCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovered) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const sizeClasses = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-1 row-span-1',
    small: 'col-span-1 row-span-1'
  };

  if (item.type === 'youtube') {
    return (
      <div 
        ref={cardRef}
        className={`relative ${sizeClasses[item.size]} group`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        <div className="absolute -inset-[1px] bg-blue-600/40 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
        
        <div className="relative h-full bg-black rounded-2xl overflow-hidden border-2 border-blue-600/30 group-hover:border-blue-600/50 transition-all duration-500">
          <div className="relative h-full">
            <iframe
              title={item.title}
              src={`https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1&loop=1&playlist=${item.id}&controls=1`}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-6 backdrop-blur-sm">
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-1 tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}>
                  <GlitchText>{item.title}</GlitchText>
                </h3>
                <p className="text-xs text-blue-600 tracking-[0.3em] font-medium" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {item.subtitle}
                </p>
                
                {/* <div className="flex gap-1 mt-3">
                  {[...Array(30)].map((_, i) => (
                    <div 
                      key={i} 
                      className="h-1 w-1 bg-blue-400/50 rounded-full"
                      style={{
                        animation: `pulse 2s ease-in-out infinite`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div> */}
              </div>
            </div>
          </div>

          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-400/5 to-transparent pointer-events-none transition-opacity duration-300" />
          )}
        </div>

        <div className="absolute inset-0 -z-10 bg-blue-600/10 blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
             style={{ 
               transform: `translate3d(${rotation.y * 1}px, ${rotation.x * 1}px, -30px)`
             }} />
      </div>
    );
  }

  if (item.type === 'video') {
    return (
      <div 
        ref={cardRef}
        className={`relative ${sizeClasses[item.size]} group`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        <div className="absolute -inset-[1px] bg-blue-600/40 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
        
        <div className="relative h-full bg-black rounded-2xl overflow-hidden border-2 border-blue-600/30 group-hover:border-blue-600/50 transition-all duration-500">
          <video 
            ref={videoRef}
            src={item.url}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-6 backdrop-blur-sm">
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-1 tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}>
                <GlitchText>{item.title}</GlitchText>
              </h3>
              <p className="text-xs text-blue-600 tracking-[0.3em] font-medium" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {item.subtitle}
              </p>
              
              {/* <div className="flex gap-1 mt-3">
                {[...Array(30)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-1 w-1 bg-blue-400/50 rounded-full"
                    style={{
                      animation: `pulse 2s ease-in-out infinite`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                ))}
              </div> */}
            </div>
          </div>

          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-400/5 to-transparent pointer-events-none transition-opacity duration-300" />
          )}
        </div>

        <div className="absolute inset-0 -z-10 bg-blue-600/10 blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
             style={{ 
               transform: `translate3d(${rotation.y * 1}px, ${rotation.x * 1}px, -30px)`
             }} />
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className={`relative ${sizeClasses[item.size]} group block`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: 'transform 0.3s ease-out'
      }}
    >
      <div className="absolute -inset-[1px] bg-blue-600/40 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
      
      <div className="relative h-full bg-black rounded-2xl overflow-hidden border-2 border-blue-600/30 group-hover:border-blue-600/50 transition-all duration-500">
        <img 
          src={item.image} 
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/95 to-transparent">
          <h3 className="text-2xl font-bold text-white mb-1 tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}>
            <GlitchText>{item.title}</GlitchText>
          </h3>
          <p className="text-xs text-blue-600 tracking-[0.3em] font-medium" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            {item.subtitle}
          </p>
        </div>

        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-400/5 to-transparent pointer-events-none transition-opacity duration-300" />
        )}
      </div>

      <div className="absolute inset-0 -z-10 bg-blue-600/10 blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
           style={{ 
             transform: `translate3d(${rotation.y * 1}px, ${rotation.x * 1}px, -30px)`
           }} />
    </a>
  );
};


const MediaEngagement = ({ items = mediaItems }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="relative w-full bg-black">
      <section className="relative min-h-screen w-full py-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          {/* Bento grid layout */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
            {items.map((item, idx) => (
              <MediaCard key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes float-chaotic {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -30px) scale(1.1); }
          50% { transform: translate(-30px, 50px) scale(0.9); }
          75% { transform: translate(40px, 20px) scale(1.05); }
        }
        
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% { opacity: 0.5; }
          50% { 
            transform: translateY(-100px) translateX(50px);
            opacity: 1;
          }
          90% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default MediaEngagement;