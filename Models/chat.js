const mongoose = require("mongoose");

// Schema란 데이터를 저장하는 설계도 같은 느낌
const userSchema = new mongoose.Schema({
    chat: String,
    user: {
        id:{
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
        
        name: String,
        
        room: {
            type: mongoose.Schema.ObjectId,
            ref: "Room",
        },
    },
}, {timestamp: true});

module.exports = mongoose.model("Chat", userSchema);