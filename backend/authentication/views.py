from django.contrib.auth.decorators import permission_required
from django.shortcuts import render
from rest_framework import status
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
from authentication.permission import StudentCheck, StaffCheck, FacultyCheck, AdminCheck, CourseCheck, RegisterCheck
import logging

logger = logging.getLogger('django')


class StudentRegister(APIView):
    serializer_class = StudentSerializer
    permission_classes = (IsAuthenticated, RegisterCheck,)

    def post(self, request):
        logger.info("try to register student account")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            logger.info('account register successfully, username:%s' % request.data['username'])
            return Response({'msg': 'register successfully', 'state': True}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            logger.info('account register failed, invalid parameters')
            return Response({'msg': 'invalid parameters', 'state': False}, status=status.HTTP_400_BAD_REQUEST)


class FacultyRegister(APIView):
    serializer_class = FacultySerializer
    permission_classes = (IsAuthenticated, RegisterCheck,)

    def post(self, request):
        logger.info("try to register faculty account")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info('account register successfully, username:%s' % request.data['username'])
            return Response({'msg': 'register successfully', 'state': True}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            logger.info('account register failed, invalid parameters')
            return Response({'msg': 'invalid parameters', 'state': False}, status=status.HTTP_400_BAD_REQUEST)


class StaffRegister(APIView):
    serializer_class = StaffSerializer
    permission_classes = (IsAuthenticated, RegisterCheck,)

    def post(self, request):
        logger.info("try to register staff account")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info('account register successfully, username:%s' % request.data['username'])
            return Response({'msg': 'register successfully', 'state': True}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            logger.info('account register failed, invalid parameters')
            return Response({'msg': 'invalid parameters', 'state': False}, status=status.HTTP_400_BAD_REQUEST)


class AdminRegister(APIView):
    serializer_class = AdminSerializer
    permission_classes = (IsAuthenticated, RegisterCheck,)

    def post(self, request):
        logger.info("try to register admin account")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info('account register successfully, username:%s' % request.data['username'])
            return Response({'msg': 'register successfully', 'state': True}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            logger.info('account register failed, invalid parameters')
            return Response({'msg': 'invalid parameters', 'state': False}, status=status.HTTP_400_BAD_REQUEST)


class CourseRegister(APIView):
    serializer_class = CourseSerializer
    permission_classes = (IsAuthenticated, CourseCheck,)

    def post(self, request):
        logger.info("try to register course")
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
    permission_classes = (IsAuthenticated, FacultyCheck,)
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

#Temporary unused
class Login(APIView):
    serializer_class = LoginSerializer
    def post(self, request):
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
