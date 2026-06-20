'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Ruler, Users, Home } from 'lucide-react';
import LuxuryButton from '@/components/ui/LuxuryButton';

const CUSTOM_PILLARS = [
    {
        icon: Palette,
        title: 'Personalized Artistry',
        description: 'A curated journey through color, pattern, and texture, tailored to your interior identity.',
    },
    {
        icon: Ruler,
        title: 'Architectural Scale',
        description: 'Bespoke dimensions and shapes designed to harmonize perfectly with your spatial layout.',
    },
    {
        icon: Users,
        title: 'Design Consultation',
        description: 'One-on-one collaboration with our atelier experts to translate your vision into a textile masterpiece.',
    },
    {
        icon: Home,
        title: 'Exceptional Spaces',
        description: 'From luxury villas to boutique hospitality, we craft anchors for the world’s most refined interiors.',
    },
];

export default function CustomRugSection() {
    const rootRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const rootEl = rootRef.current;
        if (!rootEl) return;

        const ctx = gsap.context(() => {
            rootEl.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.4,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                        },
                    }
                );
            });
        }, rootEl);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={rootRef} id="custom-rugs" className="relative overflow-hidden bg-ink-950">
            {/* Hero / Intro */}
            <section className="relative px-5 py-20 sm:px-6 lg:px-12">
                <div className="absolute inset-0 bg-noise opacity-[0.02]" />
                <div className="mx-auto max-w-[1500px]">
                    <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
                        <div data-reveal className="col-span-12 lg:col-span-6">
                            <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
                                <span className="h-px w-10 bg-gold-300/50" />
                                Bespoke Atelier
                            </span>
                            <h2 className="font-serif text-[clamp(3rem,8vw,7.4rem)] font-medium leading-[0.92] tracking-tightest text-bone">
                                Tailored for Your Interior Identity
                            </h2>
                            <p className="mt-10 max-w-xl text-[16px] font-light leading-[1.85] text-bone/70 md:text-lg">
                                Where craftsmanship meets individuality. Our bespoke service invites you to become part of the weaving legacy, creating a singular expression of luxury designed exclusively for your space.
                            </p>
                            <div className="mt-10">
                                <LuxuryButton variant="primary" href="/contact">
                                    Request Consultation
                                </LuxuryButton>
                            </div>
                        </div>

                        <div data-reveal className="col-span-12 lg:col-span-6">
                            <div className="relative min-h-[500px] overflow-hidden rounded-sm border border-bone/10 lg:min-h-[700px]">
                                <Image
                                    src="/images/studio-moodboard-sampling-01.webp"
                                    alt="Luxury bespoke rug material flatlay and design moodboard"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Pillars of Customization */}
            <section className="relative px-5 py-20 sm:px-6 lg:px-12 bg-ink-900/20">
                <div className="mx-auto max-w-[1500px]">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                        {CUSTOM_PILLARS.map((pillar, idx) => {
                            const Icon = pillar.icon;
                            return (
                                <div key={idx} data-reveal className="group">
                                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/20 bg-gold-300/5 transition-colors group-hover:border-gold-300/50">
                                        <Icon size={22} className="text-gold-300/80" />
                                    </div>
                                    <h3 className="font-serif text-2xl italic text-bone mb-4">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-[14px] leading-relaxed text-bone/60">
                                        {pillar.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Material & Process Visuals */}
            <section className="relative px-5 py-20 sm:px-6 lg:px-12">
                <div className="mx-auto max-w-[1500px]">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div data-reveal className="md:col-span-8">
                            <div className="relative min-h-[400px] overflow-hidden rounded-sm border border-bone/10">
                                <Image
                                    src="/images/craft-handknotting-01.webp"
                                    alt="Artisan hands working on a custom weave"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div data-reveal className="md:col-span-4 flex flex-col justify-center bg-bone/[0.02] p-10 border border-bone/5">
                            <h4 className="text-[10px] uppercase tracking-editorial text-gold-300/75 mb-6">
                                The Process
                            </h4>
                            <ul className="space-y-8">
                                {[
                                    { label: 'Consult', text: 'Styling and material analysis' },
                                    { label: 'Design', text: 'Pattern rendering and color matching' },
                                    { label: 'Weave', text: 'Precision hand-knotting to specification' },
                                    { label: 'Perfect', text: 'Detailed finishing and edge detailing' },
                                ].map((step, i) => (
                                    <li key={i} className="flex gap-5">
                                        <span className="font-serif italic text-gold-300/60">0{i + 1}</span>
                                        <div>
                                            <p className="text-bone font-medium text-sm mb-1">{step.label}</p>
                                            <p className="text-bone/50 text-[13px]">{step.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing Quote */}
            <section className="relative px-5 py-20 sm:px-6 lg:px-12 text-center">
                <div className="mx-auto max-w-4xl" data-reveal>
                    <span className="mb-8 block text-[10px] uppercase tracking-editorial text-gold-300/75">
                        Artisan-Made Exclusivity
                    </span>
                    <p className="font-serif text-3xl md:text-5xl italic leading-tight text-bone">
                        "A bespoke rug is not just an interior choice—it is the emotional anchor of a curated home."
                    </p>
                </div>
            </section>
        </div>
    );
}
