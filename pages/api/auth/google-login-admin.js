import dbConnect from "../../../config/dbConnect";
import Admin from "../../../models/Admin";
import Cookies from "cookies";

import { v4 as uuidv4 } from "uuid";
import { OAuth2Client } from "google-auth-library";

const {
  transporter,
  transTemplatePassword,
  getDate,
} = require("../../../config/helper");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

dbConnect();
const createToken = (id) => {
  return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET_KEY);
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

      // Find admin if exists
      const admin = await Admin.findOne({ email });

      // If admin doesn't exist. Save it to database
      // With generated unique random password
      if (!admin) {
        const password = uuidv4().substring(0, 5);
        const salt = await bcrypt.genSalt(13);
        const hashPassword = await bcrypt.hash(password, salt);
        const gmailAdmin = {
          profile_picture: picture,
          email,
          username: given_name,
          password: hashPassword,
          full_name: name,
          email_token: "",
          email_verified,
          login_count: 1,
          admin_token: crypto.randomBytes(69).toString("hex"),
          admin_verified: false,
        };
        const newAdmin = await new Admin(gmailAdmin);
        await newAdmin.save();

        // Generate email template for admin password
        const mailOptions = {
          from: `Astig03 Admin Generated Password <${process.env.NODEMAILER_SERVICE}>`,
          to: email,
          subject: "Astig03 Admin Generated Password",
          html: transTemplatePassword({
            role: "Admin",
            message:
              "This is your password. You can use this password to sign in with your account.",
            name: name,
            email: email,
            getDate: getDate(),
            header: `${password}`,
          }),
        };
        await transporter.sendMail(mailOptions, (err, info) => {});

        // Generate email template for super admin template
        var mailOptionsAdmin = {
          from: `Admin Please Verify Email <${process.env.NODEMAILER_SERVICE}>`,
          to: process.env.NODEMAILER_SUPER_ADMIN,
          subject: "Astig Admin verification -verify staff",
          html: transTemplate({
            role: "Astig main admin",
            message: `Verify Librarian Staff Named : ${full_name}. With an email of Of ${email} \n location: ${postal_code} ${country}`,
            name: full_name,
            email: email,
            getDate: getDate(),
            verify_link: `http://${req.headers.host}/views/auth/verification-admin-super?token=${admin.admin_token}`,
            main_button_text: "Verify now",
            header: `Someone registered to our System!`,
          }),
        };
        // Send email
        await transporter.sendMail(mailOptionsAdmin, (err, info) => {});
      }

      // Find admin and set the token
      const findAdmin = await Admin.findOne({ email });
      const token = createToken(findAdmin.id);
      const cookies = new Cookies(req, res);
      cookies.set("access-token", token);

      // Increase login count
      findAdmin.login_count = findAdmin.login_count + 1;
      findAdmin.save();

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
