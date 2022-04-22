import Cookies from "cookies";

const ObjectId = require("mongodb").ObjectId;

// import dbConnect from "../../../config/dbConnect";
// dbConnect();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
  },
};

const logout = async (req, res) => {
  try {
    const cookies = new Cookies(req, res);
    cookies.set("access-token", "");
    res.status(200).json({ sucess: true, message: ["logout successfully"] });
  } catch (err) {
    res.status(200).json({ sucess: false, message: ["logout failed"] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE": {
      return logout(req, res);
    }

    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
