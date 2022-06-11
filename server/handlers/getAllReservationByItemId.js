const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getAllReservationByItemId = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.itemById;

  console.log("whasssss");
  try {
    await client.connect();
    console.log("Connected!");

    const db = client.db("RentOutdoorGears");

    const allReservations = await db.collection("reservations").find().toArray();
    const findReservations = allReservations.filter((e) => {
      return e.itemId === _id;
    });
    console.log("findReservations", findReservations);

    return res.status(200).json({
      status: 200,
      data: findReservations,
      message: "This is all reservations for this item",
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = { getAllReservationByItemId };
