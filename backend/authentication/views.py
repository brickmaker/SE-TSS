from django.contrib.auth.decorators import permission_required
from django.shortcuts import render
from rest_framework import status
from rest_framework.parsers import FileUploadParser,MultiPartParser, FormParser
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_jwt.settings import api_settings
from rest_framework import permissions
from .serializers import *
from .models import Account, Student
from rest_framework_jwt.settings import api_settings
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib import auth
from authentication.permission import StudentCheck, StaffCheck, FacultyCheck, AdminCheck, CourseCheck, RegisterCheck, LogCheck
import logging
from django.core import serializers
import json
import os
from rest_framework.parsers import MultiPartParser
from top.settings import MEDIA_ROOT
import xlrd
from django.db import transaction



logger = logging.getLogger('django')


class StudentRegister(APIView):
    serializer_class = StudentSerializer
    #permission_classes = (IsAuthenticated, RegisterCheck,)

    def post(self, request):
        logger.info("try to register student account")
        Log.objects.create(content="[user]: %s [event]: register student account" % request.user.username)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            Log.objects.create(content="[user]: %s [event]: register student account ok" % request.user.username)
            logger.info('account register successfully, username:%s' % request.data['username'])
            return Response({'msg': 'register successfully', 'state': True}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            Log.objects.create(content="[user]: %s [event]: register student account not ok" % request.user.username)
            logger.info('account register failed, invalid parameters')
            return Response({'msg': 'invalid parameters', 'state': False}, status=status.HTTP_400_BAD_REQUEST)

def getColumnTitle(sheet):  
    col_dict = {}    
    for i in range(sheet.ncols):  
        col_dict[sheet.cell_value(0, i).strip()] = i  
    return col_dict  

class BatchStudentView(APIView):

    parser_classes = (MultiPartParser, FormParser,)
    permission_classes = (IsAuthenticated,)
    @transaction.atomic
    def post(self, request, format=None):
        #file_obj = request.FILES['file']
        #logger.info(file_obj.read())
        file_obj=self.request.data.get('file')
        
        
        f1=open(file_obj.name,"wb")

        for i in file_obj.chunks():
            f1.write(i)

        f1.close()

        try :
            wb=xlrd.open_workbook(filename=file_obj.name)
           
        except ValueError as err:
            logger.info(err)

        table=wb.sheets()[0]

        col_dict=getColumnTitle(table)
        logger.info(col_dict)
        row=table.nrows
        manager=AccountManager()
        
        if os.path.exists(file_obj.name):
            os.remove(file_obj.name)
        for i in range(1,row):
            try:

                department = Department.objects.get(name=table.row_values(i)[col_dict['学院']])
                major=Major.objects.get(major=table.row_values(i)[col_dict['专业']],depart=department)
                class_name=Major_Class.objects.get(major=major,class_name=table.row_values(i)[col_dict['班级']])
                student=manager.create_user(username=str(table.row_values(i)[col_dict['学号']]),id_number=table.row_values(i)[col_dict['身份证号']],
                            email=table.row_values(i)[col_dict['电子邮件']],
                            user_type=1,
                            name=table.row_values(i)[col_dict['姓名']], 
                            gender  =table.row_values(i)[col_dict['性别']], 
                            department=department,
                            grade=table.row_values(i)[col_dict['入学年份']],  
                            major=major,
                            class_name=class_name,  
                            ) 
                
            except :
               
                print('Format doesn\'t match!!check xlsx '+str(i)+'th line!')
                
                print('Format doesn\'t match!!check xlsx '+str(i)+'th line!')
                total='创建失败，请检查表格第'+str(i+1)+'行'+'或检查表头格式是否一致'
                json_data = json.dumps(total, ensure_ascii=False)
                return Response(json_data,status=status.HTTP_400_BAD_REQUEST)

        total='Excel上传成功'
        json_data = json.dumps(total, ensure_ascii=False)
        return Response(json_data, status=status.HTTP_200_OK)

class BatchStaffView(APIView):

    parser_classes = (MultiPartParser, FormParser,)
    permission_classes = (IsAuthenticated,)
    @transaction.atomic
    def post(self, request, format=None):
        #file_obj = request.FILES['file']
        #logger.info(file_obj.read())
        file_obj=self.request.data.get('file')
        
        
        f1=open(file_obj.name,"wb")

        for i in file_obj.chunks():
            f1.write(i)

        f1.close()

        try :
            wb=xlrd.open_workbook(filename=file_obj.name)
           
        except ValueError as err:
            logger.info(err)

        table=wb.sheets()[0]

        col_dict=getColumnTitle(table)
        logger.info(col_dict)
        row=table.nrows
        manager=AccountManager()
        
        if os.path.exists(file_obj.name):
            os.remove(file_obj.name)
        for i in range(1,row):
            try:
                department = Department.objects.get(name=table.row_values(i)[col_dict['学院']])
                manager.create_user(username=str(table.row_values(i)[col_dict['教工号']]),id_number=table.row_values(i)[col_dict['身份证号']],
                            email=table.row_values(i)[col_dict['电子邮件']],
                            user_type=3,
                            name=table.row_values(i)[col_dict['姓名']], 
                            gender  =table.row_values(i)[col_dict['性别']], 
                            department=department,
                            ) 
            except :
                print('Format doesn\'t match!!check xlsx '+str(i)+'th line!')
                total='创建失败，请检查表格第'+str(i+1)+'行'+'或检查表头格式是否一致'
                json_data = json.dumps(total, ensure_ascii=False)
                return Response(json_data,status=status.HTTP_400_BAD_REQUEST)

        total='Excel上传成功'
        json_data = json.dumps(total, ensure_ascii=False)
        return Response(json_data, status=status.HTTP_200_OK)






class BatchFacultyView(APIView):
    #parser_classes = (FileUploadParser,)
    parser_classes = (MultiPartParser, FormParser,)
    permission_classes = (IsAuthenticated,)
    @transaction.atomic
    def post(self, request, format=None):
        #file_obj = request.FILES['file']
        #logger.info(file_obj.read())
        file_obj=self.request.data.get('file')
        
        
        f1=open(file_obj.name,"wb")

        for i in file_obj.chunks():
            f1.write(i)

        f1.close()

        try :
            wb=xlrd.open_workbook(filename=file_obj.name)
           
        except e as err:
            logger.info(err)

        table=wb.sheets()[0]

        col_dict=getColumnTitle(table)
        logger.info(col_dict)
        row=table.nrows
        manager=AccountManager()
        if os.path.exists(file_obj.name):
            os.remove(file_obj.name)
        
        for i in range(1,row):
            try:
                department = Department.objects.get(name=table.row_values(i)[col_dict['学院']])
                manager.create_user(username=str(table.row_values(i)[col_dict['教工号']]),id_number=table.row_values(i)[col_dict['身份证号']],
                            email=table.row_values(i)[col_dict['电子邮件']],
                            user_type=2,
                            name=table.row_values(i)[col_dict['姓名']], 
                            gender  =table.row_values(i)[col_dict['性别']], 
                            department=department,
                            title= table.row_values(i)[col_dict['职称']],
                            ) 
                if os.path.exists(file_obj.name):
                    os.remove(file_obj.name)
            except :
               
                print('Format doesn\'t match!!check xlsx '+str(i)+'th line!')
                
                print('Format doesn\'t match!!check xlsx '+str(i)+'th line!')
                total='创建失败，请检查表格第'+str(i+1)+'行'+'或检查表头格式是否一致'
                json_data = json.dumps(total, ensure_ascii=False)
                return Response(json_data,status=status.HTTP_400_BAD_REQUEST)

        total='Excel上传成功'
        json_data = json.dumps(total, ensure_ascii=False)
        return Response(json_data, status=status.HTTP_200_OK)


class FacultyRegister(APIView):
    serializer_class = FacultySerializer
    permission_classes = (IsAuthenticated, RegisterCheck,)

    def post(self, request):
        logger.info("try to register faculty account")
        Log.objects.create(content="[user]: %s [event]: register faculty account" % request.user.username)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            Log.objects.create(content="[user]: %s [event]: register faculty account ok" % request.user.username)
            logger.info('account register successfully, username:%s' % request.data['username'])
            return Response({'msg': 'register successfully', 'state': True}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            Log.objects.create(content="[user]: %s [event]: register faculty account not ok" % request.user.username)
            logger.info('account register failed, invalid parameters')
            return Response({'msg': 'invalid parameters', 'state': False}, status=status.HTTP_400_BAD_REQUEST)


class StaffRegister(APIView):
    serializer_class = StaffSerializer
    permission_classes = (IsAuthenticated, RegisterCheck,)

    def post(self, request):
        logger.info("try to register staff account")
        Log.objects.create(content="[user]: %s [event]: register staff account" % request.user.username)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info('account register successfully, username:%s' % request.data['username'])
            Log.objects.create(content="[user]: %s [event]: register staff account ok" % request.user.username)
            return Response({'msg': 'register successfully', 'state': True}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            logger.info('account register failed, invalid parameters')
            Log.objects.create(content="[user]: %s [event]: register staff account not ok" % request.user.username)
            return Response({'msg': 'invalid parameters', 'state': False}, status=status.HTTP_400_BAD_REQUEST)


class AdminRegister(APIView):
    serializer_class = AdminSerializer
    permission_classes = (IsAuthenticated, RegisterCheck,)

    def post(self, request):
        logger.info("try to register admin account")
        Log.objects.create(content="[user]: %s [event]: register admin account" % request.user.username)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info('account register successfully, username:%s' % request.data['username'])
            Log.objects.create(content="[user]: %s [event]: register admin account ok" % request.user.username)
            return Response({'msg': 'register successfully', 'state': True}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            logger.info('account register failed, invalid parameters')
            Log.objects.create(content="[user]: %s [event]: register admin account not ok" % request.user.username)
            return Response({'msg': 'invalid parameters', 'state': False}, status=status.HTTP_400_BAD_REQUEST)


class CourseRegister(APIView):
    serializer_class = CourseSerializer
    permission_classes = (IsAuthenticated, CourseCheck,)

    def post(self, request):
        logger.info("try to register course")
        Log.objects.create(content="[user]: %s [event]: register course" % request.user.username)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info('course register successfully, name:%s' % request.data['name'])
            return Response({'msg': 'register successful', 'state': True}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            logger.info('course register failed, invalid parameters')
            return Response({'msg': 'Register failed'}, status=status.HTTP_400_BAD_REQUEST)


class StudentViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, StudentCheck,)
    queryset = Student.objects.all()
    serializer_class = StudentQuerySerializer


class FacultyViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Faculty.objects.all()
    serializer_class = FacultyQuerySerializer


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    permission_classes = (IsAuthenticated, StaffCheck,)
    serializer_class = StaffQuerySerializer


class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    permission_classes = (IsAuthenticated, AdminCheck,)
    serializer_class = AdminQuerySerializer


class MajorViewSet(viewsets.ModelViewSet):
    queryset = Major.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = MajorQuerySerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = DepartmentQuerySerializer


class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    permission_classes = (IsAuthenticated, LogCheck, )
    serializer_class = LogQuerySerializer


class CourseViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, CourseCheck,)
    queryset = Course.objects.all()
    serializer_class = CourseQuerySerializer


class PasswordUpdate(APIView):
    serializer_class = PasswordUpdateSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def put(self, request):
        logger.info("try to update password")
        Log.objects.create(content="[user]: %s [event]: update password" % request.user.username)
        self.object = self.get_object()
        serializer = PasswordUpdateSerializer(data=request.data)

        if serializer.is_valid():
            old_password = serializer.data.get("old_password")
            if not self.object.check_password(old_password):
                return Response({"msg": ["wrong password"]},
                                status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            logger.info("password update successfully")
            return Response({"msg": ["update successfully"]}, status=status.HTTP_200_OK)
        else:
            logger.info("password update failed")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        Log.objects.create(content="[user]: %s [event]: get the data of user info" % request.user.username)
        users = People.objects.all().filter(username=request.user.username)
        total = []
        for user in users:
            data = {}
            data['user_type'] = user.username.user_type
            data['name'] = user.name
            data['id_number'] = user.id_number
            data['email'] = user.email
            data['gender'] = user.gender
            data['department'] = user.department_id
            total.append(data)
        json_data = json.dumps(total, ensure_ascii=False)

        return Response(json_data, status=status.HTTP_200_OK)

class CourseFacultyViewSet(APIView):
    serializer_class = CourseQuerySerializer
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        Log.objects.create(content="[user]: %s [event]: get the data of course faculty" % request.user.username)
        courses = Course.objects.all().filter(faculty=request.user.username)
        total = []
        for course in courses:
            data = {}
            data['course_id'] = course.course_id
            data['name'] = course.name
            data['course_type'] = course.course_type
            data['department'] = str(course.department)
            data['faculty'] = str(course.faculty)
            data['credit'] = course.credit
            data['capacity'] = course.capacity
            data['semester'] = course.semester
            data['assessment'] = course.assessment
            data['state'] = course.state
            total.append(data)
        json_data = json.dumps(total, ensure_ascii=False)
        return Response(json_data, status=status.HTTP_200_OK)


class UploadImageView(APIView):
    def post(self, request):
        avatar = request.FILES.get('img')
        path = os.path.join(MEDIA_ROOT, request.FILES['img'].name)
        with open(path, "wb+") as pic:
            for p in request.FILES['img'].chunks():
                pic.write(p)

        if request.user.user_type == 1:
            Student.objects.filter(username=request.user.username).update(img=avatar)
        if request.user.user_type == 2:
            Faculty.objects.filter(username=request.user.username).update(img=avatar)
        if request.user.user_type == 3:
            Staff.objects.filter(username=request.user.username).update(img=avatar)
        return Response({
            'url': 'media/profile/' + request.FILES['img'].name,
        }, status=status.HTTP_200_OK)



#Temporary unused
class Login(APIView):
    serializer_class = LoginSerializer
    def post(self, request):
        Log.objects.create(content="try to login")
        logger.info("try to login")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = request.data
            username = data.get('username', None)
            password = data.get('password', None)
            account = auth.authenticate(username=username, password=password)
            if account is not None:
                auth.login(request, account)
                logger.info("login successfully")
                if password == account.id_number[-6:]:
                    return Response({
                        'msg': 'login successfully, too weak password',
                        'prompt': True,
                        'state': True
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({
                        'msg': 'login successfully',
                        'prompt': False,
                        'state': True
                    }, status=status.HTTP_200_OK)
            logger.info("login failed")
            return Response({
                'msg': 'unauthorized, username/password combination invalid',
                'state': False
            }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            logger.info("login failed")
            return Response({'msg': 'parameters invalid', 'state': False}, status=status.HTTP_400_BAD_REQUEST)