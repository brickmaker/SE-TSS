import json
from django.http import JsonResponse
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models
from django.db.models import Q

post_per_page = 20
max_new_post = 5


def index(request):
    return JsonResponse({'key': 'Are you OK??'})


class subscriptions(APIView):
    def get(self, request, format=None):
        uid = request.GET.get('uid', None)
        #token = request.GET.get('token', None)
        if None in (uid,):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = models.User.objects.get(pk=uid)
        except:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        subscriptions = []
        for subscribe in models.Subscribe.objects.filter(user=user):
            section = models.Section.objects.get(pk=subscribe.section_id)
            item = {}
            item['area'] = {'name': section.name, 'path': {}}

            assert section.type in (section.COLLEGE, section.TEACHER, section.COURSE)

            if section.type == section.TEACHER:
                teacher = models.Teacher.objects.get(section_id=section.id)
                college = models.College.objects.get(pk=teacher.college_id)
                course = models.Course.objects.get(pk=teacher.course_id)
                item['area']['path']['college'] = {'id': college.id, 'name': college.name}
                item['area']['path']['course'] = {'id': course.id, 'name': course.name}
                item['area']['path']['teacher'] = {'id': teacher.id, 'name': teacher.name}
            elif section.type == section.COURSE:
                course = models.Course.objects.get(section_id=section.id)
                college = models.College.objects.get(pk=course.college_id)
                item['area']['path']['college'] = {'id': college.id, 'name': college.name}
                item['area']['path']['course'] = {'id': course.id, 'name': course.name}

            item['newPosts'] = []
            for newPost in models.Thread.objects.filter(section=section).order_by('-date'):
                subItem = {'id': newPost.id, 'title': newPost.title}
                item['newPosts'].append(subItem)
            subscriptions.append(item)

        return Response(subscriptions, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        return Response(None, status=status.HTTP_403_FORBIDDEN)


class courses(APIView):
    def get(self, request, format=None):
        collegeid = request.GET.get('collegeid', None)
        if collegeid is None:
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            college = models.College.objects.get(pk=collegeid)
        except:
            return Response({'error': 'College not found'}, status=status.HTTP_404_NOT_FOUND)

        courses = []
        for course in models.Course.objects.filter(college=college):
            item = {}
            item['id'] = course.id
            item['name'] = course.name
            item['code'] = course.code
            item['teachers'] = []
            for teacher in models.Teacher.objects.filter(college=college, course=course):
                item['teachers'].append(teacher.name)
            post_set = models.Thread.objects.filter(section_id=course.section_id).order_by('date')
            item['postNum'] = post_set.count()
            item['lastUpdate'] = post_set.last().date if item['postNum'] != 0 else "1970-01-01T00:00:00+00:00"
            courses.append(item)
        return Response(courses, status=status.HTTP_200_OK)


class course(APIView):
    def get(self, request, format=None):
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        if None in (collegeid,courseid):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            course = models.Course.objects.get(pk=courseid, college=collegeid)
            college = models.College.objects.get(pk=collegeid)
        except:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        res = {}
        res['college'] = college.name
        res['course'] = course.name
        res['subForums'] = []
        for sub in models.Teacher.objects.filter(course=course):
            item = {'id': str(sub.id), 'name': sub.name, 'pic': 'https://api.adorable.io/avatars/144/userpic.png'}
            sub_post_set = models.Thread.objects.filter(section=sub.section).order_by('-date')
            item['postNum'] = sub_post_set.count()
            item['lastUpdate'] = sub_post_set.first().date if item['postNum'] != 0 else "1970-01-01T00:00:00+00:00"
            if item['postNum'] <= max_new_post:
                item['newPosts'] = [{'title': x.title, 'postId': str(x.id)} for x in sub_post_set]
            else:
                item['newPosts'] = [{'title': x.title, 'postId': str(x.id)} for x in sub_post_set[:max_new_post]]

            res['subForums'].append(item)

        post_num = models.Thread.objects.filter(section=course.section).count()
        res['pageNum'] = post_num // post_per_page + 1

        return Response(res, status=status.HTTP_200_OK)

class course_subscribed(APIView):
    def get(self, request, format=None):
        uid = request.GET.get('uid', None)
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        if None in (uid,collegeid,courseid):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            course = models.Course.objects.get(pk=courseid)
        except:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        
        res = {'subscribed':True}
        sub_set = models.Subscribe.objects.filter(user_id=uid,section=course.section)
        if sub_set.count() == 0:
            res['subscribed'] = False

        return Response(res, status=status.HTTP_200_OK)  


class teacher_subscribed(APIView):
    def get(self, request, format=None):
        uid = request.GET.get('uid', None)
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        teacherid = request.GET.get('teacherid',None)
        if None in (uid,collegeid,courseid,teacherid):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            teacher = models.Teacher.objects.get(pk=teacherid)
        except:
            return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)
        
        res = {'subscribed':True}
        sub_set = models.Subscribe.objects.filter(user_id=uid,section=teacher.section)
        if sub_set.count() == 0:
            res['subscribed'] = False

        return Response(res, status=status.HTTP_200_OK) 

