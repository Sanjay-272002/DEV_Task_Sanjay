from rest_framework import routers
from django.urls import path, include
from api.order.views import *
from . import views
urlpatterns = [
    path('addorder/<str:id>/<str:token>/', views.CreateOrderViews.as_view(), name='addorder'),
    path("postflight/", views.FlightViews.as_view(), name='postflight'),
    path("listflight/", views.listflights.as_view(), name='listflight'),
    path("listbooks/", views.listorders.as_view(), name='listbooks'),
    path("adminview/", AdminViewOrders.as_view({'get': 'search'}), name='listorders'),
    path('search/', SearchViewSet.as_view({'get': 'search'}), name='search'),
    path('listseats/', views.listseats.as_view(), name='listseats'),

]
