#设置客户端的字符集编码格式
SET NAMES UTF8;

#删除指定的数据库mall
DROP DATABASE IF EXISTS dahuamall;

#创建mall数据库
CREATE DATABASE dahuamall CHARSET=UTF8;

#进入mall数据库
USE dahuamall;

/* ----------------- !!!!!!!!!!!!!!!!! common表:开始 !!!!!!!!!!!!!!!!!-------------------------- */

################开始： 创建新的数据表：商品一级分类表【firstClassification】
CREATE TABLE firstClassification
(
    fid      INT NOT NULL AUTO_INCREMENT,   # 一级商品分类编号
	typeName VARCHAR(10) NOT NULL,          # 一级分类名称
	label     VARCHAR(100),
	PRIMARY KEY (fid)
);

#向administrator】表中插入分类数据
INSERT INTO firstClassification VALUES
(100, '服装配饰', NULL),
(200, '家居用品', NULL),
(300, '珠宝首饰', NULL),
(400, '户外出行', NULL),
(500, '数码外设', NULL),
(600, '玩具礼品', NULL);

################结束(firstClassification操作完毕)


################开始 创建新的数据表：商品二级分类表【secondClassification】
CREATE TABLE secondClassification
(
    sid      INT NOT NULL AUTO_INCREMENT,  # 二级商品分类标号
    fid      INT NOT NULL,                 # 关联的一级商品分类编号  
    fistTypeName  VARCHAR(10) NOT NULL,    # 关联的一级商品分类的名称
	typeName VARCHAR(10) NOT NULL,         # 二级商品分类的名称
	label     VARCHAR(20),                 # 二级商品分类的描述
	PRIMARY KEY (sid)
);

#向administrator】表中插入分类数据
INSERT INTO secondClassification VALUES
# ----一级分类：【服装配饰】下的二级分类数据插入
(101, 100, '服装配饰', '男装',      NULL),
(102, 100, '服装配饰', '女装',      NULL),
(103, 100, '服装配饰', '童装',      NULL),
(104, 100, '服装配饰', '内衣配饰',  NULL),
# ----一级分类：【家居用品】下的二级分类数据插入
(201, 200, '家居用品', '家居类',    NULL),
(202, 200, '家居用品', '毛绒抱枕',  NULL),
(203, 200, '家居用品', '碗/杯类',   NULL),
# ----一级分类：【珠宝首饰】下的二级分类数据插入
(301, 300, '珠宝首饰', '珠宝首饰',  NULL),
# ----一级分类：【户外出行】下的二级分类数据插入
(401, 400, '户外出行', '箱包',      NULL),
(402, 400, '户外出行', '伞类',      NULL),
(403, 400, '户外出行', '其他',      NULL),
# ----一级分类：【数码外设】下的二级分类数据插入
(501, 500, '数码外设', '电脑相关',  NULL),
(502, 500, '数码外设', '手机周边',  NULL),
(503, 500, '数码外设', '影音娱乐',  NULL),
(504, 500, '数码外设', '其他',      NULL),
# ----一级分类：【玩具礼品】下的二级分类数据插入
(601, 600, '玩具礼品', '礼品',      NULL),
(602, 600, '玩具礼品', '手办',      NULL),
(603, 600, '玩具礼品', '其他',      NULL),
(604, 600, '玩具礼品', '其他/将军', NULL);
################结束(secondClassification操作完毕)

################开始 创建新的数据表：商品二级分类表【secondClassification】
CREATE TABLE productDetails
(
    pid             VARCHAR(50) NOT NULL,    # 商品id
    fid             INT NOT NULL,                   # 关联的一级商品分类编号  
    fistTypeName    VARCHAR(10) NOT NULL,           # 关联的一级商品分类的名称
    sid             INT NOT NULL,                   # 关联的二级商品分类编号
	secondTypeName  VARCHAR(10) NOT NULL,           # 二级商品分类的名称
    name            VARCHAR(20) NOT NULL,           # 商品名称
    subtitle        VARCHAR(50) NOT NULL,           # 商品副标题
    description     VARCHAR(100) NOT NULL,          # 商品描述
    price           VARCHAR(10) NOT NULL,           # 商品价格
    specification   VARCHAR(20) NOT NULL,           # 规格
    stock           INT NOT NULL,                   # 库存
    label           VARCHAR(50),                    # 标签【eg:包邮 促销等 】
    smallPic        VARCHAR(100) NOT NULL,          # 商品缩略图
    proImgUrl       VARCHAR(100) NOT NULL,          # 商品展示图片 限制4张
    isOnline        BOOL NOT NULL,                  # 是否上架  下架：0  上架1
    proDetilsImg    VARCHAR(200) NOT NULL,          # 商品详情图片
    creatTime       VARCHAR(20),                    # 商品创建时间
    updateTime      VARCHAR(20),                    # 商品更新时间
	PRIMARY KEY (pid)
);

################开始 创建新的数据表：邮箱校验码表【emailCheckCode】
CREATE TABLE emailCheckCode
(
    id INT NOT NULL AUTO_INCREMENT,
	idCode VARCHAR(50) NOT NULL,        # 标识码
	code VARCHAR (20) NOT NULL,         # 校验码
    creatTime VARCHAR(20) NOT NULL,     # 创建时间
	PRIMARY KEY (id)
);

/* ----------------- !!!!!!!!!!!!!!!!! common表:结束 !!!!!!!!!!!!!!!!!-------------------------- */

/* ----------------- !!!!!!!!!!!!!!!!! web表:开始 !!!!!!!!!!!!!!!!!-------------------------- */

# 创建新的数据表: 用户信息表【userInfo】 
CREATE TABLE userInfo
(
    uid INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(20) NOT NULL,
	password VARCHAR (20) NOT NULL,
	PRIMARY KEY (uid)
);

/* ----------------- !!!!!!!!!!!!!!!!! web表:结束 !!!!!!!!!!!!!!!!!-------------------------- */

/* -------------- !!!!!!!!!!!!!!!!! backstage表:开始 !!!!!!!!!!!!!!!!!------------------------ */
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


/* -------------- !!!!!!!!!!!!!!!!! backstage表:结束 !!!!!!!!!!!!!!!!!------------------------ */