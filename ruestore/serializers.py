
from rest_framework import serializers
from .models import Product, ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)  # fetch all images

    class Meta:
        model = Product
        fields = ['id','name','price','ram','processor','storage','graphics','display','camera','warranty','description','images']