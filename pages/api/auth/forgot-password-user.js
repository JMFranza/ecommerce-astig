import dbConnect from "../../../config/dbConnect";
import User from "../../../models/User";
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  transporter,
  transTemplate,
  getDate,
  createToken,
} = require("../../../config/helper");

dbConnect();
export default async function verify(req, res) {
  if (req.method != "POST")
    return res
      .status(200)
      .json({ success: false, message: "server error", error: "server" });
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser)
      return res.status(200).json({
        success: false,
        message: 'Email Doesn"t exist',
        error: "email",
        values: req.body,
      });
    const secret = process.env.JWT_SECRET_KEY + findUser.password;

    const payload = {
      email: findUser.email,
      id: findUser.id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    // Generate email template
    const mailOptions = {
      from: `User Password Reset <${process.env.NODEMAILER_EMAIL}>`,
      to: findUser.email,
      subject: "Astig User Password Reset",
      html: transTemplate({
        role: "Astig User",
        message: `You can now reset your password by clicking the button below ${findUser.full_name}.`,
        name: findUser.full_name,
        email: findUser.email,
        getDate: getDate(),
        verify_link: `http://${req.headers.host}/views/auth/change-password-user?token=${token}&&id=${findUser.id}`,
        main_button_text: "Change Your Password",
        header: `${findUser.full_name} Forgot Password OMG!`,
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
    return res
      .status(200)
      .json({ success: true, message: "Check your inbox", values: req.body });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(200).json({
      success: false,
      message: "server error",
      error: "server",
      values: req.body,
    });
  }
}
