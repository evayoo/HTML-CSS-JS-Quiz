const { Post, Users } = require("../models");
const { ethers } = require("ethers");

module.exports = {
    //게시글 전체 조회
    getallpostlist: async (req, res) => {
        try {
            const result = await Post.findAll({
                order: [['createdAt', 'DESC']], // <-- Add the "order" option for sorting in descending order
            });
            return res.status(200).json({
                msg: "ok",
                display: result,
            });
        } catch (err) {
            res.status(500).json({ error: 'Failed to get all posts' });
        }
    },

    registerPostWithTokenReward: async (req, res) => {
        const USDG_REWARD = BigInt(200e18);
    
        try {
          if (!req.headers.authorization) {
            return res.status(400).send("no authorization");
          } else {
            const token = req.headers.authorization.split(" ")[1];
            const data = jwt.verify(token, process.env.ACCESS_SECRET);
            const user_id = data.userId;
            console.log(user_id);
            const { title, content } = req.body;
    
            // create new post
            const post = await Post.create({
                user_id: user_id,
              title: title,
              content: content,
            });
            //   console.log(post.dataValues);
    
            // transfer token to users
            const serverAccount = await ServerAccount.findOne();
            const recipientAccount = await Users.findOne({
              where: {
                id: user_id,
              },
            });
            const provider = new ethers.providers.JsonRpcProvider(
              process.env.LOCAL_ENDPOINT
            );
            const serverWallet = new ethers.Wallet(
              // serverAccount.privatekey,
              process.env.SERVER_SECRET,
              provider
            );
    
            const tokenContractAddress = process.env.ERC20_CONTRACT;
            const tokenContractABI =
              require("../../contracts/src/USDG.sol/USDG.json").abi;
            const tokenContract = new ethers.Contract(
              tokenContractAddress,
              tokenContractABI,
              serverWallet
            );
    
            // 토큰을 다른 주소로 전송합니다.
            const transferTx = await tokenContract.transfer(
              recipientAccount.address,
              USDG_REWARD
            );
            await transferTx.wait();
    
            const tokenBalanceContract = await tokenContract.balanceOf(
              // serverAccount.address
              process.env.SERVER_ADDRESS
            );
            const tokenBalanceContractFormatted =
              ethers.utils.formatEther(tokenBalanceContract);
            const tokenBalanceRecipient = await tokenContract.balanceOf(
              recipientAccount.address
            );
            const tokenBalanceRecipientFormatted = ethers.utils.formatEther(
              tokenBalanceRecipient
            );
    
            await serverAccount.update({
              token_amount: String(tokenBalanceContractFormatted),
            });
            await recipientAccount.update({
              token_amount: String(tokenBalanceRecipientFormatted),
              where: {
                id: user_id,
              },
            });
    
            return res.status(200).json({
              message: "Posting & USDG reward complete",
              postId: post.id,
              reward: recipientAccount.token_amount,
            });
          }
        } catch (e) {
          console.log(e);
          return res.status(500).send("internal server error");
        }
      },

    //게시글 생성
    createpost: async (req, res) => {
        const { email, title, content } = req.body;
        // console.log(req.body);
            
        try {
            const user = await Users.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ msg: '사용자가 일치하지 않거나 없습니다.' });
            }

            const post = await Post.create({
                user_id: user.id,
                title: title,
                content: content,
            });

            return res.status(200).json({
                msg: "게시글이 생성되었습니다.",
                data: {
                    id: post.id,
                    user_id: user.id,
                    title: title,
                    content: content,
                }
            });

        } catch (err) {
            res.status(500).send({err:'Failed to write Post' });
        }
    },

    //게시글 업데이트
    updatepost: async (req, res) => {

        const { title, content, email } = req.body;
        const { post_id } = req.params;
        console.log(post_id);
        const date = new Date();

        try {
            const user = await Users.findOne({ where: { email } });

            const postupdate = await Post.update({
                title: title,
                content: content,
                updatedAt: date,
            }, {
                where: { id: post_id, user_id: user.id }
            });

            console.log(postupdate);

            if (postupdate[0] === 0) {
                res.status(401).send("no access to current post");
            } else {
                return res.status(200).json({
                    msg: "게시글이 수정되었습니다.",
                    data: {
                        title: title,
                        content: content,
                        updatedAt: date,
                        postupdate,
                    },
                });
            }

        } catch (err) {
            res.status(500).send(err);
        }
    }
}