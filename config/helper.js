const nodemailer = require("nodemailer");
const template = require("es6-template-strings");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// Email sender
const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const transTemplate = (props) => {
  return template(getFileContent(), props);
};

const transTemplatePassword = (props) => {
  return template(getFileContentPassword(), props);
};

const getFileContentPassword = () => {
  let contents = fs.readFileSync(
    `components/EmailTemplatePassword.html`,
    "utf-8"
  );
  return contents;
};

const getFileContent = () => {
  let contents = fs.readFileSync(`components/EmailTemplate.html`, "utf-8");
  return contents;
};

const getDate = () => {
  let today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return (
    "<span class='sty-bold text-blue-700 font-md pad-x-25 pad-t-5'>Date: </span>" +
    date +
    "</p><p class='sty-reg text-gray-500 font-sm pad-t-10'><span class='sty-bold text-blue-700 font-md pad-x-25 pad-t-5'>Time: </span>" +
    time
  );
};

const createToken = (props) => {
  return jwt.sign(props, process.env.JWT_SECRET_KEY);
};

module.exports = {
  transporter,
  transTemplate,
  transTemplatePassword,
  getDate,
  createToken,
};
