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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
  },
};

const validate_token = async (req, res) => {
  try {
    const { token } = req.body;
    res.status(200).json({ sucess: true });
  } catch (err) {
    res.status(200).json({ sucess: false, message: "logout failed" });
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
        error: "email verification",
      });

    // Generate email template for admin email
    const mailOptions = {
      from: `verify your email from <${process.env.NODEMAILER_SERVICE}>`,
      to: findAdmin.email,
      subject: "Astig verification -verify your email",
      html: transTemplate({
        role: "Admin",
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

    res.status(200).json({ sucess: true });
  } catch (err) {
    res
      .status(200)
      .json({ sucess: false, message: "Admin verification failed" });
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
      res.status(400).json({ sucess: false, message: "Wrong route" });
    }
  }
}