from django.test import TestCase
from django.urls import include, path, reverse
from rest_framework import status
import os
from rest_framework.test import APITestCase
from . import models
import json

# Create your tests here.

class BasicTests(APITestCase):
    def test_index_page_is_ok(self):
        """Check basic index is ok
        """
        url = reverse('index')
        response = self.client.get(url,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content.decode("utf-8")), {'key': 'Are you OK??'})
        
class AnnoucementTests(APITestCase):
        
    def setUp(self):
        models.User.objects.create(id='1',name='Aaron',account_id="3150100000")
        models.User.objects.create(id='2',name='Bob',account_id="3150100001.0")
        models.Section.objects.create(name='计算机科学与技术',type='CE')
        models.Section.objects.create(name='软件工程',type='CL')
        models.Section.objects.create(name='王章野',type='TL')
        models.College.objects.create(name='计算机科学与技术',code='A',section_id=1,)
        models.Course.objects.create(name='软件工程',code='B',section_id=2,college_id=1)
        models.Teacher.objects.create(name='王章野',section_id=3,course_id=1,college_id=1)
        
       
    def test_post_method(self):
        #Invalid Parameter
        url = reverse('announcements')
        data = {}
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        #Invalid Parameter
        url = reverse('announcements')
        data = {'uiddd':'3','path':{'collegeid':1,'courseid':1,'teacherid':1},'content':'这是一条新公告',
                'title':'这是公告的标题'}
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        #User doesn't exist
        url = reverse('announcements')
        data = {'uid':'998','path':{'collegeid':1,'courseid':1,'teacherid':1},'content':'这是一条新公告',
                'title':'这是公告的标题'}
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
        #Section doesn't exist
        url = reverse('announcements')
        data = {'uid':'1','path':{'collegeid':1,'courseid':1,'teacherid':998},'content':'这是一条新公告',
                'title':'这是公告的标题'}
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
        #Basic Case
        url = reverse('announcements')
        data = {'uid':'1','path':{'collegeid':1,'courseid':1,'teacherid':1},'content':'这是一条新公告',
                'title':'这是公告的标题'}
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(response_data,data) 

class CourseNewPostTests(APITestCase):
        
    def setUp(self):
        models.User.objects.create(id='1',name='Aaron',account_id="3150100000")
        models.User.objects.create(id='2',name='Bob',account_id="3150100001.0")
        models.Section.objects.create(name='计算机科学与技术',type='CE')
        models.Section.objects.create(name='软件工程',type='CL')
        models.Section.objects.create(name='王章野',type='TL')
        models.College.objects.create(name='计算机科学与技术',code='A',section_id=1,)
        models.Course.objects.create(name='软件工程',code='B',section_id=2,college_id=1)
        models.Teacher.objects.create(name='王章野',section_id=3,course_id=1,college_id=1)
        
       
    def test_post_method(self):        
        #Basic Case
        url = reverse('course_newpost')
        data = {'uid':'1','collegeId':'1','courseId':'1','content':'这是一个新帖子',
                'title':'这是帖子的标题','fileId':'abcd'}
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(response_data['error'],None)       

class TeacherNewPostTests(APITestCase):
        
    def setUp(self):
        models.User.objects.create(id='1',name='Aaron',account_id="3150100000")
        models.User.objects.create(id='2',name='Bob',account_id="3150100001.0")
        models.Section.objects.create(name='计算机科学与技术',type='CE')
        models.Section.objects.create(name='软件工程',type='CL')
        models.Section.objects.create(name='王章野',type='TL')
        models.College.objects.create(name='计算机科学与技术',code='A',section_id=1,)
        models.Course.objects.create(name='软件工程',code='B',section_id=2,college_id=1)
        models.Teacher.objects.create(name='王章野',section_id=3,course_id=1,college_id=1)
        
       
    def test_post_method(self):        
        #Basic Case
        url = reverse('teacher_newpost')
        data = {'uid':'1','collegeId':'1','courseId':'1','teacherId':'1','content':'这是一个新帖子',
                'title':'这是帖子的标题','fileId':'abcd'}
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(response_data['error'],None)           
        
class NewReplyTests(APITestCase):
        
    def setUp(self):
        models.User.objects.create(id='1',name='Aaron',account_id="3150100000")
        models.User.objects.create(id='2',name='Bob',account_id="3150100001.0")
        models.Section.objects.create(name='计算机科学与技术',type='CE')
        models.Section.objects.create(name='软件工程',type='CL')
        models.Section.objects.create(name='王章野',type='TL')
        models.College.objects.create(name='计算机科学与技术',code='A',section_id=1,)
        models.Course.objects.create(name='软件工程',code='B',section_id=2,college_id=1)
        models.Teacher.objects.create(name='王章野',section_id=3,course_id=1,college_id=1)
        models.Thread.objects.create(title="帖子一号",content="啥都没有",poster_id=1,section_id=3)
        
       
    def test_post_method(self):        
        #Basic Case
        url = reverse('post_newreply')
        data = {'uid':'1','postId':'1','content':'lzsb','fileId':'abcd'}
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(response_data['error'],None)

class CommentTests(APITestCase):
        
    def setUp(self):
        models.User.objects.create(id='1',name='Aaron',account_id="3150100000")
        models.User.objects.create(id='2',name='Bob',account_id="3150100001.0")
        models.Section.objects.create(name='计算机科学与技术',type='CE')
        models.Section.objects.create(name='软件工程',type='CL')
        models.Section.objects.create(name='王章野',type='TL')
        models.College.objects.create(name='计算机科学与技术',code='A',section_id=1,)
        models.Course.objects.create(name='软件工程',code='B',section_id=2,college_id=1)
        models.Teacher.objects.create(name='王章野',section_id=3,course_id=1,college_id=1)
        models.Thread.objects.create(title="帖子一号",content="啥都没有",poster_id=1,section_id=3)
        models.Reply.objects.create(user_id=1,content='SF',post_id=1)
        
       
    def test_post_method(self):        
        #Basic Case
        url = reverse('comment')
        data = {'from':'Aaron','to':'Bob','postId':'1','replyId':'1','content':'lzsb'}
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(response_data['error'],None)     

class FileUploadTests(APITestCase):
    def setUp(self):
        models.User.objects.create(id='1',name='Aaron',account_id="3150100000")
        models.User.objects.create(id='2',name='Bob',account_id="3150100001.0")
        models.Section.objects.create(name='计算机科学与技术',type='CE')
        models.Section.objects.create(name='软件工程',type='CL')
        models.Section.objects.create(name='王章野',type='TL')
        models.College.objects.create(name='计算机科学与技术',code='A',section_id=1,)
        models.Course.objects.create(name='软件工程',code='B',section_id=2,college_id=1)
        models.Teacher.objects.create(name='王章野',section_id=3,course_id=1,college_id=1)
        models.Thread.objects.create(title="帖子一号",content="啥都没有",poster_id=1,section_id=3)
        models.Reply.objects.create(user_id=1,content='SF',post_id=1)
        
       
    def test_post_method(self):        
        #Basic Case
        url = reverse('upload_file')
        
        with open(os.path.join(os.path.dirname(__file__), 'test_url.md'),"rb") as fp:
            headers = {'HTTP_CONTENT_DISPOSITION': 'attachment; filename={}'.format('test_url.md')}
            response = self.client.post(url,{'name': 'helo','attachment': fp},**headers)
            
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(response_data['error'],None)     
        
    