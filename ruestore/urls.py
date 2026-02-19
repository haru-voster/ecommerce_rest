from django.urls import path

import ruestore.views as views

urlpatterns = [
   path("", views.home, name="home"),
   path('products/', views.ProductList.as_view(), name='product-list'),

]
