from django.urls import path
from .views import ProductList
import ruestore.views as views

urlpatterns = [
    path("", views.home, name="home"),
    path("products/", ProductList.as_view()),
     path('', views.store, name="store"),
    path('add/<int:id>/', views.add_to_cart),
    path('checkout/', views.checkout, name="checkout"),

]
