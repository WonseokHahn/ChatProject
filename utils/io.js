const userController = require("../Controllers/userController");
const chatController = require("../Controllers/chatController");
const roomController = require("../Controllers/room.controller");

module.exports=function(io){
    //io관련된 모든 일을 여기서 시행

    // 말하는 함수 = emit, 듣는 함수 = on
    io.on("connection",async(socket)=>{
        socket.emit("rooms", await roomController.getAllRooms()); // 룸 리스트 보내기

        // 해당 이벤트를 받고 콜백함수 실행
        socket.on("login", async(userName, cb) => {
            // 유저정보를 저장
            try{
              const user = await userController.saveUser(userName, socket.id);
              const welcomeMessage = {
                chat: `${user.name} is joined to this room`,
                user: { id: null, name: "system"},
              }
              io.emit("message", welcomeMessage);
              cb({ok:true, data:user});
            }catch(error){
              cb({ ok: false, error: error.message });
            }
        });

        socket.on("disconnect", () => {
            console.log("user is disconnected");
        });

        socket.on("sendMessage", async(message, cb) => {

            try{
                // socket.id로 유저 찾기 후 
                const user  = await userController.checkUer(socket.id);

                // 메세지 저장(유저)
                const newMessage = await chatController.saveChat(message, user);
                io.emit("message" , newMessage);
                cb({ok:true});
            }catch(error){
                cb({ ok: false, error: error.message });
            }
            

        });
    });
    
}