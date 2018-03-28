from django.http import JsonResponse


def index(request):
    return JsonResponse({"key": "Info index"})
