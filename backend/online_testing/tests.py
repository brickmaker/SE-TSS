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


response = c.get('/api/online_testing/analysis/tag/?course_id=1001&tag=queue&tag=stack',
                 HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

exit(0)

response = c.get('/api/online_testing/course/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))
exit(0)

response = c.delete('/api/online_testing/paper/98a83c7a-7a6e-11e8-ad7b-484520d476fe/',
                    HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))
exit(0)

response = c.get('/api/online_testing/course/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))


exit(0)

response = c.get('/api/online_testing/analysis/questionTypeList/?course_id=211G0200',
                 HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.get('/api/online_testing/analysis/testList/?course_id=211G0200',
                 HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.get('/api/online_testing/analysis/studentList/',
                 HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

exit(0)
d = datetime.datetime.now()
response = c.post('/api/online_testing/paper/', {
    'teacher': '2110100000', 'duration': 120, 'num_judge': 6, 'num_choice': 5, 'course': '211B0010',
    'tag_list': ['Game Theory', 'DataBase'], 'paper_name': '风骚', 'start_time': '2017-05-24T10:30',
    'auto': True, 'deadline': '2019-05-24T10:30'
}, HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))
print(data)

exit(0)

course_list = []

faculty = Faculty.objects.all().get(username='2110100000')
for course in faculty.teacher_course.all():
    course_list.append(course.course_id)


for i in range(10):
    d = datetime.datetime.now()
    response = c.post('/api/online_testing/paper/', {
        "paper_name": "Paper Exam %d" % i,
        'auto': True,
        'tag_list': [],
        'start_time': d,
        'deadline': d + datetime.timedelta(days=7),
        'duration': 120,
        'num_choice': 15,
        'num_judge': 10,
        'course': random.choice(course_list),
    }, HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
    print(response.content.decode('utf-8'))

exit(0)

response = c.get('/api/online_testing/question/tags_and_teachers/?course_id=211G0200', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.get('/api/online_testing/question/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.get('/api/online_testing/question/2/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.get('/api/online_testing/paper/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.get('/api/online_testing/paper/743ab0a4-6efc-11e8-aaae-c48e8f7f190e/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

exit(0)

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

response = c.get('/api/online_testing/paper/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
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