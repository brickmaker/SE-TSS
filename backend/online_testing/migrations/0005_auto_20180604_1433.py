# Generated by Django 2.0.5 on 2018-06-04 14:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('online_testing', '0004_auto_20180604_1356'),
    ]

    operations = [
        migrations.AlterField(
            model_name='examination',
            name='start_time',
            field=models.DateTimeField(default=datetime.datetime(2018, 6, 4, 14, 33, 35, 118114), verbose_name='开始时间'),
        ),
        migrations.AlterField(
            model_name='paper',
            name='deadline',
            field=models.DateTimeField(default=datetime.datetime(2018, 6, 4, 14, 33, 35, 118114), verbose_name='结束时间'),
        ),
        migrations.AlterField(
            model_name='paper',
            name='question_id_list',
            field=models.ManyToManyField(related_name='paper_question', to='online_testing.Question'),
        ),
        migrations.AlterField(
            model_name='paper',
            name='start_time',
            field=models.DateTimeField(default=datetime.datetime(2018, 6, 4, 14, 33, 35, 118114), verbose_name='开始时间'),
        ),
    ]
