from .models import User, Task
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email','password', 'location', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def get_token(self, user):
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        return token
    
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ['created_at', 'updated_at']

    