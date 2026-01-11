# API Endpoints Documentation

This document describes all backend API endpoints used by the frontend application.

## Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: Set via `VITE_API_BASE_URL` environment variable

## Configuration
The API base URL is configurable through environment variables:
- `VITE_API_BASE_URL` - Override the default API base URL

---

## Music & Recommendations Endpoints

### 1. Get Artists List
**Endpoint**: `GET /api/artists/`

**Description**: Fetches a paginated list of artists available for selection.

**Query Parameters**:
- `page` (integer, required) - Page number (1-indexed)
- `page_size` (integer, required) - Number of items per page

**Example Request**:
```http
GET /api/artists/?page=1&page_size=20
```

**Response** (200 OK):
```json
{
  "artists": [
    {
      "id": 1,
      "name": "Taylor Swift",
      "genre": "Pop",
      "image_url": "https://example.com/image.jpg",
      "tags": ["pop", "country", "mainstream"],
      "popularity": 95
    }
  ],
  "total": 20,
  "page": 1,
  "page_size": 20
}
```

**TypeScript Interface**:
```typescript
type Artist = {
  id: number;
  name: string;
  genre?: string | null;
  image_url?: string | null;
  tags?: string[];
  popularity?: number;
};

type ArtistsResponse = {
  artists: Artist[];
  total: number;
  page: number;
  page_size: number;
};
```

---

### 2. Get Music Recommendations
**Endpoint**: `GET /api/recommend/`

**Description**: Generates music recommendations based on mood/query using AI analysis and YouTube search.

**Query Parameters**:
- `query` (string, required) - User's mood, activity, or music preference description
- `count` (integer, optional, default: 10) - Number of video recommendations to return

**Example Request**:
```http
GET /api/recommend/?query=happy%20energetic%20morning&count=10
```

**Response** (200 OK):
```json
{
  "analysis": {
    "mood": "Happy",
    "genre": "Pop",
    "energy_level": "High",
    "keywords": ["upbeat", "energetic", "positive"],
    "activity": "Morning workout",
    "language": "English",
    "era": "Contemporary"
  },
  "search_query": "happy energetic pop music 2024",
  "videos": [
    {
      "video_id": "dQw4w9WgXcQ",
      "title": "Happy Energetic Pop Mix 2024",
      "channel": "Music Channel",
      "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      "embed_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "watch_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ],
  "total_results": 10
}
```

**TypeScript Interface**:
```typescript
type RecommendResponse = {
  analysis: {
    mood: string;
    genre: string;
    energy_level: string;
    keywords: string[];
    activity: string | null;
    language: string | null;
    era: string | null;
  };
  search_query: string;
  videos: {
    video_id: string;
    title: string;
    channel: string;
    thumbnail: string;
    embed_url: string;
    watch_url: string;
  }[];
  total_results: number;
};
```

---

### 3. Analyze Mood (No Videos)
**Endpoint**: `GET /api/analyze/`

**Description**: Analyzes user query for mood/music preferences without fetching videos. Returns only the AI analysis.

**Query Parameters**:
- `query` (string, required) - User's mood or music preference description

**Example Request**:
```http
GET /api/analyze/?query=feeling%20calm%20and%20relaxed
```

**Response** (200 OK):
```json
{
  "mood": "Calm",
  "genre": "Ambient",
  "energy_level": "Low",
  "keywords": ["relaxing", "peaceful", "meditative"],
  "activity": "Meditation",
  "language": null,
  "era": null
}
```

---

### 4. Direct YouTube Search
**Endpoint**: `GET /api/search/`

**Description**: Performs direct YouTube search without AI mood analysis.

**Query Parameters**:
- `query` (string, required) - Search query for YouTube
- `count` (integer, optional, default: 10) - Number of results

**Example Request**:
```http
GET /api/search/?query=lofi%20hip%20hop&count=10
```

**Response** (200 OK):
```json
{
  "videos": [
    {
      "video_id": "jfKfPfyJRdk",
      "title": "lofi hip hop radio 📚 - beats to relax/study to",
      "channel": "Lofi Girl",
      "thumbnail": "https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg",
      "embed_url": "https://www.youtube.com/embed/jfKfPfyJRdk",
      "watch_url": "https://www.youtube.com/watch?v=jfKfPfyJRdk"
    }
  ],
  "total_results": 10
}
```

---

### 5. Stream Playlist Generation
**Endpoint**: `GET /api/stream/`

**Description**: Server-Sent Events (SSE) endpoint for real-time playlist generation. Streams videos as they are found.

