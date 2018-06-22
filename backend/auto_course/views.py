import django_filters
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import filters
from .serializers import *
from .models import *
from rest_framework.generics import *
from rest_framework.mixins import *
from .filters import *
from .permission import *
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
# Create your views here.

@api_view(['GET','POST','PUT', 'DELETE'])
def teacher(request):
    if request.method == 'GET':
        teacher_list = Faculty.objects.all()
        serializers = TeacherSerializer(teacher_list, many=True)
        return Response(serializers.data)
    elif request.method == 'POST':
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClassroomList(ListCreateAPIView):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassroomSerializer
    permission_classes = (IsAuthenticated, AdminCheck,)
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter)
    filter_class = ClassroomFilter
    search_fields = ('campus', 'building', 'room',)


    def post(self, request):
        serializer = ClassroomSerializer(data=request.data)
        print(request.data)

        flag = True
        if serializer.is_valid():
            campus = request.data['campus']
            building = request.data['building']
            room = request.data['room']
            location = campus + building + room
            capacity = int(request.data['capacity'])
            rooms = ClassRoom.objects.all()
            for everyroom in rooms:
                existlocation = everyroom.get_campus_display() + everyroom.building + everyroom.room
                if(location == existlocation):
                    flag = False
            if capacity > 200:
                flag = False
            if flag:
                serializer.save()
                return Response({'msg': 'add successful', 'state': True}, status=status.HTTP_201_CREATED)
            else:
                return Response({'msg': 'add failed'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'msg': 'add failed'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        classrooms = self.filter_queryset(self.get_queryset())
        serializer = ClassroomSerializer(classrooms, many=True)
        response = {
            "name": "RoomResources",
            "rooms": serializer.data
        }
        return Response(response)


class ClassroomUpdate(RetrieveUpdateDestroyAPIView):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassroomSerializer
    permission_classes = (IsAuthenticated, AdminCheck,)
    def put(self, request, pk):
        classroom = ClassRoom.objects.get(pk=pk)
        serializer = ClassroomSerializer(classroom, data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'add successful', 'state': True}, status=status.HTTP_201_CREATED)
        else:
            return Response({'msg': 'add failed'}, status=status.HTTP_400_BAD_REQUEST)



class CourseList(ListAPIView):
    queryset = Course.objects.all()
    permission_classes = (IsAuthenticated, AdminCheck,)
    serializer_class = CourseSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter)
    filter_class = CourseFilter
    search_fields = ('name',)

class RequestList(ListCreateAPIView):
    queryset = Request.objects.all()
    #permission_classes = (IsAuthenticated, RequestCheck,)
    serializer_class = RequestSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter)
    filter_class = RequestFilter
    search_fields = ('status',)

    def get(self, request, *args, **kwargs):
        requestlist = self.filter_queryset(self.get_queryset())
        newrequestlist = []
        if(request.user.user_type == 4):
            newrequestlist = requestlist
        if(request.user.user_type == 2):
            for req in requestlist:
                if req.teacher.username.username == request.user.username:
                    print("add success")
                    newrequestlist.append(req)
        serializer = RequestSerializer(newrequestlist, many=True)
        response = {
            "name": "Notifications",
            "notifications": serializer.data
        }
        return Response(response)

    def post(self, request):
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'add successful', 'state': True}, status=status.HTTP_201_CREATED)
        return Response({'msg': 'add failed'}, status=status.HTTP_400_BAD_REQUEST)

