from django.contrib import admin

# Register your models here.
from authentication.models import *

admin.site.register(Account)

admin.site.register(Student)
admin.site.register(Department)
