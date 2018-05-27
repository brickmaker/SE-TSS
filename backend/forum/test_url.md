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

# 帖子信息
## GET
1. 基本功能
* http://127.0.0.1:8000/api/forum/post?id=1
* http://127.0.0.1:8000/api/forum/post?id=4

# 帖子回复信息
## GET
1. 基本功能
* http://127.0.0.1:8000/api/forum/post_reply?postid=1&page=0

# 私信
## 联系人列表
### GET
1. 基本功能
* http://127.0.0.1:8000/api/forum/msgentries?uid=1

# 获取发送私信
## GET
1. 基本功能
* http://127.0.0.1:8000/api/forum/messages?uid1=1&uid2=2&pagenum=0&pagesize=3

## POST
1. 基本功能
* http://127.0.0.1:8000/api/forum/messages
* body
```
        uid1 = 1
        uid2 = 2
        content = "post的新消息"
```

#公告
##GET
1.基本功能测试
* http://127.0.0.1:8000/api/forum/announcements?uid=1&pagenum=1&pagesize=1
* http://127.0.0.1:8000/api/forum/announcements?colledgeid=1&courseid=1&teacherid=1&pagenum=1&pagesize=1

	


