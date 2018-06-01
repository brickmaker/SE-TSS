from django.db import models
from authentication.models import *

# class Department(models.Model):
#     name = models.CharField("所在院系", primary_key=True, max_length=100)

    # def __str__(self):
    #     return self.name

# class Major(models.Model):
#     depart = models.ForeignKey(Department, verbose_name="所在院系", related_name='major', on_delete=models.CASCADE)
#     major = models.CharField("开设专业", max_length=100, unique=True, primary_key=True)

#     def __str__(self):
#         return self.major

# class Course(models.Model):
#     # STATE_CHOICES = (
#     #     (0, '不通过'),
#     #     (1, '待审批'),
#     #     (2, '已通过'),
#     # )
#     TYPE_CHOICES = (
#         (0,"公共课"),  
#         (1,"专业选修课"),
#         (2,"专业必修课"),
#     )
#     course_id = models.CharField("课号", max_length=10, primary_key=True, default="null")
#     name = models.CharField("名称", max_length=20, unique=True)
#     course_type= models.PositiveSmallIntegerField("课程类别", choices=TYPE_CHOICES)
#     credit = models.FloatField(null=False, default=0)

# class Student(models.Model):
#     id_number = models.CharField("身份证号", primary_key=True, max_length=18, default='null')
#     name = models.CharField("姓名", max_length=20, null=True)
#     major = models.ForeignKey(Major, verbose_name="专业", on_delete=models.CASCADE, null=True)
    

class major_requirement(models.Model):
    major = models.OneToOneField(Major, related_name='mjr_req_major', on_delete=models.CASCADE)
    public_course_mincredit = models.PositiveSmallIntegerField(default=0)
    major_optional_mincredit = models.PositiveSmallIntegerField(default=0)

class major_cul_prog(models.Model):
    major = models.ForeignKey(Major, related_name='mjr_cul_major', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='mjr_cul_cid', on_delete=models.CASCADE)
    term = models.CharField(max_length=10, null=False)

    class Meta:
        unique_together = ('major', 'course', 'term', )

class student_cul_prog(models.Model):
    student = models.ForeignKey(Student, related_name='stu_cul_sid', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='stu_cul_cid', on_delete=models.CASCADE)
    selected = models.BooleanField(default=False)
    term = models.CharField(max_length=10, null=False)

    class Meta:
        unique_together=('student', 'course', 'term', )

class course_select_relation(models.Model):
    PASS_CHOICES = (
        (0, 'unscreened'),
        (1, 'passed'),
        (2, 'unpassed'),
    )
    student = models.ForeignKey(Student, related_name='selecting_sid', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='selecting_cid', on_delete=models.CASCADE)
    pass_state = models.PositiveSmallIntegerField(choices=PASS_CHOICES, default=0)
    date_selected = models.TimeField(auto_now_add=True)

    class Meta:
        unique_together=('student', 'course', )

    def __str__(self):
        return self.student.name + " selected " + self.course.name

class course_selecting_event(models.Model):
    event_id = models.AutoField(primary_key=True)
    event_label = models.CharField(max_length=30, default='未命名选课事件')
    begin_time = models.DateTimeField()
    end_time = models.DateTimeField()
    sec_begin = models.DateTimeField()
    sec_end = models.DateTimeField()
    date_modified = models.TimeField(auto_now=True)
