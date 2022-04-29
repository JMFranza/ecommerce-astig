import dbConnect from "../../../config/dbConnect";
import User from "../../../models/User";
import Cookies from "cookies";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      const token = req.query.token;
      const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return res.status(200).json({
        success: false,
        data: verify,
        message: "token",
        error: "server",
      });
    }
    default: {
      return res
        .status(200)
        .json({ success: false, message: "server error", error: "server" });
    }
  }
}
