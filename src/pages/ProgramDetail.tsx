import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Target, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import programsData from "@/data/programs.json";

const ProgramDetail = () => {
  const { id } = useParams();
  const program = programsData.find(p => p.id === id);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Sekretaris Bidang Tidak Ditemukan</h1>
          <Link to="/">
            <Button>Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={program.image} 
          alt={program.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link to="/#programs">
              <Button variant="ghost" className="mb-4 text-white hover:text-white">
                <ArrowLeft className="mr-2" size={20} />
                Kembali ke Beranda
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {program.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              {program.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 bg-gradient-hero text-white">
            <Target className="mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Tujuan Program</h3>
            <p className="text-white/90">{program.tujuan}</p>
          </Card>
          
          <Card className="p-6 col-span-2">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              Sasaran Sekretaris Bidang
            </h3>
            <ul className="space-y-3">
              {program.sasaran.map((sasaran: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-muted-foreground">{sasaran}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="text-primary" />
            Kegiatan Bidang
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {program.kegiatan.map((kegiatan: any, index: number) => (
              <Card key={index} className="p-6 hover:shadow-soft transition-all duration-300">
                <Badge className="mb-3">Kegiatan {index + 1}</Badge>
                <h3 className="text-xl font-bold mb-2">{kegiatan.nama}</h3>
                <p className="text-muted-foreground mb-3">{kegiatan.deskripsi}</p>
                <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                  <Calendar size={16} />
                  {kegiatan.jadwal}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-8 bg-muted">
          <h2 className="text-3xl font-bold mb-6">Pencapaian Program</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {program.pencapaian.map((pencapaian: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-white" size={20} />
                </div>
                <p className="font-medium">{pencapaian}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ProgramDetail;