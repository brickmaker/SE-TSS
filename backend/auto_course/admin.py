from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(ClassRoom)
admin.site.register(Request)
admin.site.register(course_teacher_time_classroom_relation)
