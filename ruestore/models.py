from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    price = models.IntegerField()
    old_price = models.IntegerField(null=True, blank=True)
    ram = models.CharField(max_length=50)
    storage = models.CharField(max_length=50)
    processor = models.CharField(max_length=100)
    display = models.CharField(max_length=100)
    graphics = models.CharField(max_length=100)
    image = models.ImageField(upload_to='products/')
    def __str__(self):
        return self.name