require("dotenv").config();
const express = require("express");
const router = express.Router();
const { ServerAccount } = require("../models");
const { ethers } = require("ethers");
const path = require('path');
//서버 계정을 anvil로부터 생성하고 DB에 저장하기.

// 새로운 서버 계정을 생성하는 함수입니다. + 서버 계정을 통해 배포되어있는 토큰수량을 DB에 업데이트 합니다. 
const createAccount = async () => {
  // 서버 테이블에 계정이 이미 존재하는지 확인합니다.

  let ServerAccountExists = await ServerAccount.count() > 0;



  if (ServerAccountExists) {
    // 이미 존재한다면
    return {
      msg: "서버 계정이 이미 존재합니다",
    };
  } else {
    // 존재하지 않는다면
    // ethers.js를 사용하여 새 지갑을 생성합니다.
    // JsonRpcProvider를 사용하여 로컬 테스트 네트워크에 연결합니다.(anvil)

    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const serverPrivateKey = process.env.SERVER_SECRET;
    const serverAddress = process.env.SERVER_ADDRESS;
    const wallet = new ethers.Wallet(serverPrivateKey, provider);
    const balance = await wallet.getBalance();
    const ethBalance = ethers.utils.formatUnits(balance, "ether");

    // USDG 토큰의 컨트랙트 주소
    const tokenContractAddress = process.env.ERC20_CONTRACT;

    // 토큰 컨트랙트 ABI
    const tokenContractABI = require("../../contracts/src/USDG.sol/USDG.json").abi;

    // 토큰 컨트랙트 인스턴스 생성
    const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractABI, wallet);
    // 토큰 컨트랙트의 balanceOf 함수를 호출하여 서버 계정의 토큰 수량을 확인합니다.
    const tokenAmount = ethers.BigNumber.from(await tokenContract.balanceOf(serverAddress));
    const tokenBalance = tokenAmount.toString();

    console.log(`tokenBalance = ${tokenAmount}`);

    const serverAccount = await ServerAccount.create({

      address: serverAddress,          //서버 계정 주소    (anvil)
      privatekey: serverPrivateKey,    //서버 계정 개인키
      eth_amount: ethBalance,          //서버 계정 잔고
      token_amount: tokenBalance       //서버 계정 토큰 수량

    });


    return {
      msg: "서버 계정이 생성되었습니다",
      data: serverAccount,
    };
  }
};


router.post("/", async (req, res) => {
  try {
    const result = await createAccount();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "서버 계정 생성에 실패했습니다" });
  }
});

module.exports = router;
