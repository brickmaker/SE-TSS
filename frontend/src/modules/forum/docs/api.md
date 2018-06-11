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

### 课程板块页

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

#### 课程板块订阅查询

查看用户是否订阅了这个板块

##### 请求

```
GET /api/forum/course_subscribed
```

##### params

```
uid: String
collegeid: String
courseid: String
```

##### response

参见`course_subscribed`

#### 课程板块订阅

##### 请求

```
GET /api/forum/course_subscribe
```

##### params

```
uid: String
collegeid: String
courseid: String
```

##### response

参见`course_subscribe`

#### 课程板块取消订阅

##### 请求

```
GET /api/forum/course_unsubscribe
```

##### params

```
uid: String
collegeid: String
courseid: String
```

##### response

参见`course_unsubscribe`

#### 课程板块帖子

##### 请求

```
GET /api/forum/course_posts
```

##### params

```
collegeid: String
courseid: String
```

##### response

参见`course_posts`

#### 课程板块发帖

##### 请求

```
POST /api/forum/course_newpost
```

##### 内容

```
{
    uid: String,
    collegeId: String,
    courseId: String,
    title: String,
    content: String,
    fileId: String
}
```

##### response

```
成功：
{
    error: null
}
失败：
{
    error: "Error info"
}
```

### 教师板块页

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

#### 教师板块帖子

##### 请求

```
GET /api/forum/teacher_posts
```

##### params

```
collegeid: String
courseid: String
teacherid: String
```

##### response

参照`teacher_posts`

#### 教师板块订阅查询

##### 请求

```
GET /api/forum/teacher_subscribed
```

##### params

```
uid: String
collegeid: String
courseid: String
teacherid: String
```

##### response

参见`teacher_subscribed`

#### 教师板块订阅

##### 请求

```
GET /api/forum/teacher_subscribe
```

##### params

```
uid: String
collegeid: String
courseid: String
teacherid: String
```

##### response

参见`teacher_subscribe`

#### 教师板块取消订阅

##### 请求

```
GET /api/forum/teacher_unsubscribe
```

##### params

```
uid: String
collegeid: String
courseid: String
teacherid: String
```

##### response

参见`teacher_unsubscribe`


#### 教师板块发帖

##### 请求

```
POST /api/forum/teacher_newpost
```

##### 内容

```
{
    uid: String,
    collegeId: String,
    courseId: String,
    teacherId: String,
    title: String,
    content: String,
    fileId: String
}
```

##### response

```
成功：
{
    error: null
}
失败：
{
    error: "Error info"
}
```

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
****

#### 回帖

##### 请求

```
POST /api/forum/post_newreply
```

##### 内容

```
{
    uid: String,
    postId: String,
    content: String,
    fileId: String
}
```

##### response

```
成功：
{
    error: null
}
失败：
{
    error: "Error info"
}
```

#### 评论 

##### 请求

```
POST /api/forum/comment
```

##### 内容

```
{
    from: String,
    to: String,
    postId: String,
    replyId: String,
    content: String
}
```

##### response

```
成功：
{
    error: null
}
失败：
{
    error: "Error info"
}
```

### 附件

#### 上传附件

##### 请求

```
POST /api/forum//upload_file
```

##### 参数

post的body就是一个File对象，包含了文件名、大小等信息，具体后端如何解析不是很清楚，如果有问题请提出

```
File
```

##### 响应

成功：

```
{
    error: null
    fileId: String // 可以是文件的md5值，能够区分文件即可
}
```

错误：

```
{
    error: String
}
```

### 版块信息
#### 获取版块名字
##### 请求
```
GET /api/forum/sectionnames
```
##### 参数
```
sectionids: Array of Integer
```
##### 响应
```
[
    "sectionname1",
    "sectionname2",
    ...
]
```
版块id与name次序对应

#### 获取学院列表
##### 请求
```
GET /api/forum/college_list
```
##### 响应
```
[
    {
      "id": 123,
      "name": "计算机科学与技术学院",
    },
    {
      "id": 678,
      "name": "xx学院",
    }
]
```


#### 获取课程列表
##### 请求
```
GET /api/forum/course_list
```
##### 参数
```
collegeid: Integer
```
##### 响应
```
[
    {
      "id": 123,
      "name": "软件工程",
    },
    {
      "id": 123,
      "name": "编译原理",
    }
]
```

#### 获取教师列表
##### 请求
```
GET /api/forum/teacher_list
```
##### 参数
```
collegeid: Integer
courseid: Integer
```
##### 响应
```
[
    {
      "id": 123,
      "name": "王章野"
    },
    {
      "id": 456,
      "name": "施青松"
    },
    ...
]
```
****
### 私信
#### 首页获取新私信
##### 请求
```
GET /api/forum/newmsgs
```
##### 参数
```
uid: Integer
pagesize: Integer
```
##### 响应
```
[
    {
      "from": {
        "id": 30,
        "username": "友人A",
        "avatar": "https://api.adorable.io/avatars/144/userpic.png"
      },
      "content": "一条新消息"
    },
    ...
]
```

