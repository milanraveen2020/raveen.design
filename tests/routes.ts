// Every public page, used by the crawl, responsive and accessibility tests.
import { WEBSITES } from '../src/data/websites';

export const PAGES = ['/', '/work', '/about', '/expertise', '/contact', ...WEBSITES.map((w) => '/work/websites/' + w.slug)];
