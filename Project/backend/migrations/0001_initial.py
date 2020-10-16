# Generated by Django 3.1 on 2020-08-11 02:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Doctor_id', models.IntegerField(max_length=10)),
                ('Name', models.CharField(max_length=40)),
                ('Address', models.TextField(max_length=150)),
                ('Email', models.EmailField(max_length=30)),
                ('Degree', models.CharField(max_length=100)),
                ('Specialization', models.TextField(max_length=200)),
            ],
        ),
    ]