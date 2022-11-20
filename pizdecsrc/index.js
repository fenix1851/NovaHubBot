require("dotenv").config();
const {
  Telegraf,
  Scenes: { Stage },
} = require("telegraf");
const { session } = require("telegraf-session-mongodb");

const { MongoClient } = require("mongodb");
const { TEST_TOKEN, MONGODB_URI } = process.env;

const projectRegistration = require("./scenes/registration/project.js.js");

const init = async () => {
  const bot = new Telegraf(TEST_TOKEN);
  const stage = new Stage();
  const db = (
    await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  ).db();
  bot.use(session(db));
  bot.use(stage.middleware());
  bot.start((ctx) => {
    const payload = ctx.startPayload;
    console.log(payload);
    ctx.state.chatfromid = payload;
    ctx.reply("Click button to the left of message input field to register", {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Register as a project",
              web_app: { url: "https://112lab.space/project" },
            },
          ],
        ],
      },
    });
  });
  bot.on("web_app_data", (ctx) => {
    // console.log(ctx.update);
    // console.log(ctx.update.message.web_app_data);
    const { web_app_data } = ctx.update.message;
    let data = JSON.parse(web_app_data.data);
    // console.log(data.type);
    let { file, countryToRelocate, salary } = data;
    switch (data.type) {
      case "specialist":
        let {
          email,
          experience,
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
          profession,
          directions,
        } = data;
        break;
      case "project":
        let {
          projectDescription,
          projectInvestmentAmountRequired,
          projectMarkets,
          projectName,
          projectRevenue,
          projectScope,
          projectSpecialist,
          projectStage,
          projectWebsite,
        } = data;
        projectRegistration(
          projectDescription,
          projectInvestmentAmountRequired,
          projectMarkets,
          projectName,
          projectRevenue,
          projectScope,
          projectSpecialist,
          projectStage,
          projectWebsite,
          (ctx = ctx)
        );

        break;
      case "vacancy":
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
          termsForCandidate,
          workFormat,
        } = data;
        break;
    }
  });

  bot.launch();
};

init().then(() => console.log("Bot started"));
