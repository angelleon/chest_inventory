# Generated by Django 4.0 on 2021-12-18 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
                ('creation_date', models.DateField(verbose_name='creation date')),
                ('modification_date', models.DateField(verbose_name='modification date')),
            ],
        ),
    ]
