const express = require("express");
const router = express.Router();
const {
    creategrouplist,
    findgrouplist,
    postgyejoin
    } = require("../controller/gyegroupcontroller");

//전체 그룹 조회 
router.get("/list", findgrouplist);

//계 그룹 만들기
router.post("/create", creategrouplist);

//계 참여하기
router.post("/:group_id", postgyejoin);


module.exports = router;
