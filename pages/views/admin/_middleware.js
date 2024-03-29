import { NextResponse, NextFetchEvent, NextRequest } from "next/server";
import axios from "axios";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";

export async function middleware(req, event) {
  const token = req.cookies["access-token"];
  const { url, origin } = req.nextUrl.clone();

  // // If no token exist
  if (!token) return NextResponse.redirect(`${origin}/views/auth/login-admin`);
  // Requesting token validation
  const axiosInstance = axios.create({
    adapter: fetchAdapter,
  });
  const verify_token = await axiosInstance
    .get(`${origin}/api/auth/authenticate?token=${token}`)
    .then((res) => res.data);
  const validateToken = verify_token.data;

  // If user is logged in
  if (validateToken.role == "user")
    return NextResponse.redirect(`${origin}/views/user`);

  // If admin is not logged in or invalid token
  if (validateToken.role != "admin" || !validateToken)
    return NextResponse.redirect(`${origin}/views/auth/login-admin`);

  return NextResponse.next();
}
