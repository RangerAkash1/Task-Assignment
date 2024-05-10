from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = models.Manager()


    def __str__(self):
        return self.first_name
    
    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"
    
class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    priority = models.CharField(max_length=6, default="low")
    due_date = models.DateField(blank=True, null=True)
    completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()

    def __str__(self):
        return self.title

    def get_priority_value(self) -> str:
        if self.priority == "low":
            return 4
        elif self.priority == "medium":
            return 3
        elif self.priority == "high":
            return 2
        else:
            return 1
        
    # how to get the priority value