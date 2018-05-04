from django.test import TestCase
from django.urls import include, path, reverse
from rest_framework import status
from rest_framework.test import APITestCase
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
    def test_get_subscription(self):
        """
        """
        url = reverse('subscriptions')
        data = {'uid': '315','token':'give me subscriptions'}
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content.decode("utf-8")), data)
    