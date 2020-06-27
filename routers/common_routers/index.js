const express = require('express');
const commonRouter = express.Router();



/**
 * @description: 导入二级路由【后台接口路由】
 */
const emailRouter = require('./email');

/**
 * @description: 二级路由挂载
 *  - /mail 邮箱模块
 */
commonRouter.use('/email', emailRouter);



module.exports = commonRouter;