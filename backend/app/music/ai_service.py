
import os
import json
import requests
from typing import List, Optional
from pydantic import BaseModel
import logging
import time
import threading


### for error handling  ####
logger = logging.getLogger(__name__)


GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL_ID = os.getenv("GROQ_MODEL_ID", "")

# _session.mount("https://", requests.adapters.HTTPAdapter(max_retries=2))

GROQ_API_URL = os.getenv("GROQ_API_URL", "")

##retry params 
MAX_RETRIES = 3
REQUEST_TIMOUT = 10

RETRAYABL_STATUS_CODES = {429, 500, 502, 503, 504}
FATAL_STATUS_CODES = {400, 401, 403}

_session = requests.Session()



class MoodAnalysis(BaseModel):
    mood: str
    genre: str
    energy_level: str
    keywords: List[str]
    activity: Optional[str] = None
    language: Optional[str] = None
    era: Optional[str] = None

_DEFAULT = MoodAnalysis(
    mood="chill",
    genre="pop", 
    energy_level="medium",
    keywords=["popular music"],
    activity=None,
    language=None,
    era=None
)

# System prompt for the LLM
SYSTEM_PROMPT = """You are a music mood analyzer. Extract structured JSON from user input.

Output format (JSON only, no extra text):
{
  "mood": "happy|sad|chill|energetic|romantic|nostalgic|focused|angry|peaceful",
  "genre": "pop|rock|hiphop|electronic|jazz|indie|rnb|classical|country|latin|kpop",
  "energy_level": "low|medium|high",
  "keywords": ["keyword1", "keyword2"],
  "activity": "studying|working out|relaxing|driving|null",
  "language": "english|spanish|korean|null",
  "era": "80s|90s|2000s|modern|null"
}"""


def llm_request(user_msg: str ) -> tuple[bool, dict]:
	if not GROQ_API_KEY:
		return False, {"error": "Api key not configured", "retryable": False}
	header = {
		"Authorization": f"Bearer {GROQ_API_KEY}",
	}
	payload = {
		"model": GROQ_MODEL_ID,
		"messages": [
			{"role": "system", "content": SYSTEM_PROMPT},
			{"role": "user", "content": f'Analyze: "{user_msg}"'},
		],
		"max_tokens": 150,
		"temperature": 0.3
	}
	try:
		response = _session.post(
               GROQ_API_URL,
               headers=header,
               json=payload,
               timeout=REQUEST_TIMOUT
		)
		if response.status_code == 200:
			data = response.json()
			content = data["choices"][0]["message"]["content"]
			return True, {"content": content}
		elif response.status_code in RETRAYABL_STATUS_CODES:
			return False, {"error": f"HTTP {response.status_code}", "retryable": True}
		else:
			return False ,{"error": f"HTTP {response.status_code}: {response.text[:100]}", "retryable": False}
	except requests.exceptions.ConnectionError as e:
		return False , {"error": "request timeout", "retryable": True}
	except requests.exceptions.Timeout as e:
		return False , {"error": "Connection failed", "retryable": True}
	except Exception as e:
		logger.exception("Unexpected error in llm request")
		return False, {"error": str(e), "retryable": False}


def llm_request_initializer(user_msg: str) -> tuple[bool, dict]:
	err = "unkown error"

	for retry in range(MAX_RETRIES):
		if retry > 0:
			logger.info(f"LLM retry : {retry} / {MAX_RETRIES}")
		success, result = llm_request(user_msg)
		if success:
			return True, result["content"]
		err = result["error"]
		if not result.get("retryable", False):
			logger.warning(f"Request not retryable : {err}")
			break
		if retry < MAX_RETRIES - 1:
			wait_time = 2 ** retry
			logger.info(f"waiting {wait_time}s before retrying ... ")
			time.sleep(wait_time)
	logger.error(f"LLM request failed after {MAX_RETRIES} attempts: {err}")
	return False, err

def llm_response_parser(content: str) -> MoodAnalysis:
	if content.startswith("```"):
		lines = content.split("\n")
		content = "\n".join(lines[1:-1])
	try:
		data = json.loads(content)
	except json.JSONDecodeError as e:
		raise ValueError(f"Invalid json from llm {e}")
	def clean_null(value):
		if value in (None, "null", "None", ""):
			return None
		return value
	
	try:
		return MoodAnalysis(
			mood= data.get("mood", "chill"),
			genre=data.get("genre", "pop"),
			energy_level=data.get("energy_level", "medium"),
			keywords=data.get("keywords", ["music"]),
			activity=clean_null(data.get("activity")),
			language=clean_null(data.get("language")),
			era=clean_null(data.get("era"))
		)
	except Exception as e:
		raise ValueError(f"invalide data structure: {e}")


