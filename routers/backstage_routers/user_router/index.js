const express = require('express');

const userRouters = express.Router();

const pool = require('./../../../db/connent');


/**
 * @api {post} /backstage/user/login 登陆
 * @apiName 登陆接口
 * @apiGroup 用户模块
 * 
 * @apiParam {String} username  用户名
 * @apiParam {String} password  登陆密码
 *
 *
 * @apiSuccess {Number}  code       请求状态码200|400
 * @apiSuccess {String}  msg        响应信息
 * @apiSuccess {String}  data       用户信息
 * @apiSuccess {String}  data.aid          唯一编号
 * @apiSuccess {String}  data.username     账号
 * @apiSuccess {String}  data.nickName     昵称
 * @apiSuccess {String}  data.Avatar       头像url地址
 * @apiSuccess {String}  data.email        email地址
 * @apiSuccess {String}  data.phone        电话号码
 * @apiSuccess {String}  data.cTime        用户创建时间【毫秒级时间戳】
 * @apiSuccess {String}  data.uTime        用户信息更新时间【毫秒级时间戳】
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "code": 200,
 *          "msg": "登陆成功!",
 *          "data": {
 *              "aid": 1,
 *              "username": "admin",
 *              "nickName": "yumi",
 *              "sex": 0,
 *              "Avatar": "http://img4.imgtn.bdimg.com/it/u=2573110154,1217222222&fm=26&gp=0.jpg",
 *              "email": "838667990@qq.com",
 *              "phone": "1569335687",
 *              "cTime": "1593229848074",
 *              "uTime": "null"
 *          }
 *      }
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

                const data = result[0];
                delete data['password'];

                res.send({
                    code: 200,
                    msg: '登陆成功!',
                    data: data
                });
            }else{
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