const whatsappBinanceUsers = require("../../db/schemas/whatsapp-users");

const getResponseData = async (req) => {
  try {
    const isResponse = await whatsappBinanceUsers.findOne({
      userNumber: req,
    });
    if (!isResponse) {
      return false;
    }
    return isResponse;
  } catch (error) {
    return error.message;
  }
};

// const getDetails = async (msg, userExist, bot) => {
//   let tempData = { ...userExist.tmp_data };
//   let dataObj = {
//     phone_number: msg.from,
//     type: "Welcome_Message",
//     message: msg.data.text,
//     reply_with: "Hi, Welcome to OIS appointment booking system. Please select the category",
//     data: JSON.stringify(msg.data),
//     tmp_data: tempData,
//   };
//   const response = await saveResponseData({ ...dataObj });
//   if (response) {
//     const res = await axios.get(process.env.API_END_POINT + "/category-list");
//     const data = await res.data;
//     if (data) {
//       let tempDataa = { ...userExist.tmp_data, category_data: data };
//       let dataObjj = {
//         phone_number: msg.from,
//         type: "select_category",
//         message: "Hi, Welcome to OIS appointment booking system. Please select the category",
//         reply_with: "",
//         data: JSON.stringify(msg.data),
//         tmp_data: tempDataa,
//       };
//       const res = await saveResponseData({ ...dataObjj });
//       if (res) {
//         await bot.sendList(msg.from, "Select", "Hi, Welcome to OIS appointment booking system. Please select the category", generateText("list", data));
//       }
//     }
//   }
// };

module.exports = {
  getResponseData,
  // getDetails,
};
