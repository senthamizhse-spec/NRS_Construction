const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017"; // or your Atlas URL
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db("gsd_app"); // your database name
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

module.exports = connectDB;
