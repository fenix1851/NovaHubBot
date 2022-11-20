const dbConnect = require('../services/dbConnect');

module.exports = async (name, action, field, value) => {
    const db = await dbConnect();
    const category = field.split('.')[0];
    const field_name = field.split('.')[1];
    const collection = db.collection('config');
    const doc = await collection.findOne({name: name});
    const channel_config = doc[category];
    if (action === 'set') {
        channel_config[field_name] = value;
    }
    if (action === 'get') {
        return channel_config[field_name];
    }
    if (action === 'patch') {
        channel_config[field_name] = value;
        await collection.updateOne({name: name}, {$set: {[category]: channel_config}});
    }
    

}
