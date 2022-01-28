from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('print/', views.print_codes, name='print'),
    path('item', views.items, name='items'),
    path('item/<int:id>/edit', views.items_edit, name='items_edit'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
