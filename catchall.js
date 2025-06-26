export async function onRequest(context) {
  const replacements = {
    "{{TITLE}}": "Stationen Pro - Sweepstakes Platform",
    "{{DESCRIPTION}}": "Play free sweepstakes games and win exciting prizes.",
    "{{KEYWORDS}}": "sweepstakes, casino, slots, free games"
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{TITLE}}</title>
    <meta name="description" content="{{DESCRIPTION}}">
    <meta name="keywords" content="{{KEYWORDS}}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>{{TITLE}}</h1>
    <p>Welcome to our sweepstakes platform – your gateway to fun and rewards!</p>
</body>
</html>`;

  let content = html;
  for (const key in replacements) {
    content = content.replaceAll(key, replacements[key]);
  }

  return new Response(content, {
    headers: { "Content-Type": "text/html; charset=UTF-8" }
  });
}