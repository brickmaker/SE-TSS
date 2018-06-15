# -*- coding: utf-8 -*-

import django
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "top.settings")
django.setup()
from forum import models

def init_user():
    print("Init 4-Forum User...")
    models.User.objects.all().delete()
    create = models.User.objects.create
    create(name="张一",id_id="1")
    create(name="张二",id_id="2")
    create(name="张三",id_id="3")
    create(name="张四",id_id="3150100001.0")
    create(name="张五",id_id="3150100002.0")
    create(name="张六",id_id="3150100003.0")
    create(name="张七",id_id="3150100004.0")
    create(name="张八",id_id="3150100005.0")
    create(name="张九",id_id="3150100006.0")
    
def init_section():
    print("Init 4-Forum Section...")
    models.Section.objects.all().delete()
    
    def create(id,name,type,admin="1"):
        Section = models.Section.objects.create
        section = Section(id=id,name=name,type=type)
        section.save()
        section.admin.set(admin)
    
    create(1,"人文学院","CL")
    create(2,"外国语言文化与国际交流学院","CL")
    create(3,"传媒与国际文化学院","CL")
    create(4,"数学科学学院","CL")
    create(5,"物理学系","CL")
    create(6,"化学系","CL")
    create(7,"地球科学学院","CL")
    create(8,"心理与行为科学系","CL")
    create(9,"医学院","CL")
    create(10,"药学院","CL")
    create(11,"机械工程学院","CL")
    create(12,"材料科学与工程学院","CL")
    create(13,"能源工程学院","CL")
    create(14,"电气工程学院","CL")
    create(15,"建筑工程学院","CL")
    create(16,"化学工程与生物工程学院","CL")
    create(17,"海洋学院","CL")
    create(18,"航天航空学院","CL")
    create(19,"高分子科学与工程学系","CL")
    create(20,"生命科学学院","CL")
    create(21,"生物系统工程与食品科学学院","CL")
    create(22,"环境与资源学院","CL")
    create(23,"农业与生物技术学院","CL")
    create(24,"动物科学学院","CL")
    create(25,"经济学院","CL")
    create(26,"光华法学院","CL")
    create(27,"教育学院","CL")
    create(28,"管理学院","CL")
    create(29,"公共管理学院","CL")
    create(30,"马克思主义学院","CL")
    create(31,"光电科学与工程学院","CL")
    create(32,"信息与电子工程学院","CL")
    create(33,"控制科学与工程学院","CL")
    create(34,"计算机科学与技术学院","CL")
    create(35,"软件学院","CL")
    create(36,"软件工程","CE")
    create(37,"计算理论","CE")
    create(38,"计算机图形学","CE")
    create(39,"汇编语言","CE")
    create(40,"密码学","CE")
    create(41,"王章野","TR")
    create(42,"金小刚","TR")
    create(43,"周昆","TR")
    create(44,"白洪欢","TR")
    create(45,"白洪欢","TR")
    create(46,"陈越","TR")
    
def init_college():
    print("Init 4-Forum College...")
    models.College.objects.all().delete()
    create = models.College.objects.create
    for section in models.Section.objects.filter(type='CL'):
        create(id=section.id,name=section.name,section=section)

def init_course():
    print("Init 4-Forum Course...")
    models.Course.objects.all().delete()
    create = models.Course.objects.create
    create(id=1,name='软件工程',section_id=36,college_id=34)    
    create(id=2,name='计算理论',section_id=37,college_id=34)    
    create(id=3,name='计算机图形学',section_id=38,college_id=34)    
    create(id=4,name='汇编语言',section_id=39,college_id=34)    
    create(id=5,name='密码学',section_id=40,college_id=34)   

def init_teacher():
    print("Init 4-Forum Teacher...")
    models.Teacher.objects.all().delete()
    create = models.Teacher.objects.create
    create(id=1,name="王章野",section_id=41,college_id=34,course_id=1)
    create(id=2,name="金小刚",section_id=42,college_id=34,course_id=2)
    create(id=3,name="周昆",section_id=43,college_id=34,course_id=3)
    create(id=4,name="白洪欢",section_id=44,college_id=34,course_id=4)
    create(id=5,name="白洪欢",section_id=45,college_id=34,course_id=5)
    create(id=6,name="陈越",section_id=46,college_id=34,course_id=1)
    
def init_subscription():
    print("Init 4-Forum Subscription...")
    models.Subscribe.objects.all().delete()
    create = models.Subscribe.objects.create
    
def init_message():
    print("Init 4-Forum Message...")
    models.Message.objects.all().delete()
    create = models.Message.objects.create
    
def init_reply():
    print("Init 4-Forum Reply...")
    models.Reply.objects.all().delete()
    create = models.Reply.objects.create
    
def init_comment():
    print("Init 4-Forum Comment...")
    models.Reply_reply.objects.all().delete()
    create = models.Reply_reply.objects.create

def init_announcement():
    print("Init 4-Forum Announcement...")
    models.Announcement.objects.all().delete()
    create = models.Announcement.objects.create
    
def init_area():
    print("Init 4-Forum Area...")
    models.Area.objects.all().delete()
    create = models.Area.objects.create
    for id in range(1,4):
        create(name="人文",college_id=id)
    for id in range(4,9):
        create(name="理",college_id=id)
    for id in range(9,11):
        create(name="医",college_id=id)
    for id in range(11,20):
        create(name="工",college_id=id)
    for id in range(20,25):
        create(name="农业生命环境",college_id=id)
    for id in range(25,31):
        create(name="社会科学",college_id=id)
    for id in range(31,36):
        create(name="信息",college_id=id)
    
def init_thread():
    print("Init 4-Forum Thread...")
    models.Thread.objects.all().delete()
    create = models.Thread.objects.create
    create(title="文章01",poster_id="1",section_id=36,content="这是搜索锚点")
    create(title="文章02",poster_id="2",section_id=36,content="这是搜索锚点")
    create(title="文章03",poster_id="1",section_id=36,content="这是标记锚点")
    create(title="文章04",poster_id="2",section_id=36,content="这是标记锚点")
    create(title="文章05",poster_id="1",section_id=36,content="这是标记锚点")
    create(title="文章06",poster_id="2",section_id=36,content="白日依山尽")
    create(title="文章07",poster_id="1",section_id=36,content="黄河入海流")
    create(title="文章08",poster_id="2",section_id=36,content="欲穷千里目")
    create(title="文章09",poster_id="1",section_id=36,content="更上一层楼")
    create(title="文章10",poster_id="2",section_id=36,content="锄禾日当午")
    create(title="文章11",poster_id="1",section_id=41,content="汗滴禾下土")
    create(title="文章12",poster_id="2",section_id=41,content="汗滴禾下土")
    create(title="文章13",poster_id="2",section_id=41,content="谁知盘中餐")
    create(title="文章14",poster_id="2",section_id=41,content="粒粒皆辛苦")
    
def init_search():
    print("4-Forum: build index...")
    os.system("python manage.py update_index")
    
def init_db():
    print("Init 4-forum DB...")
    init_user()
    init_section()
    init_college()
    init_course()
    init_teacher()
    init_subscription()
    init_message()
    init_reply()
    init_comment()
    init_announcement()
    init_area()
    init_thread()
    init_search()
    print("4-Forum Module DB initialization finished...")



if __name__ == '__main__':
    init_db()