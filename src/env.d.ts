// gtag is defined inline by Analytics.astro when Google Analytics is configured.
interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
