from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=20, primary_key=True, serialize=False, unique=True, verbose_name='用户名')),
                ('id_number', models.CharField(default='null', max_length=18, unique=True, verbose_name='身份证号')),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('user_type', models.PositiveSmallIntegerField(choices=[(1, '学生'), (2, '老师'), (3, '教务管理员'), (4, '系统管理员')], default=1)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.CharField(default='null', max_length=10, primary_key=True, serialize=False, verbose_name='课号')),
                ('name', models.CharField(max_length=20, unique=True, verbose_name='名称')),
                ('course_type', models.PositiveSmallIntegerField(choices=[(0, '公共课'), (1, '专业选修课'), (2, '专业必修课')], verbose_name='课程类别')),
                ('credit', models.FloatField(verbose_name='学分')),
                ('capacity', models.IntegerField(verbose_name='容量')),
                ('semester', models.PositiveSmallIntegerField(choices=[(0, '春'), (1, '夏'), (2, '春夏'), (3, '秋'), (4, '冬'), (5, '秋冬'), (6, '短')], default=0, verbose_name='开课学期')),
                ('assessment', models.CharField(max_length=20, null=True, verbose_name='考核方式')),
                ('state', models.PositiveSmallIntegerField(choices=[(0, '不通过'), (1, '待审批'), (2, '已通过')], default=0, verbose_name='审核状态')),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('name', models.CharField(max_length=100, primary_key=True, serialize=False, verbose_name='所在院系')),
            ],
        ),
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True, verbose_name='时间')),
                ('content', models.CharField(max_length=100, verbose_name='内容')),
            ],
        ),
        migrations.CreateModel(
            name='Major',
            fields=[
                ('major', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True, verbose_name='开设专业')),
                ('depart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='major_for', to='authentication.Department', verbose_name='所在院系')),
            ],
        ),
        migrations.CreateModel(
            name='Major_Class',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('class_name', models.CharField(max_length=100, unique=True, verbose_name='专业班级')),
                ('major', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='class_name_for', to='authentication.Major', verbose_name='开设专业')),
            ],
        ),
        migrations.CreateModel(
            name='People',
            fields=[
                ('username', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('id_number', models.CharField(default='null', max_length=18, unique=True, verbose_name='身份证号')),
                ('date_created', models.TimeField(auto_now_add=True, verbose_name='保存日期')),
                ('date_modified', models.TimeField(auto_now=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True, verbose_name='电子邮件')),
                ('name', models.CharField(max_length=20, null=True, verbose_name='姓名')),
                ('gender', models.CharField(choices=[('M', '男'), ('F', '女')], max_length=1, null=True, verbose_name='性别')),
            ],
        ),
        migrations.AddField(
            model_name='course',
            name='department',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentication.Department'),
        ),
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('people_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.People')),
            ],
            bases=('authentication.people',),
        ),
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('people_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.People')),
                ('title', models.CharField(blank=True, max_length=50, verbose_name='职称')),
                ('img', models.ImageField(blank=True, max_length=1048576, null=True, upload_to='profile', verbose_name='个人头像')),
            ],
            bases=('authentication.people',),
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('people_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.People')),
                ('img', models.ImageField(blank=True, max_length=1048576, null=True, upload_to='profile', verbose_name='个人头像')),
            ],
            bases=('authentication.people',),
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('people_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.People')),
                ('img', models.ImageField(blank=True, max_length=1048576, null=True, upload_to='profile', verbose_name='个人头像')),
                ('grade', models.IntegerField(default=2015, verbose_name='入学年份')),
            ],
            bases=('authentication.people',),
        ),
        migrations.AddField(
            model_name='people',
            name='department',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='authentication.Department'),
        ),
        migrations.CreateModel(
            name='StudentAnalysis',
            fields=[
                ('student_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.Student')),
                ('rank', models.IntegerField(null=True, verbose_name='排名')),
            ],
            bases=('authentication.student',),
        ),
        migrations.AddField(
            model_name='student',
            name='class_name',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='authentication.Major_Class', verbose_name='所在班级'),
        ),
        migrations.AddField(
            model_name='student',
            name='major',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='authentication.Major', verbose_name='专业'),
        ),
        migrations.AddField(
            model_name='course',
            name='faculty',
            field=models.ManyToManyField(related_name='teacher_course', to='authentication.Faculty'),
        ),
    ]
