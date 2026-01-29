import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MyAgentSection from "@/components/MyAgentSection";
import ProductMatrixPreview from "@/components/ProductMatrixPreview";
import VideoSequence from "@/components/VideoSequence";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <MyAgentSection />
        <VideoSequence />
        <ProductMatrixPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;