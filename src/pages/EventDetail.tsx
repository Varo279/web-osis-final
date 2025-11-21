import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, Target, CheckCircle, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import eventsData from "@/data/events.json";

const EventDetail = () => {
  const { id } = useParams();
  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Event Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-6">Event yang Anda cari tidak ada.</p>
            <Link to="/">
              <Button>Kembali ke Beranda</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Check if event is not active
  if (!event.active) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Event Belum Tersedia</h1>
            <p className="text-muted-foreground mb-6">Event ini sedang tidak aktif atau belum dimulai.</p>
            <Link to="/">
              <Button>Kembali ke Beranda</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "Orientasi": "bg-blue-500",
      "Perayaan": "bg-red-500",
      "Pelatihan": "bg-green-500",
      "Sosial": "bg-purple-500",
      "Seni": "bg-pink-500",
    };
    return colors[type] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link to="/#events">
              <Button variant="ghost" className="mb-4 text-white hover:text-white">
                <ArrowLeft className="mr-2" size={20} />
                Kembali ke Beranda
              </Button>
            </Link>
            <Badge className={`${getTypeColor(event.type)} text-white mb-4`}>
              {event.type}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mb-6">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>{event.participants}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Card className="p-8 mb-8 bg-gradient-hero text-white">
          <div className="flex items-start gap-4">
            <Target size={32} className="flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Tujuan Kegiatan</h2>
              <p className="text-lg text-white/90">{event.tujuan}</p>
            </div>
          </div>
        </Card>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Rangkaian Kegiatan</h2>
          <div className="space-y-4">
            {event.rangkaian_kegiatan.map((rangkaian: any, index: number) => (
              <Card key={index} className="p-6 hover:shadow-soft transition-all duration-300">
                {rangkaian.hari && (
                  <Badge className="mb-3 bg-primary">{rangkaian.hari}</Badge>
                )}
                {rangkaian.sesi && (
                  <Badge className="mb-3 bg-primary">{rangkaian.sesi}</Badge>
                )}
                {rangkaian.waktu && (
                  <div className="flex items-center gap-2 mb-3 text-primary font-semibold">
                    <Calendar size={16} />
                    {rangkaian.waktu}
                  </div>
                )}
                {rangkaian.tema && (
                  <h3 className="text-xl font-bold mb-3">{rangkaian.tema}</h3>
                )}
                {rangkaian.materi && (
                  <h3 className="text-xl font-bold mb-2">{rangkaian.materi}</h3>
                )}
                {rangkaian.kegiatan && (
                  <div>
                    {typeof rangkaian.kegiatan === 'string' ? (
                      <p className="text-muted-foreground">{rangkaian.kegiatan}</p>
                    ) : (
                      <ul className="space-y-2">
                        {rangkaian.kegiatan.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                {rangkaian.narasumber && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Narasumber:</strong> {rangkaian.narasumber}
                  </p>
                )}
                {rangkaian.jenis_lomba && (
                  <div className="mt-3">
                    <p className="font-semibold mb-2">Jenis Lomba:</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {rangkaian.jenis_lomba.map((lomba: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle size={16} className="text-primary" />
                          {lomba}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {rangkaian.keterangan && (
                  <p className="text-sm text-muted-foreground mt-2">{rangkaian.keterangan}</p>
                )}
                {rangkaian.penampilan && (
                  <div className="mt-3">
                    <ul className="space-y-1">
                      {rangkaian.penampilan.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {rangkaian.karya && (
                  <div className="mt-3">
                    <ul className="space-y-1">
                      {rangkaian.karya.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {rangkaian.peserta && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Peserta:</strong> {rangkaian.peserta}
                  </p>
                )}
                {rangkaian.kategori && (
                  <h4 className="text-lg font-bold mb-2 text-primary">{rangkaian.kategori}</h4>
                )}
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-8 bg-muted mb-8">
          <h2 className="text-3xl font-bold mb-6">Hasil Kegiatan</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {event.hasil_kegiatan.map((hasil: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-white" size={20} />
                </div>
                <p className="font-medium">{hasil}</p>
              </div>
            ))}
          </div>
        </Card>

        {event.donasi_terkumpul && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Donasi yang Terkumpul</h2>
            <ul className="space-y-2">
              {event.donasi_terkumpul.map((donasi: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-primary" />
                  <span>{donasi}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {event.testimoni && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6">Testimoni Peserta</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {event.testimoni.map((testi: any, index: number) => (
                <Card key={index} className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
                  <p className="text-muted-foreground italic mb-4">"{testi.testimoni}"</p>
                  <div>
                    <p className="font-bold">{testi.nama}</p>
                    <p className="text-sm text-muted-foreground">{testi.jabatan}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {event.penghargaan && (
          <Card className="p-8 mb-8 bg-gradient-hero text-white">
            <h2 className="text-2xl font-bold mb-4">Penghargaan</h2>
            <div className="space-y-3">
              {event.penghargaan.map((award: any, index: number) => (
                <div key={index}>
                  <p className="font-semibold">{award.kategori}</p>
                  <p className="text-white/90">{award.pemenang}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {event.fakta_menarik && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Fakta Menarik</h2>
            <ul className="space-y-2">
              {event.fakta_menarik.map((fakta: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">{fakta}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {event.rencana_tindak_lanjut && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Rencana Tindak Lanjut</h2>
            <ul className="space-y-2">
              {event.rencana_tindak_lanjut.map((rencana: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{rencana}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {event.gallery && event.gallery.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <ImageIcon className="text-primary" />
              Galeri Foto
            </h2>
            <ImageGallery images={event.gallery} title={event.title} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default EventDetail;