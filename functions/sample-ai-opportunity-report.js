export function onRequest({ request }) {
  const url = new URL(request.url);
  url.pathname = "/advisory";
  url.search = "";

  return Response.redirect(url.toString(), 301);
}
