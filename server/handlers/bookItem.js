const cloudinary = require("../middlewares/cloudinary");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const bookItem = async (req, res) => {
  console.log("req.body", req.body);

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("RentOutdoorGears");

    const reservation = {
        _id: uuidv4(),
      ownerId: req.body.ownerId,
      itemId: req.body.itemId,
      clientId: req.body.clientId,
      date: req.body.date
    };

   const bookItem = await db.collection("reservations").insertOne(reservation);
    console.log('item booked ');

    return res.status(200).json({
      status: 200,
      data: reservation,
      message: "This is the item",
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = { bookItem };
