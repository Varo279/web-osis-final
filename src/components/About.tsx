import { Card } from "@/components/ui/card";
import { Target, Heart } from "lucide-react";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Tentang OSIS
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Organisasi Siswa Intra Sekolah (OSIS) adalah wadah organisasi siswa yang menjadi 
            jembatan komunikasi antara siswa, guru, dan pihak sekolah dalam menciptakan 
            lingkungan belajar yang positif dan inspiratif.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <Card className={`group p-8 bg-card border-border hover:shadow-glow transition-all duration-700 hover:-translate-y-2 relative overflow-hidden ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-hero rounded-full flex-shrink-0 shadow-soft group-hover:shadow-glow group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Target className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">Visi</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  Menjadikan OSIS sebagai organisasi siswa yang aktif, kreatif, dan inovatif 
                  dalam mengembangkan potensi siswa serta menciptakan lingkungan sekolah yang 
                  harmonis, dinamis, dan berprestasi.
                </p>
              </div>
            </div>
          </Card>

          <Card className={`group p-8 bg-card border-border hover:shadow-glow transition-all duration-700 hover:-translate-y-2 relative overflow-hidden ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: "100ms" }}>
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-accent rounded-full flex-shrink-0 shadow-soft group-hover:shadow-glow group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Heart className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">Misi</h3>
                <ul className="text-muted-foreground leading-relaxed space-y-2 group-hover:text-foreground transition-colors duration-300">
                  <li className="hover:translate-x-2 transition-transform duration-300 cursor-default">• Mengembangkan kreativitas dan potensi siswa</li>
                  <li className="hover:translate-x-2 transition-transform duration-300 cursor-default">• Membangun karakter kepemimpinan yang baik</li>
                  <li className="hover:translate-x-2 transition-transform duration-300 cursor-default">• Menjalin komunikasi yang efektif</li>
                  <li className="hover:translate-x-2 transition-transform duration-300 cursor-default">• Menyelenggarakan kegiatan yang bermanfaat</li>
                  <li className="hover:translate-x-2 transition-transform duration-300 cursor-default">• Mewujudkan lingkungan sekolah yang kondusif</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <Card className={`p-8 md:p-12 bg-gradient-hero text-white shadow-glow hover:shadow-hover transition-all duration-700 hover:scale-105 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: "200ms" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4 drop-shadow-lg">Tujuan Kami</h3>
            <p className="text-lg leading-relaxed opacity-95 drop-shadow-md">
              Mewadahi aspirasi siswa, menyelenggarakan kegiatan yang bermakna, memupuk semangat 
              kepemimpinan, dan menciptakan lingkungan sekolah yang harmonis serta produktif 
              bagi seluruh warga sekolah.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default About;
