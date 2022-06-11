const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getAllReservationByItemId = async (req, res) =>{

    const client = new MongoClient(MONGO_URI, options);


console.log('whasssss');
    try {
        await client.connect();
        console.log("Connected!");
    
        const db = client.db("RentOutdoorGears");
    

    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message });
      } finally {
        client.close();
        console.log("disconnected!");
      }

}

module.exports = {getAllReservationByItemId}