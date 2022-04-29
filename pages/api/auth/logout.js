import Cookies from "cookies";

const ObjectId = require("mongodb").ObjectId;

const logout = async (req, res) => {
  try {
    const cookies = new Cookies(req, res);
    cookies.set("access-token", "");
    localStorage.removeItem("loginData");
    return res
      .status(200)
      .json({ success: true, message: "logout successfully" });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(200).json({
      success: false,
      message: "server error logout failed",
      error: "server",
    });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE": {
      return logout(req, res);
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
