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
    if (findAdmin.admin_verified)
      return res.status(200).json({
        success: false,
        message: "Email has already been verified by the admin",
        error: "email verification",
      });

    // Generate email template for super admin template
    var mailOptionsAdmin = {
      from: `Please Verify Email <${process.env.NODEMAILER_SERVICE}>`,
      to: process.env.NODEMAILER_SUPER_ADMIN,
      subject: "Astig verification -verify staff",
      html: transTemplate({
        role: "Astig main admin",
        message: `Verify Librarian Staff Named : ${findAdmin.full_name}. With an email of Of ${findAdmin.email} \n location: ${findAdmin.postal_code} ${findAdmin.country}`,
        name: findAdmin.full_name,
        email: findAdmin.email,
        getDate: getDate(),
        verify_link: `http://${req.headers.host}/views/auth/verification-admin-super?token=${findAdmin.admin_token}`,
        main_button_text: "Verify now",
        header: `Someone registered to our System!`,
      }),
    };
    // Send email
    await transporter.sendMail(mailOptionsAdmin, (err, info) => {});

    res.status(200).json({ sucess: true });
  } catch (err) {
    res
      .status(200)
      .json({ sucess: false, message: "Super Admin verification failed" });
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
