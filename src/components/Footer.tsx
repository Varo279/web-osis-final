const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold">
               <img src={osisLogo} alt="Logo OSIS" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <p className="font-bold">OSIS</p>
              <p className="text-sm text-background/80">Membangun Masa Depan Bersama</p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-background/80">
              © 2025 OSIS. Seluruh hak cipta dilindungi.
            </p>
            <p className="text-sm text-background/60">
              Dibuat dengan ❤️ oleh OSIS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
