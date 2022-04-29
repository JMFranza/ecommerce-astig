import dbConnect from "../../../config/dbConnect";
import User from "../../../models/User";
import Cookies from "cookies";

import { v4 as uuidv4 } from "uuid";
import { OAuth2Client } from "google-auth-library";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

dbConnect();
const createToken = (id) => {
  return jwt.sign({ id, role: "user" }, process.env.JWT_SECRET_KEY);
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      const { tokenId } = req.body;

      // Obtaining tiket for validation
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID,
      });

      // Get the email properties
      const { picture, email, email_verified, given_name, name } =
        ticket.getPayload();

      // Find user if exists
      const user = await User.findOne({ email });

      // If user doesn't exist. Save it to database
      // With generated unique random password
      if (!user) {
        const password = uuidv4();
        const salt = await bcrypt.genSalt(13);
        const hashPassword = await bcrypt.hash(password, salt);
        const gmailUser = {
          profile_picture: picture,
          email,
          username: given_name,
          password: hashPassword,
          full_name: name,
          email_token: "",
          email_verified,
          login_count: 1,
        };
        const newUser = await new User(gmailUser);
        await newUser.save();
      }

      // Find user and set the token
      const findUser = await User.findOne({ email });
      const token = createToken(findUser.id);
      const cookies = new Cookies(req, res);
      cookies.set("access-token", token);

      // Increase login count
      findUser.login_count = findUser.login_count + 1;
      findUser.save();

      return res.status(200).json({
        success: true,
        message: "Loggin Successfully",
      });
    }
    default: {
      return res
        .status(404)
        .json({ success: false, message: "server ereror", error: "server" });
    }
  }
}
