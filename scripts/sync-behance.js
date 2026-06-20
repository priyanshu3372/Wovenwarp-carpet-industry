const fs = require('fs');
const path = require('path');

const DEFAULT_USERNAME = 'wovenwarp';
const DEFAULT_PROJECT_MEDIA_LIMIT = 12;

const FALLBACK_ITEMS = [
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
const getProjectMediaLimit = () => {
  const configured = Number(process.env.BEHANCE_PROJECT_MEDIA_LIMIT);
  return Number.isFinite(configured) && configured > 0
    ? configured
    : DEFAULT_PROJECT_MEDIA_LIMIT;
};

const getProfileUrl = (username = getUsername()) =>
  process.env.BEHANCE_PROFILE_URL || `https://www.behance.net/${username}`;

const absoluteBehanceUrl = (url) =>
  url.startsWith('http') ? url : `https://www.behance.net${url}`;

const cleanText = (value) =>
  decodeHtml(value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const decodeHtml = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const canonicalImageKey = (url) =>
  url
    .replace(/\\/g, '/')
    .replace(/\/(hd|fs|max_\d+|disp|source|original|original_webp|max_\d+_webp|hd_webp|disp_webp|fs_webp)\//g, '/media/')
    .replace(/(_webp)(?=\/|$)/g, '')
    .replace(/\?.*$/, '');

const uniqueByImageAndProject = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    if (!item.imageUrl || !item.projectUrl) return false;
    const key = `${item.projectUrl}|${canonicalImageKey(item.imageUrl)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const safeJsonParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const extractJsonObjectAt = (text, startIndex) => {
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

const pickLargestCover = (covers) => {
  const available = Array.isArray(covers?.allAvailable)
    ? covers?.allAvailable
    : [];
  const preferred =
    available.find((cover) =>
      String(cover.url || '').includes('max_808_webp')
    ) ||
    available.find((cover) =>
      String(cover.url || '').includes('original_webp')
    ) ||
    available.find((cover) =>
      String(cover.url || '').includes('808_webp')
    ) ||
    available[0];

  return preferred?.url ? decodeHtml(String(preferred.url)) : '';
};

const parseProjectObject = (project) => {
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

const parseEmbeddedProjectObjects = (html) => {
  const projects = [];
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

const normalizeApiItems = (payload, username) => {
  const data = payload || {};
  const candidates =
    (Array.isArray(data?.items) && data.items) ||
    (Array.isArray(data?.projects) && data.projects) ||
    (Array.isArray(data?.data) && data.data) ||
    [];

  return uniqueByImageAndProject(
    candidates
      .map((item, index) => {
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
      .filter((item) => Boolean(item.imageUrl))
  );
};

const parseFeedItems = (xml, username) => {
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

const parseProfileItems = (html, username) => {
  const embeddedProjects = parseEmbeddedProjectObjects(html);
  if (embeddedProjects.length > 0) return embeddedProjects;

  const projects = new Map();
  const galleryLinkPattern = /href="(\/gallery\/(\d+)\/[^"]+)"[^>]*>([\s\S]{0,1800}?)(?=<a|<\/main|<\/body)/gi;
  let match;

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

const fetchText = async (url) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'text/html,application/rss+xml,application/xml,application/json',
        'User-Agent': 'Wovenwarp gallery sync/1.0',
      },
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

const parseProjectMedia = (html, project) => {
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
    .filter(Boolean);

  return uniqueByImageAndProject(media);
};

const expandProjectMedia = async (projects) => {
  const limit = getProjectMediaLimit();
  const expanded = await Promise.all(
    projects.slice(0, limit).map(async (project) => {
      try {
        const html = await fetchText(project.projectUrl);
        const media = parseProjectMedia(html, project);
        return media.length > 0 ? media : [project];
      } catch (err) {
        console.warn(`Could not expand media for project: ${project.title}. Using cover.`);
        return [project];
      }
    })
  );

  return uniqueByImageAndProject(expanded.flat());
};

// Downloads a file from remote URL to a local destination
const downloadFile = async (url, destPath) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    await fs.promises.writeFile(destPath, buffer);
    return true;
  } catch (err) {
    clearTimeout(timeoutId);
    console.error(`Failed to download ${url}:`, err.message);
    return false;
  }
};

async function main() {
  const username = getUsername();
  const dataDir = path.join(__dirname, '..', 'public', 'data');
  const imagesDir = path.join(__dirname, '..', 'public', 'images', 'behance');
  const finalJsonPath = path.join(dataDir, 'behance-gallery.json');

  console.log(`Starting Behance sync for user: "${username}"...`);

  // Ensure directories exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  let items = [];
  let source = 'fallback';

  try {
    // 1. Try API URL
    const apiUrl = process.env.BEHANCE_API_URL;
    if (apiUrl) {
      console.log('Fetching from BEHANCE_API_URL...');
      const text = await fetchText(apiUrl);
      const payload = safeJsonParse(text);
      items = payload ? normalizeApiItems(payload, username) : [];
      if (items.length > 0) source = 'api';
    }

    // 2. Try RSS Feed
    if (items.length === 0) {
      const feedUrl =
        process.env.BEHANCE_FEED_URL ||
        `https://www.behance.net/feeds/user?username=${encodeURIComponent(username)}`;
      console.log(`Fetching RSS feed from: ${feedUrl}...`);
      const feedXml = await fetchText(feedUrl);
      const feedItems = parseFeedItems(feedXml, username);
      if (feedItems.length > 0) {
        console.log(`Found ${feedItems.length} projects in RSS feed, expanding media...`);
        items = await expandProjectMedia(feedItems);
        if (items.length > 0) source = 'feed';
      }
    }

    // 3. Try HTML profile scraping
    if (items.length === 0) {
      const profileUrl = getProfileUrl(username);
      console.log(`Fetching HTML profile from: ${profileUrl}...`);
      const profileHtml = await fetchText(profileUrl);
      const profileItems = parseProfileItems(profileHtml, username);
      if (profileItems.length > 0) {
        console.log(`Found ${profileItems.length} projects in profile HTML, expanding media...`);
        items = await expandProjectMedia(profileItems);
        if (items.length > 0) source = 'profile';
      }
    }

    if (items.length === 0) {
      throw new Error('No Behance items resolved from scraper channels.');
    }

    console.log(`Successfully resolved ${items.length} Behance items. Downloading images locally...`);

    // Download images locally
    let successCount = 0;
    const localizedItems = [];

    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      // Clean and sanitize ID for filenames
      const sanitizedId = String(item.id).replace(/[^a-zA-Z0-9-_]/g, '_');
      
      // Determine file extension from image URL or fallback to png
      let ext = 'png';
      const matchExt = item.imageUrl.match(/\.(jpg|jpeg|png|webp|gif)(?:\?|$)/i);
      if (matchExt) {
        ext = matchExt[1].toLowerCase();
      }

      const filename = `${sanitizedId}.${ext}`;
      const destPath = path.join(imagesDir, filename);

      console.log(`[${index + 1}/${items.length}] Downloading cover image for "${item.title}"...`);
      const success = await downloadFile(item.imageUrl, destPath);

      if (success) {
        successCount += 1;
        localizedItems.push({
          ...item,
          imageUrl: `/images/behance/${filename}`, // Point to local path!
        });
      } else {
        // Fallback to external url if download failed
        localizedItems.push(item);
      }
    }

    console.log(`Downloaded ${successCount}/${items.length} images locally.`);

    const outputPayload = {
      items: localizedItems,
      source,
      username,
      fetchedAt: new Date().toISOString(),
    };

    await fs.promises.writeFile(finalJsonPath, JSON.stringify(outputPayload, null, 2));
    console.log(`Saved sync data successfully to: ${finalJsonPath}`);

  } catch (err) {
    console.error('Error syncing Behance portfolio:', err.message);
    
    // Check if we already have a previous JSON file we can load
    if (fs.existsSync(finalJsonPath)) {
      console.log('Fallback: Re-using existing local behance-gallery.json cache to prevent build failure.');
    } else {
      console.log('Fallback: Writing default fallback items to prevent build failure.');
      const fallbackPayload = {
        items: FALLBACK_ITEMS,
        source: 'fallback',
        username,
        fetchedAt: new Date().toISOString(),
        error: err.message,
      };
      await fs.promises.writeFile(finalJsonPath, JSON.stringify(fallbackPayload, null, 2));
    }
  }
}

main();
