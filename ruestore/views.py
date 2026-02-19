from django.shortcuts import render
from .models import *
from .models import Category, Product, Cart, CartItem, Order, OrderItem
from .serializers import ProductSerializer      

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
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

@login_required
def add_to_cart(request, id):
    product = Product.objects.get(id=id)
    cart, created = Cart.objects.get_or_create(user=request.user)

    item, created = CartItem.objects.get_or_create(cart=cart, product=product)

    if not created:
        item.quantity += 1
        item.save()

    return JsonResponse({"status":"added"})
@login_required
def checkout(request):
    cart = Cart.objects.get(user=request.user)
    items = CartItem.objects.filter(cart=cart)

    total = sum(i.product.price * i.quantity for i in items)

    order = Order.objects.create(user=request.user, total=total)

    for i in items:
        OrderItem.objects.create(
            order=order,
            product=i.product,
            quantity=i.quantity
        )

        i.product.stock -= i.quantity
        i.product.save()

    items.delete()

    return render(request,"success.html",{"order":order})

