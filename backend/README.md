# TSS Backend

## 配置

```bash
# 1. 建立自己的python3虚拟环境（你要想用全局环境我也没有意见）不同平台不同

$ pip install -r requirements.txt
针对每个app
$ python makemigrations --empty APP_NAME
$ python manage.py migrate authentication
$ python manage.py migrate
$ python manage.py runserver

```

## 代码结构

* top: 记录整个项目路由，路由到各个的子项目
* forum...(各个模块，没有做过多定义，遵循django惯例就可)

## 开发指导

路由以`/api/`打头，避免与前端路由冲突

在top目录注册自己使用的模块，urls等，即可进行互不干扰的开发测试。

安装了相关的包之后，记得更新requirement.txt，例如可以这样:

```bash
pip freeze > requirement.txt
```

数据库的问题再议，没想好 //:~
