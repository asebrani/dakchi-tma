from django.contrib import admin
from django.urls import path, include

urlpatterns = [
	path("admin/", admin.site.urls),
	path("api/", include("app.music.urls")),
	path("api/", include("app.image_recognition.urls")),
]