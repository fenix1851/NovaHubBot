process
 .on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection at Promise: ${reason}`);
 })
 .on('uncaughtException', err => {
    console.log(`Uncaught Exception thrown: ${err}`);
 });


require("dotenv").config();
const {
  Telegraf,
  Scenes: { Stage },
} = require("telegraf");
const { session } = require("telegraf-session-mongodb");
const { TEST_TOKEN, MONGODB_URI, BOT_TOKEN} = process.env;
// commands
const start = require("./commands/start.js");
// scenes
const specialist_registration = require("./scenes/registration/specialist.js");
const project_registration = require("./scenes/registration/project.js");
const job_registration = require("./scenes/registration/job.js");
const admin_scene = require("./scenes/admin/admin.js");
const edit_scenes = require("./scenes/admin/edits.js");
const distribution = require("./scenes/admin/distribution.js");
const startKeyboard = require("./keyboards/start.js");
// services
const dbConnect = require("./services/dbConnect.js");

// // forms

const init = async () => {
  const bot = new Telegraf(BOT_TOKEN);
  const stage = new Stage([
    specialist_registration,
    project_registration,
    job_registration,
    admin_scene,
    edit_scenes.edit_specialist_channel_name,
    edit_scenes.edit_specialist_chat_id,
    edit_scenes.edit_vacancy_channel_name,
    edit_scenes.edit_vacancy_chat_id,
    edit_scenes.edit_startup_channel_name,
    edit_scenes.edit_startup_chat_id,
    distribution,
  ]);
  const db = await dbConnect();
  bot.use(session(db));
  bot.use(stage.middleware());
  // commands for generating links
  bot.command("test", (ctx) => {
    try {
      ctx.tg.sendMessage("-1001616026416","test", {
        reply_markup: {
          inline_keyboard: [
            [
              
            ]]
          }});
    } catch (error) {
      console.log(error);
    }
    
      })
  bot.command("specialist", (ctx) => {
    ctx.reply(
      `https://t.me/${ctx.botInfo.username}?start=${ctx.chat.id}_specialist`
    );
  });
  bot.command("startup", (ctx) => {
    ctx.reply(
      `https://t.me/${ctx.botInfo.username}?start=${ctx.chat.id}_startup`
    );
  });
  bot.command("vacancy", (ctx) => {
    ctx.reply(
      `https://t.me/${ctx.botInfo.username}?start=${ctx.chat.id}_vacancy`
    );
  });
  // start section
  bot.start(start());
  bot.action(/[a-z]+$/, async (ctx) => {
    const user_action = ctx.match[0];
    // console.log(user_action);
    // console.log("indexjs");
    switch (user_action) {
      case "startup":
        ctx.scene.enter("project_registration");
        break;
      case "specialist":
        ctx.scene.enter("specialist_registration");
        break;
      case "vacancy":
        ctx.scene.enter("job_registration");
        break;
      case "admin":
        await ctx.scene.enter("admin");
        break;
      case "user":
        // console.log("ufser");
        await ctx.tg.sendMessage(
          ctx.chat.id,
          `Hi! I am a <b>112LAB</b> bot⛑
            I help members of IT groups/channels to close vacancies/find jobs/attract investments. 
            How it works:
            1. Add me to your chat/channel💬
            2. By using buttons chat/members can register their startup/specialist/vacancy🔦
            3. After registration, message/post with user's startup/specialist/vacancy will be sent to yours and ours channels🌐
            4. You recieve a notification about new startup/specialist/vacancy📨
            `,
          {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: startKeyboard.user,
            },
          }
        );
        break;
      default:
        ctx.reply("Check button");
        break;
    }
  });
  bot.launch();
};

try {
init().then(() => console.log("Bot started"));
  
} catch (error) {
  
}

module.exports = new Telegraf(BOT_TOKEN);