from django.test import TestCase
from django.urls import include, path, reverse
from rest_framework import status
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
        models.User.objects.create(uid='1',name='Aaron')
        models.User.objects.create(uid='2',name='Bob')
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
        
        #Basic Case 1, also check the order is right(latest first)
        url = reverse('announcements')
        data = {'uid':'1','path':{'collegeid':1,'courseid':1,'teacherid':1},'content':'这是一条新公告',
                'title':'这是公告的标题'}
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(response_data,data)        
        
    