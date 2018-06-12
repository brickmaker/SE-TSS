#coding=utf-8
from django.http import JsonResponse
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from xkxt.models import *
from xkxt.serializers import *
import json
from django.db.models import Count, Max
from datetime import date, datetime  

'''
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
'''
class MyEncoder(json.JSONEncoder):  
    def default(self, obj):  
        if isinstance(obj, datetime):  
            s = obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, date):  
            s = obj.strftime('%Y-%m-%d')  
        else:  
            s = json.JSONEncoder.default(self, obj)
        return s

def get_prog_from_uid(getuid):
    is_form=True
    student = Student.objects.get(id_number=getuid)
    culs = student_cul_prog.objects.filter(student=student)
    s = student_cul_prog_serializer(culs, many=True)
    if not culs:
        is_form=False
        major = Student.objects.get(id_number=getuid).major
        culs = major_cul_prog.objects.filter(major=major)
        s = major_cul_prog_serializer(culs, many=True)

    dic={'is_form': True, 'public': [], 'major_op': [], 'major_comp': []}
    dic['is_form']=is_form
    for var in list(s.data):
        newdict={}
        if is_form:
            newdict['selected']=var['selected']
        newdict['term']=var['term']
        newdict.update(var['course'])

        if newdict['course_type'] == 0:
            dic['public'].append(newdict)
        elif newdict['course_type'] == 1:
            dic['major_op'].append(newdict)
        elif newdict['course_type'] == 2:
            dic['major_comp'].append(newdict)
    return dic

def get_sched_from_uid(getuid):
    student = Student.objects.get(id_number=getuid)
    retlist=[]
    selects = course_select_relation.objects.filter(student=student)
    for var in selects:
        newdict={}
        s = course_select_relation_serializer(var)
        newdict['state']=s.data['pass_state']
        newdict.update(s.data['course'])
        newdict['remain'] = newdict['capacity']-course_select_relation.objects. \
        filter(course=var.course).aggregate(now_take=Count('student'))['now_take']
        retlist.append(newdict)
    return retlist

def get_stu_list_from_cid(courseid):
    course = Course.objects.get(course_id=courseid)
    retlist=[]
    selects = course_select_relation.objects.filter(course=course)
    for var in selects:
        newdict={}
        s = course_select_relation_serializer(var)
        newdict['state']=s.data['pass_state']
        newdict.update(s.data['student'])
        retlist.append(newdict)
    return retlist

def get_remain_of_course(cid):
    course=Course.objects.get(course_id=cid)
    related_students = course_select_relation.objects.filter(course=course)
    return course.capacity-related_students.aggregate(now_take=Count('student'))['now_take'], course

def is_in_normal_last():
    id = course_selecting_event.objects.aggregate(Max('event_id'))['event_id__max']
    event = course_selecting_event.objects.get(event_id=id)
    nowtime = datetime.now()
    print(nowtime)
    print(event.begin_time)
    if event.begin_time.replace(tzinfo=None) < nowtime and event.end_time.replace(tzinfo=None) > nowtime:
        return True
    else:
        return False


@csrf_exempt
def cul_prog(request):
    if request.method == 'GET': 
        return JsonResponse(get_prog_from_uid(request.GET['uid']))

    elif request.method == 'POST':
        data=json.loads(request.body.decode('utf-8'))
        uid=data['uid']
        for c in data['courses']:
            if not c[0] or not c[1]:
                break
            student=Student.objects.get(id_number=uid)
            course=Course.objects.get(course_id=c[0])
            try:
                student_cul_prog(student=student, course=course, selected=False, term=c[1]).save()
            except:
                print('unique constrain failed')

        return JsonResponse(get_prog_from_uid(uid))

