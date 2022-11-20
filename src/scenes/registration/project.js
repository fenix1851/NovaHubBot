const fsp = require("fs").promises; // fsdfsdf
const path = require("path");
const start = require("../../commands/start.js");
const sender = require("../../services/sender.js");
const afterRegistrationKeyboard = require("../../keyboards/afterRegistration.js");
const descriptionGeneratorClass = require(path.join(__dirname,"..","..", "services","descriptionGenerator.js"));
const descriptionGenerator = new descriptionGeneratorClass();
const {
  Scenes: { BaseScene },
} = require("telegraf");
const project_registration = new BaseScene("project_registration");
project_registration.enter((ctx) => {
  ctx.reply(
    "If you're a project fundraiser and you need specialists or you're looking for investments, register your project and start looking.",
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Register your project",
              web_app: { url: "https://112lab.space/project" },
            },
          ],
        ],
      },
    }
  );
});
// обработка данных из веб-формы
project_registration.on("web_app_data", async (ctx) => {
  console.log(ctx.update.web_app_data);
  // if message - start command - leave scene
  if (ctx.message.text === "/start") {
    start(ctx);
    return ctx.scene.leave();
    // send start message
  }
  if (ctx.update.message.web_app_data) {
    console.log(ctx.update);
    console.log(ctx.update.message.web_app_data);
    const { web_app_data } = ctx.update.message;
    let {
      countryToRelocate,
      file,
      projectDescription,
      projectInvestmentAmountRequired,
      projectMarkets,
      projectName,
      projectRevenue,
      projectScope,
      projectSpecialist,
      projectStage,
      projectWebsite,
      AcceptDonations
    } = JSON.parse(web_app_data.data);
    let url = false;
    if(AcceptDonations){
      url = `https://112lab.space/generate_invoice?`
      url+=`startup_name=${projectName}&`;
      url+=`to_id=${ctx.from.id}&`;
    }
    // https://www.112lab.space/generate_invoice?to_id=290561482&startup_name=hublub&link_to_channel=https://t.me/foxyess2020
    // make string from array
    console.log(countryToRelocate)
    // check if is array
    if (Array.isArray(countryToRelocate)) {
      countryToRelocate = countryToRelocate.join(", ");
    }
    // check if project specialist is array
    if (Array.isArray(projectSpecialist)) {
      projectSpecialist = projectSpecialist.join(", ");
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
    const deck = await fsp.readFile(filePath);
    
    // generate description
    const description = descriptionGenerator.projectDescription(
      countryToRelocate,
            file,
            projectDescription,
            projectInvestmentAmountRequired,
            projectMarkets,
            projectName,
            projectRevenue,
            projectScope,
            projectSpecialist,
            projectStage,
            projectWebsite);
    
   ctx.scene.state.message = await ctx.telegram.sendDocument(ctx.chat.id, {
      source: deck,
      filename: `${projectName} deck.pdf`,
    }, {
      caption: description,
      parse_mode: "HTML", reply_markup: {
        inline_keyboard: afterRegistrationKeyboard
      },
    });
    ctx.scene.state.projectData = {
      countryToRelocate,
      file,
      projectDescription,
      projectInvestmentAmountRequired,
      projectMarkets,
      projectName,
      projectRevenue,
      projectScope,
      projectSpecialist,
      projectStage,
      projectWebsite,
      url
    }
  }
  
});
project_registration.action("back", (ctx) => {
  ctx.scene.enter("project_registration");
});
project_registration.action("continue", (ctx) => {

  sender(ctx, ctx.scene.state.projectData, ctx.scene.state.message.document, "project", from_chat_id = ctx.scene.state.from_chat_id);
});  
module.exports = project_registration;
