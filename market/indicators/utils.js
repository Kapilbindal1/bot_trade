const isRSIIncreasing = (array) => {
  let lastValue = array[array.length - 1];
  let decision = "";
  if (lastValue > 50)
    for (let i = array.length - 2; i > 0; i--) {
      if (array[i] <= 50) {
        decision = "increasing";
        break;
      } else if (array[i] >= 70) {
        decision = "decreasing";
        break;
      }
    }
  return decision === "increasing" ? true : false;
};

const isSTOCHIncreasing = (array) => {
  let lastValue = array[array.length - 1];
  let decision = "";
  if (lastValue.k < 80) {
    for (let i = array.length - 2; i > 0; i--) {
      if (array[i] <= 20) {
        decision = "increasing";
        break;
      } else if (array[i] >= 80) {
        decision = "decreasing";
        break;
      }
    }
  }
  return decision === "increasing" ? true : false;
};

module.exports = { isRSIIncreasing, isSTOCHIncreasing };
