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
        
class SubscriptionTests(APITestCase):
    
    def setUp(self):
        models.User.objects.create(uid='000',name='Aaron')
        models.User.objects.create(uid='001',name='Bob')
        models.Section.objects.create(name='计算机科学与技术')
        models.Section.objects.create(name='软件工程')
        models.Thread.objects.create(title='Hello,cpp', poster_id='000',section_id=1,date="1970-1-1")
        models.Thread.objects.create(title='Hello,go',  poster_id='000',section_id=1,date="1970-1-1")
        models.Thread.objects.create(title='Hello,scheme',poster_id='000',section_id=2,date="1970-1-1")
        models.Thread.objects.create(title='Hello,rust',poster_id='000',section_id=2,date="1970-1-2")
        models.Subscribe.objects.create(user_id = '000',section_id=1,date="1970-1-1")
        models.Subscribe.objects.create(user_id = '000',section_id=2,date="1970-1-1")
        models.Subscribe.objects.create(user_id = '001',section_id=2,date="1970-1-1")
        
    def test_get_subscription(self):
        
        #No Parameter given
        url = reverse('subscriptions')
        data = {}
        response = self.client.get(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
        #Wrong parameter
        url = reverse('subscriptions')
        data = {'user_id': '000','token':'THIS IS A TOKEN SAMPLE'}
        response = self.client.get(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
        #User doesn't exist
        url = reverse('subscriptions')
        data = {'uid': '123','token':'THIS IS A TOKEN SAMPLE'}
        response = self.client.get(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
                
        #Basic Case 1, also check the order is right(latest first)
        url = reverse('subscriptions')
        data = {'uid': '001','token':'THIS IS A TOKEN SAMPLE'}
        response = self.client.get(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(response_data[0]['area']['name'],"软件工程")        
        self.assertEqual(response_data[0]['newPosts'][0]['title'],"Hello,rust")
        self.assertEqual(response_data[0]['newPosts'][1]['title'],"Hello,scheme")
        
        #Basic Case 2
        url = reverse('subscriptions')
        data = {'uid': '000','token':'THIS IS A TOKEN SAMPLE'}
        response = self.client.get(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        response_data = json.loads(response.content.decode("utf-8"))
        self.assertEqual(len(response_data),2)
    