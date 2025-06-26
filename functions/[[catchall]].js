
export async function onRequest({ request }) {
  const url = new URL(request.url);
  const target = 'https://theboss.casino' + url.pathname + url.search;

  const modifiedRequest = new Request(target, {
    method: request.method,
    headers: request.headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : null,
    redirect: 'follow'
  });

  const response = await fetch(modifiedRequest);

  // HTML 页面内容注入标题替换示例
  if (response.headers.get('content-type')?.includes('text/html')) {
    let text = await response.text();
    text = text.replace(/theboss\.casino/gi, 'stationen.pro');
    return new Response(text, {
      status: response.status,
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  }

  return response;
}
