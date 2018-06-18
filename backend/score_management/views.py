from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from score_management.models import Take,StudentAnalysis
from authentication.models import Course,Student,Faculty,Account
from score_management.models import Take
from score_management.models import Score_Relation
from authentication.models import Course,Student,Faculty,Account,StudentAnalysis
from score_management.serializers import TakeSerializer
from score_management.serializers import ScoreRelationSerializer
from django.db.models import Avg
from django.db.models import Max
from django.db.models import Min
from django.http import JsonResponse
import time
import json
from itertools import chain

@api_view(['GET','POST'])
def score_list_teacher(request):
    """
    List all student scores according to course id
    """

    #takes = Take.objects.filter(teacher__username=request.data["pid"])
    #scores=Score_Relation.objects.all()
    #print(scores[0])
    score_relations=Score_Relation.objects.filter(course_select_info__course__teacher__username=request.data["pid"])
    #serializer = TakeSerializer(takes, many=True)
    serializer=ScoreRelationSerializer(score_relations,many=True)
    return Response(serializer.data)

        #serializer = TakeSerializer(data=request.data)
        #if serializer.is_valid():
        #    serializer.save()
        #    return Response(serializer.data, status=status.HTTP_201_CREATED)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def test(request):
    return Response(1)


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
    score_relations=Score_Relation.objects.all()
    # takes=Take.objects.all()
    take_list=[]
    data =request.data["test"]

    for d in data:
        score_relation=score_relations.get(course_select_info__student__username_id=d["sid"],
                                           course_select_info__course__teacher__username_id=d["pid"],
                                           course_select_info__course__course__course_id=d["cid"],
                                           test_date=d["test_date"])
        if not score_relation.modify_state:
            score_relation.score=d["score"]
        else:
            return Response("You have to apply !", status=status.HTTP_400_BAD_REQUEST)
        take_list.append(score_relation)
        #take.save()

    #serializer=TakeSerializer(data=take_list,many=True)
    serializer=ScoreRelationSerializer(data=take_list,many=True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
    #

@api_view(['GET',"POST"])
def apply_create(request):
    pass


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
            grade_point = convert_to_grade_point(score)
            average_grade_point += grade_point
        except StopIteration:
            average_grade_point /= count
            break
    resp = {}
    resp['totalNum'] = count
    resp['averageGradePoint'] = average_grade_point
    return JsonResponse(resp)

@api_view(['GET','POST'])
def student_gpa_every_year(request):
    """
    :param request.data["sid"]
    :return GPAs of each year
    """
    try:
        items = Take.objects.filter(student_id=request.data["sid"]).values_list('score', 'test_date').order_by("test_date")
        it = items.iterator()
        resp = {}
        counts = {}
        while True:
            try:
                item = next(it)
                grade_point = convert_to_grade_point(item[0])
                if item[1].year in resp:
                    resp[item[1].year] += grade_point
                    counts[item[1].year] += 1
                else:
                    resp[item[1].year] = grade_point
                    counts[item[1].year] = 1
            except StopIteration:
                for year in resp.keys():
                    resp[year] = resp[year] / counts[year]
                break
    except Exception as err:
        print("Exception:", err)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return JsonResponse(resp)

@api_view(['GET','POST'])
def student_rank(request):
    """
    :param request.data["sid"]
    :return your rank this year
    """
    try:
        student_analyses = StudentAnalysis.objects.filter(username=request.data['sid'])
        iterator = student_analyses.iterator()
        student_analysis = next(iterator)
        rank = student_analysis.rank
        resp = {'rank': rank}
        return JsonResponse(resp)
    except Exception as err:
        print("Exception:", err)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET','POST'])
def update_student_rank(request):
    """
    you need to clear data of table StudentAnalysis first
    """
    try:
        takes = Take.objects.all()
        iterator = takes.iterator()
        counts = {}
        gpa_list = {}
        try:
            while True:
                take = next(iterator)
                id_number = take.student.username_id
                #pa = convert_to_grade_point(take.score)
                pa = take.score
                print(id_number)
                if gpa_list.__contains__(id_number):
                    counts[id_number] += 1
                    gpa_list[id_number] += pa
                else:
                    counts[id_number] = 1
                    gpa_list[id_number] = pa
        except StopIteration:
            for id in gpa_list.keys():
                gpa_list[id] = gpa_list[id] / counts[id]
            print(gpa_list)
            gpa_sorted_list = sorted(gpa_list.items(), key=lambda d: d[1], reverse=True)
            for i, tuple_i in enumerate(gpa_sorted_list):
                try:
                    create = StudentAnalysis.objects.create
                    account = Account.objects.filter(username=tuple_i[0])[0]
                    record = create(username=account, rank=i+1)
                except Exception:
                    get = StudentAnalysis.objects.get
                    account = Account.objects.filter(username=tuple_i[0])[0]
                    record = get(username=account)
                    record.rank = i+1
                    record.save()
            return Response(status=status.HTTP_200_OK)
    except Exception as err:
        print("Exception:", err)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET','POST'])
def list_all_score(request):
    """
    :param
    :return
    """
    try:
        resp = dict()
        if request.data.__contains__('sid'):
            resp['topicList'] = ['个人分析']
            takes = Take.objects.filter(student_id=request.data['sid'])
            iterator = takes.iterator()
            list0 = list()
            while True:
                try:
                    take = next(iterator)
                    cname_and_score = dict()
                    cname_and_score['name'] = take.course.name
                    cname_and_score['score'] = take.score
                    list0.append(cname_and_score)
                except StopIteration:
                    resp['data'] = [list0]
                    return JsonResponse(resp)
        elif request.data.__contains__('pid'):
            takes = Take.objects.filter(teacher_id=request.data['pid'])
            iterator = takes.iterator()
            temp = dict()
            while True:
                try:
                    take = next(iterator)
                    if not temp.__contains__(take.course.name):
                        temp[take.course.name] = list()
                    sname_and_score = dict()
                    sname_and_score['name'] = take.student.name
                    sname_and_score['score'] = take.score
                    temp[take.course.name].append(sname_and_score)
                except StopIteration:
                    resp = dict()
                    resp['topicList'] = list()
                    resp['data'] = list()
                    for key, value in temp.items():
                        resp['topicList'].append(key)
                        resp['data'].append(value)
                    return JsonResponse(resp)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as err:
        print("Exception:", err)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def convert_to_grade_point(score):
    if score >= 95:
        return 5.0
    elif score < 60:
        return 0.0
    else:
        return (score - 60) / 10.0 + 1.5

