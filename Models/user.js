
//mongoDB와 nodejs를 연결하기 위해서 require를 통해 'mongoose' 안에 담아줌
const mongoose = require("mongoose");

// Schema란 데이터를 저장하는 설계도 같은 느낌 => 'mongoose.Schema' 
const userSchema = new mongoose.Schema({

    // 이름이라는 field
    name: {
        type: String,
        required : [true, "User must have type name"],
        unique: true,
    },

    // 어떤 연결 아이디로 들어오는지 token에 저장
    token: {
        type: String,
    },

    // User가 온라인인지 오프라인인지 보여줄수 있도록 추가 (현재는 사용하지 않음)
    online: {
        type: Boolean,
        default: false,
    },
    
    // 채팅방 
    room: {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
    },
});

// 다른 js파일에서 User를 쓸 수 있게끔 export해줌
module.exports = mongoose.model("User", userSchema);