# 还没有时间- -
@csrf_exempt
def course(request):
    if request.method == 'GET':
        if 'uid' in request.GET:
            return JsonResponse(get_sched_from_uid(request.GET['uid']), safe=False)
        else:
            userid = request.GET['userid']
            rest = Course.objects.all()
            for i in range(4):
                condi = ['name', 'classroom', 'teacher', 'course_type'][i]
                if condi in request.GET:
                    reg = request.GET[condi].strip(',').replace(',', '|')
                    if i==0:
                        rest = rest.filter(name__iregex=reg)
                    elif i==1:
                        pass
                        #rest = rest.filter(classroom__iregex=reg)
                    elif i==3:
                        rest = rest.filter(course_type__iregex=reg)
                    elif i==2:
                        teachers = Faculty.objects.filter(name__iregex=reg)
                        print(teachers)
                        for var in teachers:
                            rest = rest.filter(faculty=var)
                        if not teachers:
                            rest = rest.none()
            s = CourseDetailSerializer(rest, many=True)
            for var in s.data:
                # var['remain'] = get_remain_of_course(var['course_id'], userid)
                course=Course.objects.get(course_id=var['course_id'])
                student=Student.objects.get(id_number=userid)
                related_students = course_select_relation.objects.filter(course=course)
                var['remain']= var['capacity']-related_students.aggregate(now_take=Count('student'))['now_take']
                try:
                    relation = related_students.get(student=student)
                    if relation.pass_state < 2:
                        var['state']=relation.pass_state    
                except:
                    pass
            return JsonResponse(s.data, safe=False)

    elif request.method == 'POST':
        if not is_in_normal_last():
            return JsonResponse({'if_ok': False, 'reason': 'not in normal selecting period'})
        data=json.loads(request.body.decode('utf-8'))
        try:
            uid=data['uid']
            courseid=data['courseid']
            if_select=data['type']
            student=Student.objects.get(id_number=uid)
            course=Course.objects.get(course_id=courseid)
            related_students = course_select_relation.objects.filter(course=course)
            remain = course.capacity - related_students.aggregate(now_take=Count('student'))['now_take']
            if if_select:
                print(data)
                if remain > 0 or 'compul' in data:
                    course_select_relation(student=student, course=course).save()
                    return JsonResponse({'if_ok': True, 'state': 0})
                else:
                    return JsonResponse({'if_ok': False, 'state': 0})
            else:           # 暂时假设随便退课
                course_select_relation.objects.filter(student=student).get(course=course).delete()
                return JsonResponse({'if_ok': True})
        except:
            return JsonResponse({'if_ok': False})

@csrf_exempt
def course_info(request):
    if request.method == 'GET':
        try:
            chosen = Course.objects.get(course_id=request.GET['courseid'])
            s = CourseDetailSerializer(chosen)
            s = s.data
            s['course_exist'] = True
        except:
            s = {}
            s['course_exist'] = False
        return JsonResponse(s)

@csrf_exempt
def course_student(request):
    if request.method == 'GET':
        return JsonResponse(get_stu_list_from_cid(request.GET['courseid']), safe=False)

@csrf_exempt
def management(request):
    if request.method == 'GET':
        if request.GET['type'] == '0':
            id = course_selecting_event.objects.aggregate(Max('event_id'))['event_id__max']
            event = course_selecting_event.objects.get(event_id=id)
            ret = {'begin_time': eval(json.dumps(event.begin_time, cls=MyEncoder)), 
                'end_time': eval(json.dumps(event.end_time, cls=MyEncoder)), 
                'sec_begin': eval(json.dumps(event.sec_begin, cls=MyEncoder)), 
                'sec_end': eval(json.dumps(event.sec_end, cls=MyEncoder)), 
                'event_id': eval(json.dumps(event.event_id)), 
            }
            return JsonResponse(ret)
        elif request.GET['type'] == '1':
            name = request.GET['coursename']
            if 'uid' in request.GET:
                userid = request.GET['uid']
                student=Student.objects.get(id_number=userid)
            courses=Course.objects.filter(name__icontains=name)
            s = CourseDetailSerializer(courses, many=True)
            for var in s.data:
                course=Course.objects.get(course_id=var['course_id'])
                related_students = course_select_relation.objects.filter(course=course)
                var['remain']= var['capacity']-related_students.aggregate(now_take=Count('student'))['now_take']
                try:
                    relation = related_students.get(student=student)
                    if relation.pass_state < 2:
                        var['state']=relation.pass_state    
                except:
                    pass
            return JsonResponse(s.data, safe=False)

    elif request.method == 'POST':
        data=json.loads(request.body.decode('utf-8'))
        if data['type'] == '0':
            # try:
                # print(data)
            cse = course_selecting_event(begin_time=data['begin_time'], end_time=data['end_time'], 
                sec_begin=data['sec_begin'], sec_end=data['sec_end'], )
            if 'event_label' in data:
                cse.event_label=data['event_label']
            cse.save()
            # except:
                # print('faied to update course selecting event!!!!')
                # return JsonResponse({'if_ok': False, })
            return JsonResponse({'if_ok': True, })






