// functions/[[catchall]].js

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // 1. /api/* 自动转发到 /api-proxy/*
  if (path.startsWith("/api/")) {
    const newPath = path.replace(/^\/api\//, "/api-proxy/");
    return Response.redirect(new URL(newPath, url.origin), 307);
  }

  // 2. 其他情况，按原逻辑处理
  return fetch("https://theboss.casino" + path, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: "follow"
  });
}
