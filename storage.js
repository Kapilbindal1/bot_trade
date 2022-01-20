const fs = require("fs");

const initializeAndLoadFile = () => {
  try {
    const data = fs.readFileSync("./chk.json", {encoding:'utf8', flag:'r'})
    const context = JSON.parse(data);
    // console.log("Local data is:", context);
    return context;
  } catch(ex) {
    console.log("Error reading file from disk:", ex);
  }
};

const saveFile = (ctx) => {
  const str = JSON.stringify(ctx);
  fs.writeFile("./chk.json", str, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      // console.log("Successfully wrote file");
    }
  });
};

module.exports.initializeAndLoadFile = initializeAndLoadFile;
module.exports.saveFile = saveFile;