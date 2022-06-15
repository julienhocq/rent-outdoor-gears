const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getOwnerById = async (req, res) => {
  const _id = req.params.profileById;
  // console.log("req is is", _id);
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected!");
    const db = client.db("RentOutdoorGears");
    const result = await db.collection("owners").findOne({ _id});
    // console.log("result", result);

    return res.status(200).json({
      status: 200,
      data: result,
      message: "here is a single owner's data",
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

module.exports = { getOwnerById };