class course_subscribe(APIView):
    def get(self, request, format=None):
        uid = request.GET.get('uid', None)
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        if None in (uid,collegeid,courseid):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            course = models.Course.objects.get(pk=courseid)
        except:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
            
        try:
            models.Subscribe.objects.create(user_id=uid,section=course.section)
        except:
            return Response({'error':'Fail to subscribe'}, status=status.HTTP_400_BAD_REQUEST)
        res = {'subscribed':True}
        return Response(res, status=status.HTTP_200_OK)         

class teacher_subscribe(APIView):
    def get(self, request, format=None):
        uid = request.GET.get('uid', None)
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        teacherid = request.GET.get('teacherid', None)
        if None in (uid,collegeid,courseid,teacherid):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            teacher = models.Teacher.objects.get(pk=teacherid)
        except:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
            
        try:
            models.Subscribe.objects.create(user_id=uid,section=teacher.section)
        except Exception as e:
            return Response({'error':'Fail to subscribe'}, status=status.HTTP_400_BAD_REQUEST)
            
        res = {'subscribed':True}
        return Response(res, status=status.HTTP_200_OK)   

  
class course_unsubscribe(APIView):
    def get(self, request, format=None):
        uid = request.GET.get('uid', None)
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        if None in (uid,collegeid,courseid):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            course = models.Course.objects.get(pk=courseid)
        except:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
            
        try:
            models.Subscribe.objects.filter(user_id=uid,section=course.section).delete()
        except:
            return Response({'error':'Fail to unsubscribe'}, status=status.HTTP_400_BAD_REQUEST)
        res = {'subscribed':False}
        return Response(res, status=status.HTTP_200_OK) 
        
class teacher_unsubscribe(APIView):
    def get(self, request, format=None):
        uid = request.GET.get('uid', None)
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        teacherid = request.GET.get('teacherid', None)
        if None in (uid,collegeid,courseid,teacherid):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            teacher = models.Teacher.objects.get(pk=teacherid)
        except:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
            
        try:
            models.Subscribe.objects.filter(user_id=uid,section=teacher.section).delete()
        except:
            return Response({'error':'Fail to unsubscribe'}, status=status.HTTP_400_BAD_REQUEST)
        res = {'subscribed':False}
        return Response(res, status=status.HTTP_200_OK) 
        
        
