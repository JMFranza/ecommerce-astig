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

const validate_token = async (req, res) => {
  try {
    const { token } = req.query;

    // Find email
    const findAdmin = await Admin.findOne({ email_token: token });
    // Admin email not found
    if (!findAdmin)
      return res.status(200).json({
        success: false,
        message: "Verification link does not exist",
        error: "email",
      });

    // If admin's email verified
    if (findAdmin.email_verified)
      return res.status(200).json({
        success: false,
        message: "Email has already been",
        error: "email verification",
      });

    findAdmin.email_verified = true;
    findAdmin.email_token = "";
    findAdmin.save();
    return res
      .status(200)
      .json({ sucess: true, message: "Admin email verified" });
  } catch (err) {
    return res
      .status(200)
      .json({ sucess: false, message: "Verification failed" });
  }
};

const resend_validation_email = async (req, res) => {
  try {
    const { email } = req.body;

    // Find email
    const findAdmin = await Admin.findOne({ email: email });

    // Admin email not found
    if (!findAdmin)
      return res.status(200).json({
        success: false,
        message: "Email does not exist",
        error: "email",
      });

    // If admin's email verified
    if (findAdmin.email_verified)
      return res.status(200).json({
        success: false,
        message: "Email has already been verified",
        error: "verification",
      });

    // Generate email template for admin email
    const mailOptions = {
      from: `Admin - Verify your email from <${process.env.NODEMAILER_SERVICE}>`,
      to: findAdmin.email,
      subject: "Astig Verification -verify your email",
      html: transTemplate({
        role: "Astig Admin",
        message:
          "Thank you for registering on our site. Verify email below. \n Reminder: The main admin of this system must verify your email before you can access the sites admin page",
        name: findAdmin.full_name,
        email: findAdmin.email,
        getDate: getDate(),
        verify_link: `http://${req.headers.host}/views/auth/verification-admin?token=${findAdmin.email_token}`,
        main_button_text: "Verify now",
        header: `${findAdmin.full_name} Thanks! `,
      }),
    };
    // Send email
    await transporter.sendMail(mailOptions, (err, info) => {});

    return res
      .status(200)
      .json({ sucess: true, message: "super admin verified the admin" });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(200).json({
      success: false,
      message: "Admin verification failed",
      error: "server",
    });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return validate_token(req, res);
    }
    case "POST": {
      return resend_validation_email(req, res);
    }
    default: {
      return res
        .status(200)
        .json({ success: false, message: "server ereror", error: "server" });
    }
  }
}
