from django.contrib import admin
from django.urls import path, include



urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/music/", include("app.music.urls")),
    path("api/image/", include("app.image_recognition.urls")),
    path("api/user/", include("app.users.urls")),
]
