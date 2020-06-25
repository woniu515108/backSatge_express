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
	PRIMARY KEY (aid)
);


/* -------------- !!!!!!!!!!!!!!!!! backstage:结束 !!!!!!!!!!!!!!!!!------------------------ */