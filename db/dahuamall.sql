#设置客户端的字符集编码格式
SET NAMES UTF8;

#删除指定的数据库mall
DROP DATABASE IF EXISTS dahuamall;

#创建mall数据库
CREATE DATABASE dahuamall CHARSET=UTF8;

#进入mall数据库
USE dahuamall;

/* ----------------- !!!!!!!!!!!!!!!!! web:开始 !!!!!!!!!!!!!!!!!-------------------------- */

/* ----------------- 创建新的数据表: 用户信息表【userInfo】 ----------------- */
CREATE TABLE userInfo
(
    uid INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(20) NOT NULL,
	password VARCHAR (20) NOT NULL,
	PRIMARY KEY (uid)
);


/* ----------------- !!!!!!!!!!!!!!!!! web:结束 !!!!!!!!!!!!!!!!!-------------------------- */

/* -------------- !!!!!!!!!!!!!!!!! backstage:开始 !!!!!!!!!!!!!!!!!------------------------ */
CREATE TABLE administrator
(
    aid INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(20) NOT NULL,
	password VARCHAR (20) NOT NULL,
    nickName VARCHAR(20),			# 昵称
    sex BOOL,						# 0 女 , 1 男
    Avatar VARCHAR(200),			# 头像路径
    email VARCHAR(20) NOT NULL,
    phone VARCHAR(16) NOT NULL,
    cTime VARCHAR(20),			        #注册时间
    uTime VARCHAR(20),                  #更新时间
	PRIMARY KEY (aid)
);

#向administrator】表中插入模拟数据
INSERT INTO administrator VALUES(
	NULL,
	'admin',
	'123456',
	'yumi',
	0,
	'http://img4.imgtn.bdimg.com/it/u=2573110154,1217222222&fm=26&gp=0.jpg',
	'838667990@qq.com',
	'1569335687',
	'1593229848074',
	'null'
);


/* -------------- !!!!!!!!!!!!!!!!! backstage:结束 !!!!!!!!!!!!!!!!!------------------------ */