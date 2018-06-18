from django.db import models
from django.db import transaction
import django.utils.timezone as timezone
from rest_framework.exceptions import APIException, ParseError, NotFound
# Create your models here.

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager

from authentication.models import Student,Course,Faculty

class Take(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=False)
    course=models.ForeignKey(Course,on_delete = models.CASCADE,null=False)
    teacher=models.ForeignKey(Faculty,on_delete = models.CASCADE,null=False)
    score=models.IntegerField("分数",null=True,default=0)
    test_date=models.DateField("考试时间",auto_now=True)


class StudentAnalysis(Student):
    rank = models.IntegerField("排名", null=True)

class Application(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=False)
    course=models.ForeignKey(Course,on_delete = models.CASCADE,null=False)
    teacher=models.ForeignKey(Faculty,on_delete = models.CASCADE,null=False)
    title=models.CharField("标题",null=False,max_length=32)
    apply_des=models.CharField("申请说明",null=False,max_length=32)
    state=models.IntegerField("申请状态",default=0)  # -1表示删除或者拒绝，0表示申请中，1表示通过
    create_time=models.DateField("申请时间",auto_now=True)



