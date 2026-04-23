import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const refreshToken = request.cookies.get("refreshToken");
  const accessToken = request.cookies.get("accessToken");

  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  const isPrivatePage =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

  let isAuthenticated = !!accessToken;

  const response = NextResponse.next();

  
  if (!accessToken && refreshToken) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
        {
          method: "GET",
          headers: {
            Cookie: `refreshToken=${refreshToken.value}`,
          },
        }
      );

      if (res.ok) {
        isAuthenticated = true;

        const setCookie = res.headers.get("set-cookie");

        if (setCookie) {
        
          const cookiesArray = setCookie.split(",");

          cookiesArray.forEach((cookieStr) => {
            const [cookiePair] = cookieStr.split(";");
            const [name, value] = cookiePair.split("=");

            if (name && value) {
              response.cookies.set(name.trim(), value.trim(), {
                path: "/",
              });
            }
          });
        }
      }
    } catch {
      isAuthenticated = false;
    }
  }

 
  if (!isAuthenticated && isPrivatePage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

 
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};