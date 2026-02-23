# ruestore/models.py
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    ram = models.CharField(max_length=50)
    processor = models.CharField(max_length=100)
    storage = models.CharField(max_length=100)
    graphics = models.CharField(max_length=100, blank=True)
    display = models.CharField(max_length=100, blank=True)
    camera = models.CharField(max_length=100, blank=True)
    warranty = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/')
