require("dotenv").config();
// const { CHANNEL_NAME, CHAT_ID } = process.env;
const path = require("path");
const descriptionGeneratorClass = require(path.join(__dirname, "descriptionGenerator"));
const descriptionGenerator = new descriptionGeneratorClass();
const dbConnect = require("../services/dbConnect");
module.exports = async (ctx, messageData, file, type, from_chat_id) => {
  const db = await dbConnect();
  const collection = db.collection("config");
  const channel_settings = await collection.findOne({
    name: "channels"
  });
  var channel_config = channel_settings[type]
  if (type === "project") {
    channel_config = channel_settings["startup"];
  }

  const CHANNEL_NAME = channel_config["channel_name"];
  const CHAT_ID = channel_config["chat_id"];
  let donateKeyboard = [
    []
  ]
  try {
    // get text and keyboard from message
    // create message depends on type
    let messageText = "";
    var {
      salary,
      countryToRelocate
    } = messageData;
    switch (type) {
      case "project":
        // get data from message
        let {
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
        } = messageData;
        
        if (url) {
          url += `&link_to_channel=https://t.me/${CHANNEL_NAME.replace("@", "")}`;
          donateKeyboard = [
            [{
              text: "Donate",
              url: url
            }]
          ]
        }

        // create message
        messageText = descriptionGenerator.projectDescription(countryToRelocate, 0, projectDescription, projectInvestmentAmountRequired, projectMarkets, projectName, projectRevenue, projectScope, projectSpecialist, projectStage, projectWebsite);
        break
      case "specialist":
        // get data from message
        let {
          name, surname, email, position, experience, otherExperience, perHour, share, strengths, methodOfCommunication, links, location, profession, directions
        } = messageData;
        // create message
        messageText = descriptionGenerator.specialistDesciption(
          email,
          experience,
          0,
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
        break
      case "vacancy":
        // get data from message
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
          workFormat
        } = messageData;
        // create message
        messageText = descriptionGenerator.vacancyDescription(candidateRequirements,
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
        break
    }
    // check if files are attached
    // if files are attached
    if (file) {
      // get link to file from file_id
      if (from_chat_id) {
        ctx.tg.sendDocument(from_chat_id, file.file_id, {
          caption: messageText,
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: donateKeyboard
          }
        });
        from_chat_id = null;

      }
      ctx.tg.sendDocument(CHANNEL_NAME, file.file_id, {
        caption: messageText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: donateKeyboard
        }

      });
    } else {
      console.log(from_chat_id);
      // send message to channel
      if (from_chat_id) {
        ctx.tg.sendMessage(from_chat_id, messageText, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: donateKeyboard
          }
        });
        from_chat_id = null;
      }
      ctx.scene.state.message = await ctx.telegram.sendMessage(
        CHANNEL_NAME,
        messageText, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: donateKeyboard
          }
        }
      );
    }

    const message_id = ctx.scene.state.message.message_id;
    console.log(ctx)
    console.log(message_id)
    ctx.tg.sendMessage(
      CHAT_ID,
      `New ${type} was registered by ${ctx.session.name} in ${CHANNEL_NAME}!`, {
        reply_markup: {
          inline_keyboard: [
            [{
              text: "Check",
              url: `https://t.me/${CHANNEL_NAME.replace("@", "")}/${message_id}`,
            }, ],
          ],
        },
      }
    );

    ctx.telegram.sendMessage(
      ctx.chat.id,
      `Your ${type} was successfully registered!`, {
        reply_markup: {
          inline_keyboard: [
            [{
              text: "Go to channel",
              url: `https://t.me/${CHANNEL_NAME.replace("@", "")}`,
            }, ],
          ],
        },
      }
    );
  } catch (error) {
    console.log(error);
    ctx.reply("Something went wrong");
  }
};