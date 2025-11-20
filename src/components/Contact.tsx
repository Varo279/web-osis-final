import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "osis@sekolah.sch.id",
      href: "mailto:osis@sekolah.sch.id"
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "+62 812 3456 7890",
      href: "tel:+6281234567890"
    },
    {
      icon: MapPin,
      title: "Lokasi",
      content: "Gedung Sekolah, Ruang 201",
      href: "#"
    }
  ];

  const socialMedia = [
    { icon: Instagram, name: "Instagram", href: "#", color: "hover:text-pink-600" },
    { icon: Facebook, name: "Facebook", href: "#", color: "hover:text-blue-600" },
    { icon: Twitter, name: "Twitter", href: "#", color: "hover:text-sky-500" }
  ];

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
            Hubungi Kami
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ada pertanyaan atau ide? Kami senang mendengar dari Anda!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <Card 
                key={info.title}
                className={`group p-6 text-center hover:shadow-glow transition-all duration-500 hover:-translate-y-2 bg-card border-border ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-hero rounded-full mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-soft group-hover:shadow-glow">
                  <info.icon className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{info.title}</h3>
                <a 
                  href={info.href} 
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {info.content}
                </a>
              </Card>
            ))}
          </div>

          <Card className={`p-8 md:p-12 bg-gradient-hero text-white text-center shadow-glow hover:shadow-hover hover:scale-105 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: "300ms" }}>
            <h3 className="text-3xl font-bold mb-4 drop-shadow-lg">Bergabung dengan Tim Kami</h3>
            <p className="text-lg mb-6 opacity-95 drop-shadow-md">
              Tertarik menjadi bagian dari OSIS? Pendaftaran anggota baru dibuka setiap semester!
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90 hover:scale-110 transition-all duration-300 shadow-soft">
              Daftar Sekarang
            </Button>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm mb-4 opacity-90">Ikuti kami di media sosial</p>
              <div className="flex justify-center gap-6">
                {socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-125 hover:rotate-12"
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
