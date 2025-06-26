export async function onRequest(context) {
  return new Response(await context.env.ASSETS.fetch(context.request));
}
