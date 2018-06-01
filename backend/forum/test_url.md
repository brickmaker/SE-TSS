# CHECKLIST
- [x] subscriptions 
- [x] courses
- [x] course 
- [x] course_subscribed 
- [x] course_subscribe
- [x] course_unsubscribe
- [x] course_posts 
- [x] course_newpost 
- [x] teacher
- [x] teacher_posts
- [x] teacher_subscribed 
- [x] teacher_subscribe
- [x] teacher_unsubscribe
- [x] teacher_newpost
- [x] post 
- [x] post_reply 
- [x] post_newreply
- [x] comment 
- [x] sectionnames 
- [x] college_list 
- [x] course_list 
- [x] teacher_list
- [x] newmsgs
- [x] msgentries
- [x] messages
- [x] announcements
- [ ] search
- [x] info
- [ ] userstates
- [ ] hotposts






# 使用方法
1. 先跑一下数据库初始化
2. **python manager.py runserver**
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
* http://127.0.0.1:8000/api/forum/subscriptions?uid=1
2. 参数错误
* http://127.0.0.1:8000/api/forum/subscriptions?uidd=1
* http://127.0.0.1:8000/api/forum/subscriptions?token=2
* http://127.0.0.1:8000/api/forum/subscriptions?uuid=1
	
3. 用户不存在
* http://127.0.0.1:8000/api/forum/subscriptions?uid=998

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

# 公告
## GET
1.基本功能测试
* http://127.0.0.1:8000/api/forum/announcements?uid=1&pagenum=0&pagesize=100
* http://127.0.0.1:8000/api/forum/announcements?collegeid=1&courseid=1&teacherid=1&pagenum=0&pagesize=100

## POST
```
python manager.py test forum
```

# 统计信息
## GET
* http://127.0.0.1:8000/api/forum/info
	
# 用户统计信息
## GET
* http://127.0.0.1:8000/api/forum/info


# 课程板块帖子

## GET

### 正常
* http://127.0.0.1:8000/api/forum/course_posts?collegeid=1&courseid=1

### 无帖子
* http://127.0.0.1:8000/api/forum/course_posts?collegeid=1&courseid=2


# 教师板块帖子

## GET
### 正常
* http://127.0.0.1:8000/api/forum/teacher_posts?collegeid=1&courseid=1&teacherid=1
### 无帖子
* http://127.0.0.1:8000/api/forum/teacher_posts?collegeid=1&courseid=1&teacherid=2

# 获取板块名字

## GET

* http://127.0.0.1:8000/api/forum/sectionnames?sectionids=1&sectionids=2&sectionids=4&sectionids=3


# 获取学院列表

## GET
* http://127.0.0.1:8000/api/forum/college_list


# 获取课程列表

## GET

* http://127.0.0.1:8000/api/forum/course_list?collegeid=1


# 获取教师列表

## GET

* http://127.0.0.1:8000/api/forum/teacher_list?collegeid=1&courseid=1
* http://127.0.0.1:8000/api/forum/teacher_list?collegeid=1&courseid=2

# 首页获取新私信

## GET
* http://127.0.0.1:8000/api/forum/newmsgs?uid=1&pagesize=1
* http://127.0.0.1:8000/api/forum/newmsgs?uid=1&pagesize=2
* http://127.0.0.1:8000/api/forum/newmsgs?uid=1&pagesize=100
* http://127.0.0.1:8000/api/forum/newmsgs?uid=2&pagesize=10

# 课程板块订阅查询

## GET 
### 已订阅
* http://127.0.0.1:8000/api/forum/course_subscribed?uid=1&collegeid=1&courseid=1

### 未订阅
* http://127.0.0.1:8000/api/forum/course_subscribed?uid=1&collegeid=1&courseid=2


# 课程板块订阅
## GET
### 订阅成功
* http://127.0.0.1:8000/api/forum/course_subscribe?uid=1&collegeid=1&courseid=2
### 课程不存在
* http://127.0.0.1:8000/api/forum/course_subscribe?uid=1&collegeid=1&courseid=998

# 课程板块取消订阅
## GET
### 去订阅成功
* http://127.0.0.1:8000/api/forum/course_unsubscribe?uid=1&collegeid=1&courseid=1

### 订阅关系不存在
* http://127.0.0.1:8000/api/forum/course_unsubscribe?uid=1&collegeid=1&courseid=2

### 课程不存在
* http://127.0.0.1:8000/api/forum/course_unsubscribe?uid=1&collegeid=1&courseid=998


# 教师板块订阅查询
## GET
* http://127.0.0.1:8000/api/forum/teacher_subscribed?uid=1&collegeid=1&courseid=1&teacherid=1
* http://127.0.0.1:8000/api/forum/teacher_subscribed?uid=1&collegeid=1&courseid=1&teacherid=2 

# 教师板块订阅
## GET
* http://127.0.0.1:8000/api/forum/teacher_subscribe?uid=1&collegeid=1&courseid=1&teacherid=2

# 教师板块取消订阅
## GET
* http://127.0.0.1:8000/api/forum/teacher_unsubscribe?uid=1&collegeid=1&courseid=1&teacherid=2