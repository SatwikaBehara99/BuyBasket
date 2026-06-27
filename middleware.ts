import { NextResponse } from "next/server";

import { getToken, encode } from "next-auth/jwt";

import type { NextRequest } from "next/server";

export async function middleware(
  req: NextRequest
) {

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // ================= LOGIN PAGES =================

  // USER trying to open admin login
  if (
    pathname === "/admin/login"
  ) {

    // user logged in => block
    if (
      token &&
      token.role !== "admin"
    ) {

      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }

    // admin already logged in
    if (
      token &&
      token.role === "admin"
    ) {

      return NextResponse.redirect(
        new URL("/admin", req.url)
      );
    }

    return NextResponse.next();
  }

  // normal login page
  if (pathname === "/login") {

    // admin opens /login
    if (
      token &&
      token.role === "admin"
    ) {

      return NextResponse.redirect(
        new URL("/admin", req.url)
      );
    }

    return NextResponse.next();
  }

  // ================= ADMIN ROUTES =================

  if (
    pathname.startsWith("/admin")
  ) {

    // no login
    if (!token) {

      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    // user trying admin
    if (
      token.role !== "admin"
    ) {

      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }

    const now = Date.now();

    // 10 mins inactive logout
    const inactiveLimit =
      10 * 60 * 1000;

    // 1 hour absolute session logout
    const absoluteLimit =
      60 * 60 * 1000;

    const lastActivity =
      (token.lastActivity as number) ||
      now;

    const loginTime =
      (token.loginTime as number) ||
      now;

    // session expired
    if (
      now - lastActivity >
        inactiveLimit ||
      now - loginTime >
        absoluteLimit
    ) {

      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    // update activity
    const updatedToken = {
      ...token,
      lastActivity: now,
    };

    const encoded =
      await encode({
        token: updatedToken,
        secret:
          process.env
            .NEXTAUTH_SECRET!,
      });

    const response =
      NextResponse.next();

    // local
    response.cookies.set(
      "next-auth.session-token",
      encoded,
      {
        httpOnly: true,
        secure:
          process.env
            .NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
      }
    );

    // production secure
    response.cookies.set(
      "__Secure-next-auth.session-token",
      encoded,
      {
        httpOnly: true,
        secure:
          process.env
            .NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
      }
    );

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/admin/login",
  ],
};