'use client';

import Image from 'next/image';

export default function SiteBackdrop() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      <div className="absolute inset-0 scale-[1.06]">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[60%_center] cinematic-bg"
        />
      </div>
      {/* Very soft global wash so type stays legible deeper in the page */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,7,6,0.0) 0%, rgba(10,7,6,0.35) 55%, rgba(10,7,6,0.82) 100%)',
        }}
      />
    </div>
  );
}
