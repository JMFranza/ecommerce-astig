import Cookies from "cookies";

const ObjectId = require("mongodb").ObjectId;

const logout = async (req, res) => {
  try {
    const cookies = new Cookies(req, res);
    cookies.set("access-token", "");
    return res
      .status(200)
      .json({ sucess: true, message: "logout successfully" });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(200).json({
      success: false,
      message: "server ereror logout failed",
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
      return res
        .status(200)
        .json({
          success: false,
          message: "server ereror",
          error: "server",
          values: req.body,
        });
    }
  }
}
