require('dotenv').config();
const {MongoClient} = require('mongodb')
const {MONGODB_URI} = process.env

module.exports = async () => {
    const db = (await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })).db();
    return db;
}
