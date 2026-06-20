export type BehanceMediaItem = {
  id: string;
  title: string;
  category?: string;
  imageUrl: string;
  projectUrl: string;
  projectId?: string;
  publishedAt?: string;
  alt: string;
};

export type BehanceGalleryResponse = {
  items: BehanceMediaItem[];
  source: 'api' | 'feed' | 'profile' | 'fallback';
  username: string;
  fetchedAt: string;
  error?: string;
};

const DEFAULT_USERNAME = 'wovenwarp';
const DEFAULT_CACHE_SECONDS = 60 * 30;
const DEFAULT_PROJECT_MEDIA_LIMIT = 12;

const FALLBACK_ITEMS: BehanceMediaItem[] = [
  {
    id: 'fallback-interior-stories',
    title: 'Interior Stories',
    category: 'Rug Styling',
    imageUrl: '/images/lifestyle-living-room-01.webp',
    projectUrl: 'https://www.behance.net/wovenwarp',
    alt: 'Wovenwarp rug styled in a premium living room interior',
  },
  {
    id: 'fallback-heritage-motifs',
    title: 'Heritage Motifs',
    category: 'Design Language',
    imageUrl: '/images/editorial-heritage-v1.webp',
    projectUrl: 'https://www.behance.net/wovenwarp',
    alt: 'Heritage rug motifs and textile design details by Wovenwarp',
  },
  {
    id: 'fallback-material-studies',
    title: 'Material Studies',
    category: 'Wool & Yarn',
    imageUrl: '/images/material-yarn-bundles-01.webp',
    projectUrl: 'https://www.behance.net/wovenwarp',
    alt: 'Natural yarn and wool material study for Wovenwarp rugs',
  },
  {
    id: 'fallback-craft-details',
    title: 'Craft Details',
    category: 'Hand Knotting',
    imageUrl: '/images/craft-handknotting-01.webp',
    projectUrl: 'https://www.behance.net/wovenwarp',
    alt: 'Hand knotting craftsmanship detail from Wovenwarp atelier',
  },
];

const getUsername = () => process.env.BEHANCE_USERNAME || DEFAULT_USERNAME;

export const getBehanceCacheSeconds = () => {
  const configured = Number(process.env.BEHANCE_CACHE_SECONDS);
  return Number.isFinite(configured) && configured > 0
    ? configured
    : DEFAULT_CACHE_SECONDS;
};

const getProfileUrl = (username = getUsername()) =>
  process.env.BEHANCE_PROFILE_URL || `https://www.behance.net/${username}`;

const absoluteBehanceUrl = (url: string) =>
  url.startsWith('http') ? url : `https://www.behance.net${url}`;

