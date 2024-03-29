import dbConnect from "../../../config/dbConnect";
import Admin from "../../../models/Admin";
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
    const findAdmin = await Admin.findOne({ email });
    if (!findAdmin)
      return res.status(200).json({
        success: false,
        message: 'Email Doesn"t exist',
        error: "email",
      });
    const secret = process.env.JWT_SECRET_KEY + findAdmin.password;

    const payload = {
      email: findAdmin.email,
      id: findAdmin.id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    // Generate email template
    const mailOptions = {
      from: `Admin Password Reset <${process.env.NODEMAILER_EMAIL}>`,
      to: findAdmin.email,
      subject: "Astig Admin Password Reset",
      html: transTemplate({
        role: "Astig Admin",
        message: `You can now reset your password by clicking the button below ${findAdmin.full_name}.`,
        name: findAdmin.full_name,
        email: findAdmin.email,
        getDate: getDate(),
        verify_link: `http://${req.headers.host}/views/auth/change-password-admin?token=${token}&&id=${findAdmin.id}`,
        main_button_text: "Change Your Password",
        header: `${findAdmin.full_name} Forgot Password OMG!`,
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
      .json({ success: true, message: "check your inbox", values: req.body });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res
      .status(200)
      .json({ success: false, message: "server error", error: "server" });
  }
}
