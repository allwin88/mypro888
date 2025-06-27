export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetUrl = 'https://theboss.casino' + url.pathname + url.search;
  const modifiedRequest = new Request(targetUrl, context.request);
  const response = await fetch(modifiedRequest);

  if (response.headers.get("content-type")?.includes("text/html")) {
    let html = await response.text();
    html = html.replace(/https:\/\/theboss\.casino/g, context.request.url.split("/")[0] + "//" + context.request.headers.get("host"));
    return new Response(html, {
      status: response.status,
      headers: { "content-type": "text/html" },
    });
  }

  return response;
}
