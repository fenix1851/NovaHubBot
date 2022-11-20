const fsp = require("fs").promises; // fsdfsdf
const path = require("path");
const start = require("../../commands/start.js");
const {
  Scenes: { BaseScene },
} = require("telegraf");
const sender = require("../../services/sender.js");
const afterRegistrationKeyboard = require("../../keyboards/afterRegistration.js");
const job_registration = new BaseScene("job_registration");
const descriptionGeneratorClass = require(path.join(__dirname,"..","..", "services","descriptionGenerator.js"));
const descriptionGenerator = new descriptionGeneratorClass();
job_registration.enter((ctx) => {
  ctx.reply(
    "If you want to post a job, fill in the required information and get started on your search.",
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Register your vacancy",
              web_app: { url: "https://112lab.space/job" },
            },
          ],
          // [
          //   {
          //     text: "Back",
          //     callback_data: "menu",
          //   },
          // ]
        ],

      },
    }
  );
});


job_registration.on("web_app_data", async (ctx) => {
  if (ctx.message.text == "Back") {
    ctx.scene.leave(); 
    start(ctx);
  }
  if (ctx.update.message.web_app_data) {
    console.log(ctx.update);
    console.log(ctx.update.message.web_app_data);
    const { web_app_data } = ctx.update.message;
    let {
      candidateRequirements,
      companyAdress,
      companyDescription,
      companyName,
      companyScope,
      companySpecialist,
      employment,
      jobDescription,
      responcibilities,
      salary,
      termsForCandidate,
      workFormat,
    } = JSON.parse(web_app_data.data);
    const data = {
      candidateRequirements,
      companyAdress,
      companyDescription,
      companyName,
      companyScope,
      companySpecialist,
      employment,
      jobDescription,
      responcibilities,
      salary,
      termsForCandidate,
      workFormat,
    }
    await ctx.reply("Your data has been received from web app");
    await ctx.reply("Generate your card...");
    const description = descriptionGenerator.vacancyDescription(candidateRequirements,
      companyAdress,
      companyDescription,
      companyName,
      companyScope,
      companySpecialist,
      employment,
      jobDescription,
      responcibilities,
      salary,
      termsForCandidate,
      workFormat);
    await ctx.reply(
      description,
      { parse_mode: "HTML", reply_markup: {inline_keyboard:afterRegistrationKeyboard} }
    );
    ctx.scene.state.vacancyData = data;
  }
});
job_registration.action("back", (ctx) => {
  ctx.scene.enter("job_registration");
});
job_registration.action("continue", (ctx) => {
  sender(ctx, ctx.scene.state.vacancyData,false, "vacancy", from_chat_id = ctx.scene.state.from_chat_id);
});

job_registration.leave((ctx) => {
  start(ctx);
});

module.exports = job_registration;
