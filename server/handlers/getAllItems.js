const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const getAllItems = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("RentOutdoorGears");
        const result = await db.collection("products").find().toArray();
        return res.status(201).json({
            status: 201,
            data: result,
            message: "This is all the items"
        })

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });

    } finally {
        client.close();
        console.log("disconnected")
    }

}



module.exports = {getAllItems}