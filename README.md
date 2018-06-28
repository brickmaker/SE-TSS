# SE TSS

## 项目简介

TSS 软件工程课程-教学服务系统项目 源码

## 运行方式

目前前后端没有build，仅供测试。

保证本机装有以下工具：

* NodeJS, NPM最新版
* python 3.6.4
* 能够运行.sh脚本的工具（MacOS, Linux可直接运行，Windows默认cmd不可以）

初始准备：

创建后端python虚拟环境

以下列出一种方式：

```bash
virtualenv env
source env/bin/active
```

安装后端python依赖：

```bash
cd backend
python install -r requirements.txt
```

安装前端npm依赖：

```bash
cd frontend
npm install
```

初始化后端数据：

```bash
cd backend
./reset_migrations.sh
./init_db.sh
```

开启后端服务：

```bash
python manage.py runserver
```

开启前端服务：

```bash
npm start
```

项目界面在浏览器的`localhost:3000`可以看到


****

## 开发相关

### 基础介绍

软工教务管理系统整体项目。

为了便于管理，前后端放在了一个Repo里，但是前后端是两个完全的project，两者之间在build之前，不能有相互的引用联系。

### 开发指导

master是受保护的，不能直接push，请各组成员，建立自己的分支进行开发，完成某个功能的时候，提交PR。

各组成员在各自分支上工作，如何管理自己的分支可自由决定。

请务必仔细观察项目代码结构，按照统一的格式进行开发，如对项目组织有建议或意见，欢迎提出。