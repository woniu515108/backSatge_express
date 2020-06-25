const express = require('express');

const userRouters = express.Router();

const pool = require('./../../../db/connent');


/**
 * @description: 【后台项目】测试api
 * @Date Changed: 2020-06-25
 */
userRouters.post('/ceshi', (req, res) => {
    res.send("前台 用户模块 测试接口--------");
});


/**
 * @description: 【后台项目】测试api
 * @Date Changed: 2020-06-25
 */
userRouters.post('/register', (req, res) => {
    let { username , password } = req.body;

    console.log( username + ' | ' + password );
    if( !username ){
        return res.send({
            code: 400,
            msg: '缺少用户名',
            data: {}
        })
    } else if (!password) {
        return res.send({
            code: 400,
            msg: '缺少密码',
            data: {}
        })
    }else{

        pool.query("SELECT * FROM userInfo WHERE username = ?", [username], (err, result) => {
            if (err) {
                return res.send({
                    code: 400,
                    msg: `内部错误！原因：${err}`
                })
            };

            if (result.length === 0 ) {

                pool.query('INSERT INTO userInfo SET ?', [{username, password}], (err, result) => {
                    if (err) {
                        return res.send({
                            code: 400,
                            msg: `注册失败！原因：${err}`
                        })
                    };


                    res.send({
                        code: 200,
                        msg: '注册成功!'
                    });

                });
            }else{
                return res.send({
                    code: 400,
                    msg: `注册失败,用户名已存在！`
                })
            }


        })


        
    }

});






module.exports = userRouters;