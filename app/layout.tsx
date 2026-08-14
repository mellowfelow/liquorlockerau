import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/AppShell';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: "Australia's premier online boutique for fine spirits, rare whiskies, craft gins, and fine wines delivered nationwide.",
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.tagline,
    url: `https://${SITE.domain}/`,
    images: [{ url: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=1200' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.tagline,
    images: ['https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=1200'],
  },
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content={SITE.gscVerification} />
        <script src="/js/webmcp.js" defer></script>
      </head>
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
