const express = require('express');

const productRouters = express.Router();

// const pool = require('./../../../db/connent');

const productPool = require('./../../../db/backstageProject/product_pool');


/**
 * @api {get} /backstage/product/getFirstClass 获取商品一级分类
 * @apiName 获取商品一级分类
 * @apiGroup 商品模块 
 *
 * @apiSuccess {Number}     code                   请求状态码200
 * @apiSuccess {String}     msg                    响应信息
 * @apiSuccess {String}     data                   响应数据
 * @apiSuccess {String[]}   data.list                  一级分类
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "code": "200",
 *           "msg": "查询成功",
 *           "data": {
 *               "list": [{
 *                       "fid": 100,
 *                       "typeName": "服装配饰",
 *                       "label": null
 *                   },
 *                   {
 *                       "fid": 200,
 *                       "typeName": "家居用品",
 *                       "label": null
 *                   },
 *                   {
 *                       "fid": 300,
 *                       "typeName": "珠宝首饰",
 *                       "label": null
 *                   },
 *                   {
 *                       "fid": 400,
 *                       "typeName": "户外出行",
 *                       "label": null
 *                   },
 *                   {
 *                       "fid": 500,
 *                       "typeName": "数码外设",
 *                       "label": null
 *                   },
 *                   {
 *                       "fid": 600,
 *                       "typeName": "玩具礼品",
 *                       "label": null
 *                   }
 *               ]
 *           }
 *       }
 * 
 * 
 * @apiError 405 后台服务内部错误.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "code": "405",
 *          "msg": "内部错误！原因：Error: ER_NO_SUCH_TABLE: Table 'dahuamall.productdetail' doesn't exist"
 *      }
 */
productRouters.get("/getFirstClass",(req,res)=>{

    productPool.inquireFirstClass()
        .then(data=>{
            res.send({
                code: "200",
                msg: "查询成功",
                data:{
                    list: data
                }
            })

        })
        .catch(err=>{
            res.send({
                code: "405",
                msg: `内部错误！原因：${err}`
            })
        })
})



/**
 * @api {get} /backstage/product/getSecondClass 获取商品二级分类
 * @apiName 获取商品二级分类
 * @apiGroup 商品模块 
 *
 * @apiParam {string}   fid         一级分类id
 * @apiParam {string}   typeName    一级分类名称
 * 
 * @apiSuccess {Number}     code                   请求状态码200
 * @apiSuccess {String}     msg                    响应信息
 * @apiSuccess {String}     data                   响应数据
 * @apiSuccess {String[]}   data.list                  二级分类
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "code": "200",
 *           "msg": "查询成功",
 *           "data": {
 *               "list": [{
 *                       "sid": 101,
 *                       "fid": 100,
 *                       "fistTypeName": "服装配饰",
 *                       "typeName": "男装",
 *                       "label": null
 *                   },
 *                   {
 *                       "sid": 102,
 *                       "fid": 100,
 *                       "fistTypeName": "服装配饰",
 *                       "typeName": "女装",
 *                       "label": null
 *                   },
 *                   {
 *                       "sid": 103,
 *                       "fid": 100,
 *                       "fistTypeName": "服装配饰",
 *                       "typeName": "童装",
 *                       "label": null
 *                   },
 *                   {
 *                       "sid": 104,
 *                       "fid": 100,
 *                       "fistTypeName": "服装配饰",
 *                       "typeName": "内衣配饰",
 *                       "label": null
 *                  }
 *               ]
 *           }
 *       }
 * 
 * 
 * @apiError 405 后台服务内部错误.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "code": "405",
 *          "msg": "内部错误！原因：Error: ER_NO_SUCH_TABLE: Table 'dahuamall.productdetail' doesn't exist"
 *      }
 */
productRouters.get("/getSecondClass", (req, res) => {
    let {fid,typeName} = req.query;

    if(!fid){
        return res.send({
            code: "401",
            msg: "参数缺失：一级商品分类编号  fid"
        })
    }

    if (!typeName) {
        return res.send({
            code: "401",
            msg: "参数缺失：一级商品分类名称  typeName"
        })
    }

    productPool.inquireSecondClass(fid, typeName)
        .then(data => {
            res.send({
                code: "200",
                msg: "查询成功",
                data: {
                    list: data
                }
            })

        })
        .catch(err => {
            res.send({
                code: "405",
                msg: `内部错误！原因：${err}`
            })
        })
})




