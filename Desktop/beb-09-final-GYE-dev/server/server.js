const express = require('express')
const app = express()
const db = require("./models");
require("dotenv").config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const port = parseInt(process.env.PORT, 10);
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/users");
const creategroupRouter = require("./routes/groups");
const postRouter = require("./routes/posts");
const porfileRouter = require("./routes/profile");

app.use(cors());
app.use(express.json());
app.use("/user", usersRouter);          //회원가입/로그인
app.use("/group", creategroupRouter);   //계 그룹 만들기
app.use("/posts", postRouter);          //게시판
app.use("/profile", porfileRouter);      //마이페이지

app.listen(port, () => {
  console.log(` 
  ################################################
  ***  Server listening on port: ${port} ***
  ################################################`)
  
});

db.sequelize
  .sync({})
  .then(() => {
    console.log("dababase connected");
  })
  .catch(console.error);
