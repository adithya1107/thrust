import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedText } from "./AnimatedText";

const slides = [
  {
    videoUrl: "/public/vid1.mp4",
    title: "Defying Gravity",
    subtitle: "Pioneering the future of space exploration through innovation"
  },
  {
    videoUrl: "public/vid2.mp4",
    title: "Beyond Mach",
    subtitle: "Excellence and relentless pursuit of the impossible"
  }
];

export const VideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000); // Auto-advance every 10 seconds

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
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
            className="absolute inset-0 w-full h-full object-cover scale-110"
            autoPlay
            loop
            muted
            playsInline
            style={{
              transform: index === currentSlide ? "scale(1)" : "scale(1.1)",
              transition: "transform 1.5s cubic-bezier(0.77, 0, 0.175, 1)"
            }}
          >
            <source src={slide.videoUrl} type="video/mp4" />
          </video>
          
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
          
          {/* Animated text overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center px-4 max-w-5xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <AnimatedText
                  text={slide.title.split(" ")[0]}
                  className="text-white inline-block mr-4"
                  delay={200}
                  isActive={index === currentSlide}
                />
                <AnimatedText
                  text={slide.title.split(" ").slice(1).join(" ")}
                  className="text-blue-600 inline-block"
                  delay={600}
                  isActive={index === currentSlide}
                />
              </h1>
              <div className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
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
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-blue-600/20 rounded-lg p-3 transition-all hover:border-blue-600/50"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-8 w-8 text-white" />
      </button>
      <button
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-blue-600/20 rounded-lg p-3 transition-all hover:border-blue-600/50"
        onClick={handleNext}
      >
        <ChevronRight className="h-8 w-8 text-white" />
      </button>

    </div>
  );
};