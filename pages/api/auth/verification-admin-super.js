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
    const findAdmin = await Admin.findOne({ admin_token: token });
    // Admin email not found
    if (!findAdmin)
      return res.status(200).json({
        success: false,
        message: "Verification link does not exist",
        error: "email",
        values: req.body,
      });

    // If admin's email verified
    if (findAdmin.admin_verified)
      return res.status(200).json({
        success: false,
        message: "Email has already been verified by the admin",
        error: "verification",
        values: req.body,
      });

    findAdmin.admin_verified = true;
    findAdmin.admin_token = "";
    findAdmin.save();

    res.status(200).json({ success: true });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "verification failed",
      error: "verifcation",
      values: req.body,
    });
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
        values: req.body,
      });

    // If admin's email verified
    if (findAdmin.admin_verified)
      return res.status(200).json({
        success: false,
        message: "Email has already been verified by the admin",
        error: "verification",
        values: req.body,
      });

    // Generate email template for super admin template
    var mailOptionsAdmin = {
      from: `Admin Please Verify Email <${process.env.NODEMAILER_SERVICE}>`,
      to: process.env.NODEMAILER_SUPER_ADMIN,
      subject: "Astig  Admin verification -verify staff",
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

    return res.status(200).json({
      success: true,
      message: "verication sent successfuly",
      values: req.body,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(200).json({
      success: false,
      message: "Super Admin verification failed",
      error: "server",
      values: req.body,
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
      return res.status(200).json({
        success: false,
        message: "server error",
        error: "server",
        values: req.body,
      });
    }
  }
}
