from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import (
    UserProfileSerializer, 
    UserUpdateSerializer,
    UserSettingsSerializer,
    UserPreferencesSerializer
)
from .models import UserStats, UserPreferences

User = get_user_model()


@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([AllowAny])  # Change to IsAuthenticated when auth is ready
def user_profile(request):
    """
    GET: Retrieve current user profile
    PUT/PATCH: Update current user profile
    """
    # TODO: Replace with request.user when authentication is implemented
    # For now, return mock user or first user
    try:
        user = User.objects.first()
        if not user:
            # Create a default user if none exists
            user = User.objects.create_user(
                username='demo_user',
                email='demo@example.com',
                first_name='Demo',
                last_name='User',
                bio='Music enthusiast and playlist curator',
                avatar='https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
            )
            # Create stats
            UserStats.objects.create(
                user=user,
                total_playlists=12,
                total_tracks=284,
                total_listening_hours=142.5,
                followers=1250,
                following=89
            )
            # Create preferences
            UserPreferences.objects.create(
                user=user,
                favorite_moods=['Melancholic', 'Electronic']
            )
    except Exception as e:
        return Response(
            {'error': 'User not found', 'detail': str(e)},
            status=status.HTTP_404_NOT_FOUND
        )
    
    if request.method == 'GET':
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            profile_serializer = UserProfileSerializer(user)
            return Response(profile_serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
@permission_classes([AllowAny])  # Change to IsAuthenticated when auth is ready
def user_settings(request):
    """
    GET: Retrieve user settings
    PUT: Update user settings
    """
    try:
        user = User.objects.first()
        if not user:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        preferences, created = UserPreferences.objects.get_or_create(user=user)
        
    except Exception as e:
        return Response(
            {'error': 'Error fetching settings', 'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    if request.method == 'GET':
        settings_data = {
            'notifications': {
                'emailNewPlaylist': preferences.email_new_playlist,
                'emailWeeklyDigest': preferences.email_weekly_digest,
                'emailArtistUpdates': preferences.email_artist_updates,
                'pushNewFollower': preferences.push_new_follower,
                'pushPlaylistComplete': preferences.push_playlist_complete,
                'pushRecommendations': preferences.push_recommendations,
            },
            'privacy': {
                'profilePublic': preferences.profile_public,
                'showListeningActivity': preferences.show_listening_activity,
                'showPlaylists': preferences.show_playlists,
                'allowDataCollection': preferences.allow_data_collection,
            },
            'preferences': {
                'moods': preferences.favorite_moods,
                'theme': preferences.theme,
            }
        }
        return Response(settings_data)
    
    elif request.method == 'PUT':
        data = request.data
        
        # Update notifications
        if 'notifications' in data:
            notifs = data['notifications']
            preferences.email_new_playlist = notifs.get('emailNewPlaylist', preferences.email_new_playlist)
            preferences.email_weekly_digest = notifs.get('emailWeeklyDigest', preferences.email_weekly_digest)
            preferences.email_artist_updates = notifs.get('emailArtistUpdates', preferences.email_artist_updates)
            preferences.push_new_follower = notifs.get('pushNewFollower', preferences.push_new_follower)
            preferences.push_playlist_complete = notifs.get('pushPlaylistComplete', preferences.push_playlist_complete)
            preferences.push_recommendations = notifs.get('pushRecommendations', preferences.push_recommendations)
        
        # Update privacy
        if 'privacy' in data:
            privacy = data['privacy']
            preferences.profile_public = privacy.get('profilePublic', preferences.profile_public)
            preferences.show_listening_activity = privacy.get('showListeningActivity', preferences.show_listening_activity)
            preferences.show_playlists = privacy.get('showPlaylists', preferences.show_playlists)
            preferences.allow_data_collection = privacy.get('allowDataCollection', preferences.allow_data_collection)
        
        # Update preferences
        if 'preferences' in data:
            prefs = data['preferences']
            preferences.favorite_moods = prefs.get('moods', preferences.favorite_moods)
            preferences.theme = prefs.get('theme', preferences.theme)
        
        preferences.save()
        
        # Return updated settings
        settings_data = {
            'notifications': {
                'emailNewPlaylist': preferences.email_new_playlist,
                'emailWeeklyDigest': preferences.email_weekly_digest,
                'emailArtistUpdates': preferences.email_artist_updates,
                'pushNewFollower': preferences.push_new_follower,
                'pushPlaylistComplete': preferences.push_playlist_complete,
                'pushRecommendations': preferences.push_recommendations,
            },
            'privacy': {
                'profilePublic': preferences.profile_public,
                'showListeningActivity': preferences.show_listening_activity,
                'showPlaylists': preferences.show_playlists,
                'allowDataCollection': preferences.allow_data_collection,
            },
            'preferences': {
                'moods': preferences.favorite_moods,
                'theme': preferences.theme,
            }
        }
        return Response(settings_data)
