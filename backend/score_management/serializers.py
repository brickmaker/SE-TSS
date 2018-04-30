from rest_framework import serializers
from score_management.models import Take

class TakeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Take
        fields=('student','course','teacher','score','test_date')