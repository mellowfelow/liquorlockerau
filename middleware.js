import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|fonts/|js/).*)'],
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const accept = request.headers.get('accept') || '';

  if (prefersMarkdownOverHtml(accept) && eligiblePath(url.pathname)) {
    // Generate text/markdown summary representation
    const mdContent = `# ${url.pathname}
> Liquor Locker AU — Australia's Premier Vault for Fine Spirits, Rare Whiskies & Craft Liquors

Visit https://liquorlocker.com.au${url.pathname} for the full interactive liquor vault experience.
`;
    return new NextResponse(mdContent, {
      status: 200,
      headers: { 'content-type': 'text/markdown; charset=utf-8' },
    });
  }

  return NextResponse.next();
}

function eligiblePath(pathname) {
  if (pathname.startsWith('/api/') || pathname.startsWith('/.well-known/') || pathname.includes('.')) {
    return false;
  }
  return true;
}

function prefersMarkdownOverHtml(accept) {
  let mdQ = -1;
  let htmlQ = -1;
  const parts = accept.split(',');
  for (const part of parts) {
    const [type, ...params] = part.trim().split(';').map((s) => s.trim());
    let q = 1;
    for (const p of params) {
      const m = /^q=([\d.]+)$/.exec(p);
      if (m) q = parseFloat(m[1]);
    }
    if (type === 'text/markdown') mdQ = Math.max(mdQ, q);
    if (type === 'text/html') htmlQ = Math.max(htmlQ, q);
  }
  return mdQ > -1 && mdQ > htmlQ;
}
