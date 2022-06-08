var express = require('express');
var router = express.Router();

router.post("/write", async function (req, res) {
    if (req.session.user) {
        req.body.userId = req.session.user.id
    }

    await Board.create(req.body)
    res.json({
        result: "ok"
    })
})
var Pager = require("node-jyh-pager")
var pager = new Pager({
    itemPerPager: 5
})
router.post("/list", async function (req, res) {
    var page = req.body.page
    if (!page) {
        page = 1
    }
    var itemPerPage = 5
    var offset = (page - 1) * itemPerPage

    var boardList = await Board.findAll({
        include: {
            model: User,
            as: "writeUser"
        },
        limit: itemPerPage,
        offset: offset,
        order: [["writeTime", "DESC"]]
    })

    var count = await Board.count() //Select count(*) from Boards

    var pageCount = Math.ceil(count / itemPerPage)
    res.json({
        boardList: boardList,
        pageCount: pageCount
    })
})

router.post('/item', async function (req, res) {
    var id = req.body.id
    var board = await Board.findOne({
        where: {
            id: id
        },
        include: {
            model: User,
            as: "writeUser",
            attributes: ["id", "name"]
        }
    })
    res.json({
        board: board
    })
})

router.post("/remove", async (req, res) => {
    var id = req.body.id
    if (!req.session.user) {
        return res.json({
            result: "fail",
            msg: "로그인이 필요합니다."
        })
    }
    var board = await Board.findOne({
        where: {
            id: id
        }
    })
    //로그인된 사용자와 삭제하려는 게시물의 작성자가 같은지 확인
    if (board.userId == req.session.user.id) {
        await Board.destroy({
            where: {
                id: id
            }
        })
        res.json({
            result: "ok"
        })
    }
    //삭제하려는 게시물과 로그인된 사용자가 같지않음
    else {
        res.json({
            result: "fail",
            msg: "삭제할 권한이 없습니다."
        })
    }
    console.log(board)
})

router.post('/modify', async (req, res) => {
    var id = req.body.id
    if (!req.session.user) {
        return res.json({
            result: "fail",
            msg: "로그인이 필요합니다."
        })
    }
    var board = await Board.findOne({
        where: {
            id: id
        }
    })
    //로그인된 사용자와 수정하려는 게시물의 작성자가 같은지 확인
    if (board.userId == req.session.user.id) {
        await Board.update({
            title: req.body.title,
            body: req.body.body
        }, {
            where: {
                id: id
            }
        })
        res.json({
            result: "ok"
        })
    } else {
        res.json({
            result: "fail",
            msg: "수정할 권한이 없습니다."
        })
    }
})
module.exports = router;