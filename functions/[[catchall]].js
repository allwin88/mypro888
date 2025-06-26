export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetUrl = `https://theboss.casino${url.pathname}${url.search}`;

  const response = await fetch(targetUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: "follow",
  });

  const modifiedHeaders = new Headers(response.headers);
  modifiedHeaders.set('Access-Control-Allow-Origin', '*');
  modifiedHeaders.delete('Content-Security-Policy');
  modifiedHeaders.delete('X-Frame-Options');

  return new Response(response.body, {
    status: response.status,
    headers: modifiedHeaders,
  });
}
