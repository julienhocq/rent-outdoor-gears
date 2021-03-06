const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { products } = require("./data/products");
const {owners} = require("./data/owners")

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("RentOutdoorGears");
    console.log("connected");
    await db.collection("products").deleteMany();
    await db.collection("products").insertMany(products);

    await db.collection("owners").deleteMany();
    await db.collection("owners").insertMany(owners);

    console.log("database created with success");
  } catch {
    console.log(err.stack);
    console.log("it's a fail");
  }
  client.close();
  console.log("disconnected!");

};

batchImport();
