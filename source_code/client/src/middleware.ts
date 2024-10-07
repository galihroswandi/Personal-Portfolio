import { NextRequest, NextResponse } from "next/server";

const verificationContent =
  "google-site-verification: google3ba1178d8d152680.html";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const verificationUrls = [
    "/google3ba1178d8d152680.html",
    "/showcase-project/google3ba1178d8d152680.html",
    "/about-me/google3ba1178d8d152680.html",
    "/blog/google3ba1178d8d152680.html",
  ];

  if (verificationUrls.includes(pathname)) {
    return new NextResponse(verificationContent, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/google3ba1178d8d152680.html",
    "/showcase-project/google3ba1178d8d152680.html",
    "/about-me/google3ba1178d8d152680.html",
    "/blog/google3ba1178d8d152680.html",
  ],
};
