const express = require('express');
const emailRouter = express.Router();

// const pool = require('./../../../db/connent');
const Email = require('./../../../utils/email');

/**
 * @api {get} /common/email/getCode 获取邮箱验证码
 * @apiName 获取邮箱验证码
 * @apiGroup 邮箱
 *
 * @apiParam {String} emailAddress  邮箱
 *
 * @apiSuccess {String}  code   请求状态码200
 * @apiSuccess {String}  msg    响应信息
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          code: 200,
 *          msg: '验证码发送成功'
 *     }
 * 
 * @apiError 401 缺少邮箱.
 * @apiError 402 邮箱地址不正确.
 * @apiError 405 邮件发送失败(地址不正确|网络波动等)
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
        {
            code: 401,
            msg: '缺少邮箱'
        }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
        {
            "code": 402,
            "msg": "邮箱格式错误"
        }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
        {
            "code": 405,
            "msg": "发送失败！原因：Error: No recipients defined"
        }
 * 
 */
emailRouter.get('/getCode', (req, res) => {
    let {emailAddress} = req.query;

    if ( !emailAddress ){
        return res.send({
            code: 401,
            msg: '缺少邮箱'
        })
    }else if( !/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(emailAddress) ){
        return res.send({
            code: 402,
            msg: '邮箱格式错误'
        })
    }

    let fromTip   = '大话西游商城修改密码校验';
    let fromTitle = '大话西游商城修改密码校验码';
    let code      = parseInt(Math.random()*10000); // 随机验证码

    Email.send(fromTip, fromTitle, emailAddress, code)
        .then(()=>{
            return res.send({
                code: 200,
                msg: '验证码发送成功'
            })
        })
        .catch(err=>{
            return res.send({
                code: 405,
                msg: `发送失败！原因：${ err }`
            })
        });
})




module.exports = emailRouter;