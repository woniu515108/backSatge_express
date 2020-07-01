

const express = require('express');
const app = express();

const path = require('path');

const bodyPaser = require('body-parser');


/**
 * @description: 引入一级路由
 */
// 前台接口总路由
const commonRouter = require('./routers/common_routers');
// 前台接口总路由
const webRouter = require('./routers/web_routers');
// 后台接口总路由
const backStageRouter = require('./routers/backstage_routers');



// 解析表单数据 x-www-form-urlencode
app.use(bodyPaser.urlencoded({ extended: false }));
// 解析json数据 
app.use(bodyPaser.json());




/**
 * 静态资源服务：接口文档的配置访问
*/
// // swagger配置的后台接口
app.use('/swagger/backstage', express.static('public'));
// apidoc配置的后台接口
app.use('/apidoc/common', express.static('apidoc/common'));
// apidoc配置的后台接口
app.use('/apidoc/web', express.static('apidoc/web'));
// apidoc配置的后台接口
app.use('/apidoc/backstage', express.static('apidoc/backstage'));


/**
 * 静态资源服务：上传资源的访问
 * */ 
app.use('/public',express.static(path.join(__dirname,'./uploads')))



// 一级路由挂载
app.use('/common', commonRouter);
app.use('/web', webRouter);
app.use('/backstage', backStageRouter);

app.listen("3300",()=>{
    console.log(
       " ......................阿弥陀佛......................\n" +
       "                       _oo0oo_                       \n" +
       "                      o8888888o                      \n" +
       "                      88\" . \"88                    \n" +
       "                      (| -_- |)                      \n" +
       "                      0\\  =  /0                     \n" +
       "                    ___/‘---’\\___                   \n" +
       "                  .' \\|       |/ '.                 \n" +
       "                 / \\\\|||  :  |||// \\              \n" +
       "                / _||||| -卍-|||||_ \\               \n" +
       "               |   | \\\\\\  -  /// |   |            \n" +
       "               | \\_|  ''\\---/''  |_/ |             \n" +
       "               \\  .-\\__  '-'  ___/-. /             \n" +
       "             ___'. .'  /--.--\\  '. .'___            \n" +
       "         .\"\" ‘<  ‘.___\\_<|>_/___.’>’ \"\".        \n" +
       "       | | :  ‘- \\‘.;‘\\ _ /’;.’/ - ’ : | |         \n" +
       "         \\  \\ ‘_.   \\_ __\\ /__ _/   .-’ /  /     \n" +
       "    =====‘-.____‘.___ \\_____/___.-’___.-’=====      \n" +
       "                       ‘=---=’                       \n" +
       "                                                     \n" +
       "....................佛祖保佑 ,永无BUG.................\n" +
       ".......... 该项目由【我们都对】团队鼎力支持 ...........\n" +
       "............服务启动 http://localhost:3300........... \n" +
       "  api文档(公共)：http://localhost:3300/apidoc/common \n" +
       "  api文档(前台)：http://localhost:3300/apidoc/web    \n" +
       "  api文档(后端)：http://localhost:3300/apidoc/backstage "
    );
})