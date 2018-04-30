from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from score_management.models import Take,Course
from score_management.serializers import TakeSerializer

@api_view(['GET','POST'])
def score_list(request):
    """
    List all Score, or create a new snippet.
    """
    takes = Take.objects.filter(course__cid=request.data["cid"])
    serializer = TakeSerializer(takes, many=True)
    return Response(serializer.data)

        #serializer = TakeSerializer(data=request.data)
        #if serializer.is_valid():
        #    serializer.save()
        #    return Response(serializer.data, status=status.HTTP_201_CREATED)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

