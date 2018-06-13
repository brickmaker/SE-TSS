from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from score_management.models import Take
from authentication.models import Course,Student,Faculty,Account
from score_management.serializers import TakeSerializer
from django.db.models import Avg
from django.db.models import Max
from django.db.models import Min
from django.http import JsonResponse
from itertools import chain

@api_view(['GET','POST'])
def score_list_teacher(request):
    """
    List all student scores according to course id
    """

    takes = Take.objects.filter(teacher__username=request.data["pid"])
    #takes_list=[]
    #for take in takes:
    #    dict={}
    #    dict["stu_name"]=take.student.name
    #    dict["score"]=take.score
    #    takes_list.append(dict)
    serializer = TakeSerializer(takes, many=True)
    return Response(serializer.data)

        #serializer = TakeSerializer(data=request.data)
        #if serializer.is_valid():
        #    serializer.save()
        #    return Response(serializer.data, status=status.HTTP_201_CREATED)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def teacher_match(request):
    """
    List all student scores according to course id
    """

    takes = Take.objects.filter(teacher__username=request.data["pid"])
    match_dict={}
    #teacher=Faculty.objects.get(username=request.data["pid"])
    #match_dict["tid"]=takes[0]
    match_dict["tname"] = takes[0].teacher.name

    match_dict["sid"]=[]
    match_dict["sname"] = []
    match_dict["cid"] = []
    match_dict["cname"] = []
    for take in takes:
            #print(take.student.username)
            #match_dict["sid"].append(take)
        match_dict["sname"].append(take.student.name)
            #print(take.course.course_id)
            #match_dict["cid"].append(take)
        match_dict["cname"].append(take.course.name)
    return Response(match_dict)

@api_view(['GET','POST'])
def student_match(request):
    """
    List all student scores according to course id
    """
    takes = Take.objects.filter(student__username=request.data["sid"])
    match_dict={}

    student=Student.objects.get(username=request.data["sid"])
    match_dict["sid"]=student.username
    match_dict["sname"] = student.name

    match_dict["tid"]=[]
    match_dict["tname"] = []
    match_dict["cid"] = []
    match_dict["cname"] = []
    for take in takes:
        if take.teacher.username not in match_dict["tid"]:
            print(take.teacher.username)
            #match_dict["tid"].append(take.teacher.username)
            #match_dict["tname"].append(take.teacher.name)
        if take.course.course_id not in match_dict["cid"]:
            print(take.course.name)
            #match_dict["cid"].append(take.course.course_id)
            #match_dict["cname"].append(take.course.name)
    return Response(match_dict)

@api_view(['GET','POST'])
def score_list_student(request):
    """
    List all student scores according to course id
    """

    takes = Take.objects.filter(student__username=request.data["sid"])
    serializer = TakeSerializer(takes, many=True)
    return Response(serializer.data)

@api_view(['GET',"POST"])
def insert_score(request):
    """
    For teachers, insert every student score for the first time
    according to course id

    :param request: Take List
    :return: Information of save state
    """
    r=0
    takes=Take.objects.all()
    take_list=[]
    for d in request.data:
        course=Course.objects.get(course_id=d["cid"])
        #r=d["sid"]
        student_account=Account.objects.get_by_natural_key(d["sid"])
        student=Student.objects.get(username=student_account)
        teacher_account = Account.objects.get_by_natural_key(d["pid"])
        teacher=Faculty.objects.get(username=teacher_account)
        score=d["score"]
        test_date=d["test_date"]

        take=takes.get(student=student,course=course,teacher=teacher,test_date=test_date)
        #print(take.score)
        take.score=score
        take_list.append(take)
        #take.save()

    serializer=TakeSerializer(data=take_list,many=True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
    #return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def score_statistics(request):
    """
    :param request.data["cid"]
    :return averageScore, medianScore, maxScore, minScore, deviant in a course.
    """
    scores = Take.objects.filter(course__course_id=request.data["cid"]).values_list('score', flat=True).order_by("score")
    average_score = scores.aggregate(avg_score=Avg('score'))
    count = scores.count()
    if count % 2 == 1:
        median_score = scores[count//2]
    else:
        median_score = (scores[count//2-1] + scores[count//2]) / 2
    max_score = scores.aggregate(max_score=Max('score'))
    min_score = scores.aggregate(min_score=Min('score'))
    it = scores.iterator()
    deviant = 0
    while True:
        try:
            diff = next(it) - average_score['avg_score']
            diff2 = diff * diff
            deviant += diff2
        except StopIteration:
            deviant /= count - 1
            break
    resp = {}
    resp['averageScore'] = average_score['avg_score']
    resp['medianScore'] = median_score
    resp['maxScore'] = max_score['max_score']
    resp['minScore'] = min_score['min_score']
    resp['deviant'] = deviant
    return JsonResponse(resp)

@api_view(['GET','POST'])
def score_distribution(request):
    """
    :param request.data["cid"], request.data["date"]
    :return number of all students in the course and date,
            number of students in each grade interval in the course and date
    """
    scores = Take.objects.filter(course__course_id=request.data["cid"], test_date=request.data["date"]).values_list('score', flat=True).order_by("score")
    count = scores.count()
    it = scores.iterator()
    numList = [0, 0, 0, 0, 0]
    while True:
        try:
            score = next(it)
            if score < 60:
                index = 0
            elif score >= 100:
                index = 4
            else:
                index = score // 10 - 5
            numList[index] += 1
        except StopIteration:
            break
    resp = {}
    resp['totalNum'] = count
    resp['[0,60)'] = numList[0]
    resp['[60,70)'] = numList[1]
    resp['[70,80)'] = numList[2]
    resp['[80,90)'] = numList[3]
    resp['[90,100]'] = numList[4]
    return JsonResponse(resp)

@api_view(['GET','POST'])
def score_teacher_history(request):
    """
    :param request.data["cid"], request.data["pid"]
    :return number of all students in the course and teacher,
            average grade point in the course and teacher
    """
    scores = Take.objects.filter(course__course_id=request.data["cid"], teacher_id=request.data["pid"]).values_list('score', flat=True).order_by("score")
    it = scores.iterator()
    count = scores.count()
    average_grade_point = 0
    while True:
        try:
            score = next(it)
            if score >= 95:
                grade_point = 5.0
            elif score < 60:
                grade_point = 0.0
            elif score == 60:
                grade_point = 1.5
            else:
                grade_point = (score - 60) / 10.0 + 1.5
            average_grade_point += grade_point
        except StopIteration:
            average_grade_point /= count
            break
    resp = {}
    resp['totalNum'] = count
    resp['averageGradePoint'] = average_grade_point
    return JsonResponse(resp)

