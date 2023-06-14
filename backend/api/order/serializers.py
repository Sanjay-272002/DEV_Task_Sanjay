from rest_framework import serializers
from .models import *

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model=seats
        fields= '__all__'
class OrderSerializer(serializers.ModelSerializer):
    user_name=serializers.CharField(source='user.name')
    flight_name=serializers.CharField(source='flight_id.flight_name')
    flight_no=serializers.CharField(source='flight_id.flight_no')
    dep_place=serializers.CharField(source='flight_id.dep_place')
    dep_time=serializers.CharField(source='flight_id.dep_time')
    des_place=serializers.CharField(source='flight_id.des_place')
    des_time=serializers.CharField(source='flight_id.des_time')
    seats=SeatSerializer(many=True)
    class Meta:
        model = Order
        fields = ('id','user_name','flight_name','flight_no','dep_place','dep_time','des_place','des_time','total_tickets','total_amount','seats','total_tickets')

class ProductSerializer(serializers.ModelSerializer):
    image=serializers.ImageField(max_length=None,allow_empty_file=False,allow_null=True,required=False)
    class Meta:
        model=FlightListModels
        fields= '__all__'

