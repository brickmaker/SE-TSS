# Forum API 说明

**临时手动文档，后续采用工具生成**

所有请求路径均以`/api/forum`作为前缀

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