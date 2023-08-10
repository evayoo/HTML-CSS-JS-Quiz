const express = require("express");
const router = express.Router();
const { findgyedisplay, getprogile, gye_payy } = require("../controller/profilecontorller");


// 마이페이지 
router.get("/:email", getprogile);

//회비납부하기
router.post("/pay/:group_id/:email", gye_payy)

//마이페이지 계그룹 참여한 사람 보기
router.get("/list/:group_id", findgyedisplay);



module.exports = router;