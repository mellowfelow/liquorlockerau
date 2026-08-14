import { SITE } from '@/config/site';

export default function robots() {
  const baseUrl = `https://${SITE.domain}`;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/thank-you-contact/',
          '/thank-you-order/',
          '/thank-you-wholesale/',
          '/api/',
        ],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Applebot',
          'Amazonbot',
          'Bytespider',
          'CCBot',
          'Google-Extended',
          'Meta-ExternalAgent',
          'cohere-ai',
        ],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
