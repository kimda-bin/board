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
module.exports = router;