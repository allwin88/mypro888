export async function onRequest({ request }) {
  const url = new URL(request.url);
  const path = url.pathname;

  let targetHost = 'https://theboss.casino';

  // 处理 API 请求代理
  if (path.startsWith('/api/')) {
    targetHost = 'https://api.theboss.casino';
    url.pathname = path.replace('/api', '');
  }

  const targetUrl = targetHost + url.pathname + url.search;

  const modifiedHeaders = new Headers(request.headers);
  modifiedHeaders.set('Referer', targetHost);
  modifiedHeaders.set('Origin', targetHost);

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: modifiedHeaders,
    body: ['GET', 'HEAD'].includes(request.method) ? null : request.body,
    redirect: 'follow'
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');
  responseHeaders.delete('content-security-policy');
  responseHeaders.delete('x-frame-options');

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders
  });
}
