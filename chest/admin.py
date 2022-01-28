from django.contrib import admin

from .models import Item, Container, Barcode, Location, BarcodeTypes

# Register your models here.
admin.site.register(Item)
admin.site.register(Container)
admin.site.register(Location)
admin.site.register(Barcode)
admin.site.register(BarcodeTypes)