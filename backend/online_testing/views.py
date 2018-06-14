import json
from datetime import datetime

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action
import numpy as np
from rest_framework.viewsets import GenericViewSet, mixins

from authentication.models import Student, Course
from online_testing.models import Question, Paper, Examination
from online_testing.serializers import QuestionSerializer, QuestionDetailSerializer, \
    PaperSerializer, ExaminationSerializer, PaperDetailSerializer
from online_testing.filters import QuestionFilter
from online_testing.permissions import ExamInfoAccessPermission, QuestionPermission, PaperPermission
from rest_framework import permissions


class QuestionViewSet(viewsets.ModelViewSet):
    # not safe: update(object), partial_update(object), delete(object), insert,
    # safe: list, retrieve(object)
    queryset = Question.objects.all()
    serializer_class = (QuestionSerializer, QuestionDetailSerializer)
    filter_backends = (DjangoFilterBackend, QuestionFilter)
    filter_fields = ('course', )
    permission_classes = (IsAuthenticated, QuestionPermission)

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.detail or self.request.method not in permissions.SAFE_METHODS:
            return self.serializer_class[1]
        return self.serializer_class[0]

    @action(methods=['post'], detail=False)
    def batches_deletion(self, request):
        question_id_list = request.data.getlist('question_id_list', [])
        for question_id in question_id_list:
            self.queryset.get(question_id=question_id).delete()
        return Response({'question_list': question_id_list, 'is_ok': True,
                         'message': 'delete successfully'})

    @action(methods=['get'], detail=False)
    def tags_and_teachers(self, request):
        course_id = request.query_params.get('course', None)
        if course_id:
            course = Course.objects.all().get(course_id=course_id)
            teacher_list = []
            for faculty in course.faculty.all():
                teacher_list.append({
                    'teacher_name': faculty.name,
                    'teacher_id': faculty.username.username
                })
            s = set()
            for question in Question.objects.all().filter(course=course_id):
                s.add(question.tag)
            return Response({'is_ok': True, 'teacher_list': teacher_list, 'tag_list': list(s)})
        return Response({'is_ok':False, 'message': 'course_id is needed'},
                        status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['provider'] = request.user.username
        if isinstance(data['level'], str):
            data['level'] = int(data['level'])
            from django.http import QueryDict
            if isinstance(data, QueryDict):
                data.setlist('answer_list', [int(i) for i in data.getlist('answer_list')])
            else:
                data['answer_list'] = [int(i) for i in data['answer_list']]
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        return Response({'question_list': data})

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        return Response(data)


class PaperViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    queryset = Paper.objects.all()
    serializer_class = (PaperSerializer, PaperDetailSerializer)
    permission_classes = (IsAuthenticated, PaperPermission)
    filter_backends = (DjangoFilterBackend, )
    filter_fields = ('course',)
    # not safe: delete(object), insert,
    # safe: list, retrieve(object)

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.detail or self.request.method not in permissions.SAFE_METHODS:
            return self.serializer_class[1]
        return self.serializer_class[0]

    def create(self, request, *args, **kwargs):

        def softmax(x):
            return x / np.sum(np.abs(x))

        data = request.data.copy()
        data['teacher'] = request.user.username
        auto = False
        if isinstance(request.data.get('auto'), str):
            if request.data.get('auto') == 'True':
                auto = True
        else:
            auto = request.data.get('auto')
        if auto:
            num_choice = int(request.data.get('num_choice'))
            num_judge = int(request.data.get('num_judge'))
            question_set = QuestionFilter().filter_queryset(request, Question.objects.all(), None)
            choice_list = question_set.filter(type='Choice')
            judge_list = question_set.difference(choice_list)
            content = {'message': 'The questions are less than expected'}
            if choice_list.count() < num_choice or judge_list.count() < num_judge:
                return Response(content, status=status.HTTP_417_EXPECTATION_FAILED)
            l1 = [id for id in choice_list.values_list('question_id', 'level')]
            l2 = [id for id in judge_list.values_list('question_id', 'level')]
            np.random.shuffle(l1)
            np.random.shuffle(l2)
            l = l1[0: num_choice] + l2[0: num_judge]
            question_id_list = [li[0] for li in l]
            score_list = np.array(np.around(100 * softmax([li[1] for li in l])), dtype='int32')
            try:
                score_list[score_list == 0] = 1
                from django.http import QueryDict
                if isinstance(data, QueryDict):
                    data.setlist('score_list', score_list)
                    data.setlist('question_id_list', question_id_list)
                else:
                    data['score_list'] = score_list
                    data['question_id_list'] = question_id_list
            except BaseException as e:
                print(type(data))
                print(e)
                return Response("??????", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            from django.http import QueryDict
            if isinstance(request.data, QueryDict):
                question_id_list = request.data.getlist('question_id_list')
            else:
                question_id_list = request.data['question_id_list']
            print(question_id_list)
            score_list = []
            for question_id in question_id_list:
                question = Question.objects.get(question_id=question_id)
                score_list.append(question.level)
            score_list = np.array(np.around(100 * softmax(score_list)), dtype='int32')
            score_list[score_list == 0] = 1
            if isinstance(data, QueryDict):
                data.setlist('score_list', score_list)
            else:
                data['score_list'] = score_list
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        data['question_list'] = []
        for question_id in data['question_id_list']:
            question = Question.objects.all().get(question_id=question_id)
            question_data = QuestionDetailSerializer(question).data
            if request.user.user_type == 1:
                question_data.pop('answer_list', None)
            data['question_list'].append(question_data)
        #print(data['question_id_list'])
        data.pop('question_id_list')
        return Response(data)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        '''if request.user.user_type == 1:
            for question in data:
                question.pop('answer_list', None)'''
        return Response({'paper_list': data})


class ExaminationViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    queryset = Examination.objects.all()
    serializer_class = ExaminationSerializer
    permission_classes = (IsAuthenticated, ExamInfoAccessPermission, )
    # not safe: delete(object), insert,
    # safe: list, retrieve(object)

    #1. 提前交卷
    #2. 超时自动交卷

    def create(self, request, *args, **kwargs):
        try:
            exam = Examination.objects.get(paper=request.data['paper']
                                    , student=request.user.username)
            return Response({'message': 'already done.', 'is_ok': False, 'submit': exam.submit,
                             'exam_id': exam.exam_id},
                            status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            data = request.data.copy()
            data['student'] = request.user.username
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        self.get_left_time(instance)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        return super(ExaminationViewSet, self).list(request, *args, **kwargs)

    @staticmethod
    def get_left_time(exam):
        left_time = exam.paper.duration * 60 - \
                    (datetime.now() - exam.start_time.replace(tzinfo=None)).total_seconds()
        #print(datetime.now() - exam.start_time.replace(tzinfo=None))
        if left_time < 0:
            left_time = 0
        if left_time == 0 and not exam.submit:
            exam.submit = True
            exam.save()
        return left_time

    @action(methods=['get'], detail=True)
    def left_time(self, request, pk=None):
        exam = self.get_object()
        return Response({'left_time': self.get_left_time(exam)})

    @action(methods=['get'], detail=False)
    def info(self, request, pk=None):
        username = request.user.username
        paper_id = request.query_params.get('paper_id')
        try:
            exam_list = Examination.objects.filter(paper=paper_id, student=username)
            for exam in exam_list:
                if self.get_left_time(exam) > 0:
                    self.check_object_permissions(request, exam)
                    serializer = self.get_serializer(exam)
                    return Response(serializer.data)
        except ObjectDoesNotExist:
            pass
        return Response({'message': 'invalid username or paper', 'is_ok': False},
                        status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True)
    def conservation(self, request, pk=None):
        exam = self.get_object()

        if self.get_left_time(exam) == 0:
            return Response({'message': 'already finished', 'is_ok': False},
                            status=status.HTTP_400_BAD_REQUEST)
        if exam.submit:
            return Response({'message': 'already submitted', 'is_ok': False},
                            status=status.HTTP_400_BAD_REQUEST)

        answers = request.data.get('answers')
        exam.answers = answers
        serializer = self.get_serializer(exam, data={'answers': answers}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        if getattr(exam, '_prefetched_objects_cache', None):
            exam._prefetched_objects_cache = {}

        return Response({'message': 'save successfully', 'is_ok': True}, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def submission(self, request, pk=None):
        exam = self.get_object()
        if exam.submit:
            return Response({'message': 'already submitted', 'is_ok': False},
                            status=status.HTTP_400_BAD_REQUEST)
        if exam.answers:
            answers = json.loads(exam.answers.replace('\'', '\"'))

            total_score = 0
            #print(exam.answers)
            exam_serializer = PaperDetailSerializer(exam.paper)
            for question_id, score in zip(exam_serializer.data['question_id_list'],
                                          exam_serializer.data['score_list']):
                answer = answers[str(question_id)]
                answer.sort()
                question = Question.objects.get(question_id=question_id)
                question_serializer = QuestionDetailSerializer(question)
                #print(answer, question_serializer.data['answer_list'])
                if answer == question_serializer.data['answer_list']:
                    total_score += score
            #print(total_score, np.sum(exam_serializer.data['score_list']))
        else:
            total_score = -1
        # data = {'answers': repr(request.data['answers']), 'submit': True}
        data = {'submit': True, 'score': total_score}
        exam.submit = data['submit']
        exam.score = data['score']
        serializer = self.get_serializer(exam, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if getattr(exam, '_prefetched_objects_cache', None):
            exam._prefetched_objects_cache = {}

        return Response({'message': 'submit successfully', 'is_ok': True}, status=status.HTTP_200_OK)


class AnalysisViewSet(GenericViewSet):
    queryset = Examination.objects.all()
    serializer_class = ExaminationSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['get'], detail=False)
    def testList(self, request):
        course_id = request.query_params.get('course_id')
        data = []
        for paper in Paper.objects.all().filter(course=course_id):
            d = {
                'paperID': paper.paper_id,
                'testName': paper.paper_name,
                'testAuthor': paper.teacher.name,
                'whoTakeThisTest': [],
            }
            for exam in Examination.objects.all().filter(paper=paper):
                d['whoTakeThisTest'].append({
                    'studentName': exam.student.name,
                    'studentScore': exam.score
                })
            data.append(d)
        return Response(data)

    @action(methods=['get'], detail=False)
    def studentList(self, request):
        data = []
        for student in Student.objects.all():
            d = {
                'studentID': student.username.username,
                'studentName': student.name,
                'takenTest': [],
            }
            for exam in Examination.objects.all().filter(student=student):
                d['takenTest'].append({
                    'exam': exam.paper.paper_name,
                    'testScore': exam.score,
                })
            data.append(d)
        return Response(data)

    @action(methods=['get'], detail=False)
    def tagList(self, request):
        course_id = request.query_params.get('course_id')
        data = []
        tags = {}
        for question in Question.objects.all().filter(course=course_id):
            if tags.get(question.tag) is None:
                tags[question.tag] = []
            tags[question.tag].append(question)

        for tag, question_list in tags.items():
            d = {
                'tag': tag,
                'relevantTest': [],
            }
            for i in range(0, 5):
                d['relevantTest'].append({
                    'testName': 'Exam %d' % i,
                    'testScore': [
                        {'studentName': 'jack', 'score': 100},
                        {'studentName': 'mary', 'score': 90},
                        {'studentName': 'dean', 'score': 85},
                    ]
                })
            data.append(d)
        return Response(data)

    @action(methods=['get'], detail=False)
    def questionTypeList(self, request):
        course_id = request.query_params.get('course_id')
        teacher = request.user.username
        data = {
            'multiChoices': [],
            'judge': [],
        }
        for paper in Paper.objects.all().filter(course=course_id, teacher=teacher):
            d = {
                'testName': paper.paper_name,
                'content': []
            }
            for i in range(0, 5):
                d['content'].append({
                    'questionID': int(np.random.randint(100, 300)),
                    'answerRate': '%d%%' % int(np.random.randint(0, 100))
                })
            data['multiChoices'].append(d)
            data['judge'].append(d)
        return Response(data)


