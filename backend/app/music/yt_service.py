"""
=============================================================================
YOUTUBE SERVICE - Music Video Search & Recommendation Engine
=============================================================================

PURPOSE:
    Search YouTube for quality music videos based on structured mood analysis.
    Applies filters to ensure we get real songs (not beats/instrumentals).

FLOW:
    MoodAnalysis → Build Search Query → YouTube API → Filter Results → Videos

FILTERS APPLIED:
    - Duration: 2-10 minutes (typical song length)
    - Views: 100k+ (popular content)
    - Subscribers: 100k+ (established artists)
    - Excludes: instrumentals, beats, karaoke, long mixes

WHY YOUTUBE DATA API v3:
    - Returns embeddable videos
    - Can filter by category (Music)
    - Provides view counts and channel info
=============================================================================
"""

import os
import re
import requests
from typing import List, Optional, Set
from pydantic import BaseModel

# Configuration
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY", "")

# HTTP session for performance
_session = requests.Session()
_session.mount("https://", requests.adapters.HTTPAdapter(max_retries=2))

# Filter settings - relaxed for better variety
MIN_DURATION = 1.5    # minutes (some songs are short)
MAX_DURATION = 12     # minutes (allow slightly longer)
MIN_VIEWS = 50_000    # 50k views (more variety)
MIN_SUBS = 10_000     # 10k subscribers (smaller artists too)

# Content to exclude (instrumentals, beats, long mixes)
EXCLUDED_TERMS = [
    "instrumental", "beat", "beats", "type beat", "karaoke",
    "backing track", "no vocals", "background music",
    "royalty free", "copyright free", "lofi beats",
    "1 hour", "2 hour", "full album", "megamix", "mashup",
    "slowed", "reverb", "8d audio", "bass boosted", "nightcore"
]


class YouTubeVideo(BaseModel):
    """A YouTube video result."""
    video_id: str
    title: str
    channel: str
    thumbnail: str
    embed_url: str
    watch_url: str


class YouTubeSearchResult(BaseModel):
    """Search results container."""
    videos: List[YouTubeVideo]
    search_query: str
    total_results: int


def _is_excluded(title: str) -> bool:
    """Check if video should be excluded (instrumental, beat, etc.)."""
    title_lower = title.lower()
    
    # Check excluded terms
    for term in EXCLUDED_TERMS:
        if term in title_lower:
            return True
    
    # Check for duration in title (e.g., "1 Hour Mix")
    if re.search(r'\d+\s*(hour|hr|min)', title_lower):
        return True
    
    return False


def _parse_duration(duration_str: str) -> int:
    """Parse ISO 8601 duration (PT4M30S) to minutes."""
    if not duration_str or "H" in duration_str:
        return 999  # Hours = too long
    
    try:
        duration = duration_str.replace("PT", "")
        minutes = 0
        
        if "M" in duration:
            minutes = int(duration.split("M")[0])
        
        return minutes
    except:
        return 999


def _build_query(mood: str, genre: str, keywords: List[str], era: str = None) -> str:
    """Build YouTube search query from mood analysis."""
    parts = []
    
    # Add keywords first (most specific) - filter out nulls
    for kw in keywords[:3]:
        if kw and kw.lower() not in ["null", "none"]:
            parts.append(kw)
    
    # Add genre if not generic
    if genre and genre.lower() not in ["pop", "null", "none"]:
        parts.append(genre)
    
    # Add mood descriptors
    mood_terms = {
        "happy": "upbeat feel good",
        "sad": "emotional ballad",
        "chill": "chill vibes",
        "energetic": "hype energetic",
        "romantic": "love song",
        "nostalgic": "throwback classic"
    }
    if mood and mood.lower() in mood_terms:
        parts.append(mood_terms[mood.lower()])
    
    # Add era if specified and valid
    if era and era.lower() not in ["null", "none"]:
        parts.append(era)
    
    return " ".join(parts) if parts else "popular songs"


