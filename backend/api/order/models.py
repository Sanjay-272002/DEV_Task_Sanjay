from django.db import models
from api.user.models import CustomUser
# from api.product.models import FlightModels

# Create your models here.


class Order(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    flight_id = models.ForeignKey('order.FlightListModels',on_delete=models.CASCADE, null=True, blank=True,related_name="flightorder")
    total_tickets = models.CharField(max_length=500, default=0)
    transaction_id= models.CharField(max_length=150, default=0)
    total_amount= models.CharField(max_length=50, default=0)
    seats= models.ManyToManyField('order.seats',  blank=True,related_name="seatbook")
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
        return str(self.id)
class seats(models.Model):
    flight= models.ForeignKey('order.FlightListModels',on_delete=models.CASCADE, null=True, blank=True,related_name="flightbook")
    seat_no=models.CharField(null=True,blank=True,max_length=20)
    is_booked=models.BooleanField(default=False)
    def __str__(self):
        return str(self.id)