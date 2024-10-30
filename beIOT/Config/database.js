const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  mongoose
    .connect("mongodb+srv://tienduong:20031980@cluster0.2tde3.mongodb.net/")
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;

// mongodb+srv://lamtiendung11082002:mnVrXXA1mHP6SfDW@cluster0.etae2ut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// "mongodb+srv://tienduong:20031980@cluster0.2tde3.mongodb.net/"