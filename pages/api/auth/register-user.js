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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
  },
};

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
        message: ["Confirm password is not the same as password"],
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
      from: `verify your email from <${process.env.NODEMAILER_SERVICE}>`,
      to: email,
      subject: "Astig verification -verify your email",
      html: transTemplate({
        role: "User",
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
    return res.status(200).json({ success: true, message: [] });
  } catch (err) {
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
      return res.status(400).json({ sucess: false, message: [] });
    }
  }
}
