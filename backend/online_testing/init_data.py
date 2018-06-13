from django.test import TestCase
from django.test import Client
import os, django, time, datetime
import json
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'top.settings')
django.setup()
import random
from authentication.models import *
from online_testing.models import *

if False:
    faculty_list = []

    for faculty in Faculty.objects.all():
        faculty_list.append(faculty)

    # faculty_list = ['2110100000', '2110100001', '2110100002', '2110100003']

    course_list = [
        {'course_id': '211G0200', 'name': 'Python程序设计', 'credit': 3.0},
        {'course_id': '061B0170', 'name': '微积分Ⅰ', 'credit': 4.5},
        {'course_id': '211B0010', 'name': '离散数学及其应用', 'credit': 4.0},
        {'course_id': '211C0010', 'name': '面向对象程序设计', 'credit': 2.5},
    ]

    department_list = []

    for department in Department.objects.all():
        department_list.append(department)

    for d in course_list:
        course = Course(course_id=d['course_id'], name=d['name'], course_type=2, credit=d['credit'],
                        capacity=100, semester=random.randint(0, 6),
                        department=random.choice(department_list), assessment='考试',
                        state=2)
        course.save()
        course.faculty.set(random.sample(faculty_list, 2))
        course.save()

c = Client()

course_list = []

for course in Course.objects.all():
    course_list.append(course.course_id)

response = c.post('/api/info/get_token', data={
        'username': '2110100000',
        'password': '000000',
    })
data = json.loads(response.content.decode('utf-8'))

token = data['token']
HTTP_AUTHORIZATION = 'JWT ' + data['token']

tag_list = ['DataBase', 'Computer Architecture', 'Game Theory', 'Greedy Algorithm']
faculty_list = ['2110100000', '2110100001', '2110100002', '2110100003']


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
            'provider': random.choice(faculty_list),
            'course': random.choice(course_list),
        }, HTTP_AUTHORIZATION='JWT ' + data['token'])
    else:
        response = c.post('/api/online_testing/question/', {
            "description": "This is description of a question.....",
            "type": "Judge",
            "tag": random.choice(tag_list),
            "choice_list": ['T', 'F'],
            "answer_list": [1] if random.randint(0, 1) == 1 else [0],
            'level': random.randint(0, 4),
            'provider': random.choice(faculty_list),
            'course': random.choice(course_list),
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
    'course': random.choice(course_list),
}, HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.post('/api/online_testing/paper/', {
        "paper_name": "Data Structure Final Exam",
        'auto': False,
        'question_id_list': [i for i in range(2, 80)],
        'start_time': d + datetime.timedelta(days=2),
        'deadline': d + datetime.timedelta(days=7),
        'duration': 120,
        'course': random.choice(course_list),
    }, HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))