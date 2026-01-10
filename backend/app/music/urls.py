from django.urls import path
from .views import artist_list, recommend , analyze, search, stream

urlpatterns = [
	path("artists/", artist_list, name="artist=list"),
	path("recommend/", recommend, name="recommend-artists"),
	path("analyze/", analyze, name="analyzing"),
	path("search/", search, name="searching"),
	path("stream/", stream, name="generate-stream"),
]