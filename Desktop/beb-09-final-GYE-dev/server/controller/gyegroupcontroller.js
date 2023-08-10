const { Room_Groups, Users, ManageGroups } = require("../models");
const { Op } = require("sequelize");

module.exports = {

    //create group page
    creategrouplist: async (req, res) => {
        const { email, group_name, group_goal, fee, fee_day, max_ppl, group_img } = req.body;
        const date = new Date();

        try {
            const user = await Users.findOne({ where: { email } });

            const find_group_name = await Room_Groups.findOne({
                where: {
                    group_name: group_name,
                },

            });

            if (find_group_name) {
                res.status(400).send("계모임 이름이 중복입니다.");
            } else {
                // console.log(req.body);
                const createdGroup = await Room_Groups.create({
                    email: email,
                    g_user_id: user.id,
                    group_name: group_name,
                    group_goal: group_goal,
                    fee: fee,
                    fee_day: fee_day,
                    max_ppl: max_ppl,

                })

                const find_roomgroup_id = createdGroup.id;
              
                await ManageGroups.create({
                    group_id: find_roomgroup_id,
                    user_id: user.id,
                    nickname: user.nickname,
                    month: date,
                    yes_no_fee_payment: "N",
                });
                
                res.status(201).json({
                    message: "계모임이 생성되었습니다.",
                    group: createdGroup,
                });
            }
        } catch (err) {
            res.status(500).json({ message: "계모임을 만드는대 실패하셨습니다.", err });
        }
    },


    //계모임 전체 조회
    findgrouplist: async (req, res) => {
        
        try {
            
            const result = await Room_Groups.findAll({
                order: [['createdAt', 'DESC']], // <-- Add the "order" option for sorting in descending order
            });
            
            const gyelist = result.map((el) => {
                return el.dataValues;
            });
            
            res.status(200).json({
                msg: "ok",
                display: gyelist,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },

    //계모임 그룹 참여하기
        postgyejoin: async (req, res) => {
        const group_id = req.params.group_id;
       
        console.log("그룹 유저 ID+++++++++++++",group_id );
        const { email } = req.body;
        
        const date = new Date();

        try {
            const user = await Users.findOne({ where: { email } });
            
            const find_manageGroup = await ManageGroups.findOne({
                where: {
                    user_id: user.id,
                    group_id: group_id,
                }
            })
            
            // console.log("유저 아이디 ID2222222222222+",user.id );
       
            if (find_manageGroup) {
                res.status(400).send("참여하거나 개설한 방입니다.");
            } else {
                const result = ManageGroups.create({
                    group_id: group_id,
                    user_id: user.id,
                    nickname: user.nickname,
                    month: date,
                    yes_no_fee_payment: "N",
                })

                res.status(200).json({
                    msg: "참여 신청이 완료되었습니다.",
                    data: {
                        reulst: result.id,
                        group_id: group_id,
                        user_id: user.id,
                        nickname: user.nickname,
                        month: date,
                        yes_no_fee_payment: "N",
                    }, 
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ err: "서버에러" });
        }
    },
}