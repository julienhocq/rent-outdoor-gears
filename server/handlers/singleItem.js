const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getItemById = async (req, res) => {
  const id = req.params.itemById;
  console.log("req id is", id);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("Connected!");

    const db = client.db("RentOutdoorGears");

    const result = await db.collection("products").find().toArray();
    // console.log("result is", result);
    const findItem = result.find((e) => {
      return (e.id === id);
    });
    // console.log('findItem', findItem);
    return res.status(200).json({
      status: 200,
      data: findItem,
      message: "This is only 1 item",
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = { getItemById };
