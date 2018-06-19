#coding=utf-8
from django.http import JsonResponse
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from authentication.models import *
from xkxt.models import *
from xkxt.serializers import *
import json
from django.db.models import Count, Max
from datetime import date, datetime  
from django.db import transaction
from rest_framework.views import APIView
from rest_framework import permissions
# from authentication.permission import StudentCheck, StaffCheck, FacultyCheck, AdminCheck, CourseCheck, RegisterCheck, LogCheck

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
        
def get_remain_of_arrage_id(cid):
    course = course_teacher_time_classroom_relation.objects.get(id=cid)
    # courses = course_teacher_time_classroom_relation.objects.filter(course__in=course)
    # for c in courses:
    related_students = course_select_relation.objects.filter(course=course)
    return course.classroom.classroom_capacity - related_students.aggregate(now_take=Count('student'))['now_take'], course

def get_remain_of_course(course):
    related_students = course_select_relation.objects.filter(course=course)
    return course.classroom.classroom_capacity - related_students.aggregate(now_take=Count('student'))['now_take']

def is_in_normal_last():
    id = course_selecting_event.objects.aggregate(Max('event_id'))['event_id__max']
    event = course_selecting_event.objects.get(event_id=id)
    nowtime = datetime.now()
    if event.begin_time.replace(tzinfo=None) < nowtime and event.end_time.replace(tzinfo=None) > nowtime:
        return True
    elif event.sec_begin.replace(tzinfo=None) < nowtime and event.sec_end.replace(tzinfo=None) > nowtime:
        return True
    else:
        return False

CAMPUS = ["紫金港", "玉泉", "西溪", "华家池"]
def convert_to_classroom(a, b, c):
    return CAMPUS[a] + b + str(c)
    

def make_course_list(rest, userid):
    if userid != "noflag":
        student = Student.objects.get(username=userid)
    ret = []
    for var in rest:
        tmp = {}
        s = CourseArrangedSerializer(var).data
        tmp['remain'] = get_remain_of_course(var)
        tmp.update(s['course'])
        tmp.update(s['classroom'])
        tmp['time'] = s['time']
        tmp['teacher'] = s['teacher']['name']
        tmp['course_id'] = str(s['id'])
        tmp['classroom'] = convert_to_classroom(tmp['campus'], tmp['building'], tmp['room'])
        tmp['capacity'] = tmp['classroom_capacity']
        if userid != "noflag":
            # whether in the prog
            if student_cul_prog.objects.filter(student=student, course=var.course):
                tmp['is_in'] = True
            else:
                tmp['is_in'] = False
            try:
                relation = course_select_relation.objects.get(student=student, course=var)
                if relation.pass_state < 2:
                    tmp['state'] = relation.pass_state
            except:
                pass
        ret.append(tmp)
    return ret

class cul_prog(APIView):
    def get_prog_from_uid(self, getuid):
        is_form=True
        student = Student.objects.get(username=getuid)
        culs = student_cul_prog.objects.filter(student=student)
        s = student_cul_prog_serializer(culs, many=True)
        if not culs:
            is_form=False
            major = Student.objects.get(username=getuid).major
            culs = major_cul_prog.objects.filter(major=major)
            s = major_cul_prog_serializer(culs, many=True)
            req = major_requirement.objects.get(major=major)
            mmin = req.major_optional_mincredit
            pmin = req.public_course_mincredit

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
        if not is_form:
            dic['pmin'] = pmin
            dic['mmin'] = mmin
        return dic

    def get(self, request, format=None):
        return JsonResponse(self.get_prog_from_uid(request.GET['uid']))

    @transaction.atomic
    def post(self, request, format=None):
        data=json.loads(request.body.decode('utf-8'))
        uid=data['uid']
        for c in data['courses']:
            if not c[0] or not c[1]:
                break
            student=Student.objects.get(username=uid)
            course=Course.objects.get(course_id=c[0])
            try:
                student_cul_prog(student=student, course=course, selected=False, term=c[1]).save()
            except:
                print('unique constrain failed')

        return JsonResponse(self.get_prog_from_uid(uid))


