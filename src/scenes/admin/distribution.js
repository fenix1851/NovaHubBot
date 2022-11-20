const { Scenes: { BaseScene } } = require('telegraf')
const distribution = new BaseScene('distribution');
const dbConnect = require('../../services/dbConnect.js');

distribution.enter(async (ctx) => {
    // console.log(await db)
    const db = await dbConnect();
    const users = await db.collection('sessions').find({}).toArray()
    let userCount = 0;
    users.forEach((user) => {
        userCount++
    })
    ctx.reply(`Users in total: ${userCount}, what do you want to send?`)
    console.log(userCount)
    distribution.on('message', (ctx) => {
        ctx.scene.state['text'] = ctx.message.text;
        ctx.reply('Are you sure, maybe /cancle ??? If you sure: /resume')
    })
})
distribution.command('cancle', (ctx) => {
    return ctx.scene.leave('distribution')
})
try{
distribution.command('resume', async (ctx) => {
    const db = await dbConnect();
    const users = await db.collection('sessions').find({}).toArray()
    text = ctx.scene.state.text
    console.log(text)
    let arrayOfGroups = []
    if (text != 'Cancel' && text != '0') {
        var distributionCount = 0
        users.forEach((user) => {
            distributionCount++
            if(user.key){
            let chat_id = user.key.split(':')[1]
            
            if (chat_id != 'undefined' && !arrayOfGroups.includes(chat_id)) {
                try {
                    ctx.telegram.sendMessage(chat_id, text).then(() => {
                        console.log(`Message sent to ${chat_id}`)
                    })
                    
                    arrayOfGroups.push(chat_id)
                }
                catch (err) {
                    if(err.responce.error_code == 403){
                        console.log(`User ${chat_id} blocked bot`)
                        ctx.reply(`User ${chat_id} blocked bot`)
                    }
                }}}
            
        })
        ctx.reply(`Distribution sended to ${distributionCount} users`)
        ctx.scene.enter('admin')

    }
    else {
        ctx.reply('Distribution canceled')
        ctx.scene.enter('admin')
    }
})}
catch(err){
    console.log(err)
}
module.exports = distribution