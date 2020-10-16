from django.db import models

# Create your models here.
class Doctor(models.Model):
	Name = models.CharField(max_length = 40)
	Address = models.CharField(max_length = 150)
	Email = models.EmailField(max_length = 30)
	Degree = models.CharField(max_length = 100)
	Specialization = models.CharField(max_length = 200)


	def __str__(self):
		return self.Name

		
