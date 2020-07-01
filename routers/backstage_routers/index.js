const express = require('express');
const backStageRouter = express.Router();



/**
 * @description: 导入二级路由【后台接口路由】
 */ 
// -用户模块
const userRouters = require('./user_router');
// -商品模块
const productRouters = require('./product_router');

/**
 * @description: 二级路由挂载
 *  - /user 用户模块
 */
backStageRouter.use('/user', userRouters);
backStageRouter.use('/product', productRouters);



module.exports = backStageRouter;