**Query Parameters**:
- `query` (string, required) - User's mood or preference
- `count` (integer, optional, default: 10) - Target number of songs

**Example Request**:
```http
GET /api/stream/?query=workout%20music&count=15
```

**Response**: `text/event-stream`
```
data: {"type": "analysis", "data": {"mood": "Energetic", "genre": "Electronic"}}

data: {"type": "video", "data": {"video_id": "abc123", "title": "Workout Mix"}}

data: {"type": "video", "data": {"video_id": "def456", "title": "Gym Motivation"}}

data: {"type": "complete", "total": 15}
```

**Event Types**:
- `analysis` - Initial mood analysis
- `video` - Individual video found
- `complete` - All videos fetched

---

## Image Recognition Endpoints

### 6. Analyze Image for Mood
**Endpoint**: `POST /api/analyze-image/`

**Description**: Analyzes uploaded image to detect mood based on color analysis (brightness, saturation, temperature).

**Request**:
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Body**: Form data with `image` field (file upload)

**Example Request**:
```javascript
const formData = new FormData();
formData.append("image", file);

fetch("/api/analyze-image/", {
  method: "POST",
  body: formData
});
```

**Response** (200 OK):
```json
{
  "mood": "Calm",
  "color_analysis": {
    "dominant_colors": ["#3498db", "#2ecc71", "#95a5a6"],
    "brightness": 0.65,
    "saturation": 0.45,
    "temperature": "cool"
  },
  "recommendations": {
    "genre": "Ambient",
    "energy_level": "Low",
    "keywords": ["peaceful", "relaxing", "calm"]
  }
}
```

**Supported Image Formats**:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)

**Max File Size**: 10MB

---

## HTTP Client Configuration

### CORS Settings
All endpoints support Cross-Origin Resource Sharing (CORS) with:
- Mode: `cors`
- Credentials: Not included by default

### Headers
**Standard Request Headers**:
```
Content-Type: application/json
```

**For File Uploads**:
```
Content-Type: multipart/form-data
```

### Error Handling
All endpoints return standard HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format**:
```json
{
  "error": "Error message description",
  "detail": "Optional detailed error information"
}
```

---

## Environment Variables

### Frontend Build Configuration
```bash
# Override API base URL for production
VITE_API_BASE_URL=https://api.example.com/api
```

### Backend Configuration (Required for full functionality)
```bash
# Groq AI API key for mood analysis
GROQ_API_KEY=your_groq_api_key

# YouTube Data API key for video search
YOUTUBE_API_KEY=your_youtube_api_key

# Django settings
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:8080,http://localhost:5173
```

---

## Usage Examples

### Fetch Artists with Pagination
```typescript
import { httpClient } from './httpClient';

const fetchArtists = async (page: number, pageSize: number) => {
  return httpClient.get<ArtistsResponse>(
    `/artists/?page=${page}&page_size=${pageSize}`
  );
};

const artists = await fetchArtists(1, 20);
console.log(artists.total); // Total number of artists
```

### Get Music Recommendations
```typescript
const recommendMusic = async (query: string, count = 10) => {
  const params = new URLSearchParams({ query, count: String(count) });
  return httpClient.get<RecommendResponse>(`/recommend/?${params.toString()}`);
};

const recommendations = await recommendMusic("happy morning vibes", 10);
console.log(recommendations.videos);
```

### Upload Image for Mood Detection
```typescript
const analyzeImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/api/analyze-image/", {
    method: "POST",
    body: formData,
  });

  return response.json();
};

const result = await analyzeImage(imageFile);
console.log(result.mood);
```

---

## Notes

1. **Rate Limiting**: Not currently implemented, but should be added for production
2. **Authentication**: No authentication required for current endpoints (will be added in future)
3. **Caching**: Consider implementing caching for `/api/artists/` endpoint
4. **Real-time**: The `/api/stream/` endpoint uses Server-Sent Events (SSE) for real-time updates
5. **Image Processing**: Performed server-side using PIL/Pillow library
6. **AI Analysis**: Uses Groq's LLaMA model for mood/music analysis
7. **YouTube Integration**: Uses YouTube Data API v3 for video search

---

## Future Endpoints (Planned)

These endpoints will be added for the authentication system:

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login (email/password)
- `GET /api/auth/oauth/42/` - 42 OAuth login
- `GET /api/auth/oauth/42/callback/` - 42 OAuth callback
- `GET /api/auth/me/` - Get current user info
- `POST /api/auth/logout/` - User logout
- `GET /api/user/preferences/` - Get user's saved artists
- `POST /api/user/preferences/` - Save artist preferences
