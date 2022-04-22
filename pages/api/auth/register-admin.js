const ObjectId = require("mongodb").ObjectId;
const Admin = require("../../../models/Admin");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
  },
};

const register = async (req, res) => {
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
      return register(req, res);
    }
    default: {
      return res.status(400).json({ sucess: false, message: [] });
    }
  }
}
