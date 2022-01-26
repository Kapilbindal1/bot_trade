const mongoose = require('mongoose');

const connect = () => {
    const uri = process.env.MONGO_URL;
    try {
        const connection = mongoose.connect(uri, {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        if (connection) {
            return { success: true }
        }
    }
    catch (err) {
        console.log("database connection error");
        return { success: false }
    }
}
module.exports = { connect };