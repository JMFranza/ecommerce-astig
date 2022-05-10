// Dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Mongoose
const ObjectId = require("mongodb").ObjectId;
const User = require("../../../models/User");
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
    const findUser = await User.findOne({ email_token: token });

    // User email not found
    if (!findUser)
      return res.status(200).json({
        success: false,
        message: "Verification link does not exist",
        error: "email",
        values: req.body,
      });

    // If Users' email verified
    if (findUser.email_verified)
      return res.status(200).json({
        success: false,
        message: "Email has already been verified",
        error: "email verification",
        values: req.body,
      });

    findUser.email_verified = true;
    findUser.email_token = "";
    findUser.save();
    res.status(200).json({ success: true });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Validating token failed",
      values: req.body,
    });
  }
};

const resend_validation_email = async (req, res) => {
  try {
    const { email } = req.body;

    // Find email
    const findUser = await User.findOne({ email: email });

    // User email not found
    if (!findUser)
      return res.status(200).json({
        success: false,
        message: "Email does not exist",
        error: "email",
        values: req.body,
      });

    // If email verified
    if (findUser.email_verified)
      return res.status(200).json({
        success: false,
        message: "Email has already been verified",
        error: "verification",
        values: req.body,
      });

    // Generate email template
    const mailOptions = {
      from: `User - verify your email from <${process.env.NODEMAILER_SERVICE}>`,
      to: findUser.email,
      subject: "Astig User verification -verify your email",
      html: transTemplate({
        role: "Astig User",
        message:
          "Thank you for registering on our site. You can order astig merchandise now if you verify your account by clicking the button below",
        name: findUser.full_name,
        email: findUser.email,
        getDate: getDate(),
        verify_link: `http://${req.headers.host}/views/auth/verification-user?token=${findUser.email_token}`,
        main_button_text: "Verify now",
        header: `${findUser.full_name} Thanks! `,
      }),
    };

    // Send email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        console.log("Server might be down. Try again later");
      } else {
        console.log("Verification has been sent to your email");
      }
    });

    return res.status(200).json({
      success: true,
      message: "verification sent successfully",
      values: req.body,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(200).json({
      success: false,
      message: "Sending token failed",
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
      return res
        .status(200)
        .json({ success: false, message: "server error", error: "server" });
    }
  }
}
