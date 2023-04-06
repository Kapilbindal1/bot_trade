const { createBot } = require("whatsapp-cloud-api");
const {
  getResponseData,
  // getDetails
} = require("./controllers");
const axios = require("axios");
const { generateText } = require("./controllers/generateText");

const responseBot = async (app) => {
  try {
    const from = process.env.FROM;
    const token = process.env.TOKEN;
    const webhookVerifyToken = process.env.WEBHOOKVERIFYTOKEN;

    const bot = createBot(from, token);

    // Start express server to listen for incoming messages
    await bot.startExpressServer({
      app,
      webhookVerifyToken,
    });

    // Set up privacy policy route
    app.get("/privacy-policy", (req, res) => {
      res.sendFile(__dirname + "/privacy-policy.html");
    });
    // Listen to ALL incoming messages
    bot.on("message", async (msg) => {
      // await bot.sendText(msg.from, `Hello ${msg.name}`);
      let userExist = await getResponseData(msg.from);
      console.log(msg, "msgmsg", userExist);
      try {
        if (!userExist) {
          const tradingBots = await axios.get(process.env.APP_URL + "/bots");
          console.log(tradingBots.data, "tradingBotsData");
          await bot.sendList(msg.from, "Select", "Hi, Welcome to trading bot app. Please select a bot", generateText("list", tradingBots.data));
        } else {
        }
        // else {
        //   let hours = diff_hours(new Date(), new Date(userExist.updatedAt));
        //   if (hours > 0) {
        //     await deleteUser(msg.from);
        //     await getcategory(msg, userExist, bot);
        //   } else {
        //     let service = msg?.data?.title?.toLowerCase()
        //     if (
        //       msg.type === "list_reply" &&
        //       service.includes("visa")
        //     ) {
        //       if (
        //         (msg.type === "list_reply" || msg.type === "text") &&
        //         userExist.type === "select_category"
        //       ) {
        //         await getApplicationId(msg, userExist, bot);
        //       }
        //     } else {
        //       if(userExist.tmp_data.selected_category === "visa" && userExist.type === "select_category"){
        //         await getApplicationId(msg, userExist, bot);
        //       }else{
        //         if (
        //           (msg.type === "list_reply" || msg.type === "text") &&
        //           userExist.type === "select_category"
        //         ) {
        //           await getName(msg, userExist, bot);
        //         }
        //       }

        //     }
        //     if (
        //       userExist.tmp_data.selected_category === "visa" &&
        //       userExist.type === "Application_id"
        //     ) {
        //       await getDob(msg, userExist, bot);
        //     }
        //     if (
        //       userExist.tmp_data.selected_category === "visa" &&
        //       userExist.type === "DOB"
        //     ) {
        //       await getApplicationDetailAndcenter(msg, userExist, bot);
        //     }
        //     if (
        //       userExist.tmp_data.selected_category !== "visa" &&
        //       userExist.type === "Name"
        //     ) {
        //       await getNationality(msg, userExist, bot);
        //     }
        //     if (
        //       userExist.tmp_data.selected_category !== "visa" &&
        //       userExist.type === "Nationality"
        //     ) {
        //       await getIdType(msg, userExist, bot);
        //     }
        //     if (
        //       userExist.tmp_data.selected_category !== "visa" &&
        //       userExist.type === "Id_Type"
        //     ) {
        //       await getIdNumber(msg, userExist, bot);
        //     }
        //     if (
        //       userExist.tmp_data.selected_category !== "visa" &&
        //       userExist.type === "Id_Number"
        //     ) {
        //       await getEmail(msg, userExist, bot);
        //     }
        //     if (
        //       userExist.tmp_data.selected_category !== "visa" &&
        //       userExist.type === "Email"
        //     ) {
        //       await getPhoneNumber(msg, userExist, bot);
        //     }
        //     if (
        //       userExist.tmp_data.selected_category !== "visa" &&
        //       userExist.type === "Phone_No"
        //     ) {
        //       await getApplicationDetailAndcenter(msg, userExist, bot);
        //     }
        //     if (msg.type === "list_reply" && userExist.type === "Center") {
        //       await getSlots(msg, userExist, bot);
        //     }
        //     if (msg.type === "list_reply" && userExist.type === "Date_Time") {
        //       await bookAppointment(msg, userExist, bot);
        //     }
        //     if (msg.type === "button_reply" && msg.data.id === "confirm") {
        //       await allReadyBooked(msg, userExist, bot);
        //     }
        //   }
        // }
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = responseBot;
