import sqlite3
import xlrd 
import django
import os


def getColumnTitle(sheet):  
    col_dict = {}    
    for i in range(sheet.ncols):  
        col_dict[sheet.cell_value(0, i).strip()] = i  
    return col_dict  

def createDepartment(filename):
	from authentication.models import Department,Major,Major_Class
	wb=xlrd.open_workbook(filename=filename)
	table=wb.sheets()[0]
	col_dict=getColumnTitle(table)
	row=table.nrows
	for i in range(1,row):
		depart=Department(name=table.row_values(i)[col_dict['学院名称']])
		depart.save()
		major=Major(depart=depart,major=table.row_values(i)[col_dict['专业名称']])
		major.save()
		class_=Major_Class(major=major,class_name=table.row_values(i)[col_dict['班级']])
		class_.save()


def createStudent(filename):
	from authentication.models import Student,AccountManager,Department,Major,Major_Class
	wb=xlrd.open_workbook(filename=filename)
	table=wb.sheets()[0]
	col_dict=getColumnTitle(table)
	row=table.nrows
	manager=AccountManager()
	print(row)
	
	for i in range(1,row):
		try:
			department = Department.objects.get(name=table.row_values(i)[col_dict['学院']])
			major=Major.objects.get(major=table.row_values(i)[col_dict['专业']],depart=department)
			class_name=Major_Class.objects.get(major=major,class_name=table.row_values(i)[col_dict['班级']])
			student=manager.create_user(username=str(table.row_values(i)[col_dict['学号']]),id_number=table.row_values(i)[col_dict['身份证号']],
					    email=table.row_values(i)[col_dict['电子邮件']],
					    user_type=1,
					    name=table.row_values(i)[col_dict['姓名']], 
					    gender  =table.row_values(i)[col_dict['性别']], 
					    department=department,
					    grade=table.row_values(i)[col_dict['入学年份']],  
					    major=major,
					    class_name=class_name,  
					    ) 
		except ValueError as err:
			print(err)
			print('Format doesn\'t match!!check xlsx '+str(i)+'th line!')

def createTeacher(filename):
	from authentication.models import AccountManager,Department,Major,Major_Class
	wb=xlrd.open_workbook(filename=filename)
	table=wb.sheets()[0]
	col_dict=getColumnTitle(table)
	row=table.nrows
	manager=AccountManager()
	print(row)
	
	for i in range(1,row):
		try:
			department = Department.objects.get(name=table.row_values(i)[col_dict['学院']])
			manager.create_user(username=str(table.row_values(i)[col_dict['教工号']]),id_number=table.row_values(i)[col_dict['身份证号']],
					    email=table.row_values(i)[col_dict['电子邮件']],
					    user_type=2,
					    name=table.row_values(i)[col_dict['姓名']], 
					    gender  =table.row_values(i)[col_dict['性别']], 
					    department=department,
						title= table.row_values(i)[col_dict['职称']],
					    ) 
		except ValueError as err:
			print(err)
			print('Format doesn\'t match!!check xlsx '+str(i)+'th line!')

def createStaff(filename):
	from authentication.models import AccountManager,Department,Major,Major_Class
	wb=xlrd.open_workbook(filename=filename)
	table=wb.sheets()[0]
	col_dict=getColumnTitle(table)
	row=table.nrows
	manager=AccountManager()
	print(row)
	
	for i in range(1,row):
		try:
			department = Department.objects.get(name=table.row_values(i)[col_dict['学院']])
			manager.create_user(username=str(table.row_values(i)[col_dict['教工号']]),id_number=table.row_values(i)[col_dict['身份证号']],
					    email=table.row_values(i)[col_dict['电子邮件']],
					    user_type=3,
					    name=table.row_values(i)[col_dict['姓名']], 
					    gender  =table.row_values(i)[col_dict['性别']], 
					    department=department,
					    ) 
		except ValueError as err:
			print(err)
			print('Format doesn\'t match!!check xlsx '+str(i)+'th line!')

def createCourse(filename):
	from authentication.models import Course,Department,Faculty

	wb=xlrd.open_workbook(filename=filename)
	table=wb.sheets()[0]
	col_dict=getColumnTitle(table)
	row=table.nrows

	for i in range(1,row):
		try:
			department = Department.objects.get(name=table.row_values(i)[col_dict['学院']])
			course=Course(course_id=table.row_values(i)[col_dict['课号']],
						  name=table.row_values(i)[col_dict['名称']],
						  course_type=table.row_values(i)[col_dict['类型']],
						  credit=table.row_values(i)[col_dict['学分']],
						  capacity=table.row_values(i)[col_dict['容量']],
						  department=department,
						  semester=table.row_values(i)[col_dict['开课学期']],
						  assessment=table.row_values(i)[col_dict['考核方式']],
						  state=table.row_values(i)[col_dict['审核状态']])
			#course.faculty.set(Faculty.objects.all())
			course.save()
		except ValueError as err:
			print(err)
			print('Format doesn\'t match!!check xlsx '+str(i)+'th line!')

def createTake():
	from authentication.models import Course, Student, Faculty
	from score_management.models import Take
	students=Student.objects.all()
	courses=Course.objects.all()
	teachers=Faculty.objects.all()
	for i in range(students.count()):
		s=students[i]
		for j in range(teachers.count()):
			t=teachers[j]
			for k in range(courses.count()):
				c=courses[k]
				score=min(i+j+k,100)
				take=Take(student=s,teacher=t,course=c,score=score)
				take.save()


def main():
	os.environ.setdefault("DJANGO_SETTINGS_MODULE", "top.settings")
	django.setup()
	from authentication.models import Department
	depart=Department(name='信息中心')
	depart.save()

	d_filename='./authentication/init_data/department.xlsx'
	s_filename='./authentication/init_data/student.xlsx'
	t_filename='./authentication/init_data/teacher.xlsx'
	st_filename='./authentication/init_data/staff.xlsx'

	createDepartment(d_filename)
	createStudent(s_filename)
	createTeacher(t_filename)
	createStaff(st_filename)
	createCourse(c_filename)

 

if __name__ == '__main__':
	main()
	print("data init successfully")

