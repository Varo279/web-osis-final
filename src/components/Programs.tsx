import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Palette, Users, Newspaper, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import programsData from "@/data/programs.json";

const Programs = () => {
  const iconMap: Record<string, any> = {
    BookOpen,
    Trophy,
    Palette,
    Users,
    Newspaper,
    Heart
  };

  const programs = programsData.map(program => ({
    ...program,
    IconComponent: iconMap[program.icon]
  }));

  const displayPrograms = programs.slice(0, 10);
  const hasMore = programs.length > 10;

  return (
    <section id="programs" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Program Kerja
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Berbagai program yang dirancang untuk mengembangkan potensi dan kreativitas siswa 
            dalam berbagai bidang.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPrograms.map((program, index) => {
            const Icon = program.IconComponent;
            return (
              <Card 
                key={program.title}
                className="group overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-3 bg-card border-border animate-scale-in relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10 pointer-events-none" />
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 bg-gradient-hero rounded-full shadow-glow group-hover:scale-110 transition-transform duration-500">
                    <Icon className="text-white" size={20} />
                  </div>
                </div>
                <div className="p-6 relative z-20">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{program.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{program.description}</p>
                  <Link to={`/program/${program.id}`}>
                    <Button variant="outline" className="w-full group-hover:bg-gradient-hero group-hover:text-white group-hover:border-transparent transition-all duration-300">
                      Selengkapnya
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {hasMore && (
          <div className="text-center mt-12 animate-fade-in">
            <Link to="/programs">
              <Button size="lg" variant="outline" className="hover:bg-gradient-hero hover:text-white hover:border-transparent transition-all duration-500 hover:scale-110 hover:shadow-glow">
                Lihat Semua Program ({programs.length})
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Programs;
