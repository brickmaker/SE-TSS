# SE TSS

## 基础介绍

软工教务管理系统整体项目。

为了便于管理，前后端放在了一个Repo里，但是前后端是两个完全的project，两者之间在build之前，不能有相互的引用联系。

## 开发指导

master是受保护的，不能直接push，请各组成员，建立自己的分支进行开发，完成某个功能的时候，提交PR。

各组成员在各自分支上工作，如何管理自己的分支可自由决定。

请务必仔细观察项目代码结构，按照统一的格式进行开发，如对项目组织有建议或意见，欢迎提出。

## 实现功能:（全部为后端，详见后端接口说明）
  多用户注册
  
  多用户登录
  
  用户信息管理
  
  JWT验证
  
  权限管理
  
  日志管理
  
## TODO
  课程管理
  
## 使用说明:
```
后端: 
    初始化数据库：
        $ cd InfoSys-back
        $ python manage.py makemigrations
        $ python manage.py migrate
        $ python init_data.py
     superuser: 
        $ python manage.py createsuperuser
     运行: 
        $ python manage.py runserver
     实现功能：
        多用户注册
        用户登录
        JWT的验证及刷新
        
     接口：(详见后端接口说明）
        <root>/api/get_token 
        <root>/api/refresh_token 
        <root>/api/is_token_valid 
        <root>/api/register_student 
        <root>/api/register_faculty 
        <root>/api/register_staff
        <root>/api/register_admin
        <root>/api/register_course
        <root>/api/login
        <root>/api/stuent/*/
        <root>/api/faculty/*/
        <root>/api/staff/*/
        <root>/api/admin/*/
        <root>/api/course/*/
```
## Dependency

1. `Python` (>3.5)

2. `Node.js` (>8.0.0) & npm

3. `django` 2.0

4. `djangorestframework-jwt` >=1.5.2

5. `djangorestframework` >=3.8.0
