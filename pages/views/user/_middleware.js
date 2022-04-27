import { NextResponse, NextFetchEvent, NextRequest } from "next/server";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import axios from "axios";

export async function middleware(req, event) {
  const token = req.cookies["access-token"];
  const { url, origin } = req.nextUrl.clone();

  // If no token exist
  if (!token) return NextResponse.rewrite(`${origin}/views/auth/login-user`);

  // Requesting token validation
  const axiosInstance = axios.create({
    adapter: fetchAdapter,
  });
  const verify_token = await axiosInstance
    .get(`${origin}/api/auth/authenticate?token=${token}`)
    .then((res) => res.data);
  const validateToken = verify_token.data;

  // If admin is logged in
  if (validateToken.role == "admin")
    return NextResponse.rewrite(`${origin}/views/admin`);

  // If admin is not logged in or invalid token
  if (validateToken.role != "user" || !validateToken)
    return NextResponse.rewrite(`${origin}/views/auth/user-admin`);

  NextResponse.next();
}
