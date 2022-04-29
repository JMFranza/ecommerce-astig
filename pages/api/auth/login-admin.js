import dbConnect from "../../../config/dbConnect";
import Admin from "../../../models/Admin";
import Cookies from "cookies";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dbConnect();
const createToken = (id) => {
  return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET_KEY);
};

const login = async (req, res) => {
  try {
    // Find email
    const { email, password } = req.body;
    const findAdmin = await Admin.findOne({ email: email });

    // Admin email not found
    if (!findAdmin)
      return res.status(200).json({
        success: false,
        message: "Email does not exist",
        error: "email",
        values: req.body,
      });

    // compare password to inputed password
    const match = await bcrypt.compare(password, findAdmin.password);

    // If password did not match
    if (!match)
      return res.status(200).json({
        success: false,
        message: "Incorrect password",
        error: "password",
        values: req.body,
      });

    // If admin's email is not verified
    if (!findAdmin.email_verified)
      return res.status(200).json({
        success: false,
        message: "Please view your inbox for email confirmation",
        error: "verification",
        values: req.body,
      });

    // If admin's email is not verified by the admin
    if (!findAdmin.admin_verified)
      return res.status(200).json({
        success: false,
        message:
          "Please wait for the main admin to verify your email. It might take 3-5 working days",
        error: "admin_verification",
        values: req.body,
      });

    const token = createToken(findAdmin.id);
    const cookies = new Cookies(req, res);
    cookies.set("access-token", token);

    // Increase login count
    findAdmin.login_count = findAdmin.login_count + 1;
    findAdmin.save();

    return res.status(200).json({
      success: true,
      message: "successfully logged in",
      values: req.body,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(200).json({
      success: false,
      message: "server ereror",
      error: "server",
      values: req.body,
    });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      return login(req, res);
    }
    default: {
      return res
        .status(404)
        .json({ success: false, message: "server ereror", error: "server" });
    }
  }
}
