const cloudinary = require("../middlewares/cloudinary");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const bookItem = async (req, res) =>{

const client = new MongoClient(MONGO_URI, options);
console.log('req.body', req.body);

try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("RentOutdoorGears");


} catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }


}

module.exports = {bookItem}