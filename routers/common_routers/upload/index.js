const express = require('express');
const uploadRouter = express.Router();

const upload = require('./../../../utils/upload');

/**
 * @api {post} /common/upload/singlePic 上传单张图片
 * @apiName 上传单张图片
 * @apiGroup 上传
 * 
 * @apiHeaderExample {json}
 *   Request: {
 *       "Content-type": "multipart/form-data;"
 *   }
 * 
 * @apiDescription 
 *      1.上传文件字段名必须按照指定数据传输格式设置。
 *      2.上传文件字段名必须按照指定key进行定义
 *
 * @apiParam {String} singlePic  上传的文件字段名
 *
 * @apiSuccess {String}  code   请求状态码200
 * @apiSuccess {String}  msg    响应信息
 * @apiSuccess {String}  data   响应数据
 * @apiSuccess {String}  data.imgUrl   上传的当前图片的图片地址
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *           {
 *               code: "200",
 *               msg: "上传成功！",
 *               data: {
 *                   imgUrl: imgUrl
 *               }
 *           }
 * 
 */
uploadRouter.post('/singlePic', (req, res) => {

    upload.singleUpload(req, res, (err) => {
        if (err) {
            
            /**
             * 根据错误码返回相关错误信息
             * 
             */ 
            if (err.field != 'singlePic') {
                return res.send({
                    code: "405",
                    msg: `上传失败！原因：上传图片key错误，请使用 singlePic 作为key使用。目前使用 ${err.field} `
                })
            } else if (err.code == 'LIMIT_FILE_SIZE') {
                return res.send({
                    code: "407",
                    msg: `上传失败！原因：图片尺寸过大！图片大小限制：100KB`
                })
            }else{
                return res.send({
                    code: "407",
                    msg: `上传失败！原因：${err}`
                })
            }
            
        }

        if ( req.file ) {
            let imgUrl = `/public/images/${req.file.filename}`;
            res.send({
                code: "200",
                msg: "上传成功！",
                data: {
                    imgUrl: imgUrl
                }
            })
        }else{
            res.send({
                code: "406",
                msg: "请上传图片资源！"
            })
        }



        

        
    });

});


/**
 * @api {post} /common/upload/showPic 上传多张图片(最多4张)
 * @apiName 上传多张图片(<4)
 * @apiGroup 上传
 * 
 * @apiHeaderExample {json}
 *   Request: {
 *       "Content-type": "multipart/form-data;"
 *   }
 * 
 * @apiDescription 
 *      1.上传文件字段名必须按照指定数据传输格式设置。
 *      2.上传文件字段名必须按照指定key进行定义
 *
 * @apiParam {String} showPic  上传的文件字段名
 *
 * @apiSuccess {String}  code   请求状态码200
 * @apiSuccess {String}  msg    响应信息
 * @apiSuccess {String}  data   响应数据
 * @apiSuccess {String}  data.imgUrls   上传的当前图片的图片地址
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *           {
 *               code: "200",
 *               msg: "上传成功！",
 *               data: {
 *                  imgUrls: [
 *                      "/public/images/1593596701076.jpg",
 *                      "/public/images/1593596703887.jpg",
 *                      "/public/images/1593596706313.jpg"
 *                  ]
 *               }
 *           }
 * 
 */
uploadRouter.post('/showPic', (req, res) => {

    upload.fourManyUpload(req, res, (err) => {

        if (err) {
            if (err.field != 'showPic') {
                return res.send({
                    code: "405",
                    msg: `上传失败！原因：上传图片key错误，请使用 showPic 作为key使用。目前使用 ${err.field} `
                })
            } else if (err.code == 'LIMIT_FILE_SIZE') {
                return res.send({
                    code: "401",
                    msg: `上传失败！原因：图片尺寸过大！图片大小限制：100KB`
                })
            } else if (err.code == 'LIMIT_FILE_COUNT') {
                return res.send({
                    code: "402",
                    msg: `上传失败！原因：上传数量超过限制！图片上传数量限制：2`
                })
            } else {
                return res.send({
                    code: "403",
                    msg: `上传失败！原因：${err}`
                })
            }
        }

        console.log( req.files );

        if( req.files.length > 0 ){          
            let imgUrls = req.files.map(org => `/public/images/${org.filename}`);

            res.send({
                code: "200",
                msg: "上传成功！",
                data: {
                    imgUrls
                }
            })

        }else{
            res.send({
                code: "406",
                msg: "请上传图片资源！"
            })

        }
    });

});


/**
 * @api {post} /common/upload/detailsPic 上传多张图片(最多12张)
 * @apiName 上传多张图片(<12)
 * @apiGroup 上传
 * 
 * @apiHeaderExample {json}
 *   Request: {
 *       "Content-type": "multipart/form-data;"
 *   }
 * 
 * @apiDescription 
 *      1.上传文件字段名必须按照指定数据传输格式设置。
 *      2.上传文件字段名必须按照指定key进行定义
 *
 * @apiParam {String} detailsPic  上传的文件字段名
 *
 * @apiSuccess {String}  code   请求状态码200
 * @apiSuccess {String}  msg    响应信息
 * @apiSuccess {String}  data   响应数据
 * @apiSuccess {String}  data.imgUrls   上传的当前图片的图片地址
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *           {
 *               code: "200",
 *               msg: "上传成功！",
 *               data: {
 *                  imgUrls: [
 *                      "/public/images/1593596701076.jpg",
 *                      "/public/images/1593596703887.jpg",
 *                      "/public/images/1593596706313.jpg"
 *                  ]
 *               }
 *           }
 * 
 */
uploadRouter.post('/detailsPic', (req, res) => {

    upload.twelveManyUpload(req, res, (err) => {

        if (err) {
            if (err.field != 'detailsPic') {
                return res.send({
                    code: "405",
                    msg: `上传失败！原因：上传图片key错误，请使用 detailsPic 作为key使用。目前使用 ${err.field} `
                })
            } else if (err.code == 'LIMIT_FILE_SIZE') {
                return res.send({
                    code: "401",
                    msg: `上传失败！原因：图片尺寸过大！图片大小限制：100KB`
                })
            } else if (err.code == 'LIMIT_FILE_COUNT') {
                return res.send({
                    code: "402",
                    msg: `上传失败！原因：上传数量超过限制！图片上传数量限制：2`
                })
            } else {
                return res.send({
                    code: "403",
                    msg: `上传失败！原因：${err}`
                })
            }
        }

        if (req.files.length > 0) {
            let imgUrls = req.files.map(org => `/public/images/${org.filename}`);

            res.send({
                code: "200",
                msg: "上传成功！",
                data: {
                    imgUrls
                }
            })



        } else {
            res.send({
                code: "406",
                msg: "请上传图片资源！"
            })

        }
    });

});



module.exports = uploadRouter;
