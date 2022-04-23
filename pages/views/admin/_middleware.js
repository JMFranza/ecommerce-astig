import { NextResponse, NextFetchEvent, NextRequest } from "next/server";
const jwt = require("jsonwebtoken");

export async function middleware(req, event) {
  const token = req.cookies["access-token"];
  const { url, origin } = req.nextUrl.clone();

  // // If no token exist
  if (!token) return NextResponse.rewrite(`${origin}/views/auth/login-admin`);
  const validateToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  // If user is logged in
  if (validateToken.role == "user")
    return NextResponse.rewrite(`${origin}/views/user`);

  // If admin is not logged in or invalid token
  if (validateToken.role != "admin" || !validateToken)
    return NextResponse.rewrite(`${origin}/views/auth/login-admin`);

  return NextResponse.next();
}
