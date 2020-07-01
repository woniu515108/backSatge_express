const express = require('express');
const commonRouter = express.Router();



/**
 * @description: 导入二级路由【后台接口路由】
 */
// email
const emailRouter = require('./email');
// uploadImg
const uploadRouter = require('./upload');

/**
 * @description: 二级路由挂载
 *  - /email 邮箱模块
 */
// email
commonRouter.use('/email', emailRouter);
// uploadImg
commonRouter.use('/upload', uploadRouter);



module.exports = commonRouter;