获取登录用户uid的最新pagesize条消息

#### 获取联系人
##### 请求
```
GET /api/forum/msgentries
```
##### 参数
```
uid: Integer
```
##### 响应
```
[
    {
        "id": 1,
        "username": "user1",
        "avatar": "https://api.adorable.io/avatars/144/userpic.png",
        "lastMsgContent": "hey"
    },
    ...
]
```
按最后联系时间降序排列，消息内容为用户或对方发送的最后一条消息
#### 获取私信
##### 请求
```
GET /api/forum/messages
```
##### 参数

```
uid1: Integer
uid2: Integer
pagenum: Integer
pagesize: Integer
```
发送者、接受者分别为uid1、uid2，或uid2、uid1。

##### 响应
```
[
    {
        "from": {
            "id":2,
            "avatar": "https://api.adorable.io/avatars/144/userpic.png",
        },
        "to": {
            "id":29,
        },
        "content": "hey sent by 1",
        "time": "2012-04-23T18:25:43.511Z"
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
from: Integer
to: Integer
content: String
```
****
### 公告
#### 获取公告
##### 请求
```
GET /api/forum/announcements
```
##### 参数
某用户订阅的版块的公告
```
uid: Integer
pagenum: Integer
pagesize: Integer
```

或某板块的公告
```
colledgeid: Integer
courseid: Integer
teacherid: Integer
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
                    "uid": ,
                },
                "content": "content",
                "time": "2012-04-24T18:25:43.511Z"
            },
            ...
        ]
}
```
"size"字段为公告总数, "anncs"字段按发布时间降序排列
"content"为纯文本

#### 发布公告

##### 请求
```
POST /api/forum/announcements
```

##### 数据（JSON）
```
{
    uid: Integer
    path: {
        collegeid: Integer,
        courseid: Integer,
        teacherid: Integer,
    }
    content: String
    title: String
}
```
****
### 搜索
#### 请求
```
GET /api/forum/search
```
#### 参数
```
searchtype: String ("post"或"section")
query: String
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
            "time": "2012-04-24T18:25:43.511Z",
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
            "lastReplyTime": "2012-04-24T18:25:43.511Z"
        },
        ...
    ]
}
```
版块搜索结果中，path中college，course等字段视情况为空
****
### 管理
#### 获取论坛基本信息
##### 请求
```
GET /api/forum/info
```

##### 响应
```
{
    "用户数": 10000,
    "历史最高在线数": 9999,
    "今日注册数": 29,
    "版块数": 2000
}
```
内容不限于以上条目
#### 查看用户统计
##### 请求
```
GET /api/forum/userstates
```
##### 参数
```
username: String
```
##### 响应
```
[
   {
      "uid": "uid",
      "username": "Alice",
      "replyNum": 23,
      "postNum":3,
      "type": "学生"
    },
    {
      "uid": "uid",
      "username": "Alice",
      "replyNum": 23,
      "postNum":3,
      "type": "学生"
    },
    ...
]
```
#### 查看热门帖子
##### 请求
```
GET /api/forum/hotposts
```
##### 参数
```
collegeid: Integer
courseid: Integer
teacherid: Integer
start_time: String ("2012-04-23T18:25:43.511Z")
end_time: String ("2012-04-24T18:25:43.511Z")
```
##### 响应
```
[
    {
      "title": "一个帖子的标题",
      "author": {
        "username": "王章野",
        "uid": "uid"
      },
      "time": "2012-04-24T18:25:43.511Z",
      "lastReplyTime": "2012-04-24T18:25:43.511Z",
      "replyNum": 10,
      "postid": "postid",
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
      }
    },
]
```

****
### 个人中心
#### 获取个人信息
##### 请求
```
GET /api/forum/userinfo
```
##### 参数
```
uid: Integer
```
##### 响应
```
{
    "uid": 5,
    "username": "用户名字",
    "avatar": "https://api.adorable.io/avatars/144/userpic.png",
    "signature": "♀遈什麼濛蔽叻鉨ㄖㄅ雙yаη，讓鉨看不菿誐る鉨ィ寸cんù。♀",
    "registrationTime": "2012-04-24T18:25:43.511Z",
    "replyNum": 10,
    "postNum": 2,
    "subscriptionNum": 5,
    "posts": [
      {
        "postId": "111",
        "title": "一个帖子的标题",
        "postTime": "2012-04-23T18:25:43.511Z",
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
        }
      },
      ...
    ]
}
```
#### 修改个人信息
##### 请求
```
POST /api/forum/userinfo
```
##### 内容
```
uid
username
signature
imagefile
```
username长度 1-20
signature长度 0-100
imagefile键不存在则不修改头像