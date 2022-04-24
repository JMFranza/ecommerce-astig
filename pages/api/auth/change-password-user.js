import dbConnect from "../../../config/dbConnect";
import User from "../../../models/User";
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
dbConnect();

export default async function verify(req, res) {
  if (req.method == "POST") {
    try {
      const { password, password_confirmation } = req.body;
      const { token, id } = req.query;
      const user = await User.findOne({ _id: ObjectId(id) });
      const secret = process.env.JWT_SECRET_KEY + user.password;
      const payload = await jwt.verify(token, secret);
      if (!user || !payload || id != user.id)
        return res.status(200).json({
          success: false,
          message: "Verification does not exist",
          error: "verification",
        });
      if (password.length <= 5)
        return res.status(200).json({
          success: false,
          message: "Password must be longer than 5 characters",
          error: "password",
        });
      if (password_confirmation != password)
        return res.status(200).json({
          success: false,
          message: "Password does not match",
          error: "password_confirmation",
        });
      const salt = await bcrypt.genSalt(13);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
      user.save();
      return res
        .status(200)
        .json({ success: true, message: "successfully changed password" });
    } catch (err) {
      console.log(`Error: ${err}`);
      return res
        .status(200)
        .json({ success: false, message: "server ereror", error: "server" });
    }
  }

  return res
    .status(200)
    .json({ success: false, message: "server ereror", error: "server" });
}
