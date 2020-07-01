# 大话西游周边商城后端项目

### 1. 项目描述
    该项目是基于NodeJS,使用express框架搭建的后端管理系统
    其支持：
        - 大话西游周边商城前台接口逻辑
        - 大话西游周边商城后台接口逻辑 
    

### 2. 项目环境依赖

    node  v10.15.3

 - 第三方插件依赖

    nodemon   
        描述：热启动(代码保存即自动重启服务)
        安装命令：npm install nodemon -g
        使用说明：启动项目入口文件不在使用 node xxx.js 而是使用 nodemon xxx.js

    apidoc
        描述：根据注释生成api接口文档
        官网：http://apidocjs.com
        安装命令：npm install apidoc -g
        使用说明：
    

### 3. 后台项目启动

 + npm init -y

    使用npm本地初始化webpack.json文件

 + 项目相关依赖

    - npm install express --save

        使用npm本地导入express后端框架

    - npm install body-parser --save

        使用npm本地导入请求解析中间件依赖   

    - npm install mysql --save

        使用npm本地导入连接mysql数据库中间件依赖

    - npm install nodemailer --save

    - npm install node-uuid --save

    - npm install multer --save

### 4. 后台数据库搭建

    描述：使用xammp自带的MariDB数据库，创建 dahuamall 数据库 并 创建后台管理员表
    说明：目前只为实现最为简单的登陆逻辑，不考虑安全等因素，故而以实现功能为主，创建最为简单的数据库表
    操作说明： 启动xammp中的mysql服务，并创建.sql脚本，插入到本地数据库中。
    操作命令： mysql -uroot < /文件路径/dahuamall.sql

```sql
#设置客户端的字符集编码格式
SET NAMES UTF8;

#删除指定的数据库mall
DROP DATABASE IF EXISTS dahuamall;

#创建mall数据库
CREATE DATABASE dahuamall CHARSET=UTF8;

#进入mall数据库
USE dahuamall;

/* -------------- !!!!!!!!!!!!!!!!! backstage:开始 !!!!!!!!!!!!!!!!!------------------------ */
CREATE TABLE administrator
(
    aid INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(20) NOT NULL,
	password VARCHAR (20) NOT NULL,
	PRIMARY KEY (aid)
);


/* -------------- !!!!!!!!!!!!!!!!! backstage:结束 !!!!!!!!!!!!!!!!!------------------------ */

```

### 3. 手动创建app.js 

    描述：该文件为后端系统项目的入口文件, 使用node/nodemon就是启动该文件

#### 3.1、 启动服务监听

```javascript
// 从node_modules本地依赖中导入express
const express = require('express');  

// 创建express实例并命名为app
const app = express();

// 启动后台服务并挂载在3300端口上
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
       "............服务启动 http://localhost:3300............"
    );
})

```

#### 3.2、 挂载路由

- 1. 挂载前台路由

        在项目根目录下创建routers路由文件夹,并且分别创建前台路由文件夹(web_routers)及后台路由文件夹(backstage_routers),其入口文件为该文件夹下的index.js。

        并在对应的前后台文件夹下根据项目需求分功能模块划分文件夹(此举是为了避免单个文件中的代码体量过大)，并在当前功能文件夹的入口文件中写相关的api接口。如用后台管理系统中大致可分为管理员(即用户)模块，可在该模块文件下写 管理员登录api、 管理员删除api等接口。再如可在商品管理模块文件下写 获取商品列表api、商品更新api、商品删除api等接口。

 - 2. 路由文件目录

```

routers    // 路由文件夹
|
└─── web_routers            // 前台路由文件夹
|    |
|    └─── index.js              // 前台路由入口文件
|    |
|    └─── user_router           // 用户模块文件夹
|           |
|           └─── index.js           // 用户模块文件夹入口文件
|
└─── backstage_routers      // 后台路由文件
     |
     └─── index.js              // 前台路由入口文件
     |
     └─── user_router           // 前台路由入口文件
            |
            └─── index.js           // 用户模块文件夹入口文件


```

 - 3. 后台一级路由入口文件代码(routers/backstage_routers/index.js)

        该路由的目的是为了区分前台及后台路由api

```javascript
// 引入express模块(目的是为了实现express路由)
const express = require('express');
// 通过express框架路由实例化backstage一级路由
const backStageRouter = express.Router();



/**
 * @description: 导入二级路由【后台接口路由】
 */ 
const userRouters = require('./user_router');

/**
 * @description: 二级路由挂载
 *  - /user 用户模块
 */
backStageRouter.use('/user', userRouters);


// 将一级路由导出，供入口路由文件app.js调用
module.exports = backStageRouter;

```

 - 4. 后台二级功能模块——用户模块入口文件代码(routers/backstage_routers/user_router/index.js)

        该路由的目的是为了区分不同功能（如用户模块、商品模块等）的接口api的代码区分

```javascript
// 引入express模块(目的是为了实现express路由)
const express = require('express');
// 通过express框架路由实例化用户模块二级路由(即用户模块相关接口)
const userRouters = express.Router();



/**
 * @description: 【后台项目】测试api
 * @Date Changed: 2020-06-25
 */
userRouters.get('/ceshi', (req, res) => {
    res.send({
        code: 200,
        msg: "后台接口：----用户模块测试 ok"
    });
})

// 导出二级用户模块路由供一级路由文件导入挂载
module.exports = userRouters;

```

 - 5. 注意一级路由入口文件导入二级路由文件的代码

 ```javascript

 /**
 * @description: 导入二级路由【后台接口路由】
 */ 
const userRouters = require('./user_router');

/**
 * @description: 二级路由挂载
 *  - /user 用户模块
 *  - ***
 */
backStageRouter.use('/user', userRouters);

 ```

 - 6. 将一级路由导入项目启动文件(app.js)中并挂载一级路由

```javascript

/**
 * @description: 引入一级路由
 */
// 前台接口总路由
const webRouter = require('./routers/web_routers');
// 后台接口总路由
const backStageRouter = require('./routers/backstage_routers');


// 一级路由挂载
app.use('/web', webRouter);
app.use('/backstage', backStageRouter);

```


 - 7. 启动服务，测试已完成后台用户模块的测试接口

   + 启动服务

            nodemon app.js

    + 使用postman(或浏览器进行接口访问测试)

        接口地址：http://localhost:3300/backstage/user/ceshi
        请求方式：GET
        请求参数：无
        响应参数：{code:200,msg:"后台接口：----用户模块测试 ok"}

    + 在后台用户模块下手写后台登陆接口api
```javascript



```


    





