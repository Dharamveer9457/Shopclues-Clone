const mongoose = require("mongoose")
require('dotenv').config()

const connection = mongoose.connect(process.env.mongoURL)
.then(() => console.log('Connected to MongoDB Atlas in Shop-Unique Server'))
.catch((err) => console.error(err));

module.exports = {
    connection
}
