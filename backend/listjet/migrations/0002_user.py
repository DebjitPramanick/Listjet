# Generated by Django 3.2 on 2021-06-21 02:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listjet', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('email', models.CharField(max_length=150)),
            ],
        ),
    ]