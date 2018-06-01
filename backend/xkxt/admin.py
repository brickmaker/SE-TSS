from django.contrib import admin
from xkxt import models

# class DepartmentAdmin(admin.ModelAdmin):
# 	list_display = ['name']

# class MajorAdmin(admin.ModelAdmin):
# 	list_display = ['depart', 'major']

admin.site.register(models.Department)
admin.site.register(models.Major)
admin.site.register(models.Student)
admin.site.register(models.Course)
admin.site.register(models.major_requirement)
admin.site.register(models.major_cul_prog)
admin.site.register(models.student_cul_prog)
admin.site.register(models.coures_select_relation)
admin.site.register(models.course_selecting_event)
