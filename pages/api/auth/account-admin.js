import dbConnect from "../../../config/dbConnect";
import Admin from "../../../models/Admin";
import Cookies from "cookies";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method != "POST")
    return res
      .status(404)
      .json({ success: false, message: "server error", error: "server" });
  const { token } = req.body;

  const findAdmin = await Admin.findOne(
    { admin_token: token },
    {
      _id: 0,
      email: 1,
      username: 1,
      full_name: 1,
      city: 1,
      postal_code: 1,
      country: 1,
    }
  );
  return res.status(200).json({
    success: true,
    message: "Success",
    data: findAdmin,
    values: req.body,
  });
}
