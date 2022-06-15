const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getItemsByOwner = async (req, res) => {
  const _id = req.params.profileById;
  // console.log("id is", _id);
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("Connected!");

    const db = client.db("RentOutdoorGears");

    const findOwner = await db.collection("owners").findOne({ _id });
    console.log("findOwner", findOwner);
    console.log("findOwner._id", findOwner._id);

    const allProducts = await db.collection("products").find().toArray();
    const findOwnerItems = allProducts.filter((e) => {
      return e.OwnerId === findOwner._id;
    });

    // console.log("findOwnerItems", findOwnerItems);

    return res.status(200).json({
      status: 200,
      data: findOwnerItems,
      message: "This is the item(s) of this user",
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = { getItemsByOwner };