class course_posts(APIView):
    def get(self, request, format=None):
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        if None in (collegeid,courseid):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            course = models.Course.objects.get(pk=courseid)
        except:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        res = {}
        res['data'] = []
        for post in models.Thread.objects.filter(section_id=course.section_id).order_by('-date'):
            poster = models.User.objects.get(pk=post.poster_id)
            reply_set = models.Reply.objects.filter(post_id=post.id).order_by('-date')
            reply_num = reply_set.count()
            if reply_num > 0:
                last_reply_time = reply_set.first().date
            else:
                last_reply_time = post.date
            item = {"pic":"https://api.adorable.io/avatars/144/userpic.png",
                    "name":poster.name,
                    "postId":str(post.id),
                    "title":post.title,
                    "postTime":post.date,
                    "lastReplyTime":last_reply_time,
                    "replyNum":reply_num}
            res['data'].append(item)
        return Response(res, status=status.HTTP_200_OK)
 
class course_newpost(APIView):        
    def post(self,request,format=None):
        try:
            raw = json.loads(request.body.decode("utf-8"))
        except Exception as e:
            #print(e)
            return Response({'error': 'Invalid json format'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            uid = raw['uid']
            collegeId = int(raw['collegeId'])
            courseId = int(raw['courseId'])
            title = raw['title']
            content = raw['content']
        except Exception as e:
            #print(e)
            return Response({'error': 'Parameter error'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            course = models.Course.objects.get(pk=courseId)
        except Exception as e:
            return Response({'error': "Section doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    
        try:
            models.Thread.objects.create(poster_id=uid,title=title,content=content,section_id=course.section_id)
        except:
            return Response({'error':'Fail to start a new post'}, status=status.HTTP_400_BAD_REQUEST)
        
        res = {'error':None}
        return Response(res, status=status.HTTP_200_OK)
        
class teacher(APIView):
    def get(self, request, format=None):
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        teacherid = request.GET.get('teacherid', None)
        if None in (collegeid,courseid,teacherid):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            teacher = models.Teacher.objects.get(pk=teacherid, college=collegeid, course=courseid)
            college = models.College.objects.get(pk=collegeid)
            course = models.Course.objects.get(pk=courseid)
        except:
            return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)

        res = {'college': college.name, 'course': course.name, 'teacher': teacher.name}
        post_num = models.Thread.objects.filter(section=teacher.section).count()
        res['pageNum'] = post_num // post_per_page + 1
        return Response(res, status=status.HTTP_200_OK)

        
      
class teacher_posts(APIView):
    def get(self, request, format=None):
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        teacherid = request.GET.get('teacherid', None)
        if None in (collegeid,courseid,teacherid):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            teacher = models.Teacher.objects.get(pk=teacherid)
        except:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        res = {}
        res['data'] = []
        for post in models.Thread.objects.filter(section=teacher.section).order_by('-date'):
            poster = models.User.objects.get(pk=post.poster_id)
            reply_set = models.Reply.objects.filter(post_id=post.id).order_by('-date')
            reply_num = reply_set.count()
            if reply_num > 0:
                last_reply_time = reply_set.first().date
            else:
                last_reply_time = post.date
            item = {"pic":"https://api.adorable.io/avatars/144/userpic.png",
                    "name":poster.name,
                    "postId":str(post.id),
                    "title":post.title,
                    "postTime":post.date,
                    "lastReplyTime":last_reply_time,
                    "replyNum":reply_num}
            res['data'].append(item)
        return Response(res, status=status.HTTP_200_OK)
        
        
   
class teacher_newpost(APIView):        
    def post(self,request,format=None):
        try:
            raw = json.loads(request.body.decode("utf-8"))
        except Exception as e:
            return Response({'error': 'Invalid json format'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            uid = raw['uid']
            collegeId = int(raw['collegeId'])
            courseId = int(raw['courseId'])
            teacherId = int(raw['teacherId'])
            title = raw['title']
            content = raw['content']
        except Exception as e:
            return Response({'error': 'Parameter error'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            teacher = models.Teacher.objects.get(pk=teacherId)
        except Exception as e:
            return Response({'error': "Section doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    
        try:
            models.Thread.objects.create(poster_id=uid,title=title,content=content,section=teacher.section)
        except:
            return Response({'error':'Fail to start a new post'}, status=status.HTTP_400_BAD_REQUEST)
        
        res = {'error':None}
        return Response(res, status=status.HTTP_200_OK)
   
class post_newreply(APIView):        
    def post(self,request,format=None):
        try:
            raw = json.loads(request.body.decode("utf-8"))
        except Exception as e:
            return Response({'error': 'Invalid json format'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            uid = raw['uid']
            postId = int(raw['postId'])
            content = raw['content']
        except Exception as e:
            return Response({'error': 'Parameter error'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            post = models.Thread.objects.get(pk=postId)
        except Exception as e:
            return Response({'error': "Post doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    
        try:
            models.Reply.objects.create(user_id=uid,post_id=postId,content=content)
        except:
            return Response({'error':'Fail to reply to the post'}, status=status.HTTP_400_BAD_REQUEST)
        
        res = {'error':None}
        return Response(res, status=status.HTTP_200_OK)
        
class comment(APIView):        
    def post(self,request,format=None):
        try:
            raw = json.loads(request.body.decode("utf-8"))
        except Exception as e:
            return Response({'error': 'Invalid json format'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            from_id = raw['from']
            to_id = raw['to']
            postId = int(raw['postId'])
            replyId = int(raw['replyId'])
            content = raw['content']
        except Exception as e:
            return Response({'error': 'Parameter error'}, status=status.HTTP_400_BAD_REQUEST)
            
    
        try:
            models.Reply_reply.objects.create(from_uid_id=from_id,to_uid_id=to_id,content=content,reply_id_id=replyId)
        except:
            return Response({'error':'Fail to comment'}, status=status.HTTP_400_BAD_REQUEST)
        
        res = {'error':None}
        return Response(res, status=status.HTTP_200_OK)
        
class sectionnames(APIView):
    def get(self, request, format=None):
        sectionids = request.GET.getlist('sectionids', None)
        
        if None in (sectionids,):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)

        res = []
        for sectionid in sectionids:
            try:
                section = models.Section.objects.get(pk=sectionid)
                res.append(section.name)
            except:
                return Response({'error': "Section {} Not Found".format(sectionid)}, status=status.HTTP_404_NOT_FOUND)
        return Response(res, status=status.HTTP_200_OK)
   
class college_list(APIView):
    def get(self, request, format=None):
        res = []
        for colledge in models.College.objects.all():
            item = {'id':colledge.id,'name':colledge.name}
            res.append(item)
        return Response(res, status=status.HTTP_200_OK)
      
class course_list(APIView):
    def get(self, request, format=None):
        collegeid = request.GET.get('collegeid', None)
        
        if None in (collegeid,):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)
        
        res = []
        for course in models.Course.objects.filter(college_id=collegeid):
            item = {'id':course.id,'name':course.name}
            res.append(item)
        return Response(res, status=status.HTTP_200_OK)
        
class teacher_list(APIView):
    def get(self, request, format=None):
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid',None)
        
        if None in (collegeid,courseid):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)
        
        res = []
        for teacher in models.Teacher.objects.filter(college_id=collegeid,course_id = courseid):
            item = {'id':teacher.id,'name':teacher.name}
            res.append(item)
        return Response(res, status=status.HTTP_200_OK)
   
class newmsgs(APIView):
    def get(self, request, format=None):
        uid = request.GET.get('uid', None)
        pagesize = int(request.GET.get('pagesize',None))
        
        if None in (uid,pagesize):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)
        
        msg_set = models.Message.objects.filter(receiver_id=uid).order_by('-date')
        msg_num = msg_set.count()
        if msg_num > pagesize:
            msg_set = msg_set[:pagesize]

        res = []
        for msg in msg_set:
            item = {}
            sender = models.User.objects.get(pk=msg.sender_id)
            item['from'] = {'id':sender.id,'username':sender.name,'avatar':"https://api.adorable.io/avatars/144/userpic.png"}
            item['content'] = msg.content
            res.append(item)
        
        return Response(res, status=status.HTTP_200_OK)
   
   
   
   
   
class thread(APIView):
    def get(self, request, format=None):
        thread_id = request.GET.get('id', None)
        if thread_id is None:
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            # print(thread_id)
            thread = models.Thread.objects.get(pk=thread_id)
        except models.Thread.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        if thread.status == models.Thread.CLOSED:
            return Response({'error': 'Post closed'}, status=status.HTTP_404_NOT_FOUND)

        res = {}
        res['id'] = thread_id
        res['title'] = thread.title
        path = {}
        section = thread.section
        if section.type == models.Section.TEACHER:
            teacher = section.teacher.all()[0]
            path['teacher'] = {'id': teacher.section.id, 'name': teacher.name}
            path['course'] = {'id': teacher.course.section.id, 'name': teacher.course.name}
            path['college'] = {'id': teacher.college.section.id, 'name': teacher.college.name}
        elif section.type == models.Section.COURSE:
            course = section.course.all()[0]
            path['course'] = {'id': course.section.id, 'name': course.name}
            path['college'] = {'id': course.college.section.id, 'name': course.college.name}
        else:
            college = models.Section.college.all()[0]
            path['college'] = {'id': college.section.id, 'name': college.name}
        res['path'] = path
        reply_num = models.Reply.objects.filter(post_id=section.id).count()
        res['replyPageNum'] = reply_num // post_per_page + 1
        return Response(res, status=status.HTTP_200_OK)


class reply(APIView):
    def get(self, request, format=None):
        post_id = request.GET.get('postid', None)
        page = request.GET.get('page', None)
        if None in (post_id,page):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)
        page = int(page)
        res = {}
        res['error'] = None
        datas = models.Reply.objects.filter(post_id=post_id).order_by('create_time')[
                page * post_per_page:(page + 1) * post_per_page]
        res['data'] = []
        for data in datas:
            t_data = {}
            t_data['user'] = {  # 'id':data.uid.id,
                'name': data.uid.name}
            t_data['content'] = data.content
            t_data['time'] = data.create_time
            t_data['replies'] = [
                {'from': rr.from_uid.name, 'to': rr.to_uid.name, 'content': rr.content, 'time': rr.create_time}
                for rr in data.replyreply.all().order_by('create_time')
            ]
            res['data'].append(t_data)
        return Response(res, status=status.HTTP_200_OK)


class msgentries(APIView):
    def get(self, request, format=None):
        # 有了认证之后这段代码就不需要了
        uid = request.GET.get('uid', None)
        if uid is None:
            return Response({'error': 'Parameter error'}, status=status.HTTP_400_BAD_REQUEST)
        u = models.User.objects.get(uid=uid)

        raw_datas = models.Message.objects.filter(Q(sender_id=u) | Q(receiver_id=u)).order_by('-date')
        #print(raw_datas)
        d = {}
        for rd in raw_datas:
            if rd.sender_id == u:
                if rd.receiver_id.uid in d:
                    if d[rd.receiver_id.uid].date < rd.date:
                        d[rd.receiver_id.uid] = rd
                else:
                    d[rd.receiver_id.uid] = rd
            else:
                if rd.sender_id.uid in d:
                    if d[rd.sender_id.uid].date < rd.date:
                        d[rd.sender_id.uid] = rd
                else:
                    d[rd.sender_id.uid] = rd
        print(d)
        res = []
        for k, v in d.items():
            t = {}
            if v.sender_id == u:
                t['uid'] = v.receiver_id.uid
                t['username'] = v.receiver_id.name
                # t['avatarurl']=v.receiver_id.avatar
            else:
                t['uid'] = v.sender_id.uid
                t['username'] = v.sender_id.name
                # t['avatarurl'] = v.sender_id.avatar
            t['lastMsgContent'] = v.content
            t['time'] = v.date
            res.append(t)
        res.sort(key=lambda x: x['time'], reverse=True)
        return Response(res, status=status.HTTP_200_OK)


class messages(APIView):
    def get(self, request, format=None):
        # 暂时 uid1 自己 uid2 对方
        uid1 = request.GET.get('uid1', None)
        uid2 = request.GET.get('uid2', None)
        pagenum = request.GET.get('pagenum', None)
        pagesize = request.GET.get('pagesize', None)
        if None in (uid1,uid2,pagenum,pagesize):
            return Response({'error': 'Parameters error'}, status=status.HTTP_400_BAD_REQUEST)
        pagenum = int(pagenum)
        pagesize = int(pagesize)
        raw_datas = models.Message.objects.filter(Q(sender_id=uid1, receiver_id=uid2)
                                           | Q(sender_id=uid2, receiver_id=uid1))\
                                            .order_by('-date')[pagenum*pagesize:(pagenum+1)*pagesize]
        res = [
            {
                'from':rr.sender_id.uid,
                'to':rr.receiver_id.uid,
                'content':rr.content,
                'time':{
                    'year':rr.date.year,
                    'month':rr.date.month,
                    'day':rr.date.day,
                    'hour':rr.date.hour,
                    'minute':rr.date.minute
                }
            }
            for rr in raw_datas
        ]
        return Response(res,status=status.HTTP_200_OK)

    def post(self,request,format=None):
        from_id = request.data.get('from',None)
        to_id = request.data.get('to',None)
        content = request.data.get('content',None)
        if None in (from_id,to_id,content):
            return Response({'error':'Parameter errors'},status=status.HTTP_400_BAD_REQUEST)

        try:
            res = models.Message.objects.create(sender_id=User.objects.get(pk=from_id),receiver_id=User.objects.get(pk=to_id),content=content)
        except Exception as e:
            print(e)
            return Response({'errors':'send message fail'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'from':res.sender_id.uid,'to':res.receiver_id.uid,'content':res.content,'date':res.date},status=status.HTTP_200_OK)

        
class announcements(APIView):
    def get(self, request, format=None):
        uid = request.GET.get('uid', None)
        if uid is None:
            return self.section_wise(request,format)
        return self.user_wise(request,format)
        
    def post(self,request,format=None):
        try:
            raw = json.loads(request.body.decode("utf-8"))
        except Exception as e:
            #print(e)
            return Response({'error': 'Invalid json format'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            uid = raw['uid']
            collegeid = raw['path']['collegeid']
            courseid = raw['path']['courseid']
            teacherid = raw['path']['teacherid']
            content = raw['content']
            title = raw['title']
        except Exception as e:
            #print(e)
            return Response({'error': 'Parameter error'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            user = models.User.objects.get(pk=uid)
            teacher = models.Teacher.objects.get(pk=teacherid)
        except Exception as e:
            return Response({'error': "User or Section doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
            
        try:
            models.Announcement.objects.create(user_id=uid,title=title,content=content,section_id=teacher.section_id)
        except:
            return Response({'error':'Fail to release announcement'}, status=status.HTTP_403_FORBIDDEN)
        
        return Response(raw, status=status.HTTP_200_OK)
        
    def user_wise(self, request, format=None):
        uid = request.GET.get('uid', None)
        pagenum = int(request.GET.get('pagenum', None))
        pagesize = int(request.GET.get('pagesize', None))
        
        if None in (uid,pagenum,pagesize):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_403_FORBIDDEN)
        
        subs = models.Subscribe.objects.filter(user_id = uid)
        subs = [sub.section for sub in subs]
        announcements = models.Announcement.objects.filter(section__in=subs).order_by('-date')
        anncNum = len(announcements)   
        res = {}
        res['anncNum'] = anncNum
        res['anncs'] = []
        ann_num = announcements.count()
        announcements = announcements[pagenum*pagesize:(pagenum+1)*pagesize]
        for ann in announcements:
            item = {'title':ann.title,'content':ann.content,'time':ann.date}
            author = models.User.objects.get(pk=ann.user_id)
            item['author'] = {'username':author.name,'uid':author.id}
            section = models.Section.objects.get(pk=ann.section_id)
            if section.type == models.Section.TEACHER:
                teacher = models.Teacher.objects.get(section=section)
                course = models.Course.objects.get(pk=teacher.course_id)
                college = models.College.objects.get(pk=teacher.college_id)
                item['path'] = {'college':{'id':college.id,'name':college.name},
                                'course':{'id':course.id,'name':course.name},
                                'teacher':{'id':teacher.id,'name':teacher.name}}
            elif section.type == models.Section.COURSE:
                course = models.Course.objects.get(section=section)
                college = models.College.objects.get(pk=course.college_id)
                item['path'] = {'college':{'id':college.id,'name':college.name},
                                'course':{'id':course.id,'name':course.name}}
            res['anncs'].append(item)
        return Response(res, status=status.HTTP_200_OK)
        
    def section_wise(self, request, format=None):        
        collegeid = request.GET.get('collegeid', None)
        courseid = request.GET.get('courseid', None)
        teacherid = request.GET.get('teacherid', None)
        pagenum = int(request.GET.get('pagenum', None))
        pagesize = int(request.GET.get('pagesize', None))
        
        if None in (collegeid,courseid,teacherid,pagenum,pagesize):
            return Response({'error': 'Parameter Error'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            teacher = models.Teacher.objects.get(pk=teacherid)
        except:
            return Response({'error': 'Section not found'}, status=status.HTTP_404_NOT_FOUND)
            
        announcements = models.Announcement.objects.filter(section=teacher.section).order_by('-date')
        anncNum = len(announcements)   
        res = {}
        res['anncNum'] = anncNum
        res['anncs'] = []
        announcements = announcements[pagenum*pagesize:(pagenum+1)*pagesize]
        for ann in announcements:
            item = {'title':ann.title,'content':ann.content,'time':ann.date}
            author = models.User.objects.get(pk=ann.user_id)
            item['author'] = {'username':author.name,'uid':author.id}
            section = models.Section.objects.get(pk=ann.section_id)
            if section.type == models.Section.TEACHER:
                teacher = models.Teacher.objects.get(section=section)
                course = models.Course.objects.get(pk=teacher.course_id)
                college = models.College.objects.get(pk=teacher.college_id)
                item['path'] = {'college':{'id':college.id,'name':college.name},
                                'course':{'id':course.id,'name':course.name},
                                'teacher':{'id':teacher.id,'name':teacher.name}}
            elif section.type == models.Section.COURSE:
                course = models.Course.objects.get(section=section)
                college = models.College.objects.get(pk=course.college_id)
                item['path'] = {'college':{'id':college.id,'name':college.name},
                                'course':{'id':course.id,'name':course.name}}
            res['anncs'].append(item)
        return Response(res, status=status.HTTP_200_OK)
        
        
class info(APIView):
    def get(self, request, format=None):
        res = {}
        user_count = models.User.objects.all().count()
        thread_count = models.Thread.objects.all().count()
        reply_count = models.Reply.objects.all().count()
        res = {'用户总数':user_count,
               '帖子总数':thread_count,
               '回复总数':reply_count,
        }
        return Response(res, status=status.HTTP_200_OK)
       

class userstates(APIView):
    def get(self, request, format=None):
        username = request.GET.get('username', None)
        if None in (username,):
            return Response({'error': 'Parameters error'}, status=status.HTTP_400_BAD_REQUEST)
            
        res = []
        
        for user in models.User.objects.filter(name=username):
            item = {"uid":user.id,"name":user.name}
            reply_num = models.Reply.objects.filter(user=user).count()
            item['replyNum'] = reply_num
            res.append(item)
        return Response(res, status=status.HTTP_200_OK)
       