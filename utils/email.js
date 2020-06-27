"use strict";
const nodemailer = require("nodemailer");

/**
 * 创建发送邮件的请求对象
 *  - 邮箱有很多类型的，如qq、网易等，他们的端口号可以在node_moudles/nodemailer/lib/well-known/services.json中查找
 * */
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", // 发送方 邮箱类型
    port: 465, // 发送方 端口号
    secure: true, // 为true：则端口号为465, 为false：则端口号为其他
    auth: {
        user: "1668684752@qq.com", // 发送方的邮箱地址
        pass: "pozyzqgzjkuibfcj", // smtp验证码
    },
});




/**
 * @description: 封装email发送方法
 * @param {String} fromTip          接收方 收件提示
 * @param {String} fromTitle        接收方 收件标题
 * @param {String} emailAddress     接收方 邮箱地址 
 * @param {String} code             需要发送的 验证码 
 * @Date Changed: 2020-06-27
 */
function send(fromTip, fromTitle, emailAddress, code){
    // console.log( "send方法执行..." );
    // 创建邮件信息
    let mailInfo = {
        from: '"' + fromTip + '" <1668684752@qq.com>', // sender address
        to: emailAddress, // list of receivers
        subject: fromTitle, // Subject line
        // text: "您好！您的验证码为：6904，有效期五分钟", // plain text body
        html: "<b>您好！您的验证码为："+ code +"，有效期五分钟</b>", // html body
    }

    // 封装成promise进行回调处理
    return new Promise((resolve,reject)=>{
        /**
         * @description: 发送邮件(异步事件)
         * @param {object}  mailInfo 邮件信息
         * @param {func}    func     异步回调
         * @Date Changed: 2020-06-27
         */
        transporter.sendMail(mailInfo, (err, result) => {
            console.log(err);
            if(err){
                reject(err)
            }else{
                resolve()
            }
        });
    })

}

module.exports = {
    send
}