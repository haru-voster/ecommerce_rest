from django.shortcuts import render
from .models import *

def store(request):
    products = Product.objects.all()
    categories = Category.objects.all()

    search = request.GET.get("search")
    cat = request.GET.get("category")

    if search:
        products = products.filter(name__icontains=search)

    if cat:
        products = products.filter(category_id=cat)

    return render(request,"store.html",{
        "products":products,
        "categories":categories
    })
