const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please provide your password.."],
        minlength: [8, "Password can not be less than 8 characters.."]
    }

})

module.exports = mongoose.model("AuthLoginSchema", authSchema)