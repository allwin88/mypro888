
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetUrl = "https://theboss.casino" + url.pathname + url.search;

  const modifiedRequest = new Request(targetUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: 'manual'
  });

  const response = await fetch(modifiedRequest);
  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  newHeaders.delete("content-security-policy");
  newHeaders.delete("content-security-policy-report-only");
  newHeaders.delete("clear-site-data");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}
