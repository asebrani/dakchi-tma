from rest_framework import serializers
from .models import User, UserStats, UserPreferences


class UserStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStats
        fields = ['total_playlists', 'total_tracks', 'total_listening_hours', 'followers', 'following']


class UserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferences
        exclude = ['id', 'user']


class UserProfileSerializer(serializers.ModelSerializer):
    stats = UserStatsSerializer(read_only=True)
    preferences = UserPreferencesSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'bio', 'avatar', 'location', 'website',
            'spotify_connected', 'apple_music_connected',
            'created_at', 'stats', 'preferences'
        ]
        read_only_fields = ['id', 'username', 'created_at']


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'bio', 'avatar', 'location', 'website']


class UserSettingsSerializer(serializers.Serializer):
    notifications = serializers.DictField(required=False)
    privacy = serializers.DictField(required=False)
    preferences = serializers.DictField(required=False)
