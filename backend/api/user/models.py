from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
USER_TYPES = (
    ("admin", "admin"),
    ("user", "user"),
)

class CustomUser(AbstractUser):
    name = models.CharField(max_length=50, default='Anonymous')
    email = models.EmailField(max_length=254, unique=True)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    phone = models.CharField(max_length=20, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    user_type=models.CharField(max_length=100,blank=True,choices=USER_TYPES,default="user")
    session_token = models.CharField(max_length=10, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return str(self.id)