from django.http import HttpResponse

from xkxt.models import Department, Major

def test1(request):
	res=""

	deps=Department.objects.all()

	for dep in deps:
		res+="<br>"+dep.name + ":<br>"
		maj_lst=dep.major.all()
		for maj in maj_lst:
			res+=maj.major+" "

	return HttpResponse("<p>"+res+"</p>")

def test2(request):
	dep=Department.objects.get(name='计算机学院')
	maj=Major(depart=dep, major='软件学院')
	maj.save()
	return HttpResponse("<p>added!!</p>")