const getCloseInputData = (array) => {
    
return array.map((val)=>{
    console.log("sdfgsdfg",new Date(val.timeStamp) , val)
    return val.close});
}

module.exports = { getCloseInputData }