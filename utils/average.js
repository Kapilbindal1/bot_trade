let qty=0;
let cost=0;
let averagePrice;
let calculateAverage=0
let profitPercentage=0

const averageRate = (trades) => {
  trades.forEach(item => {
let qtyTotal =(Number(item.info.qty))
let costTotal=item.cost

qty=qty+qtyTotal
cost=cost+costTotal
averagePrice=cost/qty
 });

// console.log("averagePrice",averagePrice)
return averagePrice

}



const sellCoins=(averagePrice,currentPrice)=>{
 calculateAverage=averagePrice+(averagePrice*15/100)
let profitPercentage=((currentPrice-averagePrice)/averagePrice)*100
 console.log("calculateAverage",calculateAverage,profitPercentage)
if(currentPrice>calculateAverage){
  if(profitPercentage>=10 && profitPercentage<20){
    console.log("Sell 25%")
  }
  else if(profitPercentage>=20 && profitPercentage<30){
    console.log("Sell 50%")
  }
  else if(profitPercentage>=30 && profitPercentage<50){
    console.log("Sell 60%")
  }
  else if(profitPercentage>=50 && profitPercentage<70){
    console.log("Sell 70%")
  }
  else if(profitPercentage>=70 && profitPercentage<100){
    console.log("Sell 100%")
  }

}

}

module.exports.averageRate = averageRate;
module.exports.sellCoins = sellCoins;