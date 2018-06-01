import ast

from rest_framework import serializers
from online_testing.models import Question, Paper, Examination


class ListField(serializers.ListField):
    def to_representation(self, data):
        if not isinstance(data, list):
            data = ast.literal_eval(data)
        return super(ListField, self).to_representation(data)


class QuestionSerializer(serializers.ModelSerializer):
    answer_list = ListField(child=serializers.IntegerField())
    choice_list = ListField(child=serializers.CharField())
    course_name = serializers.SerializerMethodField()
    level = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ('question_id', 'description', 'choice_list', 'answer_list',
                  'tag', 'type', 'level', 'course', 'course_name', 'provider')

    def get_level(self, obj):
        return obj.get_level_display()

    def get_course_name(self, obj):
        return obj.course.name

    #def to_representation(self, instance):
    #    request = self.context.get('request', None)
        #print(request.user)
    #    return super(QuestionSerializer, self).to_representation(instance)


class PaperSerializer(serializers.ModelSerializer):
    score_list = ListField(child=serializers.IntegerField())

    class Meta:
        model = Paper
        fields = '__all__'


class ExaminationSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField()

    class Meta:
        model = Examination
        fields = '__all__'

    def get_answers(self, obj):
        #print('obj.answers', obj.answers)
        if obj.answers:
            import json
            return json.loads(obj.answers.replace('\'', '\"'))
        return None