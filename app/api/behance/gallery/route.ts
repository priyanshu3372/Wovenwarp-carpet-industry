import { NextResponse } from 'next/server';
import { fetchBehanceGallery, getBehanceCacheSeconds } from '@/lib/behance';

export const dynamic = 'force-static';

export async function GET() {
  const cacheSeconds = getBehanceCacheSeconds();
  const gallery = await fetchBehanceGallery();

  return NextResponse.json(gallery, {
    headers: {
      'Cache-Control': `public, s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds * 2}`,
    },
  });
}
