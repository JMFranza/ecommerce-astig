import Cors from "cors";
import { NextResponse, NextFetchEvent, NextRequest } from "next/server";
var assert = require("assert");
const jwt = require("jsonwebtoken");
// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
    externalResolver: true,
    responseLimit: false,
  },
};

export async function middleware(req, event) {
  return NextResponse.next();
}
