from django.db import models


# Create your models here.
class Plate(models.Model):
    create_time = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50, blank=True, default="")
    description = models.CharField(max_length=200, blank=True, default="")
    valid = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Reply(models.Model):
    create_time = models.DateTimeField(auto_now_add=True)
    uid = models.ForeignKey("User")
    content = models.TextField()
    post_id = models.ForeignKey("Post")
    reply_to = models.IntegerField(null=True)
    valid = models.BooleanField(default=True)

    def __str__(self):
        return self.content


class Notice(models.Model):
    create_time = models.DateTimeField(auto_now_add=True)
    uid = models.ForeignKey("User")
    title = models.CharField(max_length=50, blank=True, default="")
    content = models.TextField()
    plate_id = models.ForeignKey("Plate")
    valid = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Plate_Plate(models.Model):
    father_plate = models.IntegerField(null=True)
    child_plate = models.IntegerField(null=True)
    valid = models.BooleanField(default=True)


class Plate_admin(models.Model):
    plate_id = models.IntegerField()
    admin_id = models.IntegerField()
    valid = models.BooleanField(default=True)


