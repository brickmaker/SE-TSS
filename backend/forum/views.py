import json
from django.http import JsonResponse



def index(request):
    return JsonResponse({'key': 'Are you OK??'})
    
    
def subscriptions(request):
    request = json.loads(request.body.decode("utf-8"))
    return JsonResponse({'uid':request['uid'],'token':request['token']})
