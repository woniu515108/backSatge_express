"use strict";
const nodemailer = require("nodemailer");

/**
 * 创建发送邮件的请求对象
 *  - 邮箱有很多类型的，如qq、网易等，他们的端口号可以在node_moudles/nodemailer/lib/well-known/services.json中查找
 * */ 
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", // 发送方 邮箱类型
    port: 465,                   // 发送方 端口号
    secure: true,                // 为true：则端口号为465, 为false：则端口号为其他
    auth: {
        user: "1668684752@qq.com", // 发送方的邮箱地址
        pass: "pozyzqgzjkuibfcj", // smtp验证码
    },
});

// 创建邮件信息
let mailInfo = {
    from: '"Fred Foo 👻" <1668684752@qq.com>', // sender address
    to: "1668684752@qq.com", // list of receivers
    subject: "大话周边商城验证码", // Subject line
    // text: "您好！您的验证码为：6904，有效期五分钟", // plain text body
    html: "<b>Hello world?</b>", // html body
}

// 发送邮件
transporter.sendMail(mailInfo,(err,result)=>{
    console.log( err );
    console.log( result );
});

