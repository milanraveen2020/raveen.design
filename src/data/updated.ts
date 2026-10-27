// When each page's content last changed (YYYY-MM-DD). Feeds the sitemap's <lastmod>, each page's dateModified
// structured data and the "Updated" line on case studies. Change the date whenever you change a page's content.
import { WEBSITES } from './websites';

export const PAGE_UPDATED: Record<string, string> = {
  '/': '2026-10-27',
  '/work': '2026-10-27',
  '/about': '2026-10-26',
  '/expertise': '2026-10-27',
  '/contact': '2026-10-27',
};
/** Case studies without their own `updated` date. */
export const CASE_STUDIES_UPDATED = '2026-10-26';

/** Last-updated date for a path like /work/websites/mintage (no trailing slash), if known. */
export function updatedFor(path: string): string | undefined {
  if (PAGE_UPDATED[path]) return PAGE_UPDATED[path];
  const slug = path.match(/^\/work\/websites\/([^/]+)$/)?.[1];
  if (!slug) return undefined;
  return WEBSITES.find((w) => w.slug === slug)?.updated ?? CASE_STUDIES_UPDATED;
}

/** 27 October 2026 */
export const formatDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
