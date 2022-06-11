const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const getItemsByOwner = async (req, res) => {


}

module.exports = {getItemsByOwner}