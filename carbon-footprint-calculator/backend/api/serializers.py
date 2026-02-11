from django.contrib.auth.models import User
from rest_framework import serializers

from .models import DailyData


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]
        read_only_fields = ["id"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        # Use Django's built-in user creation to hash the password
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )
        return user


class DailyDataSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = DailyData
        fields = [
            "id",
            "user",
            "date",
            "lpg",
            "petrol",
            "diesel",
            "electricity",
            "total",
        ]
        read_only_fields = ["id", "total", "user"]

    def get_total(self, obj) -> int:
        return obj.lpg + obj.petrol + obj.diesel + obj.electricity