/**
 * @api {get} /backstage/product/getList 获取商品列表
 * @apiName 获取商品列表
 * @apiGroup 商品模块
 * 
 * @apiParam {Object} pid                    商品id(根据ip筛选数据，不支持模糊查询)
 * @apiParam {Object} tableState             页码相关数据(不传则返回数据不带页码)
 * @apiParam {Number} tableState.currentPage   当前页
 * @apiParam {Number} tableState.pageSize      当前页显示条数
 * 
 *
 * @apiSuccess {Number}  code                   请求状态码200|400
 * @apiSuccess {String}  msg                    响应信息
 * @apiSuccess {String}  data                   响应数据
 * @apiSuccess {String}  data.currentPage           当前页数
 * @apiSuccess {String}  data.pageSize              当前页显示数量
 * @apiSuccess {String}  data.total                 数据总条数
 * @apiSuccess {String}  data.list                  数据列表
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "code": 200,
 *          "msg": "查询成功",
 *          "data": {
 *              "currentPage": "1",
 *              "pageSize": "10",
 *              "size": 8,
 *              "list": [{
 *                  "pid": "5c8f5fa1-c085-4e9c-99c4-c4fbaffd2dd9",
 *                  "fid": 100,
 *                  "fistTypeName": "服装配饰",
 *                  "sid": 101,
 *                  "secondTypeName": "男装",
 *                  "name": "大话西游2长袖卫衣-几率-03",
 *                  "subtitle": "很好很好！非常好",
 *                  "description": "大话玩家专属文化222222222",
 *                  "price": "169.00",
 *                  "specification": "[\"M\"]",
 *                  "stock": 100,
 *                  "label": "",
 *                  "smallPic": "[\"https://g.fp.ps.netease.com/gift/file/5a1ba75a7f9d2a0cbdb62fc9iPBKVFqK\"]",
 *                  "proImgUrl": "[\"https://g.fp.ps.netease.com/gift/file/5a1ba75a7f9d2a0cbdb62fc9iPBKVFqK\",\"https://g.fp.ps.netease.c",
 *                  "isOnline": 0,
 *                  "proDetilsImg": "[\"https://g.fp.ps.netease.com/gift/file/5a1ba774a7f25264ec3918c4iir0O12C\"]",
 *                  "creatTime": "1593396777431",
 *                  "updateTime": null
 *              }]
 *          }
 *      }
 * 
 * 
 * @apiError 405 后台服务内部错误.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "code": "405",
 *          "msg": "登陆失败！原因：Error: ER_NO_SUCH_TABLE: Table 'dahuamall.productdetail' doesn't exist"
 *      }
 */
productRouters.get('/getList', (req, res) => {
    console.log( "获取商品列表接收参数>>",req.query );
    let { tableState, pid } = req.query;


    
    if (tableState) { 
        
        /**
         * @description: 存在页码格式，返回带页码格式的数据
         * @ - 将接收到的字符串josn页码转为json
         * @ - 调用查询无页码函数进行total数据计算
         * @ - 回调带页码格式的数据查询函数进行数据返回
         * @Date Changed: 
         */        

        tableState = JSON.parse(tableState);

        let total;

        productPool.getProductList()
            .then(data=>{
                total = data.length;

                return productPool.getProductList(tableState, pid);
            })
            .then(data=>{

                res.send({
                    code: 200,
                    msg: '查询成功',
                    data: {
                        currentPage: tableState.currentPage, // 当前页数
                        pageSize: tableState.pageSize,       // 当前页显示数量
                        total: total,                        // 总页数
                        list: data
                    }
                }) 

            })
            .catch(err=>{
                res.send({
                    code: '405',
                    msg: `查询失败！原因：${err}`
                })    
            })

    }else{
        /**
         * @description: 不存在页码 返回不带页码格式的数据
         */
        productPool.getProductList(null,pid)
            .then(data=>{
                res.send({
                    code: 200,
                    msg: '查询成功',
                    data: {
                        list: data
                    }    
                })
            })
            .catch(err=>{
                res.send({
                    code: '405',
                    msg: `查询失败！原因：${err}`
                })
            })
    }

    // console.log( tableState.currentPage )
    // console.log( tableState.pageSize )


    // productPool.getProductList(tableState)
    //     .then(data=>{
            
    //         // console.log( data );
    //         // if (tableState) { // 存在页码
                
    //         //     res.send({
    //         //         code: 200,
    //         //         msg: '查询成功',
    //         //         data: {
    //         //             currentPage: tableState.currentPage, // 当前页数
    //         //             pageSize: tableState.pageSize,       // 当前页显示数量
    //         //             list: data
    //         //         }
    //         //     })                

    //         // }else{

    //         // }
    //     })
    //     .catch(err=>{
    //         console.log( err );
    //     });




    // let currentPage = req.query.currentPage || 1;
    // let pageSize = req.query.pageSize || 2;

    // let start = Number((currentPage - 1) * pageSize);
    // let end = Number(pageSize);

    // pool.query('SELECT * FROM productdetails LIMIT ?,?', [start, end], (err, result) => {
    //     if(err){
    //         return res.send({
    //             code: '405',
    //             msg: `查询失败！原因：${err}`
    //         })
    //     }
    //     console.log( "查询商品数据返回结果>>>>",result );
    //     res.send({
    //         code: 200,
    //         msg: '查询成功',
    //         data: {
    //             currentPage,            // 当前页数
    //             pageSize,               // 当前页显示数量
    //             size: result.length,    // 当前页数据数量
    //             list: result
    //         }
    //     })

    // });
    
});



