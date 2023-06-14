from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer,ProductSerializer,SeatSerializer
from .models import Order,FlightListModels,seats
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics
from api.user.models import *
from rest_framework.decorators import action
from django.db.models import Q
from django.core.mail import send_mail


def validate_user_session(id, token):
    UserModel = get_user_model()
    try:
        print("success",id,token)
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        print('failure',id,token)
        return False

class listflights(generics.ListAPIView):
    def list(self, request, format=None):
        try:
            queryset = FlightListModels.objects.all().order_by('flight_name')
            serializer=ProductSerializer(queryset,many=True)
            return Response({'message':"success",'data':serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'Error': 'Error','success':False}, status=status.HTTP_404_NOT_FOUND)

class FlightViews(APIView):
    def post(self,request):
        try:
            id=10
            print(id)
            user=CustomUser.objects.get(id=id)
            print(user)
            if(user.user_type=="admin"):
                image_file = request.FILES.get('image')
                print(image_file)
                flight_name=request.data.get('flight_name',None)
                flight_no=request.data.get('flight_no',None)
                ticket_price=request.data.get('ticket_price',None)
                dep_place=request.data.get('dep_place',None)
                dep_time=request.data.get('dep_time',None)
                des_place=request.data.get('des_place',None)
                des_time=request.data.get('des_time',None)
                travel_type=request.data.get('travel_type',None)
                cancel_fee=request.data.get('cancel_fee',None)
                allowed_wght=request.data.get('allowed_wght',None)
                date=request.data.get('date',None)
                if(flight_name is None and flight_no is None and ticket_price is None and dep_place is None and dep_time is None and des_place is None and des_time is None ):
                    return Response({'detail': 'Bad request. Missing query.'}, status=status.HTTP_400_BAD_REQUEST)
                queryset=FlightListModels.objects.create(flight_name=flight_name,flight_no=flight_no,ticket_price=ticket_price,dep_place=dep_place,dep_time=dep_time,des_place=des_place,des_time=des_time,cancel_fee=cancel_fee,allowed_wght=allowed_wght,image=image_file,date=date,travel_type=travel_type)
                serializer=ProductSerializer(queryset)
                return Response({'message':"success",'data':serializer.data},status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)     
        except Exception as e:
            return Response({'Error': str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def delete(self,request):
        try:
            id=request.query_params.get('id')
            queryset=FlightListModels.objects.get(id=id)
            queryset.delete()
            return Response({'message':"object is deleted"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)},status=status.HTTP_404_NOT_FOUND)


class SearchViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def search(self, request):
        try:
            print("tr")
            search_term = request.query_params.get('search', '')
            print(search_term)
            if(search_term!=''):
                queryset= FlightListModels.objects.filter(Q(date__icontains=search_term) | Q(dep_time__icontains=search_term) | Q(des_time__icontains=search_term) | Q(des_place__icontains=search_term) | Q(dep_place__icontains=search_term) )
                serializer = ProductSerializer(queryset, many=True)
                return Response({'message':"success",'data': serializer.data},status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Bad request. Missing search query.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'Error': str(e)},status=status.HTTP_404_NOT_FOUND)

