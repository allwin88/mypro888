export async function onRequest({ request }) {
  const url = new URL(request.url);
  const path = url.pathname;

  // 特殊处理：代理 API 请求
  const isApi = path.startsWith('/api/');
  const targetHost = isApi ? 'https://api.theboss.casino' : 'https://theboss.casino';
  const targetUrl = targetHost + url.pathname + url.search;

  const newHeaders = new Headers(request.headers);
  newHeaders.set('Referer', targetHost);
  newHeaders.set('Origin', targetHost);
  newHeaders.set('User-Agent', request.headers.get('user-agent') || '');

  const res = await fetch(targetUrl, {
    method: request.method,
    headers: newHeaders,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    redirect: 'follow'
  });

  const resHeaders = new Headers(res.headers);
  resHeaders.set('Access-Control-Allow-Origin', '*');
  resHeaders.delete('content-security-policy');
  resHeaders.delete('x-frame-options');

  return new Response(res.body, {
    status: res.status,
    headers: resHeaders
  });
}
