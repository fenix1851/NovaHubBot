require('dotenv').config();
const {CHANNEL_NAME, CHAT_ID} = process.env;
const dbConnect = require('../src/services/dbConnect.js')


const init = async () => {
const db = await dbConnect();
db.createCollection("config", function(err, res) {
    if(err && err.code != 48) throw err;
    console.log("Collection created!");
})
db.collection('config').insertOne({
    "name": "channels",
    "startup": {
        "channel_name": CHANNEL_NAME,
        "chat_id": CHAT_ID
    },
    "specialist": {
        "channel_name": CHANNEL_NAME,
        "chat_id": CHAT_ID
    },
    "vacancy": {
        "channel_name": CHANNEL_NAME,
        "chat_id": CHAT_ID
    }
}, function(err, res) {
    if (err) throw err;
    console.log("startup Config created!");
    console.log("specialist Config created!");
    console.log("vacancy Config created!");

})
return"done"
}

init()


