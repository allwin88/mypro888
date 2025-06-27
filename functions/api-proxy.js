export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.replace(/^\/api-proxy/, "");
  const targetUrl = "https://theboss.casino" + path + url.search;
  const request = new Request(targetUrl, context.request);
  const response = await fetch(request);
  return response;
}
