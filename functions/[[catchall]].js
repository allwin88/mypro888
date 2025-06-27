export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetUrl = "https://theboss.casino" + url.pathname + url.search;

  const modifiedRequest = new Request(targetUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: "follow"
  });

  const response = await fetch(modifiedRequest);

  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  newHeaders.set("Access-Control-Allow-Headers", "*");

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders
  });
}
