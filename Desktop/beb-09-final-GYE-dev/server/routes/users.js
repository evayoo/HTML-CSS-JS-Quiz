const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");
const { default: Web3 } = require("web3");
require("dotenv").config();
const USDGAbi = require('../../contract/build/contracts/ERC20.json'); // USDG 토큰의 ABI 파일

const ganacheUrl = 'http://localhost:7545'; // 가나슈 RPC 엔드포인트
const provider = new ethers.providers.JsonRpcProvider(ganacheUrl);

// Truffle로 배포한 USDG 토큰의 주소
const usdgContractAddress = '0xD4c8b5C11aA65167dB0BaF1694d3929f8EcD4EFF';

// USDG 토큰의 ABI와 컨트랙트 주소를 사용하여 인스턴스 생성
const usdgContract = new ethers.Contract(usdgContractAddress, USDGAbi.abi, provider);




//회원가입
router.post('/signup', async (req, res) => {

  const { email, password, nickname } = req.body;
  console.log(req.body);
  const date = new Date();

    // 새로운 지갑을 생성합니다. 주소는 얻을 수 있는데 프라이빗키는 
  const wallet = ethers.Wallet.createRandom();

  const userAddress = wallet.address;
  const privateKey = wallet.privateKey

  const findeEmail = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (findeEmail) {
    res.status(400).send("다른 이메일을 사용해 주세요");
  } else {
    Users.create({
      email: email,
      password: password,
      nickname: nickname,
      address: userAddress,
      privatekey: privateKey,
      role: 0,
      gye_amount: 0,
      usdg_amount: 0,
    })
      .then((user) => {
        res.status(200).json({
          success: true,
          message: "회원가입이 완료되었습니다.", user,
        });
      })
      .catch((err) => {
        res.status(500).json({ success: false, message: "회원가입에 실패하였습니다.", err });
      })
  }
});


//로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {``
    const user = await Users.findOne({ where: { email, password } });
    // console.log("=================유저 닉네임", user);
    
    if (!user) {
      res.status(401).json({ msg: "아이디 또는 비밀번호를 정확히 입력해주세요" });
    } else {
       // JWT 토큰 생성을 위한 비밀키(salt)를 설정합니다.
       const secretKey = process.env.ACCESS_SECRET; // 비밀키(salt)는 보안상의 이유로 별도의 보안 저장소에 보관하는 것이 좋습니다.
       console.log(secretKey);
       // 사용자 정보를 기반으로 JWT 토큰을 생성합니다.  // 유효시간: 1시간.
       const token = jwt.sign({ userId: user.id }, secretKey, {
         expiresIn: "1h",
       });

       

      res.status(200).json({
        isLoginMessage: "로그인에 성공하였습니다.",
        token,
        data: {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          address: user.Address,
          gye_amount: user.gye_amount,
          usdg_amount: user.usdg_amount,
        },
      })

    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "서버 에러" });
    next(err);
  }
})


// 사용자 로그인 시 보상 처리
async function rewardUserOnLogin(userAddress, rewardAmount) {
  try {
      const signer = provider.getSigner(); // 서버 계정의 서명자
      const usdgContractWithSigner = usdgContract.connect(signer);

      // USDG 토큰의 rewardUser 함수 호출
      const tx = await usdgContractWithSigner.rewardUser(userAddress, rewardAmount);

      // 트랜잭션 완료를 기다리고 결과 출력
      await tx.wait();
      console.log(`Rewarded ${rewardAmount} USDG to ${userAddress}`);
  } catch (error) {
      console.error('Error:', error);
  }
}

// 사용자 로그인 시 보상 처리 함수 호출
const userAddress = '0x97155853Dd265f3a32E08b2e8f337fD91B1E76F9';
const rewardAmount = 20; // 보상할 USDG 양
rewardUserOnLogin(userAddress, rewardAmount);


module.exports = router;