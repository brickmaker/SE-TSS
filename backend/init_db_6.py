import sqlite3
import xlrd
import django
import os



def getColumnTitle(sheet):
    col_dict = {}
    for i in range(sheet.ncols):
        col_dict[sheet.cell_value(0, i).strip()] = i
    return col_dict


def createAllOtherData():
    import score_management.models as models
    print("Init classroom...")
    models.ClassRoom.objects.all().delete()
    create = models.ClassRoom.objects.create
    classroom=create(classroom_location="紫金港西1-503", classroom_capacity=100)
    print("Init course_teacher_time_classroom_relation...")
    models.course_teacher_time_classroom_relation.objects.all().delete()
    create = models.course_teacher_time_classroom_relation.objects.create
    from authentication.models import Course, Student, Faculty
    students = Student.objects.all()
    courses = Course.objects.all()
    teachers = Faculty.objects.all()

    for j in range(teachers.count()):
        t = teachers[j]
        for k in range(courses.count()):
            c = courses[k]
            create(teacher=t, course=c, classroom=classroom,time="")

    print("Init course_select_relation...")
    models.course_select_relation.objects.all().delete()
    create = models.course_select_relation.objects.create
    course_teacher_time_classroom_relations=models.course_teacher_time_classroom_relation.objects.all()
    for i in range (students.count()):
        s=students[i]
        for j in range(course_teacher_time_classroom_relations.count()):
            c=course_teacher_time_classroom_relations[j]
            create(student=s,course=c)

def createScore():
    import score_management.models as models
    print("Init Score_relation...")
    models.Score_Relation.objects.all().delete()
    create = models.Score_Relation.objects.create

    course_select_relations=models.course_select_relation.objects.all()
    for i in range(course_select_relations.count()):
        create(course_select_info=course_select_relations[i],score=i%100)

def createCourse(filename):
    from authentication.models import Course, Department, Faculty
    wb = xlrd.open_workbook(filename=filename)
    table = wb.sheets()[0]
    col_dict = getColumnTitle(table)
    row = table.nrows
    print(row)

    for i in range(1, row):
        try:
            department = Department.objects.get(name=table.row_values(i)[col_dict['学院']])
            course = Course(course_id=table.row_values(i)[col_dict['课号']],
                            name=table.row_values(i)[col_dict['名称']],
                            course_type=table.row_values(i)[col_dict['类型']],
                            credit=table.row_values(i)[col_dict['学分']],
                            capacity=table.row_values(i)[col_dict['容量']],
                            department=department,
                            semester=table.row_values(i)[col_dict['开课学期']],
                            assessment=table.row_values(i)[col_dict['考核方式']],
                            state=table.row_values(i)[col_dict['审核状态']])
            # course.faculty.set(Faculty.objects.all())
            course.save()
        except ValueError as err:
            print(err)
            print('Format doesn\'t match!!check xlsx ' + str(i) + 'th line!')


def createTake():
    from authentication.models import Course, Student, Faculty
    from score_management.models import Take
    students = Student.objects.all()
    courses = Course.objects.all()
    teachers = Faculty.objects.all()
    for i in range(students.count()):
        s = students[i]
        for j in range(teachers.count()):
            t = teachers[j]
            for k in range(courses.count()):
                c = courses[k]
                score = min(i + j + k, 100)
                take = Take(student=s, teacher=t, course=c, score=score)
                take.save()




def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "top.settings")
    django.setup()

    course_filename = "score_management/course.xlsx"

    createCourse(course_filename)
    #createTake()
    createAllOtherData()
    createScore()


if __name__ == '__main__':
    main()

    print("data init successfully")
