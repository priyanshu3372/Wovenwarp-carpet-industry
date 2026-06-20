import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CollectionsSection from '@/components/sections/CollectionsSection';

export const metadata: Metadata = {
    title: 'Collections | Wovenwarp',
    description:
        'Explore the Wovenwarp collection showcase, featuring curated rug designs, artisanal narratives, and premium materials.',
    openGraph: {
        title: 'Collections | Wovenwarp',
        description:
            'A refined collection page presenting Wovenwarp rugs, materials, and design inspirations.',
        url: '/collections',
        images: [
            {
                url: '/images/lifestyle-living-room-01.png',
                width: 1536,
                height: 1024,
                alt: 'Wovenwarp collections showcase',
            },
        ],
    },
};

export default function CollectionsPage() {
    return (
        <>
            <main className="relative bg-ink-950 pt-24 sm:pt-28">
                <Navbar />
                <CollectionsSection />
            </main>
            <Footer />
        </>
    );
}
