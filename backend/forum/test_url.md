# 使用方法
1. 先跑一下数据库初始化
2. ** python manager.py runserver**
3. 用**Chrome**浏览器的话，GET请求直接点下面的链接看结果

# 测试用数据库初始化

```
python init_db.py -m debug
```

# TODO
* avatar


# 订阅

## GET

1. 基本功能测试
	* http://127.0.0.1:8000/api/forum/subscriptions?uid=1&token=1
2. 参数错误
	* http://127.0.0.1:8000/api/forum/subscriptions?uid=1
	* http://127.0.0.1:8000/api/forum/subscriptions?token=2
	* http://127.0.0.1:8000/api/forum/subscriptions?uuid=1
	
3. 用户不存在
	* http://127.0.0.1:8000/api/forum/subscriptions?uid=998&token=1

# 课程列表

## GET

1. 基本功能测试
	* http://127.0.0.1:8000/api/forum/courses?collegeid=1
	
2. 参数错误
	* http://127.0.0.1:8000/api/forum/courses?collegeidd=1
	* http://127.0.0.1:8000/api/forum/courses
	
3. 学院不存在
	* http://127.0.0.1:8000/api/forum/courses?collegeid=998

# 课程信息

## GET
1. 基本功能测试
	* http://127.0.0.1:8000/api/forum/course?collegeid=1&courseid=1
	* http://127.0.0.1:8000/api/forum/course?collegeid=1&courseid=2

# 教师信息

## GET
1. 基本功能测试
	* http://127.0.0.1:8000/api/forum/teacher?collegeid=1&courseid=1&teacherid=1
	* http://127.0.0.1:8000/api/forum/teacher?collegeid=1&courseid=1&teacherid=2
	* http://127.0.0.1:8000/api/forum/teacher?collegeid=1&courseid=2&teacherid=3
