import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import membersData from '@/data/members.json';

const MemberDetail = () => {
  const { id } = useParams();
  const member = membersData.find(m => 
    m.name.toLowerCase().replace(/\s+/g, '-') === id
  );

  if (!member) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Anggota Tidak Ditemukan</h2>
            <Link to="/#members" className="text-primary hover:underline">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Mock data - in real implementation, this would come from extended member data
  const memberDetails = {
    bio: "Anggota OSIS yang aktif dan berdedikasi tinggi dalam menjalankan tugas dan tanggung jawab. Memiliki komitmen kuat untuk memajukan organisasi dan melayani seluruh siswa.",
    email: `${member.name.toLowerCase().replace(/\s+/g, '.')}@sekolah.sch.id`,
    phone: "+62 812-3456-7890",
    achievements: [
      "Juara 1 Lomba Kepemimpinan Tingkat Kota 2023",
      "Best Coordinator Award 2024",
      "Volunteer of the Year 2023"
    ],
    responsibilities: [
      "Memimpin rapat koordinasi bulanan",
      "Mengawasi pelaksanaan program kerja",
      "Menjadi penghubung antara OSIS dengan pihak sekolah",
      "Membimbing anggota OSIS lainnya"
    ],
    programs: [
      { name: "Program Akademik", role: "Koordinator" },
      { name: "Kegiatan Sosial", role: "Anggota Aktif" },
      { name: "Event Sekolah", role: "Penanggung Jawab" }
    ]
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Link 
            to="/#members" 
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft size={20} />
            Kembali ke Anggota
          </Link>

          {/* Hero Section */}
          <Card className="p-8 mb-8 bg-gradient-hero text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full">
                <User className="text-white" size={64} />
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{member.name}</h1>
                <p className="text-2xl mb-2 opacity-90">{member.position}</p>
                <p className="text-lg opacity-80">{member.class}</p>
              </div>
            </div>
          </Card>

          {/* Tabs Content */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="responsibilities">Tanggung Jawab</TabsTrigger>
              <TabsTrigger value="programs">Program</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <User className="text-primary" />
                  Tentang
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {memberDetails.bio}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-primary" size={20} />
                    <a href={`mailto:${memberDetails.email}`} className="text-foreground hover:text-primary">
                      {memberDetails.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary" size={20} />
                    <a href={`tel:${memberDetails.phone}`} className="text-foreground hover:text-primary">
                      {memberDetails.phone}
                    </a>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="responsibilities" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Target className="text-primary" />
                  Tanggung Jawab
                </h2>
                <ul className="space-y-3">
                  {memberDetails.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1 shrink-0">
                        {index + 1}
                      </Badge>
                      <span className="text-muted-foreground">{resp}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="programs" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Program yang Diikuti</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {memberDetails.programs.map((program, index) => (
                    <Card key={index} className="p-4 bg-muted border-border">
                      <h3 className="font-bold text-foreground mb-2">{program.name}</h3>
                      <Badge variant="secondary">{program.role}</Badge>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MemberDetail;
