import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import eventsData from '@/data/events.json';

const AllEvents = () => {
  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Orientasi': 'bg-blue-100 text-blue-800',
      'Perayaan': 'bg-green-100 text-green-800',
      'Pelatihan': 'bg-purple-100 text-purple-800',
      'Sosial': 'bg-pink-100 text-pink-800',
      'Seni': 'bg-orange-100 text-orange-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Link 
            to="/#events" 
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Semua Kegiatan
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dokumentasi lengkap kegiatan OSIS periode 2025/2026
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsData.map((event, index) => (
              <Card 
                key={event.id}
                className="overflow-hidden hover:shadow-soft transition-all duration-300 hover:-translate-y-2 bg-card border-border"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <Badge className={`absolute top-4 right-4 ${getTypeColor(event.type)}`}>
                    {event.type}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3">{event.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users size={16} />
                      <span>{event.participants}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/event/${event.id}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                  >
                    Lihat Detail →
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

export default AllEvents;
