function generateText(type, data) {
  switch (type) {
    case "list":
      const dataArr =
        data.length > 0 &&
        data.map((item) => {
          return { id: item._id, title: item.name };
        });
      console.log(dataArr, "dataArr===>>");
      return {
        Services: [...dataArr],
      };
    default:
      return "Apologies We don't accept this type of message as of now.";
  }
}

module.exports = { generateText };
