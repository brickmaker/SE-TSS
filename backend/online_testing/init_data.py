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

tag_list = ['DataBase', 'Computer Architecture', 'Game Theory', 'Greedy Algorithm']

for i in range(100):
    if random.randint(0, 1) == 1:
        response = c.post('/api/online_testing/question/', {
            "description": "This is description of a question.....",
            "type": "Choice",
            "tag": random.choice(tag_list),
            "choice_list": ['choice1', 'choice2',
                            'choice3', 'choice4'],
            "answer_list": [random.randint(0, 4)],
            'level': random.randint(0, 3),
            'provider': 'Zachariah',
            'course': '2000',
        }, HTTP_AUTHORIZATION='JWT ' + data['token'])
    else:
        response = c.post('/api/online_testing/question/', {
            "description": "This is description of a question.....",
            "type": "Judge",
            "tag": random.choice(tag_list),
            "choice_list": ['T', 'F'],
            "answer_list": [1] if random.randint(0, 1) == 1 else [0],
            'level': random.randint(0, 4),
            'provider': 'Zachariah',
            'course': '2000',
        }, HTTP_AUTHORIZATION='JWT ' + data['token'])
    print(response.content.decode('utf-8'))


d = datetime.datetime.now()
response = c.post('/api/online_testing/paper/', {
    "paper_name": "Data Structure MidTerm Exam",
    'auto': True,
    'tag_list': [],
    'start_time': d,
    'deadline': d + datetime.timedelta(days=7),
    'duration': 120,
    'num_choice': 15,
    'num_judge': 10,
    'course': '2000',
}, HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.post('/api/online_testing/paper/', {
        "paper_name": "Data Structure Final Exam",
        'auto': False,
        'question_id_list': [i for i in range(2, 80)],
        'start_time': d + datetime.timedelta(days=2),
        'deadline': d + datetime.timedelta(days=7),
        'duration': 120,
        'course': '2000',
    }, HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))