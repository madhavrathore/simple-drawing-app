from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from .models import Doctor
from .serializers import DoctorSerializer
from django.shortcuts import get_object_or_404
# Create your views here.

#doctor/
class DoctorList(APIView):

    def get(self,request):
        # doctors = Doctor.objects.all()
        # serializer = DoctorSerializer(Doctor,many = True)
        return Response()

    def post(self):
        pass




