from locust import HttpLocust, TaskSet
import json

def create_to_do(l):
    data = {
        'username': '随便',
    'id_number': 18位,
    'user_type': 1,
    'email': '1qa11@126.com',
    'name': 'chi', 
    'gender': 'F',  
    'department': '计算机',
    'grade': '2015',    
    'major': '计算机', 
    'class_name': '', 
    'img':      
    }
    l.client.post("/api/to-do/", data=json.dumps(data))

def get_to_do(l):
    l.client.get("/api/to-do")

class UserBehavior(TaskSet):
    tasks = {get_to_do: 2, create_to_do: 1}

    def on_start(self):
        self.client.headers['Content-Type'] = "application/json"
        self.client.headers['Authorization'] = "Bearer nonadmintoken123"

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000