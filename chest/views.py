from logging import getLogger

from django.shortcuts import render
from django.http import HttpResponse

from .models import Barcode, Item, Container

log = getLogger(__name__)

# Create your views here.
def index(request):
    return HttpResponse('Hello world!')

def print_codes(request):
    code_list = Barcode.objects.all()
    context = {'code_list': code_list}
    return render(request, 'print/index.html', context)

def items(request):
    item_list = Item.objects.all()
    for _ in map(lambda i: log.debug(i), item_list):
        pass
    context = {'item_list': item_list}
    return render(request, 'item/index.html', context)


def items_edit(request, id):
    item = Item.objects.filter(id=id).first()
    containers = Container.objects.all()
    context = {'item': item, 'containers': containers }
    return render(request, 'item/edit.html', context)

def add_item(request):
    containers = Container.objects.all()
    context = {'containers': containers }
    return render(request, 'item/add.html', context)

def save_item(request):
    pass