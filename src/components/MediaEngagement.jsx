import React, { useState, useEffect, useRef } from 'react';
import { Youtube, Instagram, Sparkles, Play, Eye, Heart, MessageCircle, Send } from 'lucide-react';
import { motion } from "framer-motion";

const INSTAGRAM_REELS_URL = 'https://www.instagram.com/your_handle/reels/'; // ← replace with your Instagram reels URL

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
    id: 'JitTxBJrcqw', 
    title: 'VayuVega',
    subtitle: 'Video Challenge',
    size: 'medium'
  },
  { 
    type: 'instagram-video', 
    url: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/video/spark.mp4', 
    title: 'Working on it',
    subtitle: 'Mom: What do you even do in college??',
    size: 'medium',
    link: 'https://www.instagram.com/p/DUlzhbwk3TD/',
  },
  {
    type: 'youtube', 
    id: 'PFUFqONfS50', 
    title: 'AgniAstra',
    subtitle: 'Video Challenge',
    size: 'third'
  },
  {
    type: 'youtube',
    id: 'h6kPj1NTjTo',        
    title: 'Altair',
    subtitle: 'Video Challenge',
    size: 'third'
  },
  {
    type: 'instagram-video',
    url: 'https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/video/topview.mp4', 
    title: 'Project Kali',
    subtitle: 'N-class motor test',
    size: 'third',
    link: 'https://www.instagram.com/p/DVV5v-2k-bV/',
  },
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

const sizeClasses = {
  large: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
  medium: 'col-span-1',
  small: 'col-span-1',
  third: 'col-span-1',
};

// Shared card shell with 3-D tilt
const CardShell = ({ item, children, onClick, href }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rotateX = (((e.clientY - rect.top) / rect.height) - 0.5) * -10;
    const rotateY = (((e.clientX - rect.left) / rect.width) - 0.5) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const Tag = href ? 'a' : 'div';
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};
  const clickProps = onClick ? { onClick } : {};

  return (
    <Tag
      ref={cardRef}
      className={`relative ${sizeClasses[item.size]} group ${href || onClick ? 'cursor-pointer' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: 'transform 0.3s ease-out',
        display: 'block',
      }}
      {...linkProps}
      {...clickProps}
    >
      {/* Glow border */}
      <div className="absolute -inset-[1px] bg-blue-600/40 rounded-2xl opacity-0 group-hover:opacity-100 sm:blur-md transition-opacity duration-500" />

      <div className="relative h-full bg-black rounded-2xl overflow-hidden border-2 border-blue-600/30 transition-all duration-500">
        {children(isHovered)}
      </div>

      {/* Parallax shadow */}
      <div
        className="absolute inset-0 -z-10 bg-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 sm:blur-2xl transition-opacity duration-500"
        style={{ transform: `translate3d(${rotation.y}px, ${rotation.x}px, -30px)` }}
      />
    </Tag>
  );
};

// Shared caption overlay
const Caption = ({ title, subtitle }) => (
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-5 sm:backdrop-blur-sm">
    <h3
      className="text-lg sm:text-xl font-bold text-white mb-1 tracking-wider"
      style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(59,130,246,0.5)' }}
    >
      <GlitchText>{title}</GlitchText>
    </h3>
    <p className="text-[10px] sm:text-xs text-blue-400 tracking-[0.3em] font-medium" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
      {subtitle}
    </p>
  </div>
);

const MediaCard = ({ item }) => {
  if (item.type === 'youtube') {
    return (
      <CardShell item={item}>
        {(isHovered) => (
          <>
            <iframe
              title={item.title}
              src={`https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1&loop=1&playlist=${item.id}&controls=1`}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-400/5 to-transparent pointer-events-none" />
            )}
            <Caption title={item.title} subtitle={item.subtitle} />
          </>
        )}
      </CardShell>
    );
  }

  if (item.type === 'video') {
    return (
      <CardShell item={item}>
        {(isHovered) => (
          <>
            <video
              src={item.url}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay loop muted playsInline
            />
            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-400/5 to-transparent pointer-events-none" />
            )}
            <Caption title={item.title} subtitle={item.subtitle} />
          </>
        )}
      </CardShell>
    );
  }

  if (item.type === 'instagram-video') {
    return (
      <CardShell item={item} href={item.link}>
        {(isHovered) => (
          <>
            <video
              src={item.url}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay loop muted playsInline
            />

            {/* Hover overlay with arrow */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none"
              style={{ opacity: isHovered ? 1 : 0 }}
            >
            </div>

            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/8 via-blue-400/5 to-transparent pointer-events-none" />
            )}

            <Caption title={item.title} subtitle={item.subtitle} />
          </>
        )}
      </CardShell>
    );
  }

  // ── Image fallback ───────────────────────────────────────────
  return (
    <CardShell item={item} href={item.url}>
      {(isHovered) => (
        <>
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-400/5 to-transparent pointer-events-none" />
          )}
          <Caption title={item.title} subtitle={item.subtitle} />
        </>
      )}
    </CardShell>
  );
};


const MediaEngagement = ({ items = mediaItems }) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="relative w-full bg-black">
      <section className="relative min-h-screen w-full py-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/5 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/5 rounded-full blur-2xl sm:blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[220px] sm:auto-rows-[260px] lg:auto-rows-[300px]">
            {items.map((item, idx) => (
              <MediaCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaEngagement;