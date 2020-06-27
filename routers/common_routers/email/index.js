const express = require('express');
const emailRouter = express.Router();

// const pool = require('./../../../db/connent');
const Email = require('./../../../utils/email');

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
 *       "msg": "公共接口：----功能 获取邮箱code"
 *     }
 */
emailRouter.get('/getCode', (req, res) => {
    let {emailAddress} = req.query;

    if ( !emailAddress ){
        return res.send({
            code: 401,
            msg: '缺少邮箱地址'
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