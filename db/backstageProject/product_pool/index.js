const uuid = require('node-uuid');
const pool = require('./../../connent');

/**
 * @description: 查询当前一级分类是否存在
 * @param {string} fid          一级分类id 
 * @param {string} fistTypeName 一级分类名称
 * @return: Promise
 * @Date Changed: 2020-06-29
 */
function isFirstClassExist(fid, fistTypeName) {

    return new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM firstclassification WHERE fid = ? AND typeName = ?", [fid, fistTypeName], (err, result) => {
            if(err){
                reject(err)
            }else{
                resolve(result);
            }  
        })
    })
}

/**
 * @description: 查询商品一级分类
 * @return: Promise
 * @Date Changed: 2020-06-29
 */
function inquireFirstClass() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM firstclassification",(err,result) => {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
}

/**
 * @description: 查询当前二级分类是否存在
 * @param {string} fid          二级分类id 
 * @param {string} fistTypeName 二级分类名称
 * @return: Promise
 * @Date Changed: 2020-06-29
 */
function isSecondClassExist(sid, secondTypeName) {

    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM secondclassification WHERE sid = ? AND typeName = ?", [sid, secondTypeName], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

/**
 * @description: 查询商品二级分类
 * @param {string} fid          一级商品分类id
 * @param {string} fTypeName    一级商品分类名称
 * @return: Promise
 * @Date Changed: 2020-06-29
 */
function inquireSecondClass(fid, fTypeName) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM secondclassification WHERE fid = ? AND fistTypeName = ?", [fid, fTypeName], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

/**
 * @description: 查询当前商品名称是否存在(通过商品名称)
 * @param {string} productName          商品名称
 * @return: Promise
 * @Date Changed: 2020-06-29
 */
function isProductNameExistByName(productName) {

    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM productdetails WHERE name = ?", [productName], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
    })
}

/**
 * @description: 查询当前商品名称是否存在(通过商品id)
 * @param {string} pid          商品id
 * @return: Promise
 * @Date Changed: 2020-06-29
 */
function isProductNameExistById(pid) {

    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM productdetails WHERE pid = ?", [pid], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
    })
}

/**
 * @description: 添加商品
 * @param {string} fid              一级商品分类编号 
 * @param {string} fistTypeName     一级商品分类名称 
 * @param {string} sid              二级商品分类编号 
 * @param {string} secondTypeName   二级商品分类名称 
 * @param {string} name             商品名称 
 * @param {string} subtitle         商品副标题 
 * @param {string} description      商品描述 
 * @param {string} price            商品价格 
 * @param {string} specification    商品规格            ["M","L","XL","XXL"]
 * @param {string} stock            商品库存 
 * @param {string} label            商品标签            ["包邮","促销"]
 * @param {string} smallPic         商品缩略图          ["图片路径"]
 * @param {Boolean} proImgUrl       商品展示图         ["图片路径1","图片路径2","图片路径3","图片路径4"]
 * @param {string} isOnline         是否上架            下架：0  上架1
 * @param {string} proDetilsImg     商品详情图          ["图片路径1", "图片路径2", ...]
 * @return: Promise
 * @Date Changed: 2020-06-29
 */
function addProduct(fid, fistTypeName, sid, secondTypeName, name, subtitle, description, price, specification, stock, label, smallPic, proImgUrl, isOnline, proDetilsImg) {
    let pid = uuid.v4();

    // 获取当前时间的毫秒值
    let nowDate = new Date().getTime();
    return new Promise((resolve, reject) => {
        // insert into table(列名1，lieming2) values(值1,z2)
        pool.query(
            "INSERT INTO productdetails SET ?",
            [{pid, fid, fistTypeName, sid, secondTypeName, name, subtitle, description, price, specification, stock, label, smallPic, proImgUrl, isOnline, proDetilsImg,creatTime: nowDate}], 
            (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
    })
}

/**
 * @description: 删除指定商品
 * @param {string}  pid     商品id
 * @return: Promise
 * @Date Changed: 2020-06-29
 */
function delProduct(pid){
    return new Promise((resolve,reject)=>{

        pool.query("DELETE FROM productdetails WHERE pid = ?",[pid],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })
}

/**
 * @description: 获取商品列表
 * @param {object} tableState 页码
 * @return: Promise
 * @Date Changed: 2020-06-29
 */

function getProductList(tableState,pid) {
    /**
     * 根据参数进行sql语句的输入
     *  - 页码参数 tableState
     *  - pid参数  pid 参数
     *  -   
    */
    let sql = "SELECT * FROM productdetails";

    if (tableState) {
        console.log("getProductList存在页码参数--------");

        let currentPage = tableState.currentPage || 1;
        let pageSize = tableState.pageSize || 2;

        let start = Number((currentPage - 1) * pageSize);
        let end = Number(pageSize);

        sql = `SELECT * FROM productdetails LIMIT ${start},${end}`;

        if(pid){
            sql = `SELECT * FROM productdetails WHERE pid = ${pid} LIMIT ${start},${end}`;
        }
    }

    if(pid){
        sql = `SELECT * FROM productdetails WHERE pid = '${pid}'`;
    }

    console.log( "执行的sql:>>>>   ", sql );



    return new Promise((resolve,reject)=>{
        pool.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}




module.exports = {
    isFirstClassExist,
    inquireFirstClass,
    isSecondClassExist,
    inquireSecondClass,
    isProductNameExistByName,
    isProductNameExistById,
    addProduct,
    delProduct,
    getProductList
}
