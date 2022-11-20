const {Scenes: {BaseScene}} = require('telegraf');

const edit_specialist_channel_name = new BaseScene('edit_specialist_channel_name');
const edit_specialist_chat_id = new BaseScene('edit_specialist_chat_id');
const edit_vacancy_channel_name = new BaseScene('edit_vacancy_channel_name');
const edit_vacancy_chat_id = new BaseScene('edit_vacancy_chat_id');
const edit_startup_channel_name = new BaseScene('edit_startup_channel_name');
const edit_startup_chat_id = new BaseScene('edit_startup_chat_id');

const dbCrud = require('../../services/dbCrud');

edit_specialist_channel_name.enter((ctx) => {
    ctx.reply('Enter new channel name');
})
edit_specialist_channel_name.on('text', async (ctx) => {
    const channelName = ctx.message.text;
    await dbCrud('channels','patch', 'specialist.channel_name', channelName);
    await ctx.reply('Channel name changed');
    return ctx.scene.enter('admin')
})

edit_specialist_chat_id.enter((ctx) => {
    ctx.reply('Enter new chat id');
})
edit_specialist_chat_id.on('text', async (ctx) => {
    const chatId = ctx.message.text;
    await dbCrud('channels','patch', 'specialist.chat_id', chatId);
    await ctx.reply('Chat id changed');
    return ctx.scene.enter('admin')
})

edit_vacancy_channel_name.enter((ctx) => {
    ctx.reply('Enter new channel name');
})
edit_vacancy_channel_name.on('text', async (ctx) => {
    const channelName = ctx.message.text;
    await dbCrud('channels','patch', 'vacancy.channel_name', channelName);
    await ctx.reply('Channel name changed');
    return ctx.scene.enter('admin')
})

edit_vacancy_chat_id.enter((ctx) => {
    ctx.reply('Enter new chat id');
})
edit_vacancy_chat_id.on('text', async (ctx) => {
    const chatId = ctx.message.text;
    await dbCrud('channels','patch', 'vacancy.chat_id', chatId);
    await ctx.reply('Chat id changed');
    return ctx.scene.enter('admin')
})

edit_startup_channel_name.enter((ctx) => {
    ctx.reply('Enter new channel name');
})
edit_startup_channel_name.on('text', async (ctx) => {
    const channelName = ctx.message.text;
    await dbCrud('channels','patch', 'startup.channel_name', channelName);
    await ctx.reply('Channel name changed');
    return ctx.scene.enter('admin')
})

edit_startup_chat_id.enter((ctx) => {
    ctx.reply('Enter new chat id');
})
edit_startup_chat_id.on('text', async (ctx) => {
    const chatId = ctx.message.text;
    await dbCrud('channels','patch', 'startup.chat_id', chatId);
    await ctx.reply('Chat id changed');
    return ctx.scene.enter('admin')
})



const edits = {
    edit_specialist_channel_name,
    edit_specialist_chat_id,
    edit_vacancy_channel_name,
    edit_vacancy_chat_id,
    edit_startup_channel_name,
    edit_startup_chat_id
}
module.exports = edits







