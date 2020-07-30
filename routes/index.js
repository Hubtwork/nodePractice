var express = require('express');
var router = express.Router();
var User = require('../etc/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { session : req.session });
});

router.get('/findall', function(req, res, next) {
  User.find( {}, function(err, users) {
    if (err) return res.status(500).send("User 전체 조회 실패.");
    res.status(200).send(users);
  });
});

router.get('/join', function(req, res, next) {
  res.render('join')
});

router.post('/join', function(req, res, next) {
  User.create( {
    id: req.body.id,
    pw: req.body.password,
    name: req.body.name,
    age: req.body.age
    },
    function(err, user) {
        if (err) return res.status(500).send("User 생성 실패.");
        res.send('/');
    });

});

router.get('/login', function(req, res, next) {
  res.render('login')
});

router.post('/login', function(req, res, next) {
  User.find({"id":req.body.id}, function (err, user) {
    if (err) return res.status(500).send("User 조회 실패");
    if (!user) return res.status(404).send("User 없음.");

    req.session.uid = user[0].id;
    req.session.name = user[0].name;
    res.redirect('/');
  });
})

router.get('/findid', function(req, res, next) {
  res.render('findid')
});

router.get('/findpw', function(req, res, next) {
  res.render('findpw')
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/')
})

module.exports = router;
