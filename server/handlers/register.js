const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const CryptoJs = require("crypto-js");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// a post req for sign up
const register = async (req, res) => {
  const { username, email, password, secondPassword } = req.body;

  if (!username || !email || !password || !secondPassword) {
    return res.status(400).json({
      status: 400,
      message: "Please provide your information!",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      status: 400,
      message: "Password must be at least 6 characters long!",
    });
  }
  if (password !== secondPassword) {
    return res.status(400).json({
      status: 400,
      message: "Password and confirm password does not match!",
    });
  }
  try {
    // check if the owner already exist or not
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("RentOutdoorGears");
    const result = await db.collection("owners").findOne({ email });
    // console.log("result", result);
    if (result) {
      res
        .status(400)
        .json({ status: 400, message: "This email already exist!" });
    } else {
      // password encryption and adding new owner
      const owner = {
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString(),
        address: {
          streetNumber: "",
          streetName: "",
          city: "",
          zipcode: "",
          country: "",
          county_code: "",
          latitude: "",
          longitude: "",
        },
        image:"",
      };
      // console.log("owner", owner);
      const NewOwner = Object.assign({ _id: uuidv4() }, owner);
      await db.collection("owners").insertOne(NewOwner);
      res.status(201).json({ status: 201, data: NewOwner, message: "New owner added!" });
      client.close();
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { register };
