const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const getReservationsByOwner = async (req, res) =>{

    const _id = req.params.profileById;
    console.log("id is", _id);
    const client = new MongoClient(MONGO_URI, options);
  
    try {
      await client.connect();
      console.log("Connected!");
  
      const db = client.db("RentOutdoorGears");
  
      const AllReservations = await db.collection("reservations").find().toArray();
      console.log("AllReservations", AllReservations);
  
      const findReservationsByOwnerId = AllReservations.filter((e) => {
        return e.ownerId === _id;
      });
  
      console.log("findReservationsByOwnerId", findReservationsByOwnerId);
  
      return res.status(200).json({
        status: 200,
        data: findReservationsByOwnerId,
        message: "This is all reservations for this user",
      });
    } catch (err) {
      res.status(500).json({ status: 500, message: err.message });
    } finally {
      client.close();
      console.log("disconnected!");
    }
  

}


module.exports = {getReservationsByOwner}