class course(APIView):
    def get_sched_from_uid(self, getuid):
        student = Student.objects.get(username=getuid)
        retlist=[]
        selects = course_select_relation.objects.filter(student=student)
        for var in selects:
            newdict={}
            s = course_select_relation_serializer(var)
            newdict['state'] = s.data['pass_state']
            # newdict.update(s.data['course'])
            newdict['teacher'] = s.data['course']['teacher']['name']
            newdict['classroom'] = convert_to_classroom(s.data['course']['classroom']['campus'], s.data['course']['classroom']['building'], s.data['course']['classroom']['room'])
            newdict['time'] = s.data['course']['time']
            newdict['name'] = s.data['course']['course']['name']
            newdict['credit'] = s.data['course']['course']['credit']
            newdict['capacity'] = s.data['course']['classroom']['classroom_capacity']
            newdict['remain'] = get_remain_of_course(var.course)
            newdict['course_id'] = s.data['course']['id']
            retlist.append(newdict)
        return retlist

    def get(self, request, format=None):
        if 'uid' in request.GET:
            uid = request.GET['uid']
            if(Account.objects.get(username=uid).user_type == 2):
                teacher = Faculty.objects.get(username=uid)
                courses = course_teacher_time_classroom_relation.objects.filter(teacher=teacher)
                ret = []
                for c in courses:
                    tmp = {}
                    tmp['name'] = c.course.name
                    tmp['time'] = c.time
                    tmp['id'] = c.id
                    ret.append(tmp)
                return JsonResponse(ret, safe=False)
            return JsonResponse(self.get_sched_from_uid(request.GET['uid']), safe=False)
        else:
            userid = request.GET['userid']
            rest = course_teacher_time_classroom_relation.objects.all()
            for i in range(5):
                condi = ['name', 'course_type', 'classroom', 'teacher', 'time'][i]
                if condi in request.GET:
                    reg = request.GET[condi].strip(',').replace(',', '|')
                    if i==0:
                        rest = rest.filter(course__name__iregex=reg)
                        # rest = rest.filter(course__in=)
                    elif i==1:
                        rest = rest.filter(course__course_type__iregex=reg)
                    elif i==2:
                        rest = rest.filter(classroom__classroom_location__iregex=reg)
                    elif i==3:
                        teachers = Faculty.objects.filter(name__iregex=reg)
                        rest = rest.filter(teacher__in=teachers)
                    elif i==4:
                        rest = rest.filter(time__iregex=reg)
            return JsonResponse(make_course_list(rest, userid), safe=False)

    @transaction.atomic      
    def post(self, request, format=None):
        #if not is_in_normal_last():
        #    return JsonResponse({'if_ok': False, 'reason': 'not in normal selecting period'})
        data=json.loads(request.body.decode('utf-8'))
        try:
            uid=data['uid']
            courseid=int(data['courseid'])
            if_select=data['type']
            student=Student.objects.get(username=uid)
            course=course_teacher_time_classroom_relation.objects.get(id=courseid)
            related_students = course_select_relation.objects.filter(course=course)
            remain = get_remain_of_course(course)
            if if_select:
                if not is_in_normal_last():
                    return JsonResponse({'if_ok': False, 'state': 0, 'reason': 'not in normal selecting period'})
                if remain > 0 or 'compul' in data:
                    course_select_relation(student=student, course=course).save()
                    return JsonResponse({'if_ok': True, 'state': 0})
                else:
                    return JsonResponse({'if_ok': False, 'state': 0})
            else:           # 暂时假设随便退课
                if not is_in_normal_last():
                    return JsonResponse({'if_ok': False, 'reason': 'not in normal selecting period'})
                course_select_relation.objects.filter(student=student).get(course=course).delete()
                return JsonResponse({'if_ok': True})
        except:
            return JsonResponse({'if_ok': False})

class course_info(APIView):
    def get(self, request, format=None):
        try:
            chosen = course_teacher_time_classroom_relation.objects.get(id=request.GET['courseid'])
            s = CourseArrangedSerializer(chosen)
            s = s.data
            ret = {}
            ret.update(s['course'])
            ret['time'] = s['time']
            ret['teacher'] = s['teacher']['name']
            ret['capacity'] = s['classroom']['classroom_capacity']
            ret['classroom'] = s['classroom']['classroom_location']
        except:
            ret = {}
            ret['course_exist'] = False
        return JsonResponse(ret, safe=False)