class RequestUpdate(RetrieveUpdateDestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    def put(self, request, pk):
        updaterequest = Request.objects.get(pk=pk)
        serializer = RequestSerializer(updaterequest, data=request.data)
        if serializer.is_valid():

            serializer.save()
            return Response({'msg': 'add successful', 'state': True}, status=status.HTTP_201_CREATED)
        else:
            return Response({'msg': 'add failed'}, status=status.HTTP_400_BAD_REQUEST)

class TimetableList(ListCreateAPIView):
    queryset = course_teacher_time_classroom_relation.objects.all()
    serializer_class = TimetableSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter)
    filter_class = TimetableFilter
    search_fields = ('teachername',)

    def get(self, request, *args, **kwargs):
        classrooms = self.filter_queryset(self.get_queryset())
        newclassrooms = []
        if request.user.user_type == 4:
            newclassrooms = classrooms
        if request.user.user_type == 2:
            for cla in classrooms:
                if cla.teacher.username.username == request.user.username:
                    newclassrooms.append(cla)
        serializer = TimetableSerializer(newclassrooms, many=True)
        response = {
            "name": "CourseResources",
        }
        newlist = []
        for item in serializer.data:
            newdict = {}
            newdict['id'] = item['id']
            newdict['teacher_username'] = item['teacher_username']
            newdict['teacher'] = item['teacher']
            newdict['course_id'] = item['course_id']
            newdict['course'] = item['course']
            newdict['room'] = item['room']
            newdict['room_id'] = item['room_id']
            newdict['time'] = item['time']
            newdict['semester'] = item['semester']
            newlist.append(newdict)
        response["courses"]=newlist 

        ctable = {'mon':{},'tue':{},'wed':{},'thu':{},'fri':{},'sat':{},'sun':{}}
        clist = serializer.data

        timedict = {'一':'mon','二':'tue','三':'wed','四':'thu','五':'fri','六':'sat','日':'sun'}

        for item in clist:
            time = item['time']
            i = time.find('第')
            j = time.find('节')
            week = timedict[time[i-1:i]]
            classtime = time[i+1:j].replace(', ','')

            newlist = []
            newlist.append(item['course'])
            newlist.append(item['room'])
            newlist.append(item['teacher'])
            ctable[week][classtime] = newlist
        response['table'] = ctable
        return Response(response)


