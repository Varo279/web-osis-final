import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Members from "@/components/Members";
import Programs from "@/components/Programs";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThemeCustomizer from "@/components/ThemeCustomizer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Members />
      <Programs />
      <Events />
      <Contact />
      <Footer />
      <ThemeCustomizer />
    </div>
  );
};

export default Index;
