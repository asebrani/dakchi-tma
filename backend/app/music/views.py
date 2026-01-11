from app.music.artist_seed import SEED_ARTISTS
from app.music.yt_service import get_music_recommendations, search_youtube
from app.music.ai_service import  analyze_user_input , generate_playlist_stream
from django.http import JsonResponse, StreamingHttpResponse
import json

def artist_list(request):
	page = request.GET.get('page', '1')
	page_size = request.GET.get('page_size', '10')
	genre = request.GET.get('genre')
	
	try:
		page = int(page)
	except ValueError:
		page = 1
	try:
		page_size = int(page_size)
	except ValueError:
		page_size = 10

	start = (page - 1) * page_size
	end = start + page_size
	if genre:
		working_list = [a for a in SEED_ARTISTS if a.genre == genre]
	else:
		working_list = SEED_ARTISTS
	total = len(working_list)
	page_items = working_list[start:end]

	response = {
		"artists": [a.model_dump() for a in page_items],
		"total": total,
		"page": page,
		"page_size": page_size
	}

	return JsonResponse(response)


def recommend(request):
	"""
	Main recommendation endpoint.

	Flow:
		1. LLM analyzes user query → structured mood/genre/keywords
		2. YouTube service searches → filtered quality videos
		3. Return videos with embed URLs

	Args:
		query: Natural language (e.g., "I'm feeling sad, play something emotional")
		image_desc: Optional image description for context
		count: Number of songs to return (default 10)

	Returns:
		{
		"analysis": { mood, genre, energy_level, keywords, ... },
		"search_query": "built query",
		"videos": [{ video_id, title, channel, embed_url, ... }]
		}
	"""
	count = request.GET.get('count', "10")
	query = request.GET.get('query')
	image_desc = request.GET.get('image_desc')
	analysis = analyze_user_input(query, image_desc)

	try:
		count = int(count)
	except ValueError:
		count = 10
	# Step 2: Search YouTube with filters
	result = get_music_recommendations(
		mood=analysis.mood,
		genre=analysis.genre,
		energy_level=analysis.energy_level,
		keywords=analysis.keywords,
		activity=analysis.activity,
		language=analysis.language,
		era=analysis.era,
		count=count
	)

	# Step 3: Return results
	response =  {
		"analysis": {
			"mood": analysis.mood,
			"genre": analysis.genre,
			"energy_level": analysis.energy_level,
			"keywords": analysis.keywords,
			"activity": analysis.activity,
			"language": analysis.language,
			"era": analysis.era
		},
		"search_query": result.search_query,
		"videos": [v.model_dump() for v in result.videos],
		"total_results": result.total_results
	}
	return JsonResponse(response)




def analyze(request):
	query = request.GET.get('query')
	# image_desc = request.GET.get('image_desc')
	analysis = analyze_user_input(query, "")
	return JsonResponse(analysis.model_dump())



def search(request):
	q = request.GET.get('q')
	count = request.GET.get('count', 10)
	try :
		count = int(count)
	except ValueError:
		count = 10
	result = search_youtube(q, max_results=count)
	response = {
		"search_query": result.search_query,
		"videos": [v.model_dump() for v in result.videos],
		"total_results": result.total_results
	}
	return JsonResponse(response)



def stream(request):
	query = request.GET.get('query', '')
	image_desc = request.GET.get('image_desc', '')
	if not query:
		return JsonResponse({"error": "Somthing is messing maybe you didn't enter your mood"}, status=400)
	
	try:
		count = int(request.GET.get('count', 10))
	except ValueError:
		count = 10
	
	def event_stream():
		try:
			for event in generate_playlist_stream(query, count, image_desc):
				yield f"data: {json.dumps(event)}\n\n"
		except Exception as e:
			yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"
			yield f"data: {json.dumps({'type': 'done'})}\n\n"

	response = StreamingHttpResponse(
		event_stream(),
		content_type='text/event-stream'
	)
	response['Cache-Control'] = 'no-cache'
	response['X-Accel-Buffering'] = 'no'
	response['Access-Control-Allow-Origin'] = '*'
	return response