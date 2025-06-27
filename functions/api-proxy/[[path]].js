export async function onRequest(context) {
  const { params, request } = context;
  const path = params.path;
  const apiUrl = "https://api.theboss.casino/" + path + (new URL(request.url).search || "");

  const newRequest = new Request(apiUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: "follow"
  });

  const response = await fetch(newRequest);
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  };

  const newHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(corsHeaders)) {
    newHeaders.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders
  });
}
