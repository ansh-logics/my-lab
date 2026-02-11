from datetime import date, timedelta

from django.contrib.auth.models import User
from django.db import models


class DailyData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="daily_data")
    date = models.DateField()
    lpg = models.IntegerField(default=0)
    petrol = models.IntegerField(default=0)
    diesel = models.IntegerField(default=0)
    electricity = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Daily Data"
        verbose_name_plural = "Daily Data"
        ordering = ["-date", "-id"]

    def __str__(self) -> str:
        return f"{self.user.username} - {self.date}"

    @classmethod
    def get_last_7_days_data(cls, user):
        seven_days_ago = date.today() - timedelta(days=7)
        data = (
            cls.objects.filter(
                user=user, date__gte=seven_days_ago, date__lte=date.today()
            )
            .order_by("date")
            .all()
        )

        data_dict = {str(seven_days_ago + timedelta(days=i)): 0 for i in range(7)}

        for entry in data:
            data_dict[str(entry.date)] = sum(
                [entry.lpg, entry.petrol, entry.diesel, entry.electricity]
            )

        return data_dict
