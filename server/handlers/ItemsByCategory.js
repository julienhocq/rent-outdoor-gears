const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getItemsByCategory = async (req, res) => {
  const category = req.params.itemsByCategory;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("RentOutdoorGears");

    const result = await db.collection("products").find().toArray();
    const findByCategory = result.filter((e) => {
      return e.category === category;
    });
    return res.status(201).json({
      status: 201,
      data: findByCategory,
      message: "This is all the items by category",
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { getItemsByCategory };
