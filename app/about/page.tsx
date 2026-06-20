import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import AboutUsSection from '@/components/sections/AboutUsSection';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'About Us | Wovenwarp',
  description:
    'Discover the Yadav family legacy, our Bhadohi hand-knotted weaving heritage, and the Wovenwarp vision.',
};

export default function AboutPage() {
  return (
    <>
      <main className="relative bg-ink-950 pt-24 sm:pt-28">
        <Navbar />
        <AboutUsSection />
      </main>
      <Footer />
    </>
  );
}
