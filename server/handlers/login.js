const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const CryptoJs = require("crypto-js");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const login = async (req, res) => {
  // for login all the required information should be provided
  if (!req.body.email || !req.body.password)
    return res.status(400).json({
      status: 400,
      message: "Please provide your information!",
    });
  try {
    // we search the db for finding that owner
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("RentOutdoorGears");
    const owner = await db
      .collection("owners")
      .findOne({ email: req.body.email });
      console.log('owner', owner);
    if (!owner)
      return res.status(401).json({
        status: 401,
        message: "The user doesn't exist!",
      });
      // const password = owner.password;
      // CRYPTO PASSWORD - HAS TO BE DONE LATER ...
    const password = CryptoJs.AES.decrypt(
      owner.password,
      process.env.PASS_SEC
    ).toString(CryptoJs.enc.Utf8);
    if (password !== req.body.password)
      return res.status(401).json({
        status: 401,
        message: "The password is not correct",
      });

    res
      .status(201)
      .json({ status: 201, data: owner, message: "owner is logged in!" });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { login };
