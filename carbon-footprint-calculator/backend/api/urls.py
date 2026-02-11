from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import DailyDataViewSet, LoginView, MeView, RegisterView

router = DefaultRouter()
router.register(r"daily-data", DailyDataViewSet, basename="dailydata")

urlpatterns = [
    # Auth endpoints
    path("auth/register/", RegisterView.as_view(), name="auth-register"),
    path("auth/login/", LoginView.as_view(), name="auth-login"),
    path("auth/me/", MeView.as_view(), name="auth-me"),
    # App resources
    path("", include(router.urls)),
]