const cleanText = (value?: string) =>
  decodeHtml(value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const decodeHtml = (value: string) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const canonicalImageKey = (url: string) =>
  url
    .replace(/\\/g, '/')
    .replace(/\/(hd|fs|max_\d+|disp|source|original|original_webp|max_\d+_webp|hd_webp|disp_webp|fs_webp)\//g, '/media/')
    .replace(/(_webp)(?=\/|$)/g, '')
    .replace(/\?.*$/, '');

const uniqueByImageAndProject = (items: BehanceMediaItem[]) => {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (!item.imageUrl || !item.projectUrl) return false;
    const key = `${item.projectUrl}|${canonicalImageKey(item.imageUrl)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const getProjectMediaLimit = () => {
  const configured = Number(process.env.BEHANCE_PROJECT_MEDIA_LIMIT);
  return Number.isFinite(configured) && configured > 0
    ? configured
    : DEFAULT_PROJECT_MEDIA_LIMIT;
};

const safeJsonParse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const extractJsonObjectAt = (text: string, startIndex: number) => {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = startIndex; index < text.length; index += 1) {
    const char = text[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) return text.slice(startIndex, index + 1);
    }
  }

  return '';
};

const pickLargestCover = (covers?: Record<string, any>) => {
  const available = Array.isArray(covers?.allAvailable)
    ? covers?.allAvailable
    : [];
  const preferred =
    available.find((cover: Record<string, any>) =>
      String(cover.url || '').includes('max_808_webp')
    ) ||
    available.find((cover: Record<string, any>) =>
      String(cover.url || '').includes('original_webp')
    ) ||
    available.find((cover: Record<string, any>) =>
      String(cover.url || '').includes('808_webp')
    ) ||
    available[0];

  return preferred?.url ? decodeHtml(String(preferred.url)) : '';
};

const parseProjectObject = (project: Record<string, any>): BehanceMediaItem | null => {
  const title = cleanText(project.name || project.title || project.slug) || 'Wovenwarp Project';
  const imageUrl = pickLargestCover(project.covers);
  const projectUrl = project.url ? absoluteBehanceUrl(project.url) : '';

  if (!imageUrl || !projectUrl) return null;

  return {
    id: String(project.id || project.projectId || projectUrl),
    title,
    category: 'Behance Project',
    imageUrl,
    projectUrl,
    projectId: project.id ? String(project.id) : undefined,
    publishedAt: project.publishedOn ? new Date(project.publishedOn * 1000).toISOString() : undefined,
    alt: `${title} project cover from the Wovenwarp Behance portfolio`,
  };
};

const parseEmbeddedProjectObjects = (html: string) => {
  const projects: BehanceMediaItem[] = [];
  let searchIndex = 0;
  const marker = '{"__typename":"Project"';

  while (searchIndex < html.length) {
    const startIndex = html.indexOf(marker, searchIndex);
    if (startIndex === -1) break;

    const objectText = extractJsonObjectAt(html, startIndex);
    const project = objectText ? safeJsonParse(objectText) : null;
    const mediaItem = project ? parseProjectObject(project) : null;

    if (mediaItem) projects.push(mediaItem);
    searchIndex = startIndex + marker.length;
  }

  return uniqueByImageAndProject(projects);
};

const normalizeApiItems = (payload: unknown, username: string): BehanceMediaItem[] => {
  const data = payload as Record<string, any>;
  const candidates =
    (Array.isArray(data?.items) && data.items) ||
    (Array.isArray(data?.projects) && data.projects) ||
    (Array.isArray(data?.data) && data.data) ||
    [];

  return uniqueByImageAndProject(
    candidates
      .map((item: Record<string, any>, index: number) => {
        const title = cleanText(item.title || item.name || item.project?.title) || 'Wovenwarp Project';
        const projectUrl =
          item.projectUrl ||
          item.url ||
          item.link ||
          item.permalink ||
          item.project?.url ||
          getProfileUrl(username);
        const imageUrl =
          item.imageUrl ||
          item.cover ||
          item.coverUrl ||
          item.thumbnail ||
          item.image ||
          item.covers?.original ||
          item.covers?.max_808 ||
          item.covers?.['404'];

        return {
          id: String(item.id || item.projectId || `${index}-${title}`),
          title,
          category: cleanText(item.category || item.field || item.project?.category),
          imageUrl,
          projectUrl: absoluteBehanceUrl(projectUrl),
          projectId: item.projectId ? String(item.projectId) : undefined,
          publishedAt: item.publishedAt || item.published_on || item.created_on,
          alt: cleanText(item.alt || `${title} from Wovenwarp on Behance`),
        };
      })
      .filter((item: BehanceMediaItem) => Boolean(item.imageUrl))
  );
};

const parseFeedItems = (xml: string, username: string): BehanceMediaItem[] => {
  const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

  return uniqueByImageAndProject(
    itemMatches
      .map((itemXml, index) => {
        const title = cleanText(itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i)?.[1] || itemXml.match(/<title>([\s\S]*?)<\/title>/i)?.[1]);
        const projectUrl = cleanText(itemXml.match(/<link>([\s\S]*?)<\/link>/i)?.[1]) || getProfileUrl(username);
        const publishedAt = cleanText(itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1]);
        const description = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i)?.[1] || '';
        const mediaUrl =
          itemXml.match(/<media:content[^>]+url="([^"]+)"/i)?.[1] ||
          itemXml.match(/<enclosure[^>]+url="([^"]+)"/i)?.[1] ||
          description.match(/<img[^>]+src="([^"]+)"/i)?.[1];

        return {
          id: `${projectUrl}-${index}`,
          title: title || 'Wovenwarp Project',
          category: 'Behance Project',
          imageUrl: decodeHtml(mediaUrl || ''),
          projectUrl: absoluteBehanceUrl(projectUrl),
          publishedAt,
          alt: `${title || 'Wovenwarp project'} from the Wovenwarp Behance portfolio`,
        };
      })
      .filter((item) => Boolean(item.imageUrl))
  );
};

const parseProfileItems = (html: string, username: string): BehanceMediaItem[] => {
  const embeddedProjects = parseEmbeddedProjectObjects(html);
  if (embeddedProjects.length > 0) return embeddedProjects;

  const projects = new Map<string, BehanceMediaItem>();
  const galleryLinkPattern = /href="(\/gallery\/(\d+)\/[^"]+)"[^>]*>([\s\S]{0,1800}?)(?=<a|<\/main|<\/body)/gi;
  let match: RegExpExecArray | null;

  while ((match = galleryLinkPattern.exec(html))) {
    const projectPath = decodeHtml(match[1]);
    const projectId = match[2];
    const chunk = match[3] || '';
    const imageUrl =
      chunk.match(/src="([^"]*(?:mir-s3|mir-s4|behance|adobe)[^"]*)"/i)?.[1] ||
      chunk.match(/"src":"([^"]*(?:mir-s3|mir-s4|behance|adobe)[^"]*)"/i)?.[1] ||
      chunk.match(/"image":"([^"]+)"/i)?.[1] ||
      chunk.match(/"cover":"([^"]+)"/i)?.[1];

    if (!imageUrl) continue;

    const title =
      cleanText(chunk.match(/alt="([^"]+)"/i)?.[1]) ||
      cleanText(chunk.match(/aria-label="([^"]+)"/i)?.[1]) ||
      cleanText(projectPath.split('/').pop()?.replace(/-/g, ' ')) ||
      'Wovenwarp Project';

    projects.set(projectPath, {
      id: projectId,
      title,
      category: 'Behance Project',
      imageUrl: decodeHtml(imageUrl.replace(/\\u002F/g, '/')),
      projectUrl: absoluteBehanceUrl(projectPath),
      projectId,
      alt: `${title} from the Wovenwarp Behance portfolio`,
    });
  }

  if (projects.size > 0) return Array.from(projects.values());

  const scriptMatches = html.match(/<script[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  const jsonText = scriptMatches
    .map((script) => cleanText(script.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '')))
    .find((script) => script.includes('/gallery/') && script.includes('src'));
  const jsonPayload = jsonText ? safeJsonParse(jsonText) : null;

  return jsonPayload ? normalizeApiItems(jsonPayload, username) : [];
};

const fetchText = async (url: string, cacheSeconds: number) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'text/html,application/rss+xml,application/xml,application/json',
        'User-Agent': 'Wovenwarp gallery sync/1.0',
      },
      next: { revalidate: cacheSeconds },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Behance request failed with ${response.status}`);
    }

    return response.text();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

const parseProjectMedia = (
  html: string,
  project: BehanceMediaItem
): BehanceMediaItem[] => {
  const imageMatches = Array.from(
    html.matchAll(
      /(?:src|data-src|content)="([^"]*(?:mir-s3|mir-s4|behance|adobe)[^"]*\.(?:jpg|jpeg|png|webp)(?:\?[^"]*)?)"/gi
    )
  );

  const media = imageMatches
    .map((match, index) => {
      const imageUrl = decodeHtml(match[1].replace(/\\u002F/g, '/'));
      if (imageUrl.includes('/user/')) return null;

      return {
        id: `${project.id}-media-${index}`,
        title: project.title,
        category: project.category || 'Behance Media',
        imageUrl,
        projectUrl: project.projectUrl,
        projectId: project.projectId,
        publishedAt: project.publishedAt,
        alt:
          index === 0
            ? project.alt
            : `${project.title} media ${index + 1} from the Wovenwarp Behance portfolio`,
      };
    })
    .filter(Boolean) as BehanceMediaItem[];

  return uniqueByImageAndProject(media);
};

