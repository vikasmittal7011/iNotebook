const mongoose = require("mongoose");

const connectToMongoose = async () => {
  mongoose.connect("mongodb://127.0.0.1/userAuth");
};

module.exports = connectToMongoose;