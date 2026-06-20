import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BehanceGalleryGrid from '@/components/sections/BehanceGalleryGrid';
import BehanceMark from '@/components/ui/BehanceMark';

export const metadata: Metadata = {
  title: 'Gallery | Wovenwarp',
  description:
    'Explore the latest Wovenwarp visual portfolio from Behance, including rug styling, craft details, material studies, and project covers.',
  openGraph: {
    title: 'Gallery | Wovenwarp',
    description:
      'A high-end visual showcase synced with the Wovenwarp Behance portfolio.',
    url: '/gallery',
    images: [
      {
        url: '/images/lifestyle-living-room-01.png',
        width: 1536,
        height: 1024,
        alt: 'Wovenwarp Behance gallery showcase',
      },
    ],
  },
};

export default function GalleryPage() {
  return (
    <>
      <main className="relative bg-ink-950 pt-24 sm:pt-28">
        <Navbar />
        <section className="relative overflow-hidden px-4 pt-16 pb-0 sm:px-6 sm:pt-24 sm:pb-0 lg:px-12">
          <div className="absolute inset-0 bg-noise opacity-[0.025]" />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="mb-10 grid gap-7 sm:mb-14 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <span className="mb-4 flex items-center gap-3 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75 sm:mb-5 sm:gap-4">
                  <span className="h-px w-8 bg-gold-300/50 sm:w-10" />
                  Gallery
                </span>
                <h1 className="font-serif text-[clamp(2.4rem,7vw,8rem)] font-medium leading-[0.9] tracking-tightest text-bone">
                  Behance Portfolio
                </h1>
                <p className="mt-6 max-w-3xl text-[clamp(0.875rem,2vw,1rem)] font-light leading-[1.7] text-bone/68 sm:mt-7 sm:leading-[1.85]">
                  A living portfolio of Wovenwarp projects, visual studies, craft details,
                  and editorial rug imagery synchronized from Behance.
                </p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <a
                  href="https://www.behance.net/wovenwarp"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-[44px] items-center gap-3 rounded-full border border-bone/15 px-5 py-3 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-bone/78 transition hover:border-gold-300/55 hover:text-gold-300 sm:px-6"
                >
                  <BehanceMark size={18} />
                  Open Behance
                </a>
              </div>
            </div>

            <BehanceGalleryGrid />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
