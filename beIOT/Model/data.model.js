const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
    {
        stt:String,
        temperature:Number,
        humidity:Number,
        light:Number,
        windspeed:Number,
        time:String,
    }
);

const data = mongoose.model("data",dataSchema);

module.exports = data;

