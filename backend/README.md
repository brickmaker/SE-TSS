# TSS Backend

## 配置运行

安装依赖

```bash
# 建立自己的python3虚拟环境（你要想用全局环境我也没有意见）不同平台不同

pip install -r requirements.txt
```

建立数据库表(目前采用重新makemigrations的方式)

```bash
# 针对每个app，如果有migrations，删掉对应的migration
python makemigrations --empty APP_NAME

python manage.py migrate authentication # 某种原因，这样做
python manage.py migrate
```

插入数据库初始数据

MacOS/Linux:

```bash
./init_db.sh
```

Windows（没有验证过）:

```bat
./init_db.bat
```

开启后端服务

```bash
python manage.py runserver
```

## 代码结构

* top: 记录整个项目路由，路由到各个的子项目
* init_db.sh/bat: 初始化数据库脚本
* forum...(各个模块，没有做过多定义，遵循django惯例就可)

## 开发指导

路由以`/api/`打头，避免与前端路由冲突

在top目录注册自己使用的模块，urls等，即可进行互不干扰的开发测试。

安装了相关的包之后，记得更新requirement.txt，例如可以这样:

```bash
pip freeze > requirements.txt
```

在后端根目录下，写入自己对数据库初始化的代码，并修改init_db.sh/init_db.bat保证自己的脚本得到运行，从空的数据库建立起初始的数据库。