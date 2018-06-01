import ast
import uuid

from django.db import models
from django.utils import timezone

from authentication.models import Faculty, Course, Student


class ListField(models.TextField):
    description = "Stores a python list"

    def __init__(self, *args, **kwargs):
        super(ListField, self).__init__(*args, **kwargs)

    def to_python(self, value):
        if not value:
            value = []

        if isinstance(value, list):
            return value
        return ast.literal_eval(value)

    def get_prep_value(self, value):
        if value is None:
            return value
        return str(value)

    def value_to_string(self, obj):
        value = self._get_val_from_obj(obj)
        return self.get_db_prep_value(value)


class Question(models.Model):
    QUESTION_TYPE = (
        ('Choice', 'Choice'),
        ('Judge', 'Judge'),
    )
    QUESTION_LEVEL = (
        (0, 'Very Easy'),
        (1, 'Easy'),
        (2, 'Medium'),
        (3, 'Difficult'),
        (4, 'Very Difficult')
    )
    question_id = models.AutoField('问题ID号', primary_key=True)
    description = models.TextField('问题描述', null=False)
    choice_list = ListField('选择', null=False)
    answer_list = ListField('答案', null=False)
    tag = models.CharField('标签', max_length=32)
    type = models.CharField('问题类型', choices=QUESTION_TYPE, null=False, max_length=12, default='Choice')
    level = models.IntegerField('问题难度', choices=QUESTION_LEVEL, null=False, default=0)
    provider = models.ForeignKey(Faculty, verbose_name='出题人', on_delete=models.CASCADE, null=True, default=None)
    course = models.ForeignKey(Course, verbose_name='所属课程', on_delete=models.CASCADE, null=False)


class Paper(models.Model):
    paper_id = models.UUIDField('试卷ID号', primary_key=True, default=uuid.uuid1, editable=False)
    paper_name = models.CharField('试卷名', max_length=128, null=False)
    start_time = models.DateTimeField('开始时间', default=timezone.now())
    deadline = models.DateTimeField('结束时间', default=timezone.now())
    duration = models.IntegerField('持续时间(分)')
    question_id_list = models.ManyToManyField(Question, related_name='问题')
    score_list = ListField('分数表', null=False)
    teacher = models.ForeignKey(Faculty, verbose_name='布置人', on_delete=models.CASCADE, null=True, default=None)
    course = models.ForeignKey(Course, verbose_name='所属课程', on_delete=models.CASCADE, null=False)


class Examination(models.Model):
    exam_id = models.UUIDField('考试号', primary_key=True, default=uuid.uuid1, editable=False)
    paper = models.ForeignKey(Paper, verbose_name='试卷', on_delete=models.CASCADE, null=False)
    student = models.ForeignKey(Student, verbose_name='学生', on_delete=models.CASCADE, null=True, default=None)
    # teacher = models.ForeignKey('老师', Faculty, on_delete=models.CASCADE, null=True, default=None)
    answers = models.TextField('答案', null=True, default=None)
    score = models.SmallIntegerField('分数', null=False, default=-1)
    start_time = models.DateTimeField('开始时间', auto_now_add=True)
    submit = models.BooleanField('提交状态', default=False)
