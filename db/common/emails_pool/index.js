const pool = require('./../../connent');

/**
 * @description: 存储邮箱发送的code及其的标识码
 * @param {string} idCode       标识码  唯一与code对应
 * @param {string} code         校验码  用户发送邮件后获得的校验码
 * @param {string} createTime   当前记录生成的时间
 * @return: Promise
 * @Date Changed: 2020-07-01
 */
function insertEmailCheck(idCode,code,createTime){
    return new Promise((resolve,reject)=>{
        pool.query("INSERT INTO emailcheckcode value (null,?,?,?);", [idCode, code, createTime],(err,result)=>{
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    })
} 


module.exports = {
    insertEmailCheck
}