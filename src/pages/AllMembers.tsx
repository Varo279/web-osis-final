import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowLeft, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import membersData from '@/data/members.json';

const AllMembers = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12 bg-muted">
        <div className="container mx-auto px-4">
          <Link 
            to="/#members" 
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Semua Anggota OSIS
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pengurus OSIS periode 2025/2026
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membersData.map((member, index) => (
              <Link key={member.name} to={`/member/${member.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card 
                  className="p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-2 bg-card border-border cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-hero rounded-full mb-4">
                    <User className="text-white" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-1">{member.position}</p>
                  <p className="text-sm text-muted-foreground">{member.class}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AllMembers;
