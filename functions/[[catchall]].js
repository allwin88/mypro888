
export async function onRequest(context) {
  const url = new URL(context.request.url)
  const pathname = url.pathname

  if (pathname === '/' || pathname === '/index.html') {
    return context.next()
  }

  return fetch(`https://theboss.casino${pathname}`, {
    headers: context.request.headers,
    method: context.request.method,
    body: context.request.body
  })
}
