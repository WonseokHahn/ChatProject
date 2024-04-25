// 1. 프레임워크 import
// 2. DB import
const express = require("express");
const mongoose = require("mongoose");
const Room = require('./Models/room');

// 초기화 작업 후 .env파일을 읽을 수 있게해준다.
require('dotenv').config();
const cors = require("cors");
const app = express();
app.use(cors());
//  임의로 룸을 만들어주기
app.get("/", async (req, res) => {
    Room.insertMany([
      {
        room: "자바스크립트 단톡방",
        members: [],
      },
      {
        room: "리액트 단톡방",
        members: [],
      },
      {
        room: "NodeJS 단톡방",
        members: [],
      },
    ])
      .then(() => res.send("ok"))
      .catch((error) => res.send(error));
  });

mongoose.connect(process.env.DB,{
}).then(()=>console.log("connected to database"));

module.exports= app;