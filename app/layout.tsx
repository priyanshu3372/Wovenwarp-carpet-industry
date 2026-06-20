import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScroll from '@/components/ui/SmoothScroll';
import LuxuryLoader from '@/components/ui/LuxuryLoader';
import SiteBackdrop from '@/components/ui/SiteBackdrop';
import { WaitlistProvider } from '@/components/providers/WaitlistProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  title: 'Wovenwarp - Woven Into Legacy',
  description:
    'Contemporary handcrafted rugs shaped by timeless weaving traditions, refined textures, and modern design sensibilities.',
  metadataBase: new URL('https://wovenwarp.example'),
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Wovenwarp - Woven Into Legacy',
    description:
      'Handwoven rugs, textiles, and timeless spaces. Heritage craftsmanship reimagined for the modern home.',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 1536,
        height: 1024,
        alt: 'Wovenwarp - Woven Into Legacy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wovenwarp - Woven Into Legacy',
    description:
      'Handwoven rugs, textiles, and timeless spaces. Heritage craftsmanship reimagined for the modern home.',
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-ink-950">
      <body className="min-h-screen bg-ink-950 text-bone antialiased">
        <SiteBackdrop />
        <LuxuryLoader />
        <WaitlistProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </WaitlistProvider>
      </body>
    </html>
  );
}
