export async function onRequest({ request }) {
  const url = new URL(request.url);
  const target = `https://theboss.casino${url.pathname}${url.search}`;

  const newHeaders = new Headers(request.headers);
  newHeaders.set('Referer', 'https://theboss.casino');
  newHeaders.set('Origin', 'https://theboss.casino');
  newHeaders.set('User-Agent', request.headers.get('user-agent') || '');

  const res = await fetch(target, {
    method: request.method,
    headers: newHeaders,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    redirect: 'follow'
  });

  const resHeaders = new Headers(res.headers);
  resHeaders.delete('content-security-policy');
  resHeaders.delete('x-frame-options');

  return new Response(res.body, {
    status: res.status,
    headers: resHeaders
  });
}
