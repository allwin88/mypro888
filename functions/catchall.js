export async function onRequest(context) {
  const { params } = context;
  const lang = (params['...catchall'] && params['...catchall'][0]) || 'en';
  let translations;
  switch(lang) {
    case 'es':
      translations = (await import('../langs/es.json')).default;
      break;
    case 'pt':
      translations = (await import('../langs/pt.json')).default;
      break;
    default:
      translations = (await import('../langs/en.json')).default;
      break;
  }
  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="utf-8"><title>${translations.title}</title></head>
<body><h1>${translations.title}</h1><p>${translations.description}</p></body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
