import json
from django.http import JsonResponse
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models

post_per_page = 20
max_new_post = 5


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
        collegeid = request.GET.get('collegeid', None)
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
        
class course(APIView):
    def get(self, request, format=None):
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        if collegeid is None or courseid is None:
            return Response({'error':'Parameter Error'},status=status.HTTP_403_FORBIDDEN)
        
        try:
            course = models.Course.objects.get(pk=courseid,college=collegeid)
            college = models.College.objects.get(pk=collegeid)
        except:
            return Response({'error':'Course not found'},status=status.HTTP_404_NOT_FOUND)
        
        res = {}
        res['college'] = college.name
        res['course'] = course.name
        res['subForums'] = []
        for sub in models.Teacher.objects.filter(course=course):
            item = {'id':sub.id,'name':sub.name,'pic':'TODO'}
            sub_post_set = models.Thread.objects.filter(section=sub.section).order_by('-date')
            item['postNum'] = sub_post_set.count()
            item['lastUpdate'] = sub_post_set.first().date if item['postNum'] != 0 else "1970-01-01T00:00:00+00:00"
            if item['postNum'] <= max_new_post:
                item['newPosts'] = [{'title':x.title,'postId':x.id} for x in sub_post_set]
            else:
                item['newPosts'] = [{'title':x.title,'postId':x.id} for x in sub_post_set[:max_new_post]]
            
            res['subForums'].append(item)
            
        post_num = models.Thread.objects.filter(section=course.section).count()
        res['pageNum'] = post_num//post_per_page + 1 
        
        return Response(res,status=status.HTTP_200_OK)
        
class teacher(APIView):
    def get(self, request, format=None):
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        teacherid = request.GET.get('teacherid', None)
        if collegeid is None or courseid is None or teacherid is None:
            return Response({'error':'Parameter Error'},status=status.HTTP_403_FORBIDDEN)
                
        try:
            teacher = models.Teacher.objects.get(pk=teacherid,college=collegeid,course=courseid)
            college = models.College.objects.get(pk=collegeid)
            course = models.Course.objects.get(pk=courseid)
        except:
            return Response({'error':'Teacher not found'},status=status.HTTP_404_NOT_FOUND)
        
        res = {'college':college.name,'course':course.name,'teacher':teacher.name}
        post_num = models.Thread.objects.filter(section=teacher.section).count()
        res['pageNum'] = post_num//post_per_page + 1 
        return Response(res,status=status.HTTP_200_OK)