
#<font face="Consolas">Interface

##1. Question  

####1. query:  
GET /api/online_testing/question/  

1./api/online_testing/question/?course=XXX (course_id=XXX)

2./api/online_testing/question/?tag_list=A&tag_list=B (tag_list=[A, B])

3./api/online_testing/question/?teacher_list=A&teacher_list=B
 (teacher_list=[A, B])
  

####2. insert:  
POST /api/online_testing/question/  

```
{
    "description": "Greedy method is a special case of local search.",
    "type": "Judge",
    "tag": "Local search",
    "choice_list": ['T', 'F'],
    "answer_list": [1],
    'level': 0,
    'course': '21120261',
    'provider': 'Yue',
}
```


####3. delete:  
DELETE /api/online_testing/question/(question_id)  



####4. update  
PUT /api/online_testing/question/(question_id)  


####5. partial_update  
PATCH /api/online_testing/question/(question_id)

##2. Paper

####1. query  
GET /api/online_testing/paper/  
####2. query_detail  
GET /api/online_testing/paper/(paper_id)/
####3. insert  
POST /api/online_testing/paper/  
####4. delete  
DELETE /api/online_testing/paper/(paper_id)/

##3. Examination

####1. begin examination  
POST /api/online_testing/examination/  
####2. get examination-id
GET /api/online_testing/examination/info/?username=XXX&paper_id=XXX
####3. query left time  
GET /api/online_testing/examination/(examination-id)/left_time
####4. save the answer
POST /api/online_testing/examination/(examination-id)/conservation/
####5. submit
POST /api/online_testing/examination/(examination-id)/submission/


##4. Analysis
####1. query by student_id  
GET /api/online_testing/student/?student_id_list=A&student_id_list=B  
(student_id = [A, B])
####2. query by paper_id
GET /api/online_testing/paper/?paper_id_list=A&paper_id_list=B  
(paper_id = [A, B])


</font>