from django.test import TestCase
from django.test import Client
import os, django, time
import json, random
import numpy as np
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'top.settings')
django.setup()
from authentication.models import *
from online_testing.models import *
from xkxt.models import *
import datetime

Question.objects.all().delete()
Examination.objects.all().delete()
Paper.objects.all().delete()

course_data = [
    {'course_id': '211G0200', 'name': 'Python程序设计', 'credit': 3.0},
    {'course_id': '061B0170', 'name': '微积分Ⅰ', 'credit': 4.5},
    {'course_id': '211B0010', 'name': '离散数学及其应用', 'credit': 4.0},
    {'course_id': '211C0010', 'name': '面向对象程序设计', 'credit': 2.5},
]

tag_list = ['tree', 'list', 'array', 'set', 'graph', 'queue', 'hash', 'stack']
faculty_list = []
course_list = []
student_list = []
department_list = []

for faculty in Faculty.objects.all():
    faculty_list.append(faculty)

for course in Course.objects.all():
    course_list.append(course)

for student in Student.objects.all():
    student_list.append(student)

def papare_course():
    for d in course_data:
        course = Course(course_id=d['course_id'], name=d['name'], course_type=2, credit=d['credit'],
                        capacity=100, semester=random.randint(0, 6),
                        department=Department.objects.all().get(name='计算机学院'), assessment='考试',
                        state=2)
        course.save()
        course.faculty.set(random.sample(faculty_list, 2))

s = 'it has been a long day without you my friend, and i will talk ' \
    'you all about it when I see you again. we have come a long day from ' \
    'where we began. oh I will talk you all all about it when I see you ' \
    'again'
# insert question
def insert_question():
    question_list = []
    for i in range(500):
        print('question', i)
        faculty = random.choice(faculty_list)
        if random.randint(0, 1) == 1:
            t = 'Judge'
            answers = str([random.randint(0, 1)])
            choices = str(['T', 'F'])
        else:
            t = 'Choice'
            answers = str([random.randint(0, 3)])
            choices = str(['%d See You Again' % i, '%d Come a Long Day' % i,
                           '%d My Heart will go on' % i, '%d Hero' % i])
        question = Question(
            description='Description of question%d: %s' % (i, s),
            choice_list=choices,
            answer_list=answers,
            tag=random.choice(tag_list),
            type=t,
            level=random.randint(0, 4),
            provider=faculty,
            course=random.choice(faculty.teacher_course.all()),
        )
        question_list.append(question)

    Question.objects.bulk_create(question_list)


# insert paper
def insert_paper():
    for i in range(50):
        print('paper', i)
        faculty = random.choice(faculty_list)
        d = datetime.datetime.now()
        course = random.choice(faculty.teacher_course.all())
        paper = Paper(
            paper_name='2017-2018 %s Examination%d' % (course.name, i),
            start_time=d,
            deadline=d + datetime.timedelta(days=14),
            duration=random.randint(120, 200),
            teacher=faculty,
            course=course,
        )
        question_set = Question.objects.all().filter(course=course)
        cnt = question_set.count()
        qs = [q for q in question_set]
        question_id_list = random.sample(
            qs,
            random.randint(cnt // 2, cnt)
        )
        ss = [q.level for q in question_id_list]
        ss = 100 * (np.array(ss) + 1) / (np.sum(ss) + len(ss))
        ss[ss < 1] = 1
        ss = [int(s) for s in ss]
        question_id_list = [q.question_id for q in question_id_list]
        paper.score_list = str(ss)
        assert (len(ss) == len(question_id_list))
        paper.save()
        paper.question_id_list.set(question_id_list)
        paper.save()

def insert_exam():
    c = Client()
    for student in student_list:
        response = c.post('/api/info/get_token', data={
            'username': student.username.username,
            'password': student.id_number[-6:],
        })
        data = json.loads(response.content.decode('utf-8'))
        HTTP_AUTHORIZATION = 'JWT ' + data['token']
        random.shuffle(course_list)
        for course in course_list[:5]:
            paper_list = Paper.objects.all().filter(course=course)
            paper_list = [paper for paper in paper_list]
            if len(paper_list) < 2:
                paper_list = random.sample(
                    paper_list, 1)
            else:
                paper_list = random.sample(
                    paper_list, 2)
            for paper in paper_list:
                l = [i.question_id for i in paper.question_id_list.all()]
                d = {}
                for q in l:
                    d[str(q)] = [0] if random.randint(0, 1) == 1 else [1]
                response = c.post('/api/online_testing/examination/', data={
                    'paper': str(paper.paper_id),
                }, HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
                data = json.loads(response.content.decode('utf-8'))
                print(data['exam_id'])
                response = c.post('/api/online_testing/examination/%s/conservation/' % data['exam_id'], data={
                    'answers': [d],
                }, HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
                print(response.content.decode('utf-8'))
                response = c.post('/api/online_testing/examination/%s/submission/' % data['exam_id'], data={
                }, HTTP_AUTHORIZATION=HTTP_AUTHORIZATION)
                print(response.content.decode('utf-8'))

if __name__ == '__main__':
    papare_course()
    insert_question()
    insert_paper()
    insert_exam()