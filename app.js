

const express = require('express');
const app = express();

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




// swagger配置的后台接口
app.use('/swagger/backstage', express.static('public'));
// apidoc配置的后台接口
app.use('/apidoc/backstage', express.static('apidoc/backstage'));

// app.use('/', function (req, res) {
//     res.writeHead(200, {
//         'Content-Type': 'text/html; charset=utf-8'
//     });
//     res.write('<h3>后台api文档：<a href="http://localhost:3300/swagger/backstage/">http://localhost:3300/swagger/backstage/</a><h3>');
//     res.end();
// });



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
       "............服务启动 http://localhost:3300............\n" +
       "...api文档：http://localhost:3300/swagger/backstage/...."
    );
})