class CreateOrderViews(APIView):
    def post(self,request,id,token):
        try:
            # if not validate_user_session(id, token):
            #     return JsonResponse({'error': 'Please re-login', 'code': '1'})
            flight_id=request.data.get("flight_id",None)
            no_tickets=request.data.get("count",None)
            transaction_id=request.data.get("transaction_id",None)
            amount=request.data.get("amount",None)
            seat_ids= request.data.get('seat_ids', [])
            seat_ids=seat_ids.split(",")
            seat_ids=list(seat_ids)
            print("seatids",seat_ids)
            if(flight_id is None and no_tickets is None):
                return Response({'detail': 'Bad request. Missing query.'}, status=status.HTTP_400_BAD_REQUEST)
            flight=FlightListModels.objects.get(id=flight_id)
            print(flight,type(flight.ava_seats))
            if(flight.ava_seats<int(no_tickets)):
                return Response({'detail': 'Bad request.Seats Unavailable'}, status=status.HTTP_400_BAD_REQUEST)
            ava=flight.ava_seats
            flight.ava_seats=ava-int(no_tickets)
            print(flight.ava_seats)
            flight.save()
            print("flight",flight)
            print("id",type(id))
            user=CustomUser.objects.get(pk=id)
            print("user",user)
            order=Order.objects.create(user=user,flight_id=flight,total_tickets=no_tickets,total_amount=amount,transaction_id=transaction_id)
            for seat_id in seat_ids:
                sea = seats.objects.get(id=seat_id)
                print("sea",sea)
                sea.is_booked=True
                sea.save()
                order.seats.add(sea)
                order.save()
            serializer=OrderSerializer(order)
            email=user.email
            flight_name=flight.flight_name
            htmlgen = '<p>Your Ticket is booked for flight <strong>'+flight_name+'</strong>successfully</p>'
            send_mail('Your flight ticket',flight_name,'<gmail id>',[email],fail_silently=False,html_message=htmlgen)
            return Response({'message':"Success",'data':serializer.data},status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'Error': str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class listorders(APIView):
    def get(self,request):
        try:
            user_id=request.query_params.get('user_id',None)
            print("id",user_id)
            if(user_id != None):
                print("true")
                queryset=Order.objects.filter(user=user_id).order_by('created_at')
                print(queryset)
                serializer=OrderSerializer(queryset,many=True)
                return Response({'message':"success",'data':serializer.data},status=status.HTTP_200_OK)
            elif(user_id is None):
                queryset=Order.objects.all().order_by('created_at')
                serializer=OrderSerializer(queryset,many=True)
                return Response({'message':"success",'data':serializer.data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def delete(self,request):
        try:
            id=request.query_params.get('id')
            queryset=Order.objects.get(id=id)
            seat_ids = queryset.seats.values_list('id', flat=True)
            print(seat_ids)
            for id in seat_ids:
                seat=seats.objects.get(id=id)
                seat.is_booked=False
                seat.save()
                queryset.seats.remove(seat)
            queryset.delete()
            email=queryset.user.email
            flight_name=queryset.flight_id.flight_name
            htmlgen = '<p>Your  booked ticket for flight <strong>'+flight_name+'</strong>is cancelled due to uncertain conditions.refund will be provided.</p>'
            send_mail('Your flight ticket',flight_name,'<gmail id>',[email],fail_silently=False,html_message=htmlgen)
            return Response({'message':"object is deleted"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)},status=status.HTTP_404_NOT_FOUND)    

class AdminViewOrders(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def search(self, request):
        try:
            flight_no = request.query_params.get('flight_no', '')
            time=request.query_params.get('time', '')
            if(flight_no!='' and time!=''):
                queryset= Order.objects.filter(Q(flight_id__flight_no__icontains=flight_no) & Q(created_at__icontains=time))
                if(len(queryset)==0):
                    return Response({'message': 'No results found'}, status=status.HTTP_404_NOT_FOUND)      
                serializer = OrderSerializer(queryset, many=True)
                return Response({'message':"success",'data': serializer.data},status=status.HTTP_200_OK)
            elif(flight_no=='' and time!=''):
                queryset= Order.objects.filter( Q(created_at__icontains=time))
                if(len(queryset)==0):
                    return Response({'message': 'No results found'}, status=status.HTTP_404_NOT_FOUND)      
                serializer = OrderSerializer(queryset, many=True)
                return Response({'message':"success",'data': serializer.data},status=status.HTTP_200_OK)
            elif(flight_no!='' and time==''):
                queryset= Order.objects.filter( Q(flight_id__flight_no__icontains=flight_no) )
                if(len(queryset)==0):
                    return Response({'message': 'No results found'}, status=status.HTTP_404_NOT_FOUND)      
                serializer = OrderSerializer(queryset, many=True)
                return Response({'message':"success",'data': serializer.data},status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Bad request. Missing search query.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'Error': str(e)},status=status.HTTP_404_NOT_FOUND)


class listseats(APIView):
    def get(self,request):
        id=request.query_params.get('id')
        print(id)
        user=FlightListModels.objects.get(pk=id)
        queryset= seats.objects.filter(flight=user)
        print(queryset)
        serializer=SeatSerializer(queryset,many=True)
        return Response({'data':serializer.data},status=200)

