import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import membersData from "@/data/members.json";

const Members = () => {
  const members = membersData;
  const displayMembers = members.slice(0, 10);
  const hasMore = members.length > 9;

  return (
    <section id="members" className="py-20 bg-muted relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-32 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Anggota OSIS
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pengurus OSIS periode 2025/2026 yang siap melayani dan mengembangkan 
            potensi seluruh siswa di sekolah kami.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayMembers.map((member, index) => (
            <Link key={member.name} to={`/member/${member.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <Card 
                className="group p-6 text-center hover:shadow-glow transition-all duration-500 hover:-translate-y-3 bg-card border-border cursor-pointer animate-scale-in relative overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-hero rounded-full mb-4 shadow-soft group-hover:shadow-glow group-hover:scale-110 transition-all duration-500">
                    <User className="text-white" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                  <p className="text-primary font-semibold mb-1">{member.position}</p>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{member.class}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-12 animate-fade-in">
            <Link to="/members">
              <Button size="lg" variant="outline" className="hover:bg-gradient-secondary hover:text-white hover:border-transparent transition-all duration-500 hover:scale-110 hover:shadow-glow">
                Lihat Semua Anggota ({members.length})
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Members;
