'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import BehanceMark from '@/components/ui/BehanceMark';
import type { BehanceGalleryResponse, BehanceMediaItem } from '@/lib/behance';

const REFRESH_MS = 30 * 60 * 1000;

const SKELETONS = Array.from({ length: 8 }, (_, index) => index);

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {SKELETONS.map((item) => (
        <div
          key={item}
        className="relative min-h-[220px] overflow-hidden rounded-sm border border-bone/10 bg-bone/[0.04] sm:min-h-[340px]"
        >
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-bone/[0.03] via-bone/[0.08] to-bone/[0.02]" />
          <div className="absolute inset-x-5 bottom-5 space-y-3">
            <div className="h-3 w-24 rounded-full bg-bone/10" />
            <div className="h-8 w-3/4 rounded-full bg-bone/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

function GalleryState({
  title,
  message,
  onRetry,
}: {
  title: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[360px] max-w-2xl flex-col items-center justify-center rounded-sm border border-bone/10 bg-bone/[0.035] px-6 py-12 text-center">
      <BehanceMark size={28} className="mb-5 text-gold-300" />
      <h2 className="font-serif text-[clamp(1.8rem,4vw,3.8rem)] italic text-bone">
        {title}
      </h2>
      <p className="mt-4 max-w-md text-[clamp(0.875rem,2vw,1rem)] leading-[1.7] text-bone/65">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-7 inline-flex min-h-[44px] items-center gap-3 rounded-full border border-gold-300/35 px-5 py-3 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-bone transition hover:border-gold-300/65 hover:bg-gold-300/10"
        >
          <RefreshCw size={14} aria-hidden />
          Try Again
        </button>
      )}
    </div>
  );
}

function GalleryCard({ item, index }: { item: BehanceMediaItem; index: number }) {
  const tall = index % 5 === 1 || index % 5 === 4;

  return (
    <motion.a
      href={item.projectUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: 'easeOut', delay: Math.min(index * 0.04, 0.28) }}
      className={`group relative block overflow-hidden rounded-sm border border-bone/10 bg-ink-900 outline-none ring-gold-300/0 transition focus-visible:ring-2 ${tall
          ? 'min-h-[300px] sm:min-h-[420px] lg:row-span-2 lg:min-h-[680px]'
          : 'min-h-[260px] sm:min-h-[400px]'
        }`}
    >
      <Image
        src={item.imageUrl}
        alt={item.alt}
        fill
        priority={index < 4}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-[1.045]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/12 to-transparent transition duration-700 group-hover:from-ink-950/82" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="mb-2 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/80">
          {item.category || 'Behance Project'}
        </p>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-[clamp(1.25rem,6vw,3rem)] italic leading-none text-bone">
            {item.title}
          </h2>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bone/25 text-bone transition group-hover:border-gold-300/70 group-hover:text-gold-300">
            <ArrowUpRight size={16} aria-hidden />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function BehanceGalleryGrid() {
  const [gallery, setGallery] = useState<BehanceGalleryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGallery = async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/behance/gallery', {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Gallery request failed with ${response.status}`);
      }

      setGallery(await response.json());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'The Behance gallery could not be loaded.'
      );
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
    const intervalId = window.setInterval(() => loadGallery(true), REFRESH_MS);
    return () => window.clearInterval(intervalId);
  }, []);

  const items = useMemo(() => gallery?.items || [], [gallery]);

  if (loading) return <GallerySkeleton />;

  if (error && !gallery) {
    return (
      <GalleryState
        title="Gallery Temporarily Unavailable"
        message="We could not reach the Behance portfolio just now. Please refresh, or visit the full Behance profile directly."
        onRetry={() => loadGallery()}
      />
    );
  }

  if (items.length === 0) {
    return (
      <GalleryState
        title="No Media Found"
        message="No public Behance projects were found for this profile yet. New public projects will appear here automatically once Behance exposes them."
        onRetry={() => loadGallery()}
      />
    );
  }

  return (
    <div>
      {gallery?.error && (
        <div className="mb-6 rounded-sm border border-gold-300/20 bg-gold-300/[0.06] px-4 py-3 text-[clamp(0.75rem,1.8vw,0.875rem)] leading-[1.6] text-bone/70">
          Live Behance data is temporarily unavailable, so this view is showing the latest cached showcase.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense auto-rows-[minmax(260px,auto)]">
        {items.map((item, index) => (
          <GalleryCard key={item.id} item={item} index={index} />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-bone/10 pt-5 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-bone/45 sm:flex-row sm:items-center sm:justify-between">
        <p>Source: Behance {gallery?.source === 'fallback' ? 'fallback cache' : gallery?.source}</p>
        {gallery?.fetchedAt && <p>Last refreshed {new Date(gallery.fetchedAt).toLocaleString()}</p>}
      </div>
    </div>
  );
}
