from django.db import models
from django.db import transaction
import django.utils.timezone as timezone
from rest_framework.exceptions import APIException, ParseError, NotFound
# Create your models here.

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager

GENDER_CHOICES = (
    ('M', '男'),
    ('F', '女'),
)


class Department(models.Model):
    name = models.CharField("所在院系", primary_key=True, max_length=100)


class AccountManager(BaseUserManager):
    @transaction.atomic
    def create_user(self, username, password=None, user_type=None, **kwargs):
        # Ensure that an email address is set
        # if not username:
        #    raise ValueError('Users must have a valid e-mail address')

        # Ensure that a username is set
        # if not kwargs.get('username'):

        if not user_type:
            raise ParseError(detail='Users must have a valid user type')

        if (Account.objects.filter(username=username).count() > 0):
            raise ParseError(detail='This username has been registered!')

        '''
        if not kwargs.get('gender'):
            raise ValueError('Users must have a gender attribute')
        if not kwargs.get('department'):
            raise ValueError('Users must have a valid department')
        '''
        depart = None
        try:
            depart = Department.objects.get(name=kwargs.get('department', '信息中心'))
        except Exception as err:
            raise ParseError(detail='This department does not exist!')

        account = self.model(
            username=username,
            password=password,
            email=kwargs.get('email', None),
            user_type=user_type,
        )
        '''
        This method is in the AbstractBaseUser class and works by 
        performing one-way hashing on the password value supplied
        before storing it.
        '''
        account.set_password(password)  # Encrypt the plain text password
        account.save()
        '''
        Decide the user type,front end need check the non-null field
        '''
        if user_type == 1:
            user = Student.objects.create(
                username=account,
                email=kwargs.get('email', None),
                gender=kwargs.get('gender', '男'),
                name=kwargs.get('name', '系统管理员'),
                department=depart,
                grade=kwargs.get('grade'),
                major=kwargs.get('major'),
                class_name=kwargs.get('class_name'),
                img=kwargs.get('img', None)
            )
        elif user_type == 2:
            user = Faculty.objects.create(
                username=account,
                email=kwargs.get('email', None),
                gender=kwargs.get('gender', '男'),
                name=kwargs.get('name', '系统管理员'),
                department=depart,
                title=kwargs.get('title'),
                img=kwargs.get('img', None)
            )
        elif user_type == 3:
            user = Staff.objects.create(
                username=account,
                email=kwargs.get('email', None),
                gender=kwargs.get('gender', '男'),
                name=kwargs.get('name', '系统管理员'),
                department=depart,
            )
        elif user_type == 4:
            user = Admin.objects.create(
                username=account,
                email=kwargs.get('email', None),
                gender=kwargs.get('gender', '男'),
                name=kwargs.get('name', '系统管理员'),
                department=depart,
            )
        else:
            raise ParseError(detail='Users must have a valid user type')

        return account

        # Only different is to set the is_admin=true

    def create_superuser(self, username, password=None, **kwargs):
        account = self.create_user(username, password, **kwargs)
        account.is_admin = True
        account.is_staff = True
        account.is_superuser = True
        account.save()
        return account


class Department(models.Model):
    name = models.CharField("所在院系", primary_key=True, max_length=100)


class Account(AbstractBaseUser):
    username = models.CharField("教工号/学号", unique=True, max_length=20, primary_key=True)
    email = models.EmailField("电子邮件", unique=False, blank=True, null=True)
    USER_TYPE_CHOICES = (
        (1, '学生'),
        (2, '老师'),
        (3, '教务管理员'),
        (4, '系统管理员'),
    )
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=1)
    objects = AccountManager()

    # 这将是在用户表中搜索用户时的默认查找字段
    USERNAME_FIELD = 'username'

    # REQUIRED_FIELDS列表包含所有需要的字段。默认情况下USERNAME_FIELD，密码字段是自动需要的
    # REQUIRED_FIELDS = ['username']
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


class People(models.Model):
    username = models.OneToOneField(Account, on_delete=models.CASCADE, primary_key=True)
    date_created = models.TimeField('保存日期', auto_now_add=True)
    date_modified = models.TimeField(auto_now=True)
    email = models.EmailField("电子邮件", blank=True, null=True)
    name = models.CharField("姓名", max_length=20, null=True)
    gender = models.CharField("性别", choices=GENDER_CHOICES, max_length=1, null=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True)


class Student(People):
    img = models.ImageField("个人头像", max_length=1024 * 1024, upload_to="profile", blank=True, null=True)
    grade = models.IntegerField("入学年份", null=False, default=2015)
    major = models.CharField("专业", max_length=100, null=False)
    class_name = models.CharField("所在班级", max_length=100, null=False)


# Professor
class Faculty(People):
    title = models.CharField("职称", max_length=50, blank=True, null=False)  # eg: lecturer,associate professor ....
    img = models.ImageField("个人头像", max_length=1024 * 1024, upload_to="profile", blank=True, null=True)


# Education Advisor/School Official
class Staff(People):
    img = models.ImageField("个人头像", max_length=1024 * 1024, upload_to="profile", blank=True, null=True)


class Admin(People):
    pass

class Course(models.Model):
    cid = models.CharField("课程编号",max_length=100,primary_key=True)
    name = models.CharField("课程名",max_length=100,null=False)
    teacher = models.ManyToManyField(Faculty)
    department = models.ForeignKey(Department,on_delete = models.CASCADE,null=False,)
    credit = models.IntegerField("学分",null=False)
    capacity = models.IntegerField("选课容量",null=False)  #course capacity
    evaluation = models.TextField("考核方式",null=True)   #evaluation method

class Take(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=False)
    course=models.ForeignKey(Course,on_delete = models.CASCADE,null=False)
    teacher=models.ForeignKey(Faculty,on_delete = models.CASCADE,null=False)
    score=models.IntegerField("分数",null=True)
    test_date=models.DateField("考试时间",auto_now=True)

