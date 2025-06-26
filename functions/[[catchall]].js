export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  if (pathname.startsWith("/api-proxy/")) {
    const targetPath = pathname.replace("/api-proxy", "");
    const targetUrl = "https://api.theboss.casino" + targetPath + (url.search || "");

    const modifiedRequest = new Request(targetUrl, {
      method: context.request.method,
      headers: context.request.headers,
      body: context.request.body,
      redirect: 'follow',
    });

    const response = await fetch(modifiedRequest);

    // 复制响应并设置 CORS 头
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(await response.body, {
      status: response.status,
      headers: newHeaders
    });
  }

  // 其他请求照旧返回 index.html
  return new Response(await context.env.ASSETS.fetch(context.request));
}
