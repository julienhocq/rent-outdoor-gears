const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const postItem = async (req, res) => {
  const { category, name, description, priceDaily, priceWeekly, city, longitude, latitude, image } = req.body;
  console.log("req.body is", req.body);
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("Connected!");

    const db = client.db("RentOutdoorGears");

      
        const item = {
          category,
          name,
          description,
          priceDaily,
          priceWeekly,
          // image: uploadedResponse,
          isAvailable: true,
          city,
          latitude,
          longitude
        };
        const newItem = Object.assign({_id: uuidv4()}, item);
        await db.collection("products").insertOne(newItem)
        res.status(200).json({
          message: "Success! New Item created",
          data: newItem,
        });
     
   
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = { postItem };
