from django.db import models
from authentication.models import *
from auto_course.models import *
from auto_course.models import ClassRoom, course_teacher_time_classroom_relation


class major_requirement(models.Model):
    major = models.OneToOneField(Major, related_name='mjr_req_major', on_delete=models.CASCADE)
    public_course_mincredit = models.PositiveSmallIntegerField(default=0)
    major_optional_mincredit = models.PositiveSmallIntegerField(default=0)

class major_cul_prog(models.Model):
    major = models.ForeignKey(Major, related_name='mjr_cul_major', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='mjr_cul_cid', on_delete=models.CASCADE)
    term = models.CharField(max_length=10, null=False)

    class Meta:
        unique_together = ('major', 'course',)

class student_cul_prog(models.Model):
    student = models.ForeignKey(Student, related_name='stu_cul_sid', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='stu_cul_cid', on_delete=models.CASCADE)
    selected = models.BooleanField(default=False)
    term = models.CharField(max_length=10, null=False)

    class Meta:
        unique_together=('student', 'course',)

class course_select_relation(models.Model):
    PASS_CHOICES = (
        (0, 'unscreened'),
        (1, 'passed'),
        (2, 'unpassed'),
    )
    student = models.ForeignKey(Student, related_name='selecting_sid', on_delete=models.CASCADE)
    course = models.ForeignKey(course_teacher_time_classroom_relation, related_name='selecting_cid', on_delete=models.CASCADE)
    pass_state = models.PositiveSmallIntegerField(choices=PASS_CHOICES, default=0)
    date_selected = models.TimeField(auto_now_add=True)

    class Meta:
        unique_together=('student', 'course', )

    def __str__(self):
        return self.student.name + " selected " + self.course.course.name

class course_selecting_event(models.Model):
    event_id = models.AutoField(primary_key=True)
    event_label = models.CharField(max_length=30, default='未命名选课事件')
    begin_time = models.DateTimeField()
    end_time = models.DateTimeField()
    sec_begin = models.DateTimeField()
    sec_end = models.DateTimeField()
    date_modified = models.TimeField(auto_now=True)
    connection_meanwhile = models.IntegerField(null=False, default=200)
    connection_now = models.IntegerField(null=False, default=0)

class login_record(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE, primary_key=True)
    is_login = models.BooleanField(default=False)
