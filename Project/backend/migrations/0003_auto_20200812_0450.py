# Generated by Django 3.1 on 2020-08-12 04:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20200811_1619'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctor',
            name='Address',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='Specialization',
            field=models.CharField(max_length=200),
        ),
    ]
