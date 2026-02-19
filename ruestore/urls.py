from django.urls import path
from .views import ProductList
import ruestore.views as views

urlpatterns = [
    path("", views.home, name="home"),
    path("products/", ProductList.as_view()),
]
