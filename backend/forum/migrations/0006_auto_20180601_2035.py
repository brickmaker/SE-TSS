# Generated by Django 2.0.3 on 2018-06-01 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0005_auto_20180601_2034'),
    ]

    operations = [
        migrations.AlterField(
            model_name='section',
            name='name',
            field=models.TextField(),
        ),
    ]
