const express = require('express');
const router = express.Router();
const db = require('../config/Database');

router.get('/', (req, res) => {
    res.json({username:'bryan~~~'})
});

router.get('/group', (req, res)=> {
    res.json({username:'dev group. bryan'})
});

router.get('/userinfo', (req, res) => {
    const id = req.query.id;
    let sql = `select * from playerdb where id = ('${id}')`;
    db.query(sql,
      (err, rows, fields) => {
        res.send(rows);
      } 
    )
});

router.get('/notice_list', (req, res) => {
    db.query(
      'SELECT id,title,uuid,nickname,views,if(DATE(writetime) >= DATE(now()),DATE_FORMAT(writetime, "%H:%i"),DATE_FORMAT(writetime, "%y.%m.%d")) as writetime from noticedb order by id desc',
      (err, rows, fields) => {
        res.send(rows);
      } 
    )
});

router.get('/login', function (req, res) {
    const id = req.query.id;
    const pw = req.query.password;
    let sql = `select id,password from playerdb where id = ('${id}')`;
  
    db.query(sql, function (err, rows) {
        if(err){
            console.log("문제발생");
        }
        else if (!rows.length) {
            res.send("{\"status\": false ,\"status_message\":\"* 존재하지 않는 아이디입니다\"}");
        } 
        else {
            if(rows[0].password === pw){
                res.send("{\"status\": true , \"status_message\":\"* 로그인에 성공했습니다\"}");
            }
            else{
                res.send("{\"status\": false ,\"status_message\":\"* 비밀번호가 다릅니다\"}");
            }
        }
    });
});

router.get('/register', function (req, res) {
    const id = req.query.id;
    const pw = req.query.password;
    const uuid = req.query.uuid;
    const nickname = req.query.nickname;
    let sql = `insert into playerdb (uuid,nickname,id,password) values('${uuid}', '${nickname}', '${id}', '${pw}' )`;
  
    db.query(sql, function (err) {
        console.log(sql);  
        if (!err) {
            res.send("{\"status\":\"회원가입이 완료되었습니다\"}");
        }
        else {
            sql = `select id from playerdb where id = ('${id}')`;
            db.query(sql, function (err,rows) {
                if(err){
                    res.send("{\"status\":\"에러 발생, 관리자에게 문의\"}");
                }
                else{
                    if(rows[0].id == id){
                        res.send("{\"status_id\":\"* 중복된 아이디 입니다\", \"status\":\"문제가 발생했습니다 확인바랍니다\"}");
                    }
                }
            });
        }
    });
});

router.get('/registercheck_id', function (req, res) {
    const id = req.query.id;
    let sql = `select id from playerdb where id = ('${id}')`;
  
    db.query(sql, function (err, rows) {
        if(err){
            console.log("문제발생");
        }
        else if (!rows.length) {
            res.send("{\"status_id\":\"* 회원가입이 가능합니다\"}");
        } 
        else {
            res.send("{\"status_id\":\"* 중복된 아이디입니다\"}");
        }
    });
});
module.exports = router;