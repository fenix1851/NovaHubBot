const fsp = require("fs").promises; // fsdfsdf
const path = require("path");
const sender = require("../../../pizdecsrc/services/sender.js");
const afterRegistrationKeyboard = require("../../../pizdecsrc/keyboards/afterRegistration.js");
const descriptionGeneratorClass = require(path.join(__dirname,"..","descriptionGenerator.js"));
const descriptionGenerator = new descriptionGeneratorClass();
module.exports = async (countryToRelocate, file, projectDescription, projectInvestmentAmountRequired, projectMarkets, projectName, projectRevenue, projectScope, projectSpecialist, projectStage, projectWebsite, ctx) => {
    let messageText = descriptionGenerator.projectDescription(countryToRelocate, 0, projectDescription, projectInvestmentAmountRequired, projectMarkets, projectName, projectRevenue, projectScope, projectSpecialist, projectStage, projectWebsite);
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
      // console.log(filePath);
      const deck = await fsp.readFile(filePath);
      ctx.state.message = await ctx.telegram.sendDocument(ctx.chat.id, {
        source: deck,
        filename: `${projectName} deck.pdf`,
      }, {
        caption: description,
        parse_mode: "HTML", reply_markup: {
          inline_keyboard: afterRegistrationKeyboard("project")
        },
      });
      ctx.state.projectData = {
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
        projectWebsite
    }
      
};
