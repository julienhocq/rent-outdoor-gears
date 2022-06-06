const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const getAllItems = async (req, res) => {
    console.log('HHHHHOOLLLLLLAa');
    const {category, city} = req.query;
    const query = {}
    if (category) query.category = category
    if (city) query.city = city

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("RentOutdoorGears");
        const result = await db.collection("products").find(query).toArray();
        return res.status(200).json({
            status: 200,
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