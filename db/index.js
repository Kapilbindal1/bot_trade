const mongoose = require('mongoose');
const dotEnv = require("dotenv");
dotEnv.config();

const connect = async() => {
    const uri = process.env.MONGO_URL;
    try {
        const connection = await mongoose.connect(uri, {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        if (connection) {
            return { success: true }
        }
    }
    catch (err) {
        console.log("database connection error", err);
        return { success: false }
    }
}
module.exports = { connect };