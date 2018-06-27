import sqlite3
import xlrd 
import django
import os


def getColumnTitle(sheet):  
    col_dict = {}    
    for i in range(sheet.ncols):  
        col_dict[sheet.cell_value(0, i).strip()] = i  
    return col_dict  

def createCourse(filename):
    from authentication.models import Department,Major,Course,Faculty
    from auto_course.models import ClassRoom, Request, course_teacher_time_classroom_relation
    wb=xlrd.open_workbook(filename=filename)
    table=wb.sheets()[0]
    col_dict=getColumnTitle(table)
    row=table.nrows
    ary = []
    for i in range(1,row):
        t = table.row_values(i)[col_dict['t']]
        if(t==0):
            ary.append(Faculty.objects.get(username=table.row_values(i)[col_dict['教工号']]))
            continue
        depart=Department.objects.get(name='信息中心')
        course=Course(
            course_id=table.row_values(i)[col_dict['课号']],
            name=table.row_values(i)[col_dict['名称']],
            course_type=int(table.row_values(i)[col_dict['类别']]),
            credit=float(table.row_values(i)[col_dict['学分']]),
            capacity=int(table.row_values(i)[col_dict['容量']]),
            assessment="50%笔试+50%大作业",
            department=depart
        )
        course.save()
        if(table.row_values(i)[col_dict['课号']]=='1001'):
            course.state=1
            course.save()
        for var in ary:
            course.faculty.add(var)
        if(t=="1"):
            ary=[]

def createClassroom(filename):
    from authentication.models import Department,Major,Course,Faculty
    from auto_course.models import ClassRoom, Request, course_teacher_time_classroom_relation
    wb=xlrd.open_workbook(filename=filename)
    table=wb.sheets()[0]
    col_dict=getColumnTitle(table)
    row=table.nrows

    def get_campus_id(campus_name):
        if(campus_name == "紫金港"):
            campus_id = 0
        elif(campus_name == "玉泉"):
            campus_id = 1
        elif(campus_name == "西溪"):
            campus_id = 2
        elif(campus_name == "华家池"):
            campus_id = 3
        return campus_id

    for i in range(1,row):
        classroom=ClassRoom(
            campus=get_campus_id(table.row_values(i)[col_dict['校区']]),
            building=table.row_values(i)[col_dict['教学楼']],
            room=table.row_values(i)[col_dict['房间号']],
            classroom_capacity=table.row_values(i)[col_dict['容量']]
        )
        classroom.save()

def createRelation(filename):
    from authentication.models import Department,Major,Course,Faculty
    from auto_course.models import ClassRoom, Request, course_teacher_time_classroom_relation
    wb=xlrd.open_workbook(filename=filename)
    table=wb.sheets()[0]
    col_dict=getColumnTitle(table)
    row=table.nrows
    for i in range(1,row):
        print(table.row_values(i)[col_dict['教工号']])
        relation=course_teacher_time_classroom_relation(
            time=table.row_values(i)[col_dict['上课时间']],
            teacher=Faculty.objects.get(username=table.row_values(i)[col_dict['教工号']]),
            course=Course.objects.get(course_id=table.row_values(i)[col_dict['课号']]),
            classroom=ClassRoom.objects.get(classroom_id=table.row_values(i)[col_dict['教室号']])
        )
        relation.save()

def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "top.settings")
    django.setup()

    c_filename='./auto_course/init_data/course.xlsx'
    cr_filename='./auto_course/init_data/classroom.xlsx'
    r_filename='./auto_course/init_data/relation.xlsx'

    createCourse(c_filename)
    createClassroom(cr_filename)
    createRelation(r_filename)

    from auto_course.models import ClassRoom, Request, course_teacher_time_classroom_relation
    from authentication.models import Department,Major,Course,Faculty

    request=Request(
        teacher=Faculty.objects.get(username='2110100000'),
        topic="教室调整",
        content="把编译原理课教室换到东四509",
        status=0
    )
    request.save()



 
if __name__ == '__main__':
    main()
    print("data init successfully")