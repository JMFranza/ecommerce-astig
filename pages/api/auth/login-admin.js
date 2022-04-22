const ObjectId = require("mongodb").ObjectId;
import dbConnect from "../../../config/dbConnect";
dbConnect();
const Admin = require("../../../models/Admin");

const login = async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: [] });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(401).json({ success: false, message: [] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      return login(req, res);
    }
    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