def _fetch_videos(query: str, seen_ids: Set[str], needed: int, page_token: str = None) -> tuple[List[YouTubeVideo], str]:
    """
    Fetch and filter videos from YouTube API.
    Returns (videos, next_page_token) for pagination.
    """
    if not YOUTUBE_API_KEY:
        return [], None
    
    videos = []
    next_page = None
    
    try:
        # Step 1: Search for videos
        params = {
            "part": "snippet",
            "q": query,
            "type": "video",
            "videoCategoryId": "10",  # Music
			"chart": "mostPopula",
            "maxResults": 50,
            "key": YOUTUBE_API_KEY,
            "videoEmbeddable": "true",
            "videoDuration": "medium",  # 4-20 minutes (covers most songs)
            "order": "relevance"
        }
        
        # Add page token for pagination (get different results)
        if page_token:
            params["pageToken"] = page_token
            
        search_resp = _session.get(
            "https://www.googleapis.com/youtube/v3/search",
            params=params,
            timeout=10
        )
        search_resp.raise_for_status()
        search_data = search_resp.json()
        items = search_data.get("items", [])
        next_page = search_data.get("nextPageToken")
        
        # Collect video IDs and channel IDs
        video_ids = []
        channel_map = {}  # video_id -> channel_id
        
        for item in items:
            vid = item.get("id", {}).get("videoId")
            cid = item.get("snippet", {}).get("channelId")
            title = item.get("snippet", {}).get("title", "")
            
            if vid and vid not in seen_ids and not _is_excluded(title):
                video_ids.append(vid)
                channel_map[vid] = cid
        
        if not video_ids:
            return []
        
        # Step 2: Get video details (duration, views)
        details_resp = _session.get(
            "https://www.googleapis.com/youtube/v3/videos",
            params={
                "part": "contentDetails,snippet,statistics",
                "id": ",".join(video_ids[:50]),
                "key": YOUTUBE_API_KEY
            },
            timeout=10
        )
        details_resp.raise_for_status()
        
        # Step 3: Get channel subscriber counts
        channel_ids = list(set(channel_map.values()))[:50]
        channels_resp = _session.get(
            "https://www.googleapis.com/youtube/v3/channels",
            params={
                "part": "statistics",
                "id": ",".join(channel_ids),
                "key": YOUTUBE_API_KEY
            },
            timeout=10
        )
        channels_resp.raise_for_status()
        
        # Build subscriber count map
        subs_map = {}
        for ch in channels_resp.json().get("items", []):
            stats = ch.get("statistics", {})
            if not stats.get("hiddenSubscriberCount"):
                subs_map[ch["id"]] = int(stats.get("subscriberCount", 0))
        
        # Step 4: Filter and build results
        for item in details_resp.json().get("items", []):
            vid = item["id"]
            snippet = item.get("snippet", {})
            stats = item.get("statistics", {})
            content = item.get("contentDetails", {})
            
            title = snippet.get("title", "Unknown")
            channel = snippet.get("channelTitle", "Unknown")
            
            # Apply filters
            duration = _parse_duration(content.get("duration", ""))
            views = int(stats.get("viewCount", 0))
            subs = subs_map.get(channel_map.get(vid, ""), 0)
            
            if duration < MIN_DURATION or duration > MAX_DURATION:
                continue
            if views < MIN_VIEWS:
                continue
            if subs < MIN_SUBS:
                continue
            if _is_excluded(title):
                continue
            
            # Passed all filters!
            videos.append(YouTubeVideo(
                video_id=vid,
                title=title,
                channel=channel,
                thumbnail=snippet.get("thumbnails", {}).get("high", {}).get("url", ""),
                embed_url=f"https://www.youtube.com/embed/{vid}",
                watch_url=f"https://www.youtube.com/watch?v={vid}"
            ))
            seen_ids.add(vid)
            
            if len(videos) >= needed:
                break
        
        return videos, next_page
        
    except Exception as e:
        print(f"[YT] Error: {e}")
        return [], None


def search_youtube(query: str, max_results: int = 10) -> YouTubeSearchResult:
    """
    Search YouTube with retry logic and pagination.
    Tries multiple query variations and pages to fill the playlist.
    """
    if not YOUTUBE_API_KEY:
        return YouTubeSearchResult(videos=[], search_query=query, total_results=0)
    
    videos = []
    seen_ids: Set[str] = set()
    
    # Query variations to try - more variety
    variations = [
        query,
        query + " official video",
        query + " music video", 
        query + " song",
        query + " hits",
        query + " best songs",
        query + " popular",
        query + " top songs"
    ]
    
    for search_query in variations:
        if len(videos) >= max_results:
            break
        
        # Try first page
        new_videos, next_page = _fetch_videos(search_query, seen_ids, max_results - len(videos))
        videos.extend(new_videos)
        
        # Try second page if still need more
        if len(videos) < max_results and next_page:
            more_videos, _ = _fetch_videos(search_query, seen_ids, max_results - len(videos), next_page)
            videos.extend(more_videos)
    
    return YouTubeSearchResult(
        videos=videos[:max_results],
        search_query=query,
        total_results=len(videos)
    )


def get_music_recommendations(
    mood: str,
    genre: str,
    energy_level: str,
    keywords: List[str],
    activity: Optional[str] = None,
    language: Optional[str] = None,
    era: Optional[str] = None,
    count: int = 10
) -> YouTubeSearchResult:
    """
    Main entry point - get music recommendations.
    
    Args:
        mood: Emotional state from LLM
        genre: Music genre from LLM
        energy_level: low/medium/high
        keywords: Search terms from LLM
        activity: Optional activity context
        language: Optional language preference
        era: Optional time period
        count: Number of songs to return
        
    Returns:
        YouTubeSearchResult with filtered, quality music videos
    """
    query = _build_query(mood, genre, keywords, era)
    return search_youtube(query, max_results=count)
