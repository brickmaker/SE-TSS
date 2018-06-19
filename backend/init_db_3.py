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
	from xkxt.models import major_cul_prog, major_requirement, student_cul_prog
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
			#assessment=
			department=depart
		)
		course.save()
		for var in ary:
			course.faculty.add(var)
		if(t=="1"):
			ary=[]

def createProgramForMajor(filename):
	from authentication.models import Department,Major,Course
	from xkxt.models import major_cul_prog, major_requirement, student_cul_prog
	wb=xlrd.open_workbook(filename=filename)
	table=wb.sheets()[0]
	col_dict=getColumnTitle(table)
	row=table.nrows
	for i in range(1,row):
		major=Major.objects.get(major=table.row_values(i)[col_dict['专业名称']])
		course=Course.objects.get(course_id=table.row_values(i)[col_dict['课号']])
		prog=major_cul_prog(
			major=major,
			course=course,
			term=table.row_values(i)[col_dict['学期']]
		)
		prog.save()

def createProgramRequirement(filename):
	from authentication.models import Department,Major,Course
	from xkxt.models import major_cul_prog, major_requirement, student_cul_prog
	wb=xlrd.open_workbook(filename=filename)
	table=wb.sheets()[0]
	col_dict=getColumnTitle(table)
	row=table.nrows
	for i in range(1,row):
		major=Major.objects.get(major=table.row_values(i)[col_dict['专业名称']])
		prog=major_requirement(
			major=major,
			public_course_mincredit=int(table.row_values(i)[col_dict['公共课学分']]),
			major_optional_mincredit=int(table.row_values(i)[col_dict['专业选修课学分']])
		)
		prog.save()

def main():
	os.environ.setdefault("DJANGO_SETTINGS_MODULE", "top.settings")
	django.setup()

	c_filename='./xkxt/init_data/course.xlsx'
	p_filename='./xkxt/init_data/program.xlsx'
	pr_filename='./xkxt/init_data/program_requirement.xlsx'

	#createCourse(c_filename)
	createProgramForMajor(p_filename)
	createProgramRequirement(pr_filename)
 
if __name__ == '__main__':
	main()
	print("data init successfully")