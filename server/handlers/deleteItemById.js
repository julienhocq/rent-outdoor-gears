const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteItemById = async (req, res) => {
  const _id = req.params.itemById;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("Connected!");

    const db = client.db("RentOutdoorGears");

    const deleteItem = await db.collection("products").deleteOne({ _id });
    return res.status(200).json({
      status: 200,
      data: deleteItem,
      message: "This item has been deleted",
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = { deleteItemById };
