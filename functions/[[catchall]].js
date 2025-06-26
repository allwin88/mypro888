export async function onRequest(context) {
  const url = new URL(context.request.url)
  if (!url.pathname.endsWith(".html") && !url.pathname.includes(".")) {
    return fetch(new URL("/index.html", context.request.url))
  }
  return context.next()
}
