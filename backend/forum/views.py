import json
from django.http import JsonResponse
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models

def index(request):
    return JsonResponse({'key': 'Are you OK??'})
    

class subscriptions(APIView):
    def get(self, request, format=None):
        uid  = request.GET.get('uid', None)
        token = request.GET.get('token',None)
        if uid is None or token is None:
            return Response({'error':'Parameter Error'},status=status.HTTP_403_FORBIDDEN)
        
        try:
            user = models.User.objects.get(pk=uid)
        except:
            return Response({'error':'User not found'},status=status.HTTP_404_NOT_FOUND)
        
        subscriptions = []
        for subscribe in models.Subscribe.objects.filter(user=user):
            section = models.Section.objects.get(pk=subscribe.section_id)
            item = {}
            item['area'] = {'name':section.name,'path':{}}
            
            assert section.type in (section.COLLEGE,section.TEACHER,section.COURSE)
            
            if section.type == section.TEACHER:
                teacher = models.Teacher.objects.get(section_id = section.id)
                college = models.College.objects.get(pk=teacher.college_id)
                course = models.Course.objects.get(pk=teacher.course_id)
                item['area']['path']['college'] = {'id':college.id,'name':college.name}
                item['area']['path']['course'] = {'id':course.id,'name':course.name}
                item['area']['path']['teacher'] = {'id':teacher.id,'name':teacher.name}
            elif section.type == section.COURSE:
                course = models.Course.objects.get(section_id=section.id)
                college = models.College.objects.get(pk=course.college_id)
                item['area']['path']['college'] = {'id':college.id,'name':college.name}
                item['area']['path']['course'] = {'id':course.id,'name':course.name}
                
            item['newPosts'] = []
            for newPost in models.Thread.objects.filter(section=section).order_by('-date'):
                subItem = {'id': newPost.id,'title':newPost.title}
                item['newPosts'].append(subItem)
            subscriptions.append(item)
            
        return Response(subscriptions,status=status.HTTP_200_OK)

    def post(self, request, format=None):
        return Response(None, status=status.HTTP_403_FORBIDDEN)

class courses(APIView):
    def get(self, request, format=None):
        collegeid  = request.GET.get('collegeid', None)
        if collegeid is None:
            return Response({'error':'Parameter Error'},status=status.HTTP_403_FORBIDDEN)
        
        try:
            college = models.College.objects.get(pk=collegeid)
        except:
            return Response({'error':'College not found'},status=status.HTTP_404_NOT_FOUND)
            
        courses = []
        for course in models.Course.objects.filter(college=college):
            item  = {}
            item['id'] = course.id
            item['name'] = course.name
            item['code'] = course.code
            item['teachers'] = []
            for teacher in models.Teacher.objects.filter(college=college,course=course):
                item['teachers'].append(teacher.name)
            post_set = models.Thread.objects.filter(section_id=course.section_id).order_by('date')
            item['postNum'] = post_set.count()
            item['lastUpdate'] = post_set.last().date if item['postNum'] != 0 else "1970-01-01T00:00:00+00:00"
            courses.append(item)
            
        
        return Response(courses,status=status.HTTP_200_OK)