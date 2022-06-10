var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/join", async function (req, res) {
  var body = req.body
  console.log(body)
  var alreadyUser = await User.findOne({
    where: {
      id: body.id
    }
  })
  if (alreadyUser != null) {
    res.json({
      result: "fail",
      message: "이미 존재하는 아이디입니다."
    })
    return
  }
  console.log(alreadyUser)

  var result = await User.create(body)
  res.json({
    result: "ok"
  })
})
router.post("/login", async function (req, res) {
  console.log(req.body)
  var user = await User.findOne({
    attributes: ["id", "name"],
    where: {
      id: req.body.id,
      password: req.body.password
    }
  })
  if (user == null) {
    res.json({
      result: "fail",
      message: "아이디 또는 비밀번호가 잘못되었습니다"
    })
    return
  }
  req.session.user = user
  res.json({
    result: "ok",
    user: user
  })
})
router.post('/info', async (req, res) => {
  //로그인이 되어있을때
  if (req.session.user) {
    res.json({
      result: "ok",
      user: req.session.user
    })
  }
  //로그인되지 않았을때
  else {
    res.json({
      result: "fail"
    })
  }
})

router.post("/logout", async (req, res) => {
  req.session.destroy()
  res.json({
    result: "ok"
  })
})

module.exports = router;
