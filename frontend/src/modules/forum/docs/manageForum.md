## 添加课程板块

```
POST /api/forum/course_newforum

body:
{
    collegeid
    code: String // 课程代号
    name: String // 课程名称
}

response:
{
    error: null
}
```

## 删除课程板块

```
GET /api/forum/course_deleteforum

param:
collegeid
courseid

response:
{
    error: null
}
```

## 添加教师板块

```
POST /api/forum/teacher_newforum

body:
{
    collegeid
    courseid
    id: String // 教师ID
    name: String // 教师板块名
}

response:
{
    error: null
}
```

## 删除教师板块

```
GET /api/forum/teacher_deleteforum

param:
collegeid
courseid
teacherid

response:
{
    error: null
}
```
