import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import schoolBuilding from "@/assets/school-building.png";
import osisLogo from "@/assets/logo.png";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Array of background images
  const backgroundImages = [
    schoolBuilding
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-end justify-center overflow-hidden">
      {/* Full-screen School Building Image with Parallax and Auto-rotation */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt="Gedung Sekolah" 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translateY(${scrollY * 0.6}px) scale(${1 + scrollY * 0.0002})`,
              transition: 'transform 0.1s ease-out, opacity 1s ease-in-out'
            }}
          />
        ))}
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
      </div>

      {/* Floating decorative elements with Enhanced Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${scrollY * 0.25}px, ${scrollY * 0.35}px) rotate(${scrollY * 0.1}deg) scale(${1 + scrollY * 0.0005})`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-24 h-24 bg-secondary/20 rounded-full blur-3xl animate-float" 
          style={{ 
            animationDelay: "0.5s",
            transform: `translate(${-scrollY * 0.3}px, ${scrollY * 0.4}px) rotate(${-scrollY * 0.15}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-40 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" 
          style={{ 
            animationDelay: "1s",
            transform: `translate(${-scrollY * 0.35}px, ${-scrollY * 0.25}px) scale(${1 + scrollY * 0.0003})`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-60 left-20 w-28 h-28 bg-primary/15 rounded-full blur-3xl animate-float" 
          style={{ 
            animationDelay: "1.5s",
            transform: `translate(${scrollY * 0.28}px, ${-scrollY * 0.22}px) rotate(${scrollY * 0.12}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/4 w-36 h-36 bg-secondary/15 rounded-full blur-3xl animate-float" 
          style={{ 
            animationDelay: "2s",
            transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.3}px) scale(${1 - scrollY * 0.0002})`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/3 w-20 h-20 bg-accent/25 rounded-full blur-3xl animate-float" 
          style={{ 
            animationDelay: "2.5s",
            transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.35}px) rotate(${-scrollY * 0.08}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pb-32 pt-32">
        <div 
          className="text-center animate-slide-up"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div 
            className="inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-white/95 backdrop-blur-sm rounded-full mb-8 animate-scale-in hover:scale-110 animate-float shadow-glow relative"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
              <img src={osisLogo} alt="Logo OSIS" className="w-23 h-23 object-contain" />
            </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fade-in drop-shadow-2xl" style={{ animationDelay: "0.1s" }}>
            OSIS SMPN 4 PAKEM
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-3 animate-fade-in drop-shadow-lg" style={{ animationDelay: "0.2s" }}>
            Periode 2025/2026
          </p>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-10 max-w-3xl mx-auto animate-fade-in drop-shadow-md" style={{ animationDelay: "0.3s" }}>
            Memimpin dengan Integritas, Berinovasi dengan Kreativitas, Melayani dengan Dedikasi
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <Button 
              size="lg" 
              className="bg-gradient-hero text-white shadow-glow hover:shadow-hover hover:scale-110 transition-all duration-500 border-0 px-8"
              onClick={() => scrollToSection('programs')}
            >
              Jelajahi Program
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:scale-110 hover:border-white/50 shadow-soft hover:shadow-glow transition-all duration-500 px-8"
              onClick={() => scrollToSection('about')}
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with enhanced animation */}
      <a 
        href="#about" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer hover:scale-125 z-20 drop-shadow-lg transition-all duration-300"
        aria-label="Gulir ke bagian tentang"
      >
        <ChevronDown size={40} strokeWidth={2.5} className="animate-float" />
      </a>
    </section>
  );
};

export default Hero;
