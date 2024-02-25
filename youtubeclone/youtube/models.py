from django.db import models

from django.contrib.auth.models import User

# Create your models here.

class Channel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    subscribers = models.ManyToManyField(User, related_name='subscribed_channels', blank=True)
    profile_picture = models.ImageField(upload_to='images/', default='images/default_pfp.jpg')

    def __str__(self):
        return self.name