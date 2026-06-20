import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import AboutUsSection from '@/components/sections/AboutUsSection';
import CollectionsSection from '@/components/sections/CollectionsSection';
import CustomRugsSection from '@/components/sections/CustomRugsSection';
import MaterialsCareSection from '@/components/sections/MaterialsCareSection';
import BehanceShowcaseSection from '@/components/sections/BehanceShowcaseSection';
import DivisionSection from '@/components/sections/DivisionSection';
import Footer from '@/components/layout/Footer';

export default function Page() {
  return (
    <>
      <main className="relative">
        <Navbar />
        <Hero />
        <AboutUsSection />
        <CollectionsSection />
        <CustomRugsSection />
        <MaterialsCareSection />
        <BehanceShowcaseSection />
        <DivisionSection />
      </main>

      <Footer />
    </>
  );
}
