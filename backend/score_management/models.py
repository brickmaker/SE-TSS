from django.db import models
from django.db import transaction
import django.utils.timezone as timezone
from rest_framework.exceptions import APIException, ParseError, NotFound
# Create your models here.

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager

from authentication.models import Student,Course,Faculty,Account
from xkxt.models import course_select_relation

### 这里是copy了第三组和第二组的model，由于他们没PR，所以暂时这样

"""
class ClassRoom(models.Model):
    classroom_id = models.AutoField(primary_key=True)
    classroom_location = models.CharField("地点", max_length=50, unique=True)
    classroom_capacity = models.IntegerField("容量", null=False)

class course_teacher_time_classroom_relation(models.Model):
    time = models.CharField("时间", max_length=5)
    teacher = models.ForeignKey(Faculty,related_name="timetable_tid", on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name="timetable_cid", on_delete=models.CASCADE)
    classroom = models.ForeignKey(ClassRoom,related_name="timetable_rid", on_delete=models.CASCADE)

class course_select_relation(models.Model):
    PASS_CHOICES = (
        (0, 'unscreened'),
        (1, 'passed'),
        (2, 'unpassed'),
    )
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(course_teacher_time_classroom_relation, related_name='selecting_cid', on_delete=models.CASCADE)
    pass_state = models.PositiveSmallIntegerField(choices=PASS_CHOICES, default=0)
    date_selected = models.TimeField(auto_now_add=True)

    class Meta:
        unique_together=('student', 'course', )

    def __str__(self):
        return self.student.name + " selected " + self.course.course.name



### 测试用model
class Take(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=False)
    course=models.ForeignKey(Course,on_delete = models.CASCADE,null=False)
    teacher=models.ForeignKey(Faculty,on_delete = models.CASCADE,null=False)
    score=models.IntegerField("分数",null=True,default=0)
    test_date=models.DateField("考试时间",auto_now=True)


"""

class StudentAnalysis(models.Model):
    username = models.OneToOneField(Account, on_delete=models.CASCADE, primary_key=True)
    rank = models.IntegerField("排名", null=True)

### 实际用model
class Score_Relation(models.Model):
    course_select_info = models.OneToOneField(course_select_relation, on_delete=models.CASCADE, primary_key=True)
    score=models.IntegerField("分数",null=True,default=0)
    test_date=models.DateField("考试时间",default="2018-07-01")
    modify_state=models.BooleanField("上传状态",default=False)


class Application(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=False)
    course=models.ForeignKey(Course,on_delete = models.CASCADE,null=False)
    teacher=models.ForeignKey(Faculty,on_delete = models.CASCADE,null=False)
    title=models.CharField("标题",null=False,primary_key=True,max_length=32)
    apply_des=models.CharField("申请说明",null=False,max_length=32)
    state=models.IntegerField("申请状态",default=0)  # -1表示删除或者拒绝，0表示申请中，1表示通过
    create_time=models.DateField("申请时间",auto_now=True)
    score=models.IntegerField("分数",null=False)



