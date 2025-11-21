import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Trophy, Palette, Users, Newspaper, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import programsData from '@/data/programs.json';

const AllPrograms = () => {
  const iconMap: { [key: string]: any } = {
    BookOpen, Trophy, Palette, Users, Newspaper, Heart,
  };

  const programs = programsData.map(program => ({
    ...program,
    IconComponent: iconMap[program.icon] || BookOpen,
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Link 
            to="/#programs" 
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Semua Sekretaris Bidang
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Daftar lengkap program kerja OSIS periode 2025/2026
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card 
                key={program.id}
                className="overflow-hidden hover:shadow-soft transition-all duration-300 hover:-translate-y-2 bg-card border-border"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full">
                      <program.IconComponent className="text-white" size={24} />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3">{program.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{program.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.sasaran.slice(0, 2).map((sasaran, i) => (
                      <Badge key={i} variant="secondary">{sasaran}</Badge>
                    ))}
                  </div>
                  <Link 
                    to={`/program/${program.id}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                  >
                    Selengkapnya →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AllPrograms;
