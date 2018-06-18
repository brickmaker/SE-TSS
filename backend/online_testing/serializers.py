import ast

from rest_framework import serializers
from online_testing.models import Question, Paper, Examination


class ListField(serializers.ListField):
    def to_representation(self, data):
        #print('---------------------', data)
        if not isinstance(data, list):
            data = ast.literal_eval(data)
        return super(ListField, self).to_representation(data)


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('question_id', 'description', 'course', 'provider', 'type')


class QuestionDetailSerializer(serializers.ModelSerializer):
    answer_list = ListField(child=serializers.IntegerField())
    choice_list = ListField(child=serializers.CharField())
    #course_name = serializers.SerializerMethodField()
    #level = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = '__all__'


class PaperSerializer(serializers.ModelSerializer):
    #score_list = ListField(child=serializers.IntegerField())

    class Meta:
        model = Paper
        fields = ('paper_id', 'paper_name', 'teacher', 'course', 'start_time', 'deadline', 'duration')


class PaperDetailSerializer(serializers.ModelSerializer):
    score_list = ListField(child=serializers.IntegerField())
    #question_id_list = serializers.ManyRelatedField()

    class Meta:
        model = Paper
        fields = '__all__'


class ExaminationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examination
        fields = '__all__'