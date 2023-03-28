from django.contrib import admin
from django.urls import path
from .views import haveJaundice
urlpatterns = [
    path("have",haveJaundice)
]
