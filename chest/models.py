from django.db import models

# Create your models here.
class Item(models.Model):
    description = models.CharField(max_length=255)
    container = models.ManyToManyField('Container', related_name='+')
    creation_date = models.DateField('creation date')
    modification_date = models.DateField('modification date')

class BarcodeTypes(models.Model):
    name = models.CharField(max_length=127)
    creation_date = models.DateField('creation date')
    modification_date = models.DateField('modification date')

class Barcode(models.Model):
    item = models.ForeignKey(Item, models.CASCADE)
    content = models.CharField(max_length=64)
    type = models.ForeignKey(BarcodeTypes, on_delete=models.SET_NULL, null=True)
    creation_date = models.DateField('creation date')
    modification_date = models.DateField('modification date')

class Location(models.Model):
    name = models.CharField(max_length=255)
    creation_date = models.DateField('creation date')
    modification_date = models.DateField('modification date')

class Container(models.Model):
    location = models.ForeignKey(Location, models.SET_NULL, null=True)
    name = models.CharField(max_length=255)
    capacity = models.IntegerField()
    content = models.ManyToManyField(Item, related_name='+')
    creation_date = models.DateField('creation date')
    modification_date = models.DateField('modification date')