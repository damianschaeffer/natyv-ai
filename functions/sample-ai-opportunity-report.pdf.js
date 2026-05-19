export function onRequest({ request }) {
  const url = new URL(request.url);
  url.pathname = "/sample-ai-opportunity-report";
  url.search = "";

  return Response.redirect(url.toString(), 301);
}
