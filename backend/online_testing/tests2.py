from django.test import TestCase
from django.test import Client
import os, django, time, datetime
import json
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'top.settings')
django.setup()
import random
from authentication.models import *
from online_testing.models import *

#for e in Examination.objects.all():
#    e.delete()

c = Client()

response = c.post('/api/info/get_token', data={
    'username': '3150100000',
    'password': '000000',
})
data = json.loads(response.content.decode('utf-8'))
token = data['token']
HTTP_AUTHORIZATION = 'JWT ' + data['token']

response = c.get('/api/online_testing/paper/?course=211G0200', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.get('/api/online_testing/course/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))
exit(0)

response = c.get('/api/online_testing/analysis/studentGradeList/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.get('/api/online_testing/question/2/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.get('/api/online_testing/paper/', HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.get('/api/online_testing/paper/f9758434-6729-11e8-b335-c48e8f7f190e/',
                 HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.post('/api/online_testing/examination/', data={
    'paper': 'f9758434-6729-11e8-b335-c48e8f7f190e',
}, HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.get('/api/online_testing/examination/info/?paper_id=f9758434-6729-11e8-b335-c48e8f7f190e',
                 HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

qs = [2, 8, 9, 19, 28, 29, 30, 31, 32, 34, 35, 43, 45, 52, 54, 57, 59, 60, 73, 77, 79, 82, 89, 95, 99]

ans = []
d = {}
for q in qs:
    d[str(q)] = [0]

response = c.post('/api/online_testing/examination/25984c62-67be-11e8-a2e5-c48e8f7f190e/conservation/', data={
    'answers': [d],
}, HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

exit(0)

response = c.get('/api/online_testing/examination/25984c62-67be-11e8-a2e5-c48e8f7f190e/left_time/',
                 HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))

response = c.post('/api/online_testing/examination/25984c62-67be-11e8-a2e5-c48e8f7f190e/submission/', data={

}, HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
print(response.content.decode('utf-8'))
exit(0)
