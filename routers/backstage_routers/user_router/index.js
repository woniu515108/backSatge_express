const express = require('express');

const userRouters = express.Router();

const pool = require('./../../../db/connent');

/**
 * @api {get} /backstage/user/ceshi 后台测试接口
 * @apiName 测试api
 * @apiGroup 测试
 *
 * @apiSuccess {Number}  code   请求状态码200|400
 * @apiSuccess {String}  msg    响应信息
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "msg": "后台接口：----用户模块测试 ok"
 *     }
 */
userRouters.get('/ceshi', (req, res) => {
    res.send({
        code: 200,
        msg: "后台接口：----用户模块测试 ok"
    });
})

/**
 * @api {post} /backstage/user/login 登陆
 * @apiName 登陆接口
 * @apiGroup 用户模块
 * 
 * @apiParam {String} username  用户名
 * @apiParam {String} password  登陆密码
 *
 *
 * @apiSuccess {Number}  code   请求状态码200|400
 * @apiSuccess {String}  msg    响应信息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "msg": "登陆成功!"
 *     }
 * 
 * 
 * @apiError 401 缺少用户名.
 * @apiError 402 缺少密码.
 * @apiError 403 用户名或密码错误.
 * @apiError 405 后台服务内部错误.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          code: 401,
 *          msg: '缺少用户名'
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          code: 402,
 *          msg: '缺少密码'
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          code: 403,
 *          msg: '用户名或密码错误'
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          code: 405,
 *          msg: '后台服务内部错误'
 *     }
 */
userRouters.post('/login', (req, res) => {
    const {username,password} = req.body;

    if(!username){
        return res.send({
            code: 401,
            msg: '缺少用户名'
        })
    } else if (!password) {
        return res.send({
            code: 402,
            msg: '缺少密码'
        })
    }else{
        pool.query("SELECT * FROM administrator WHERE username = ? AND password = ?", [username,password], (err, result) => {
            if (err) {
                return res.send({
                    code: 405,
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
                    code: 403,
                    msg: "用户名或密码错误!"
                })
            }
            

        })
    }

    // res.send("用户模块 测试接口--------");
})






module.exports = userRouters;