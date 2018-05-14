# Forum API 说明

**临时手动文档，后续采用工具生成**

所有请求路径均以`/api/forum`作为前缀

文中提到的参见，指参见测试数据：`tests/sample.json`

****

#### 订阅信息

##### 请求

```
GET /api/forum/subscriptions
```
##### params

```
uid: String
token: String
```

##### response

success: 参照`subscriptions`

error: ..


#### 课程列表

##### 请求

```
GET /api/forum/courses
```
##### params

```
collegeid: String
```

##### response

success: 参照`courses`

error: ..

#### 课程信息

##### 请求

```
GET /api/forum/course
```
##### params

```
collegeid: String
courseid: String
```

##### response

success: 参照`course`

error: ..

#### 教师板块信息

##### 请求

```
GET /api/forum/teacher
```
##### params

```
collegeid: String
courseid: String
teacherid: String
```

##### response

success: 参照`teacher`

error: ..

#### 帖子信息

##### 请求

```
GET /api/forum/post
```
##### params

```
id: String 帖子的ID
```

##### response

success: 参照`post`

error: ..

#### 帖子回复信息

##### 请求

```
GET /api/forum/post_reply
```
##### params

```
postid: String 帖子的ID
page: Number 页号
```

##### response

success: 参照`replies`

error: ..

### 私信
#### 首页获取新私信
TODO:
##### 请求
##### 参数
##### 响应

#### 获取联系人
##### 请求
```
GET /api/forum/msgentries
```
##### 参数
```
uid: String
```
##### 响应
```
[
    {
        "uid": "1",
        "username": "user1",
        "avatarurl": "",
        "lastMsgContent": "hey"
    },
    ...
]
```
按最后联系时间降序排列
#### 获取私信
##### 请求
```
GET /api/forum/messages
```
##### 参数

```
uid1: String
uid2: String
pagenum: Number 页号
pagesize: Integer
```
发送者、接受者分别为uid1、uid2，或uid2、uid1。

##### 响应
```
[
    {
      "from": "1", (uid)
      "to": "1", (uid)
      "content": "hey sent by 1",
      "time": {
          "year": 2018,
          "month": 12,
          "day": 27,
          "hour": 1,
          "minute": 14 
      }
    },
    ...
]
```
按 time 降序排列

#### 发送私信
##### 请求
```
POST /api/forum/messages
```

##### 参数
```
from: String uid
to: String uid
content: String
```

### 公告
#### 获取公告
##### 请求
```
GET /api/forum/announcements
```
##### 参数
某用户订阅的版块的公告
```
uid: String
pagenum: Integer
pagesize: Integer
```

或某板块的公告
```
colledgeid: String
courseid: String
teacherid: String
pagenum: Integer
pagesize: Integer
```

##### 响应
```
{
    "anncNum": 1000,
    "anncs":
        [
            {
                "title": "annc", 
                "path": {
                    "college": {
                        "id": "collegeid",
                        "name": "计算机科学与技术学院"
                    },
                    "course": {
                        "id": "courseid",
                        "name": "软件工程"
                    },
                    "teacher": {
                        "id": "teacherid",
                        "name": "王章野"
                    }
                },
                "author": {
                    "username": ,
                    "uid": 
                },
                "content": "content",
                "time": "yyyy/MM/dd"
            },
            ...
        ]
}
```
"size"字段为公告总数, "anncs"字段按发布时间降序排列
"content"暂定为纯文本

#### 发布公告

##### 请求
```
POST /api/forum/announcements
```

##### 参数
```
uid: String
path: {
    "collegeid": String,
    "courseid": String,
    "teacherid": String,
}
content: String
title: String
```


### 搜索
#### 请求
```
GET /api/search
```
#### 参数
```
searchtype: String ("post"或"section")
content: String
pagenum: Integer
pagesize: Integer
```
#### 响应
帖子
```
{
    "resultNum": 1000,
    "results": [
        {
            "title": ,
            "postid": ,
            "path":{ 
                "college": {
                    "id": "collegeid",
                    "name": "计算机科学与技术学院"
                },
                "course": {
                    "id": "courseid",
                    "name": "软件工程"
                },
                "teacher": {
                    "id": "teacherid",
                    "name": "王章野"
                }
            },
            "author": {
                "username": ,
                "uid": ,
            },
            "replyNum": 20,
            "time": "yyyy/MM/dd hh:mm",
            "relatedContent": ,
        },
        ...
    ]
}
```
版块
```
{
    "resultNum": 1000,
    "results":[
        { 
            "path":{
                "college": {
                    "id": "collegeid",
                    "name": "计算机科学与技术学院"
                },
                "course": {
                    "id": "courseid",
                    "name": "软件工程"
                },
                "teacher": {
                    "id": "teacherid",
                    "name": "王章野"
                }
            },
            "postNum": 1000,
            "lastReplyTime": "yyyy/MM/dd hh:mm"
        },
        ...
    ]
}
```
path子字段可为空
### 管理