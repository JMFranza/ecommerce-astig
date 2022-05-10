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

const user_register = async (event) => {
  return await axios
    .post(`${url}/api/auth/register-user`, convert_form_to_json(event))
    .then((response) => response.data);
};

const admin_register = async (event) => {
  return await axios
    .post(`${url}/api/auth/register-admin`, convert_form_to_json(event))
    .then((response) => response.data);
};

const user_verification = async (email) => {
  return await axios
    .post(`${url}/api/auth/verification-user`, { email })
    .then((response) => response.data);
};

const admin_verification = async (email) => {
  return await axios
    .post(`${url}/api/auth/verification-admin`, { email })
    .then((response) => response.data);
};

const super_admin_verification = async (email) => {
  return await axios
    .post(`${url}/api/auth/verification-admin-super`, { email })
    .then((response) => response.data);
};

const user_account_verification = async (token) => {
  return await axios
    .get(`${url}/api/auth/verification-user?token=${token}`)
    .then((response) => response.data);
};

const admin_account_verification = async (token) => {
  return await axios
    .get(`${url}/api/auth/verification-admin?token=${token}`)
    .then((response) => response.data);
};

const super_admin_account_verification = async (token) => {
  return await axios
    .get(`${url}/api/auth/verification-admin-super?token=${token}`)
    .then((response) => response.data);
};

const get_admin_account = async (token) => {
  return await axios
    .post(`${url}/api/auth/account-admin`, { token })
    .then((response) => response.data);
};

const google_login_user = async (googleData) => {
  return await axios
    .post(`${url}/api/auth/google-login-user`, googleData)
    .then((response) => response.data);
};

const google_login_admin = async (googleData) => {
  return await axios
    .post(`${url}/api/auth/google-login-admin`, googleData)
    .then((response) => response.data);
};
const forgot_password_user = async (email) => {
  return await axios
    .post(`${url}/api/auth/forgot-password-user`, { email })
    .then((response) => response.data);
};
const forgot_password_admin = async (email) => {
  return await axios
    .post(`${url}/api/auth/forgot-password-admin`, { email })
    .then((response) => response.data);
};

const user_change_password = async ({ event, id, token }) => {
  return await axios
    .post(
      `${url}/api/auth/change-password-user?token=${token}&&id=${id}`,
      convert_form_to_json(event)
    )
    .then((response) => response.data);
};

const admin_change_password = async ({ event, id, token }) => {
  return await axios
    .post(
      `${url}/api/auth/change-password-admin?token=${token}&&id=${id}`,
      convert_form_to_json(event)
    )
    .then((response) => response.data);
};

module.exports = {
  user_login,
  admin_login,
  user_register,
  admin_register,
  user_verification,
  admin_verification,
  super_admin_verification,
  user_account_verification,
  admin_account_verification,
  super_admin_account_verification,
  get_admin_account,
  google_login_user,
  google_login_admin,
  forgot_password_user,
  forgot_password_admin,
  user_change_password,
  admin_change_password,
};
