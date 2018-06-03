from django.test import TestCase
from django.test import Client
import os, django, time, datetime
import json
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'top.settings')
django.setup()
import random
from authentication.models import *
from online_testing.models import *


c = Client()

response = c.post('/api/info/get_token', data={
        'username': '2110100000',
        'password': '000000',
    })
data = json.loads(response.content.decode('utf-8'))

token = data['token']
HTTP_AUTHORIZATION = 'JWT ' + data['token']

response = c.get('/api/online_testing/question/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.get('/api/online_testing/question/2/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))
exit(0)

response = c.post('/api/online_testing/question/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION, data={
        "description": "In the red-black tree that results after successively inserting the "
                       "keys 41; 38; 31; 12; 19; "
                       "8 into an initially empty red-black tree, which one of the following "
                       "statements is FALSE?",
        "type": "Choice",
        "tag": "Red-Black Tree",
        "choice_list": ['38 is the root', '19 and 41 are siblings, and they are both red',
                        '12 and 31 are siblings, and they are both black', '8 is red'],
        "answer_list": [1],
        'level': 2,
        'course': '2000',
        'provider': '2110100000',
    })
print(response.content.decode('utf-8'))