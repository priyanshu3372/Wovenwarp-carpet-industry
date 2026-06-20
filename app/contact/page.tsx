import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Contact | Wovenwarp',
  description:
    'Connect with the Wovenwarp atelier for collection inquiries, custom rug commissions, and design consultations.',
};

export default function ContactPage() {
  return (
    <>
      <main className="relative pt-24 sm:pt-28">
        <Navbar />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
