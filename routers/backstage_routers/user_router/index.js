const express = require('express');

const userRouters = express.Router();

const pool = require('./../../../db/connent');

/**
 * @description: 【后台项目】测试api
 * @Date Changed: 2020-06-25
 */
userRouters.get('/ceshi', (req, res) => {
    res.send({
        code: 200,
        msg: "后台接口：----用户模块测试 ok"
    });
})

/**
 * @description: 【后台项目】登陆
 * @Date Changed: 2020-06-25
 */
userRouters.post('/login', (req, res) => {
    const {username,password} = req.body;

    if(!username){
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
        pool.query("SELECT * FROM administrator WHERE username = ? AND password = ?", [username,password], (err, result) => {
            if (err) {
                return res.send({
                    code: 400,
                    msg: `登陆失败！原因：${err}`
                })
            };

            if (result.length) {
                res.send({
                    code: 200,
                    msg: '登陆成功!'
                });
            }else{
                console.log( result );
                res.send({
                    code: 400,
                    msg: "用户名或密码错误!"
                })
            }
            

        })
    }

    // res.send("用户模块 测试接口--------");
})






module.exports = userRouters;