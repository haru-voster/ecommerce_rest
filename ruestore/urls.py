from django.urls import path

import ruestore.views as views
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
   path("", views.home, name="home"),
   path('products/', views.ProductList.as_view(), name='product-list'),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)