/**
 * @api {get} /backstage/product/checkName 商品重名校验
 * @apiName 商品重名校验
 * @apiGroup 商品模块
 * 
 * @apiParam {String}   name   商品名称  【必填】
 * 
 */
productRouters.get('/checkName', (req, res) => {
    let {name} = req.query;

    if(!name){
        return res.send({
            code: "401",
            msg: "参数缺失：name 商品名称"
        })
    }

    productPool.isProductNameExistByName(name)
        .then(data=>{
            if (data.length > 0) {
                res.send({
                    "code": "402",
                    "msg": "当前商品名称已占用！"
                });
            }else{
                res.send({
                    "code": "200",
                    "msg": "当前商品名称可用！"
                })
            }
        })
        .catch(err=>{
            res.send({
                "code": "405",
                "msg": `内部错误！原因：${err}`
            });
        })
    

});



/**
 * @api {post} /backstage/product/add 添加商品
 * @apiName 添加商品
 * @apiGroup 商品模块
 * 
 * @apiParam {String}   fid               一级商品分类编号  【必填】
 * @apiParam {String}   fistTypeName      一级商品分类名称  【必填】
 * @apiParam {String}   sid               二级商品分类编号  【必填】
 * @apiParam {String}   secondTypeName    二级商品分类名称  【必填】
 * @apiParam {String}   name              商品名称          【必填】
 * @apiParam {String}   subtitle          商品副标题        【必填】
 * @apiParam {String}   description       商品描述          【必填】
 * @apiParam {String}   price             商品价格          【必填】
 * @apiParam {String}   specification     商品规格          【必填】
 * @apiParam {String}   stock             商品库存          【必填】
 * @apiParam {String[]} label             商品标签          【不必填】
 * @apiParam {String[]} smallPic          商品缩略图        【必填】
 * @apiParam {String[]} proImgUrl         商品展示图        【必填】
 * @apiParam {Boolean}  isOnline          是否上架          【必填】
 * @apiParam {String[]} proDetilsImg      商品详情图        【必填】
 * @apiParamExample {json} Request-Example:
 *  {
 *      fid: "100",
 *      fistTypeName: "服装配饰",
 *      sid: "101",
 *      secondTypeName: "男装",
 *      name: "大话西游2长袖卫衣 - 几率 - 03"
 *      subtitle: "很好很好！ 非常好"
 *      description: "大话玩家专属文化222222222"
 *      price: "169.00"
 *      specification: '["M"]'
 *      stock: "100"
 *      smallPic: '["https://g.fp.ps.netease.com/gift/file/5a1ba75a7f9d2a0cbdb62fc9iPBKVFqK"]'
 *      proImgUrl: '["https://g.fp.ps.netease.com/gift/file/5a1ba75a7f9d2a0cbdb62fc9iPBKVFqK", "https://g.fp.ps.netease.com/gift/file/5a1ba75c8b74276eebe5c43ajEA2LJsu", "https://g.fp.ps.netease.com/gift/file/5a1ba7615e6027abdf29687eFqM1oXap", "https://g.fp.ps.netease.com/gift/file/5a1ba764143cfa4ec4b7f1c2tZabfF0r"]'
 *      isOnline: 0
 *      proDetilsImg: '["https://g.fp.ps.netease.com/gift/file/5a1ba774a7f25264ec3918c4iir0O12C"]'
 *  }
 *
 * @apiSuccess {Number}  code       请求状态码200|400
 * @apiSuccess {String}  msg        响应信息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          code: "200",
 *          msg: "商品添加成功！"
 *      }
 * 
 * 
 * @apiError 401 缺少参数.
 * @apiError 402 参数值错误.
 * @apiError 405 后台服务内部错误.
 * @apiError 406 数据参数对照错误.
 * @apiError 407 商品重名.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "code": "401",
 *          "msg": "缺少参数：一级商品分类编号"
 *      }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "code": "402",
 *          "msg": "值错误：库存最小为1，最大为999"
 *      }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "code": "405",
 *          "msg": "内部错误！原因：Error: ER_NO_SUCH_TABLE: Table 'dahuamall.productdetail' doesn't exist"
 *      }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "code": "406",
 *          "msg": "数据异常：当前一级分类不存在！原因：一级分类id或一级分类名称错误！"
 *      }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "code": "407",
 *          "msg": "当前商品名称已存在！"
 *      }
 */
