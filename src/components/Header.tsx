import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import osisLogo from "@/assets/osis-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initialize dark mode from localStorage
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { name: "Beranda", href: "#home" },
    { name: "Tentang", href: "#about" },
    { name: "Anggota", href: "#members" },
    { name: "Program", href: "#programs" },
    { name: "Kegiatan", href: "#events" },
    { name: "Kontak", href: "#contact" },
    { name: "Polling", href: "/polling" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border shadow-soft transition-all duration-300">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
              <img src={osisLogo} alt="Logo OSIS" className="w-10 h-10 object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">OSIS SMPN 4 PAKEM</h1>
              <p className="text-xs text-muted-foreground">Periode 2025/2026</p>
            </div>
          </a>

          {/* Desktop Navigation - Centered */}
          <ul className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    className="text-foreground hover:text-primary transition-all duration-300 font-semibold text-sm relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-hero after:transition-all after:duration-300 hover:after:w-full pb-1"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="text-foreground hover:text-primary transition-all duration-300 font-semibold text-sm relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-hero after:transition-all after:duration-300 hover:after:w-full pb-1"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
            <ul className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <li key={item.name} style={{ animationDelay: `${index * 0.1}s` }} className="animate-slide-in">
                  {item.href.startsWith('#') ? (
                    <a
                      href={item.href}
                      className="block text-foreground hover:text-primary transition-all duration-300 font-semibold py-2 px-4 rounded-lg hover:bg-primary/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="block text-foreground hover:text-primary transition-all duration-300 font-semibold py-2 px-4 rounded-lg hover:bg-primary/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
