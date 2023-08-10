const express = require("express");
const router = express.Router();
const {
    getallpostlist,
    createpost,  
    registerPostWithTokenReward,
    updatepost,
} = require("../controller/postcontroller");

// 게시글 전체 조회
router.get("/list", getallpostlist);

//게시글 만들기
router.post("/create", createpost);

// 글 작성 시 보상 토큰 API
router.post("/register", registerPostWithTokenReward);

//게시글 수정
router.put("/update/:post_id", updatepost);

module.exports = router;