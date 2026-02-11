from django.contrib.auth.models import User
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import DailyData
from .serializers import DailyDataSerializer, RegisterSerializer, UserSerializer


class RegisterView(APIView):
    """
    Register a new user and return an auth token.
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "token": token.key,
                    "user": UserSerializer(user).data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(ObtainAuthToken):
    """
    Obtain an auth token for an existing user.
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token_key = response.data.get("token")
        try:
            token = Token.objects.get(key=token_key)
        except Token.DoesNotExist:
            return Response(
                {"detail": "Invalid credentials."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {
                "token": token.key,
                "user": UserSerializer(token.user).data,
            }
        )


class MeView(APIView):
    """
    Return the authenticated user's information.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(UserSerializer(request.user).data)


class DailyDataViewSet(viewsets.ModelViewSet):
    """
    CRUD operations on DailyData, scoped to the authenticated user.
    """

    serializer_class = DailyDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return data for the logged-in user
        return DailyData.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Force the user to be the logged-in user
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["get"])
    def last_7_days(self, request):
        """Return daily totals for the last 7 days (for profile chart)."""
        data = DailyData.get_last_7_days_data(request.user)
        return Response(data)
