import dbConnect from "../../../config/dbConnect";
import User from "../../../models/User";
import Cookies from "cookies";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dbConnect();
const createToken = (id) => {
  return jwt.sign({ id, role: "user" }, process.env.JWT_SECRET_KEY);
};

const login = async (req, res) => {
  try {
    // Find email
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email: email });

    // Admin email not found
    if (!findAdmin)
      return res.status(200).json({
        success: false,
        message: "Email does not exist",
        error: "email",
      });

    // compare password to inputed password
    const match = await bcrypt.compare(password, findAdmin.password);

    // If password did not match
    if (!match)
      return res.status(200).json({
        success: false,
        message: "Incorrect password",
        error: "password",
      });

    // If admin's email is not verified
    if (!findAdmin.email_verified)
      return res.status(200).json({
        success: false,
        message: "Please view your inbox for email confirmation",
        error: "email verification",
      });

    const token = createToken(findAdmin.id);
    const cookies = new Cookies(req, res);
    cookies.set("access-token", token);

    return res.status(200).json({ success: true, message: [] });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(401).json({ success: false, message: [] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      return login(req, res);
    }
    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
