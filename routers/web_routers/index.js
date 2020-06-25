const express = require('express');
const webRouter = express.Router();



/**
 * @description: 导入二级路由【后台接口路由】
 */
const userRouters = require('./user_router');

/**
 * @description: 二级路由挂载
 *  - /user 用户模块
 */
webRouter.use('/user', userRouters);



module.exports = webRouter;