
export async function onRequest(context) {
  const targetUrl = 'https://api.theboss.casino' + context.request.url.replace(/^https?:\/\/[^/]+\/api-proxy/, '');
  const modifiedRequest = new Request(targetUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.method !== 'GET' && context.request.method !== 'HEAD' ? context.request.body : null,
    redirect: 'follow'
  });

  return fetch(modifiedRequest);
}