def analyze_user_input(query: str) -> MoodAnalysis:
	context = query
	success , content = llm_request_initializer(context)

	if not success:
		logger.warning(f"using fallback llm faillure: {context}")
		return _DEFAULT
	try:
		ret = llm_response_parser(content)
		return ret
	except ValueError as e:
		logger.warning(f"failed to parse llm response")
		return _DEFAULT
  
EXPLANATION_PROMPT = """The user said: "{query}"
Their mood: {mood}, preferred genre: {genre}, energy: {energy}.
Write 2 friendly sentences explaining you understand their mood and will find matching music. Be warm and brief."""

def user_streaming(query: str, analysis: MoodAnalysis):
	if not GROQ_API_KEY:
		yield "I'll find some great music for you . . ."
		return
	prompt = EXPLANATION_PROMPT.format(
		query=query,
		mood=analysis.mood,
		energy=analysis.energy_level,
		genre=analysis.genre
	)
	header = {"Authorization": f"Bearer {GROQ_API_KEY}"}
	payload = {
		"model": GROQ_MODEL_ID,
		"messages": [{"role": "user", "content": prompt}],
		"stream": True,
		"max_tokens": 150,
		"temperature": 0.3
	}

	try:
		response = _session.post(
			GROQ_API_URL,
			headers=header,
			json=payload,
			stream=True,
			timeout=REQUEST_TIMOUT
		)
		if response.status_code != 200:
			yield "FInding the perfect music for your mood . . ."
			return
		for line in response.iter_lines():
			if not line:
				continue
			line = line.decode("utf-8")
			if not line.startswith('data: '):
				continue
			data_str = line[6:]
			if data_str == '[DONE]':
				break
			try:
				data = json.loads(data_str)
				content = data['choices'][0].get('delta', {}).get('content', '')
				if content:
					yield content
			except (json.JSONDecodeError, IndexError, KeyError):
				continue
	except Exception as e:
		logger.warning(f"user_streaming failed: {e}")
		yield "Let me find some music that matched your mood . . ."




def generate_playlist_stream(query: str, count: int, image_desc: str = ""):
	context = query
	if image_desc:
		context += f"(Imge context:) {image_desc}"
	
	youtube_result = {
		"video": [],
		"total": 0,
		"error": None,
		"done": False
	}

	def youtube_thread(analysis: MoodAnalysis):
		try:
			from .yt_service import get_music_recommendations
			result = get_music_recommendations(
				mood=analysis.mood,
				genre=analysis.genre,
				energy_level=analysis.energy_level,
				keywords=analysis.keywords,
				count=count
			)
			youtube_result["video"] = [v.model_dump() for v in result.videos]
			youtube_result["total"] = result.total_results
		except Exception as e:
			logger.exception("Youtube search failed")
			youtube_result["error"] = str(e)
		finally:
			youtube_result["done"] = True

	yield {"type": "status", "message": "Analyzing your mood . . . "}
	logger.warning("aaaaaaaaaaaaaaa")
	try:
		analysis = analyze_user_input(context)
	except Exception as e:
		logger.exception("Analysis failed")
		analysis = _DEFAULT
	
	yield {"type" : "analysis", "data": analysis.model_dump()}

	youtube_thread_init = threading.Thread(
		target=youtube_thread,
		args=(analysis,),
		daemon=True
	)
	youtube_thread_init.start()

	for token in user_streaming(query, analysis):
		yield {"type": "token", "content": token}
	
	if not youtube_result["done"]:
		yield {"type": "status", "message": "finding songs . . . "}
		youtube_thread_init.join(timeout=15)
	if youtube_result["error"]:
		yield {"type": "error", "message": youtube_result["error"]}
	elif youtube_result["video"]:
		yield{
			"type": "playlist",
			"videos": youtube_result["video"],
			"total": youtube_result["total"]
		}
	else:
		yield {"type": "error", "message": "No songs found T-T "}
	yield {"type": "done"}


