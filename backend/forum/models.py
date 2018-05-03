from django.db import models


# Create your models here.
class Plate(models.Model):
    create_time = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50, blank=True, default="")
    description = models.CharField(max_length=200, blank=True, default="")
    valid = models.BooleanField(default=True)
    root_plate = models.ManyToManyField('self', symmetrical=False, related_name='plate')
    admin = models.ManyToManyField('User',symmetrical=False,related_name='plate')

    def __unicode__(self):
        return self.title


class Reply(models.Model):
    create_time = models.DateTimeField(auto_now_add=True)
    uid = models.ForeignKey("User", on_delete=models.CASCADE, related_name='reply')
    content = models.TextField()
    post_id = models.ForeignKey("Thread", on_delete=models.CASCADE, related_name='reply')
    reply_to = models.ForeignKey('self', on_delete=models.CASCADE, null=True, related_name='reply')
    valid = models.BooleanField(default=True)

    def __unicode__(self):
        return self.content


class Notice(models.Model):
    create_time = models.DateTimeField(auto_now_add=True)
    uid = models.ForeignKey("User", on_delete=models.CASCAD, related_name='notice')
    title = models.CharField(max_length=50, blank=True, default="")
    content = models.TextField()
    plate_id = models.ForeignKey("Plate", on_delete=models.CASCAD, related_name='notice')
    valid = models.BooleanField(default=True)

    def __unicode__(self):
        return self.title

#
# class Plate_Plate(models.Model):
#     father_plate = models.IntegerField(null=True)
#     child_plate = models.IntegerField(null=True)
#     valid = models.BooleanField(default=True)
#
#
# class Plate_admin(models.Model):
#     plate_id = models.IntegerField()
#     admin_id = models.IntegerField()
#     valid = models.BooleanField(default=True)


class User(models.Model):
    id = models.CharField(max_length=20,primary_key=True)
    name = models.CharField(max_length=50)
    signature = models.TextField()
    avatar = models.ImageField()
    
    def __str__(self):
        return '%s %s'%(self.id,self.name)

        
class Thread(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    poster = models.ForeignKey('User.id',on_delete=models.CASCADE) 
    section = models.ForeignKey('Section',on_delete=models.CASCADE)
    
    CLOSED = 'CL'
    OPEN = 'OP'
    THREAD_STATUS_CHOICES = (
        (CLOSED,'closed'),
        (OPEN,'open'),
    )
    
    status = models.CharField(
        max_length=2,
        choices=THREAD_STATUS_CHOICES,
        default=OPEN,
    )
    
    def __str__(self):
        return self.title
 

class Attachment(models.Model):
    name = models.CharField(max_length=50)
    thread = models.ForeignKey('Thread',on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

    
class Message(models.Model):
    sender_id = models.ForeignKey('User',on_delete=models.CASCADE,related_name='sender')
    receiver_id = models.ForeignKey('User',on_delete=models.CASCADE,related_name='receiver')
    content = models.TextField()
    
    def __str__(self):
        return 'From %s to %s'%(self.sender_id,self.receiver_id)

        
class Subscribe(models.Model):
    user_id = models.ForeignKey('User',on_delete=models.CASCADE,related_name='user')
    section_id = models.ForeignKey('User',on_delete=models.CASCADE,related_name='section')
    
    def __str__(self):
        return '%s subscribed %s'(self.user_id,self.section_id)
    