class course_student(APIView):
    def get_stu_list_from_cid(self, courseid):
        course = course_teacher_time_classroom_relation.objects.get(id=courseid)
        retlist=[]
        selects = course_select_relation.objects.filter(course=course)
        for var in selects:
            newdict={}
            s = course_select_relation_serializer(var)
            newdict['state']=s.data['pass_state']
            newdict.update(s.data['student'])
            retlist.append(newdict)
        return retlist
    def get(self, request, format=None):
        return JsonResponse(self.get_stu_list_from_cid(int(request.GET['courseid'])), safe=False)

class management(APIView):
    def get(self, request, format=None):
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
                student=Student.objects.get(username=userid)
            else:
                userid = "noflag"
            courses = Course.objects.filter(name__icontains=name)
            rest = course_teacher_time_classroom_relation.objects.filter(course__in = courses)
            return JsonResponse(make_course_list(rest, userid), safe=False)
        elif request.GET['type'] == '2':
            ret = {}
            id = course_selecting_event.objects.aggregate(Max('event_id'))['event_id__max']
            event = course_selecting_event.objects.get(event_id=id)
            ret['max'] = event.connection_meanwhile
            ret['now'] = event.connection_now
            return JsonResponse(ret)
        elif request.GET['type'] == '3':
            # flow control
            ret = {}
            id = course_selecting_event.objects.aggregate(Max('event_id'))['event_id__max']
            event = course_selecting_event.objects.get(event_id=id)
            username = request.GET['uid']
            usr = Account.objects.get(username=username)
            if not usr:
                return JsonResponse({})
            auth = usr.user_type
            '''
            student = Student.objects.filter(username=username)
            if student:
                student = student.get()
                auth = 0
                # record = login_record.objects.get(student=student)
                # already_login = record.is_login
            elif Faculty.objects.filter(username=username):
                auth = 1
            elif Staff.objects.filter(username=username):
                auth = 2
            else:
                auth = 3
            '''
            #ret['auth'] = auth
            if request.GET['log'] == '0' and auth == 1:
                if event.connection_now < event.connection_meanwhile: # and not already_login:
                    event.connection_now += 1
                    event.save()
                    is_busy = False
                    ret['auth'] = auth
                else:
                    is_busy = True
            elif request.GET['log'] == '1' and auth == 1:
                event.connection_now -= 1
                event.save()
                is_busy = False
                # record.is_login == False
                # record.save()
            #elif auth == 3:
            #    is_busy = True
            else:
                ret['auth'] = auth
                is_busy = False

            ret['is_busy'] = is_busy
            return JsonResponse(ret)

    @transaction.atomic      
    def post(self, request, format=None):
        data=json.loads(request.body.decode('utf-8'))
        if data['type'] == 0:
            try:
                cse = course_selecting_event(
                    begin_time=data['begin_time'], 
                    end_time=data['end_time'], 
                    sec_begin=data['sec_begin'], 
                    sec_end=data['sec_end'], )
                if 'event_label' in data:
                    cse.event_label=data['event_label']
                cse.save()
                event = cse
                ret = {'begin_time': eval(json.dumps(event.begin_time, cls=MyEncoder)), 
                    'end_time': eval(json.dumps(event.end_time, cls=MyEncoder)), 
                    'sec_begin': eval(json.dumps(event.sec_begin, cls=MyEncoder)), 
                    'sec_end': eval(json.dumps(event.sec_end, cls=MyEncoder)), 
                    'event_id': eval(json.dumps(event.event_id)), 
                    'is_ok': True,
                }
            except:
                print('faied to update course selecting event!!!!')
                return JsonResponse({'if_ok': False, })
            return JsonResponse(ret)
        elif data['type'] == 2:
            ret = {}
            id = course_selecting_event.objects.aggregate(Max('event_id'))['event_id__max']
            event = course_selecting_event.objects.get(event_id=id)
            event.connection_meanwhile = int(data['max'])
            event.save()
            ret['max'] = event.connection_meanwhile
            ret['now'] = event.connection_now
            return JsonResponse(ret)
