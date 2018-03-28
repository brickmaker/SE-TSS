from django.http import JsonResponse


def index(request):
    return JsonResponse({"key": "Forum index"})
