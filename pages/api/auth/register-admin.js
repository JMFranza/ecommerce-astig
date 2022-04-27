// Dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Mongoose
const ObjectId = require("mongodb").ObjectId;
const Admin = require("../../../models/Admin");
import dbConnect from "../../../config/dbConnect";
dbConnect();

const {
  transporter,
  transTemplate,
  getDate,
  createToken,
} = require("../../../config/helper");

const register = async (req, res) => {
  try {
    const {
      profile_picture,
      email,
      username,
      password,
      password_confirmation,
      full_name,
      city,
      postal_code,
      country,
    } = req.body;

    if (password_confirmation != password) {
      return res.status(200).json({
        success: false,
        message: "Confirm password is not the same as password",
        error: "password_confirmation",
      });
    }

    const admin = new Admin({
      profile_picture,
      email,
      username,
      password,
      password_confirmation,
      full_name,
      city,
      postal_code,
      country,
      email_token: crypto.randomBytes(64).toString("hex"),
      email_verified: false,
      admin_token: crypto.randomBytes(69).toString("hex"),
      admin_verified: false,
    });

    // Generate hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(admin.password, salt);
    admin.password = hashPassword;

    // Save admin
    const newAdmin = await admin.save();

    // Generate email template for admin email
    const mailOptions = {
      from: `Admin - Verify your email from <${process.env.NODEMAILER_SERVICE}>`,
      to: email,
      subject: "Astig Admin verification -verify your email",
      html: transTemplate({
        role: "Admin",
        message:
          "Thank you for registering on our site. Verify email below. \n Reminder: The main admin of this system must verify your email before you can access the sites admin page",
        name: full_name,
        email: email,
        getDate: getDate(),
        verify_link: `http://${req.headers.host}/views/auth/verification-admin?token=${admin.email_token}`,
        main_button_text: "Verify now",
        header: `${full_name} Thanks! `,
      }),
    };
    // Send email
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

    return res
      .status(200)
      .json({ success: true, message: "account created successfuly" });
  } catch (err) {
    console.log(`Error: ${err}`);
    const errors = err.errors;
    for (const key in errors)
      return res.status(200).send({
        succes: false,
        message: errors[key].message,
        error: errors[key].path,
      });
    return res
      .status(200)
      .send({ succes: false, message: "Email already exist!", error: "email" });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      return register(req, res);
    }
    default: {
      return res
        .status(200)
        .json({ success: false, message: "server ereror", error: "server" });
    }
  }
}
