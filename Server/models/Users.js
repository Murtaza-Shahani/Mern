const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
