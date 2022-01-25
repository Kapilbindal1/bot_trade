var BB = require('technicalindicators').BollingerBands

const calculateBBValue = (values) => {
    var inputRSI = {
        values,
        stdDev: 2,
        period: 14
    };
    return BB.calculate(inputRSI);
}

module.exports = { calculateBBValue }