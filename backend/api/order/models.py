from django.db import models
from api.user.models import CustomUser
# from api.product.models import FlightModels

# Create your models here.


class Order(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    flight_id = models.ForeignKey('order.FlightListModels',on_delete=models.CASCADE, null=True, blank=True)
    total_tickets = models.CharField(max_length=500, default=0)
    transaction_id= models.CharField(max_length=150, default=0)
    total_amount= models.CharField(max_length=50, default=0)
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now=True)

class FlightListModels(models.Model):
    flight_name = models.CharField(max_length=50)
    flight_no = models.CharField(max_length=250)
    ticket_price = models.CharField(max_length=50)
    ava_seats= models.PositiveIntegerField(null=True,blank=True,default=60)
    dep_place=models.CharField(max_length=50,blank=True,null=True)
    dep_time=models.TimeField()
    des_place=models.CharField(max_length=50,blank=True,null=True)
    des_time=models.TimeField()
    travel_type=models.CharField(max_length=50,null=True,blank=True)
    cancel_fee=models.CharField(max_length=50)
    allowed_wght=models.CharField(max_length=50)
    date=models.DateField()
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.flight_name