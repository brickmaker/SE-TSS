from django.db import models
from authentication.models import *

# Create your models here.


class Request(models.Model):
    STATUS_CHOICE = (
        (0, "未处理"),
        (1, "已解决"),
        (2, "无法解决"),
    )

    request_id = models.AutoField(primary_key=True)
    teacher = models.ForeignKey(Faculty, related_name='request_tid', on_delete=models.CASCADE)
    topic = models.CharField("标题",max_length=50, null=False)
    content = models.TextField("请求内容")
    status = models.SmallIntegerField("处理状态", choices=STATUS_CHOICE, default=0)

class ClassRoom(models.Model):

    CAMP_CHOICE = (
        (0, "紫金港"),
        (1, "玉泉"),
        (2, "西溪"),
        (3, "华家池"),
    )

    classroom_id = models.AutoField(primary_key=True)
    campus = models.PositiveSmallIntegerField("校区",choices=CAMP_CHOICE,default=0)
    building = models.CharField("教学楼", max_length=20)
    room = models.CharField("教室", max_length=20, null=False)
    classroom_capacity = models.IntegerField("容量", null=False)

class course_teacher_time_classroom_relation(models.Model):
    time = models.CharField("时间", max_length=20)
    teacher = models.ForeignKey(Faculty,related_name="timetable_tid", on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name="timetable_cid", on_delete=models.CASCADE)
    classroom = models.ForeignKey(ClassRoom,related_name="timetable_rid", on_delete=models.CASCADE)

    @property
    def location(self):
        classroomlocation = self.classroom.get_campus_display() + self.classroom.building + self.classroom.room
        return classroomlocation