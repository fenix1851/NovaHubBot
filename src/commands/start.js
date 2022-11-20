const startKeyboard = require("../keyboards/start.js");

const admins =[290561482,99577694]

module.exports = () => async (ctx, type) => {
  // console.log(1);
  const payload = ctx.startPayload;
  // console.log(payload);
  // console.log(ctx.from);
  if (ctx.from.username) {
    ctx.session.name = "@" + ctx.from.username;
  } else if (ctx.from.first_name) {
    ctx.session.name = ctx.from.first_name;
  } else {
    ctx.session.name = "incognito";
  }

  if (payload) {
    const from_chat_id = payload.split("_")[0];
    const type = payload.split("_")[1];
    switch (type) {
      case "startup":
        ctx.scene.enter("project_registration", { from_chat_id });
        break;
      case "specialist":
        ctx.scene.enter("specialist_registration", { from_chat_id });
        break;
      case "vacancy":
        ctx.scene.enter("job_registration", { from_chat_id });
        break;
      default:
        ctx.reply("Check your link");
        break;
    }
  } else {
    // console.log(ctx.chat.id);
    if (ctx.chat.id < 0) {
      let baseurl = `t.me/${ctx.botInfo.username}?start=`;
      return ctx.reply(`Hi! I am a <b>112LAB</b> bot⛑
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
                  inline_keyboard: [[
                    {
                      text: "Register startup",
                      url: baseurl + `${ctx.chat.id}_startup`,
                    }],
                    [
                    {
                      text: "Register specialist",
                      url: baseurl + `${ctx.chat.id}_specialist`,
                    }],
                  
                    [{
                      text: "Register vacancy",
                      url: baseurl + `${ctx.chat.id}_vacancy`,
                    }]]
                  }
                },
              );
    } else {
      // console.log(ctx.chat.id);
      // console.log(admins);
      // console.log(ctx.chat.id in admins);
      if(admins.includes(ctx.chat.id) && type != "user"){
        return ctx.reply("Hello admin!", {reply_markup: {inline_keyboard:startKeyboard.admin}});
      }
      
      const message = await ctx.tg.sendMessage(
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
      // console.log(message);
    }
  }
};

// payload: <chat_id>_[startup||specialist||vacancy]
