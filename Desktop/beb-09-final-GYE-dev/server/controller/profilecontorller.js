const { Room_Groups, Users, ManageGroups, Post } = require("../models");
const { Op } = require("sequelize");

module.exports = {

    //마이페이지 정보
    getprogile: async (req, res) => {

        const { email } = req.params;

        try {
            const user = await Users.findOne({ where: { email } });


            if (user) {
                const findgroup = await Room_Groups.findOne({ where: { g_user_id: user.id } });

                const userPost = await Post.findAll({
                    where: {
                        user_id: user.id,
                    },
                });
                //   console.log(userPost );
                const postData = userPost.map((post) => {
                    return {
                        postId: post.id,
                        title: post.title,
                        content: post.content,
                        createdAt: post.createdAt,
                    };
                });

                // console.log(postData);
                const responseData = {
                    email: user.email,
                    nickname: user.nickname,
                    address: user.address,
                    gye_amount: user.gye_amount,
                    usdg_amount: user.usdg_amount,
                    createdAt: user.createdAt,
                    groups: {
                        id: findgroup.id,
                        group_name: findgroup.group_name,
                    },
                }

                res.status(200).json({
                    msg: 'Find Usersdata',
                    data: responseData,
                    postsdata: postData
                })
            }
        } catch (err) {
            res.status(400).json({ error: 'The request message is invalid.' });
        }

    },

    // 회비 납부 하기
    gye_payy: async (req, res) => {
        const { email, group_id } = req.params;
        const { fee_pay } = req.body;
        const intgroup_id = parseInt(group_id);
        const date = new Date();

        try {
            const user = await Users.findOne({ where: { email } });
            if (user) {
                const oneMonthLater = new Date();
                oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
                const findgroup = await ManageGroups.findOne({ where: { group_id: intgroup_id, user_id: user.id } });
                if (findgroup) {
                    let totalpay = findgroup.fee_pay;
                    totalpay += fee_pay;
                    
                    const result = await ManageGroups.update({
                        fee_pay: totalpay,
                        yes_no_fee_payment: "Y",
                        updateAt: date,
                    },
                        {
                            where: {
                                group_id: intgroup_id,
                                user_id: user.id,
                            }
                        }
                    );

                    const dataToUpdate = await ManageGroups.findAll({
                        where: {
                            yes_no_fee_payment: 'N',
                            updatedAt: {
                                [Op.lte]: oneMonthLater, // 한 달 뒤보다 이전 시간
                            },
                        },
                    });
                    dataToUpdate.forEach(async (data) => {
                        data.yes_no_fee_payment = 'N';
                        await data.save();
                    });

                    res.status(200).json({
                        msg: 'Find Usersdata',
                        data: result,
                        monthdata: dataToUpdate,
                    })
                }

            } else {
                res.status(400).json({ error: 'The request message is invalid.' });
            }


        } catch (err) {
            res.status(400).json({ error: 'The request message is invalid.' });
        }
    },

    //마이페이지 계그룹 참여한 사람 보기
    findgyedisplay: async (req, res) => {
        const { group_id } = req.params;
        console.log(group_id, "gourp_id=-----------------");
        try {
            const records = await ManageGroups.findAll({
                attributes: ["nickname", "month", "yes_no_fee_payment", "createdAt"],
                where: {
                    group_id: group_id,
                    user_id: {
                        [Op.between]: [1, 10000],
                    },
                },
            });

            res.status(200).json({
                msg: "ok",
                data: records,
            });

        } catch (err) {
            res.status(400).json({ error: 'The request message is invalid.' });
        }
    }
}