productRouters.post('/add', (req, res) => {

    let {
        fid,            // 一级商品分类编号 【必填】    string
        fistTypeName,   // 一级商品分类名称 【必填】    string
        sid,            // 二级商品分类编号 【必填】    string
        secondTypeName, // 二级商品分类名称 【必填】    string
        name,           // 商品名称         【必填】    string
        subtitle,       // 商品副标题       【必填】    string
        description,    // 商品描述         【必填】    string
        price,          // 商品价格         【必填】    string
        specification,  // 商品规格         【必填】    arr         ["M","L","XL","XXL"]
        stock,          // 商品库存         【必填】    number      
        label,          // 商品标签         【不必填】  arr         ["包邮","促销"]                                 length 4
        smallPic,       // 商品缩略图       【必填】    arr         ["图片路径"]                                   length 1
        proImgUrl,      // 商品展示图       【必填】    arr         ["图片路径1","图片路径2","图片路径3","图片路径4"] length 4
        isOnline,       // 是否上架         【必填】    Boolean     下架：0  上架1
        proDetilsImg,   // 商品详情图       【不必填】  arr         ["图片路径1", "图片路径2", ...]                  length 10
    } = req.body;

    // 参数存在判断
    if (!fid) {
        return res.send({
            code: '401',
            msg: '缺少参数：一级商品分类编号'
        })
    } else if (!fistTypeName) {
        return res.send({
            code: '401',
            msg: '缺少参数：一级商品分类类名'
        })
    } else if (!sid) {
        return res.send({
            code: '401',
            msg: '缺少参数：二级商品分类编号'
        })
    } else if (!secondTypeName) {
        return res.send({
            code: '401',
            msg: '缺少参数：二级商品分类类名'
        })
    } else if (!name) {
        return res.send({
            code: '401',
            msg: '缺少参数：商品名称'
        })
    } else if (!subtitle) {
        return res.send({
            code: '401',
            msg: '缺少参数：商品副标题'
        })
    } else if (!description) {
        return res.send({
            code: '401',
            msg: '缺少参数：商品描述'
        })
    } else if (!price) {
        return res.send({
            code: '401',
            msg: '缺少参数：商品价格'
        })
    } else if (!specification) {
        return res.send({
            code: '401',
            msg: '缺少参数：商品规格'
        })
    }else if (!stock) {
        return res.send({
            code: '401',
            msg: '缺少参数：商品库存'
        })
    } else if (!smallPic) {
        return res.send({
            code: '401',
            msg: '缺少参数：商品缩略图'
        })
    } else if (!proImgUrl) {
        return res.send({
            code: '401',
            msg: '缺少参数：商品展示图'
        })
    } else if (!isOnline) {
        return res.send({
            code: '401',
            msg: '缺少参数：是否上架参数'
        })
    } else if (!proDetilsImg) {
        return res.send({
            code: '401',
            msg: '缺少参数：商品详情图'
        })
    }

    // 【库存】值判断
    if ( stock > 999 || stock < 1 ) {
        return res.send({
            code: '402',
            msg: '值错误：库存最小为1，最大为999'
        })
    }

    // 【上架】值类型判断
    if (isOnline != "0" && isOnline != "1") {
        return res.send({
            code: '402',
            msg: '值错误：上架值应该为boolean值。0代表未上架，1代表上架'
        })
    }

    // 规格参数类型判断
    let specificationArr = JSON.parse(specification);
    if (specificationArr.__proto__.constructor == Array && specificationArr.length<1) {
        return res.send({
            code: '402',
            msg: '值缺失：规格参数至少为1份'
        })
    }

    // 缩略图值类型判断
    let smallPicArr = JSON.parse(smallPic);
    if (smallPicArr.__proto__.constructor == Array && smallPicArr.length !== 1) {
        return res.send({
            code: '402',
            msg: '值错误：缩略商品图最大最小为1张'
        })
    }

    // 展示图值类型判断
    let proImgUrlArr = JSON.parse(proImgUrl);
    if (proImgUrlArr.__proto__.constructor == Array && (proImgUrlArr.length < 1 || proImgUrlArr.length > 4)) {
        return res.send({
            code: '402',
            msg: '值错误：展示商品图最小为1张,最大为4张'
        })
    }

    // 详情图值类型判断
    let proDetilsImgArr = JSON.parse(proDetilsImg);
    if (proDetilsImgArr.__proto__.constructor == Array && (proDetilsImgArr.length < 1 || proDetilsImgArr.length > 12)) {
        return res.send({
            code: '402',
            msg: '值错误：详情商品图最小为1张,最大12张'
        })
    }


    productPool.isFirstClassExist(fid, fistTypeName)
        .then(data=>{               // 一级分类校验
            if( data.length > 0 ){
                return productPool.isSecondClassExist(sid, secondTypeName);
            }else{
                res.send({
                    "code": "406",
                    "msg": "数据异常：当前一级分类不存在！原因：一级分类id或一级分类名称错误！"
                });
            }
            
        })
        .then(data=>{               // 二级分类校验
            if (data.length > 0) {
                return productPool.isProductNameExistByName(name);

            } else {
                res.send({
                    "code": "406",
                    "msg": "数据异常：当前二级分类不存在！原因：二级分类id或二级分类名称错误！"
                });
            }
        })
        .then(data=>{               // 商品名称重名校验
            if (data.length == 0) {
                return productPool.addProduct(fid, fistTypeName, sid, secondTypeName, name, subtitle, description, price, specification, stock, label, smallPic, proImgUrl, isOnline, proDetilsImg);
                

            } else {
                res.send({
                    "code": "407",
                    "msg": "当前商品名称已存在！"
                });
            }
        })
        .then(data=>{
            res.send({
                code: "200",
                msg: "商品添加成功！"
            })
        })
        .catch(err=>{
            res.send({
                "code": "405",
                "msg": `内部错误！原因：${err}`
            });
        })

    

});


/**
 * @api {get} /backstage/product/delete 删除商品
 * @apiName 删除商品
 * @apiGroup 商品模块
 * 
 * @apiParam {String}   pid      商品id  【必填】
 */
productRouters.get('/delete', (req, res) => {
    let {pid} = req.query;

    if( !pid ){
        return res.send({
            code: "401",
            msg: "缺少参数：商品pid"
        })
    }


    productPool.isProductNameExistById(pid)
        .then(data=>{                   // 判断是否存在
            if(data.length>0){
                return productPool.delProduct(pid);
            }else{
                res.send({
                    code: "403",
                    msg: `当前商品不存在！`
                })
            }
        })
        .then(data=>{       // 删除
            if( data.affectedRows > 0 ){
                res.send({
                    code: "200",
                    msg: '商品删除成功！'
                })
            }
        })
        .catch(err=>{
            res.send({
                code: "405",
                msg: `内部错误！原因：${err}`
            })
        })
    



});








module.exports = productRouters;