const expandProjectMedia = async (
  projects: BehanceMediaItem[],
  cacheSeconds: number
) => {
  const limit = getProjectMediaLimit();
  const expanded = await Promise.all(
    projects.slice(0, limit).map(async (project) => {
      try {
        const html = await fetchText(project.projectUrl, cacheSeconds);
        const media = parseProjectMedia(html, project);
        return media.length > 0 ? media : [project];
      } catch {
        return [project];
      }
    })
  );

  return uniqueByImageAndProject(expanded.flat());
};

export async function fetchBehanceGallery(): Promise<BehanceGalleryResponse> {
  const username = getUsername();
  const cacheSeconds = getBehanceCacheSeconds();
  const fetchedAt = new Date().toISOString();

  try {
    const apiUrl = process.env.BEHANCE_API_URL;
    if (apiUrl) {
      const text = await fetchText(apiUrl, cacheSeconds);
      const payload = safeJsonParse(text);
      const items = payload ? normalizeApiItems(payload, username) : [];
      if (items.length > 0) return { items, source: 'api', username, fetchedAt };
    }

    const feedUrl =
      process.env.BEHANCE_FEED_URL ||
      `https://www.behance.net/feeds/user?username=${encodeURIComponent(username)}`;
    const feedXml = await fetchText(feedUrl, cacheSeconds);
    const feedItems = parseFeedItems(feedXml, username);
    if (feedItems.length > 0) {
      const items = await expandProjectMedia(feedItems, cacheSeconds);
      return { items, source: 'feed', username, fetchedAt };
    }

    const profileHtml = await fetchText(getProfileUrl(username), cacheSeconds);
    const profileItems = parseProfileItems(profileHtml, username);
    if (profileItems.length > 0) {
      const items = await expandProjectMedia(profileItems, cacheSeconds);
      return { items, source: 'profile', username, fetchedAt };
    }

    return {
      items: [],
      source: 'profile',
      username,
      fetchedAt,
      error: 'No public Behance media was found for this profile.',
    };
  } catch (error) {
    return {
      items: FALLBACK_ITEMS,
      source: 'fallback',
      username,
      fetchedAt,
      error:
        error instanceof Error
          ? error.message
          : 'Behance data is temporarily unavailable.',
    };
  }
}
