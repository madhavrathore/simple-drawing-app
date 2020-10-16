from rest_framework import serializers
from .models import Doctor


class DoctorSerializer(serializers.Serializer):
	Name = serializers.CharField(max_length = 40)
	Address = serializers.CharField(max_length =150)
	Email = serializers.EmailField(max_length = 30)
	Degree = serializers.CharField(max_length = 100)
	Specialization = serializers.CharField(max_length = 200)


	def create(self, validated_data):
		return Doctor.objects.create(validated_data)


	def update(self, instance, validated_data):
		instance.Name = validated_data.get('Name',instance.Name)
		instance.Address = validated_data.get('Address',instance.Address)
		instance.Email = validated_data.get('Email',instance.Email)
		instance.Degree = validated_data.get('Degree',instance.Degree)
		instance.Specialization = validated_data.get('Specialization',instance.Specialization)
		instance.save()
		return instance	

	
