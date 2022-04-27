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

    if (!email) {
      return res.status(200).json({
        success: false,
        message: "Email is empty!",
        error: "email",
        values: req.body,
      });
    }
    if (!password) {
      return res.status(200).json({
        success: false,
        message: "Password is empty!",
        error: "password",
        values: req.body,
      });
    }
    if (!password_confirmation) {
      return res.status(200).json({
        success: false,
        message: "Password confirmation is empty!",
        error: "password_confirmation",
        values: req.body,
      });
    }
    if (password_confirmation != password) {
      return res.status(200).json({
        success: false,
        message: "Confirm password is not the same as password",
        error: "password_confirmation",
        values: req.body,
      });
    }
    if (!full_name) {
      return res.status(200).json({
        success: false,
        message: "Full name is required",
        error: "full_name",
        values: req.body,
      });
    }
    if (!postal_code) {
      return res.status(200).json({
        success: false,
        message: "Postal Code is required",
        error: "postal_code",
        values: req.body,
      });
    }
    if (!country) {
      return res.status(200).json({
        success: false,
        message: "Country is required",
        error: "country",
        values: req.body,
      });
    }

    if (!city) {
      return res.status(200).json({
        success: false,
        message: "City name is required",
        error: "city",
        values: req.body,
      });
    }

    const user = new User({
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
    });

    // Generate hash password
    const salt = await bcrypt.genSalt(13);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;

    // Save user
    const newUser = await user.save();

    // Generate email template
    const mailOptions = {
      from: `User - verify your email from <${process.env.NODEMAILER_SERVICE}>`,
      to: email,
      subject: "Astig User verification -verify your email",
      html: transTemplate({
        role: "Astig User",
        message:
          "Thank you for registering on our site. You can order astig merchandise now if you verify your account by clicking the button below",
        name: full_name,
        email: email,
        getDate: getDate(),
        verify_link: `http://${req.headers.host}/views/auth/verification-user?token=${user.email_token}`,
        main_button_text: "Verify now",
        header: `${full_name} Thanks! `,
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
      message: "Successfully created an account",
      values: req.body,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    const errors = err.errors;
    for (const key in errors)
      return res.status(200).send({
        succes: false,
        message: errors[key].message,
        error: errors[key].path,
        values: req.body,
      });
    return res
      .status(200)
      .send({
        succes: false,
        message: "Email already exist!",
        error: "email",
        values: req.body,
      });
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