class ArrangeList(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
    def get(self,request):
        if request.GET.get('auto') == 'true':
            auto = True
        else:
            auto = False

        courseset = Course.objects.all()
        classroomset = ClassRoom.objects.all()
        relationset = course_teacher_time_classroom_relation.objects.all()

        weekdayset = ['周一','周二','周三','周四','周五','周六','周日']
        classtimeset = ['1, 2','3, 4, 5','6, 7, 8','9, 10','11, 12, 13']

        unassignset = []

        for cour in courseset:
            s1 = CourseSerializer(cour)
            flag = True

            for teacher in s1.data['faculty']:
                for relation in relationset:
                    s2 = TimetableSerializer(relation)
                    if s1.data['course_id'] == s2.data['course_id'] and \
                        teacher == s2.data['teacher_username']:
                        flag = False
                        break
            
                if flag:
                    unassignset.append((s1, s1.data['course_id'], teacher))
        
        if auto == False:
            newlist = []
            id = 1
            for item in unassignset:
                newdict={}
                newdict['id'] = id
                newdict['courseId'] = item[0].data['course_id']
                newdict['courseName'] = item[0].data['name']
                newdict['semester'] = item[0].data['semester']
                newdict['capacity'] = item[0].data['capacity']
                newdict['courseLen'] = 3
                newdict['teacherName'] = TeacherSerializer(Faculty.objects.get(pk=item[2])).data['name']
                newlist.append(newdict)
                id += 1
            newdict = {}
            newdict['courses'] = newlist
            return Response(newdict)

        else:
            # auto arrange
            for unassign in unassignset:

                flag = False

                for room in classroomset:

                    rs = ClassroomSerializer(room)

                    for weekday in weekdayset:

                        for classtime in classtimeset:

                            newtime = weekday + '第' + classtime + '节'

                            isConflict = False

                            relationset = course_teacher_time_classroom_relation.objects.all()

                            for relation in relationset:

                                s2 = TimetableSerializer(relation)

                                if (s2.data['room_id'] == str(rs.data['id']) and \
             \
                                        s2.data['time'] == newtime):
                                    isConflict = True

                                    break

                                if (s2.data['teacher_username'] == unassign[2] and \
             \
                                        s2.data['time'] == newtime):
                                    isConflict = True

                                    break

                                if (s2.data['teacher_username'] == unassign[2] and \
             \
                                        s2.data['course_id'] == unassign[1]):
                                    isConflict = True

                                    break

                            if not isConflict:
                                expectRoomID = rs.data['id']

                                expectTime = newtime

                                flag = True

                                break

                        if flag:
                            break

                    if flag:
                        break

                course_teacher_time_classroom_relation.objects.create(

                    time=expectTime,

                    teacher=Faculty.objects.get(pk=unassign[2]),

                    course=Course.objects.get(pk=unassign[1]),

                    classroom=ClassRoom.objects.get(pk=expectRoomID)

                )

                # print((unassign[1], unassign[2], expectRoomID, expectTime))

            courseset = Course.objects.all()

            unassignset = []

            for cour in courseset:

                s1 = CourseSerializer(cour)

                flag = True

                for teacher in s1.data['faculty']:

                    for relation in relationset:

                        s2 = TimetableSerializer(relation)

                        if s1.data['course_id'] == s2.data['course_id'] and \
             \
                                teacher == s2.data['teacher_username']:
                            flag = False

                            break

                    if flag:
                        unassignset.append((s1, s1.data['course_id'], teacher))

            newlist = []

            id = 1

            for item in unassignset:
                newdict = {}

                newdict['id'] = id

                newdict['courseId'] = item[0].data['course_id']

                newdict['courseName'] = item[0].data['name']

                newdict['semester'] = item[0].data['semester']

                newdict['capacity'] = item[0].data['capacity']

                newdict['courseLen'] = 3

                newdict['teacherName'] = TeacherSerializer(Faculty.objects.get(pk=item[2])).data['name']

                newlist.append(newdict)

                id += 1

            newdict = {}

            newdict['courses'] = newlist

            return Response(newdict)


class TimetableUpdate(RetrieveUpdateDestroyAPIView):
    queryset = course_teacher_time_classroom_relation.objects.all()
    serializer_class = TimetableSerializer

    def put(self, request, pk):
        changecourse = course_teacher_time_classroom_relation.objects.get(pk=pk)
        serializer = TimetableSerializer(changecourse, data=request.data)
        flag = True
        if serializer.is_valid():
            print(request.data)
            for everyroom in ClassRoom.objects.all():
                name = everyroom.get_campus_display() + everyroom.building + everyroom.room
                if name == request.data['room']:
                    newroom = everyroom
                    break
            # check capacity
            course_capacity = Course.objects.get(pk=request.data['course_id']).capacity
            new_capacity = newroom.classroom_capacity
            if new_capacity < course_capacity:
                flag = False
                error = "too small room"
            # check classroom
            newtime = request.data['time']
            newroomname = newroom.get_campus_display() + newroom.building + newroom.room
            for everytimetable in course_teacher_time_classroom_relation.objects.all():
                if everytimetable.classroom.get_campus_display() + everytimetable.classroom.building + everytimetable.classroom.room == newroomname:
                    if everytimetable.time == newtime:
                        flag = False
                        error = "classroom comflicts!"
            #check teacher time
            for everytimetable in course_teacher_time_classroom_relation.objects.all():
                currentteacher = Faculty.objects.get(pk=request.data['teacher_username'])
                if everytimetable.teacher == currentteacher:
                    if everytimetable.time == request.data['time'] and everytimetable != changecourse:
                        flag = False
                        error = "Teacher already has course!"
            if flag:
            
                serializer.save()
                return Response({'msg': 'add successful', 'state': True}, status=status.HTTP_201_CREATED)
            else:
                return Response({'msg': 'add successful', 'state': error}, status=status.HTTP_201_CREATED)
        else:
            return Response({'msg': 'add failed'}, status=status.HTTP_400_BAD_REQUEST)

