import axios from "axios";

const dev = process.env.NODE_ENV !== "production";
const url = dev ? "http://localhost:3000" : "";

const convert_form_to_json = (event) => {
  const data = new FormData(event.currentTarget);
  return Object.fromEntries(data);
};

const user_login = async (event) => {
  return await axios
    .post(`${url}/api/auth/login-user`, convert_form_to_json(event))
    .then((response) => response.data);
};

const admin_login = async (event) => {
  return await axios
    .post(`${url}/api/auth/login-admin`, convert_form_to_json(event))
    .then((response) => response.data);
};

module.exports = {
  user_login,
  admin_login,
};
