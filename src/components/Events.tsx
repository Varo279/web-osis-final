import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import eventsData from "@/data/events.json";

const Events = () => {
  const events = eventsData;
  const displayEvents = events.slice(0, 10);
  const hasMore = events.length > 10;

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "Orientasi": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "Perayaan": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      "Pelatihan": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "Sosial": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      "Seni": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <section id="events" className="py-20 bg-muted relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Kegiatan yang Telah Dilaksanakan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Berbagai kegiatan yang telah berhasil diselenggarakan OSIS untuk membangun 
            karakter dan mengembangkan potensi siswa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.map((event, index) => (
            <Card 
              key={event.title}
              className="group overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-3 bg-card border-border animate-scale-in relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10 pointer-events-none" />
              
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-all duration-500" />
                <div className="absolute top-4 right-4 animate-fade-in">
                  <Badge className={`${getTypeColor(event.type)} shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                    {event.type}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6 relative z-20">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{event.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    <Calendar size={16} className="flex-shrink-0 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    <MapPin size={16} className="flex-shrink-0 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    <Users size={16} className="flex-shrink-0 text-primary" />
                    <span>{event.participants}</span>
                  </div>
                </div>
                
                <Link to={`/event/${event.id}`}>
                  <Button variant="outline" className="w-full group-hover:bg-gradient-accent group-hover:text-white group-hover:border-transparent transition-all duration-300">
                    Lihat Detail
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-12 animate-fade-in">
            <Link to="/events">
              <Button size="lg" variant="outline" className="hover:bg-gradient-accent hover:text-white hover:border-transparent transition-all duration-500 hover:scale-110 hover:shadow-glow">
                Lihat Semua Kegiatan ({events.length})
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
