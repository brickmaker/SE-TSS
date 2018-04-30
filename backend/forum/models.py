from django.db import models

# Create your models here.

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
    