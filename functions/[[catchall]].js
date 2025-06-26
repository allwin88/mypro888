
export async function onRequest(context) {
  const url = new URL(context.request.url)
  const path = url.pathname === "/" ? "/index.html" : url.pathname

  if (path.endsWith(".html")) {
    let html = await context.env.ASSETS.fetch("https://stationen.pro" + path)
    let content = await html.text()
    content = content.replace(/theboss\.casino/gi, "stationen.pro")
                     .replace(/TheBoss\.Casino/gi, "Stationen")
                     .replace(/<title>(.*?)<\/title>/i, "<title>Stationen Sweepstakes</title>")
    return new Response(content, { headers: { "content-type": "text/html;charset=UTF-8" } })
  }

  return fetch("https://stationen.pro" + path)
}
