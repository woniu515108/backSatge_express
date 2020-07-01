/**
 * 图片上传配置及实例创建
 *  - 单张图片上传
 *  - 多张图片上传
 */

const multer = require("multer");

/**
 * @description: 图片设置项
 * @param {Number} num 图片上传数量限制
 * @Date Changed: 2020-07-01
 */
function options(num){
    return {
        limits: {
            //限制文件大小10kb
            fileSize: 100 * 1024,
            //限制文件数量
            files: num
        },
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                // 指定上传服务器文件目录
                cb(null, './uploads/images');

            },
            filename: function (req, file, cb) {

                // 获取源文件的后缀名
                let tempExt = (file.originalname).split(".");
                let ext = tempExt[tempExt.length - 1];

                let tempname = (new Date()).getTime() + parseInt(Math.random() * 9999);

                /**
                 * 给图片加上时间戳防止重名
                 * eg：abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
                 * */
                cb(null, `${tempname}.${ext}`);

            }
        }),
        fileFilter: function (req, file, cb) {
            // 限制文件上传类型，仅可上传png格式图片
            if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
                cb(null, true)
            } else {
                cb(null, false);
                cb(new Error('文件类型错误'));
            }
        }
    }
}




/**
 * @description: 生成multer实例
 * @param {object} singleOptions 单张图片设置项
 * @param {string} singleFile    指定上传文件的key
 * @Date Changed: 2020-06-30
 */
// let singleUpload = multer(singleOptions).single('singlePic');
let singleUpload = multer(options(1)).single('singlePic');

/**
 * @description: 生成multer实例
 * @param {object} fourManyOptions   多张图片设置项(4)
 * @param {string} showPic        指定上传文件的key
 * @Date Changed: 2020-06-30
 */
// let fourManyUpload = multer(fourManyOptions).array('showPic');
let fourManyUpload = multer(options(4)).array('showPic');

/**
 * @description: 生成multer实例
 * @param {object} fourManyOptions   单张图片设置项(12)
 * @param {string} detailsPic        指定上传文件的key
 * @Date Changed: 2020-06-30
 */
// let twelveManyUpload = multer(twelveManyOptions).array('detailsPic');
let twelveManyUpload = multer(options(12)).array('detailsPic');


module.exports = {
    singleUpload,
    fourManyUpload,
    twelveManyUpload
}