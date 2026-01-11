from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from PIL import Image
import io
import json
import logging
import base64
import colorsys
from collections import Counter

logger = logging.getLogger(__name__)

def analyze_image_colors(image):
    """Analyze image colors to determine mood"""
    # Resize for faster processing
    img = image.copy()
    img.thumbnail((150, 150))
    
    # Get dominant colors
    pixels = list(img.getdata())
    
    # Calculate average brightness and saturation
    total_brightness = 0
    total_saturation = 0
    color_counts = Counter()
    
    for pixel in pixels:
        if len(pixel) >= 3:
            r, g, b = pixel[:3]
            h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
            total_brightness += v
            total_saturation += s
            
            # Categorize colors
            if v > 0.7 and s > 0.3:
                color_counts['vibrant'] += 1
            elif v > 0.6:
                color_counts['bright'] += 1
            elif v < 0.3:
                color_counts['dark'] += 1
            
            # Warm vs cool colors
            if 0 < h < 0.15 or h > 0.9:  # Red
                color_counts['warm'] += 1
            elif 0.15 < h < 0.45:  # Yellow-Green
                color_counts['warm'] += 1
            elif 0.45 < h < 0.7:  # Blue
                color_counts['cool'] += 1
    
    pixel_count = len(pixels)
    avg_brightness = total_brightness / pixel_count
    avg_saturation = total_saturation / pixel_count
    
    return {
        'brightness': avg_brightness,
        'saturation': avg_saturation,
        'color_distribution': color_counts,
        'pixel_count': pixel_count
    }

def generate_manual_analysis(image):
    """Generate mood analysis based on image properties"""
    color_data = analyze_image_colors(image)
    
    brightness = color_data['brightness']
    saturation = color_data['saturation']
    dist = color_data['color_distribution']
    total = color_data['pixel_count']
    
    # Determine primary mood
    vibes = {}
    
    # Brightness-based moods
    if brightness > 0.7:
        vibes['Happy'] = 80
        vibes['Energetic'] = 70
    elif brightness > 0.5:
        vibes['Calm'] = 70
        vibes['Peaceful'] = 60
    else:
        vibes['Melancholic'] = 75
        vibes['Sad'] = 60
    
    # Saturation adjustments
    if saturation > 0.5:
        vibes['Energetic'] = vibes.get('Energetic', 0) + 20
        vibes['Happy'] = vibes.get('Happy', 0) + 15
    elif saturation < 0.3:
        vibes['Calm'] = vibes.get('Calm', 0) + 20
        vibes['Peaceful'] = vibes.get('Peaceful', 0) + 15
    
    # Color temperature
    warm_ratio = dist.get('warm', 0) / total
    cool_ratio = dist.get('cool', 0) / total
    
    if warm_ratio > 0.4:
        vibes['Energetic'] = vibes.get('Energetic', 0) + 15
        vibes['Romantic'] = vibes.get('Romantic', 0) + 20
        colors = "Warm"
    elif cool_ratio > 0.4:
        vibes['Calm'] = vibes.get('Calm', 0) + 15
        vibes['Peaceful'] = vibes.get('Peaceful', 0) + 20
        colors = "Cool"
    else:
        colors = "Neutral"
    
    # Vibrant check
    if dist.get('vibrant', 0) / total > 0.3:
        colors = "Vibrant"
        vibes['Energetic'] = vibes.get('Energetic', 0) + 15
    elif saturation < 0.3:
        colors = "Muted"
    
    # Normalize and sort vibes
    max_score = max(vibes.values()) if vibes else 100
    normalized_vibes = {k: min(100, int(v * 100 / max_score)) for k, v in vibes.items()}
    
    sorted_vibes = sorted(normalized_vibes.items(), key=lambda x: x[1], reverse=True)
    primary_mood = sorted_vibes[0][0] if sorted_vibes else "Calm"
    
    # Suggest genres based on mood
    genre_map = {
        'Happy': ['Pop', 'Dance', 'Indie Pop', 'Funk'],
        'Energetic': ['Rock', 'EDM', 'Hip Hop', 'Electronic'],
        'Calm': ['Ambient', 'Lo-fi', 'Jazz', 'Acoustic'],
        'Peaceful': ['Classical', 'New Age', 'Ambient', 'Nature Sounds'],
        'Melancholic': ['Blues', 'Indie', 'Alternative', 'Folk'],
        'Sad': ['Blues', 'Soul', 'Ballad', 'Indie'],
        'Romantic': ['R&B', 'Soul', 'Jazz', 'Soft Rock']
    }
    
    suggested_genres = genre_map.get(primary_mood, ['Pop', 'Indie', 'Alternative'])
    
    return {
        "primaryMood": primary_mood,
        "confidence": sorted_vibes[0][1] if sorted_vibes else 70,
        "detectedVibes": [
            {"name": name, "score": score} 
            for name, score in sorted_vibes[:5]
        ],
        "colors": colors,
        "suggestedGenres": suggested_genres
    }

@csrf_exempt
@require_http_methods(["POST"])
def analyze_image(request):
    logger.info(f"Received image analysis request")
    
    try:
        # Parse request data
        if request.content_type and 'application/json' in request.content_type:
            data = json.loads(request.body)
            image_data = data.get('image')
            
            if not image_data:
                return JsonResponse({"detail": "No image data provided"}, status=400)
            if ',' in image_data:
                image_data = image_data.split(',')[1]
            content = base64.b64decode(image_data)
            logger.info(f"Decoded base64 image, size: {len(content)}")
            
        elif 'file' in request.FILES:
            file = request.FILES['file']
            logger.info(f"File received: {file.name}, size: {file.size}")
            content = file.read()
        else:
            logger.warning("No file or image data in request")
            return JsonResponse(
                {"detail": "No file or image data provided"},
                status=400
            )
        
        # Open image
        image = Image.open(io.BytesIO(content))
        logger.info(f"Image opened successfully: {image.size}")
        
        # Generate manual analysis
        result = generate_manual_analysis(image)
        
        logger.info("Returning analysis result")
        return JsonResponse(result)
        
    except Exception as e:
        logger.error(f"Error analyzing image: {str(e)}", exc_info=True)
        return JsonResponse(
            {"detail": f"Error: {str(e)}"},
            status=500
        )
@api_view(['POST'])
def upload_image(request):
    """
    Upload an image and save it
    Returns: image_id, url, analysis
    """