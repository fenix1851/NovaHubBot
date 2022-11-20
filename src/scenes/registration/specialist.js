const fsp = require("fs").promises; // fsdfsdf
const path = require("path");
const start = require("../../commands/start.js");
const descriptionGeneratorClass = require(path.join(__dirname,"..","..", "services","descriptionGenerator.js"));
const descriptionGenerator = new descriptionGeneratorClass();
const {
  Scenes: { BaseScene },
  Telegraf,
  Markup,
} = require("telegraf");
const specialist_registration = new BaseScene("specialist_registration");
const afterRegistrationKeyboard = require("../../keyboards/afterRegistration.js");
const sender = require("../../services/sender.js");
specialist_registration.enter((ctx) => {
  ctx.reply(
    "If you are a specialist and you are looking for an interesting project to participate in as a co-founder or you are looking for a job, register your profile and start looking.",
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Register as a specialist",
              web_app: { url: "https://112lab.space/specialist" },
            },
          ],
        ],
      },
    }
  );
});

// обработка данных из веб-формы

specialist_registration.on("web_app_data", async (ctx) => {
  console.log(123);
  console.log(ctx.update.web_app_data);
  // if message - start command - leave scene
  if (ctx.message.text === "Back") {
    return ctx.scene.leave();
  }
  if (ctx.update.message.web_app_data) {
    console.log(ctx.update);
    console.log(ctx.update.message.web_app_data);
    const { web_app_data } = ctx.update.message;
    let {
      email,
      experience,
      file,
      links,
      location,
      methodOfCommunication,
      name,
      otherExperience,
      perHour,
      position,
      salary,
      share,
      strengths,
      surname,
      countryToRelocate,
      profession,
      directions,
    } = JSON.parse(web_app_data.data);
    // make string from array
    // check if is array
    if (Array.isArray(countryToRelocate)) {
      countryToRelocate = countryToRelocate.join(", ");
    }
    // check if project specialist is array
    if (Array.isArray(directions)) {
      directions = directions.join(", ");
    }
    // check if project specialist is array
    if (Array.isArray(profession)) {
      profession = profession.join(", ");
    }
    await ctx.reply("Your data has been received from web app");
    await ctx.reply("Generate your card...");
    // get path to file
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "server",
      "uploads",
      file
    );
    console.log(filePath);
    const cv = await fsp.readFile(filePath);
    const description = descriptionGenerator.specialistDesciption(
      email,
      experience,
      file,
      links,
      location,
      methodOfCommunication,
      name,
      otherExperience,
      perHour,
      position,
      salary,
      share,
      strengths,
      surname,
      countryToRelocate,
      profession,
      directions);
    ctx.scene.state.message = await ctx.telegram.sendDocument(
      ctx.chat.id,
      { source: cv, filename: `${name} ${surname} cv.pdf` },
      {
        caption: `${description}`,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: afterRegistrationKeyboard,
        },
      }
    );
    ctx.scene.state.specialist_data = {
      email,
      experience,
      file,
      links,
      location,
      methodOfCommunication,
      name,
      otherExperience,
      perHour,
      position,
      salary,
      share,
      strengths,
      surname,
      countryToRelocate,
      profession,
      directions
    };
  }
});

specialist_registration.action("back", (ctx) => {
  ctx.scene.enter("specialist_registration");
});
specialist_registration.action("continue", (ctx) => {
  sender(ctx, ctx.scene.state.specialist_data, ctx.scene.state.message.document, "specialist", from_chat_id = ctx.scene.state.from_chat_id);
});
specialist_registration.leave((ctx) => {
  start(ctx);});
console.log('sdfsdf')
module.exports = specialist_registration;
