import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedText } from "./AnimatedText";

const slides = [
  {
    videoUrl: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/video/vid2.mp4",
    title: "Defying Gravity",
    subtitle: "Pioneering the future of space exploration through innovation"
  },
  {
    videoUrl: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/video/vid1.mp4",
    title: "Beyond Mach",
    subtitle: "Excellence and relentless pursuit of the impossible"
  }
];

export const VideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const videoRefs = useRef([]);
  const isAnimatingRef = useRef(false);

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // When the current slide changes, ensure the shown video starts from 0 and plays,
  // while other videos are paused and reset. We rely on the video's `ended` event
  // (below) to advance to the next slide when playback completes.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      try {
        if (i === currentSlide) {
          v.currentTime = 0;
          // Delay play slightly to ensure transition covers the first frame
          const playTimer = setTimeout(() => {
            const playPromise = v.play();
            if (playPromise && typeof playPromise.then === 'function') {
              playPromise.catch(() => { /* ignore play errors (muted/autoplay policies) */ });
            }
          }, 100);
          return () => clearTimeout(playTimer);
        } else {
          v.pause();
          v.currentTime = 0;
        }
      } catch (e) {
        // ignore errors when controlling media
      }
    });
  }, [currentSlide]);

  const handleNext = () => {
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => {
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }, 500);
    }
  };

  const handlePrev = () => {
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => {
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            clipPath: index === currentSlide 
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
              : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            transition: "clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1), opacity 1s"
          }}
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            className="absolute inset-0 w-full h-full object-cover scale-110"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => {
              // Advance to next slide when the current video ends
              if (!isAnimatingRef.current) {
                isAnimatingRef.current = true;
                setCurrentSlide((prev) => (prev + 1) % slides.length);
                setTimeout(() => {
                  isAnimatingRef.current = false;
                }, 500);
              }
            }}
            style={{
              transform: index === currentSlide ? "scale(1)" : "scale(1.1)",
              transition: "transform 1.5s cubic-bezier(0.77, 0, 0.175, 1)"
            }}
          >
            <source src={slide.videoUrl} type="video/mp4" />
          </video>

          {/* Fade cover to hide initial frame during transition */}
          <div 
            className="absolute inset-0 bg-black z-50 pointer-events-none"
            style={{
              opacity: index === currentSlide ? 0 : 1,
              transition: "opacity 1.2s cubic-bezier(0.77, 0, 0.175, 1)"
            }}
          />
          
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
          
          {/* Animated text overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-8 md:px-12">
            <div className="text-center w-full max-w-5xl">
              <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif', wordBreak: 'keep-all', hyphens: 'none', WebkitHyphens: 'none', MozHyphens: 'none' }}>
                <span style={{ display: 'inline', whiteSpace: 'nowrap' }}>
                  <AnimatedText
                    text={slide.title.split(" ")[0]}
                    className="text-white"
                    delay={200}
                    isActive={index === currentSlide}
                  />
                </span>
                {' '}
                <span style={{ display: 'inline', whiteSpace: 'nowrap' }}>
                  <AnimatedText
                    text={slide.title.split(" ").slice(1).join(" ")}
                    className="text-blue-600"
                    delay={600}
                    isActive={index === currentSlide}
                  />
                </span>
              </h1>
              <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-8 leading-relaxed px-2 sm:px-4" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
                <AnimatedText
                  text={slide.subtitle}
                  delay={1000}
                  isActive={index === currentSlide}
                />
              </div>
              
              {/* CTA Buttons */}
              <div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                style={{
                  opacity: index === currentSlide ? 1 : 0,
                  transform: index === currentSlide ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s ease-out 1.4s"
                }}
              >
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        className="absolute left-4 md:left-8 bottom-40 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-blue-600/20 rounded-lg p-3 transition-all hover:border-blue-600/50 w-12 h-12 flex items-center justify-center"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-6 w-6 text-white flex-shrink-0" />
      </button>
      <button
        className="absolute right-4 md:right-8 bottom-40 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-blue-600/20 rounded-lg p-3 transition-all hover:border-blue-600/50 w-12 h-12 flex items-center justify-center"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6 text-white flex-shrink-0" />
      </button>

    </div>
  );
};