const userController = {}
const User = require("../Models/user");

userController.saveUser=async(userName, sID)=>{
    // 이미 있는 유저인지 확인
    let user = await User.findOne({ name : userName });

    // 없다면 새로 유저정보 만듣기
    if(!user){
        user = new User({
            name : userName,
            token : sID,
            online : true,
        });
    }

    // 이미 있는 유저라면 연결정보 token값만 바꿔주기
    user.token = sID;
    user.online = true;

    await user.save()
    return user
}
userController.checkUer=async(sID)=>{
    const user = await User.findOne({token:sID});
    if(!user) throw new Error("user not found");
    return user;
}

module.exports = userController;