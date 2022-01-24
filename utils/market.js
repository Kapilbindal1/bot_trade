
const getMarket = (asset, base) => {
  return `${asset}/${base}`;
}

module.exports = { getMarket }