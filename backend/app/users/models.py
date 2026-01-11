from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """Extended user model with music app specific fields"""
    bio = models.TextField(blank=True, max_length=500)
    avatar = models.URLField(blank=True, default="https://api.dicebear.com/7.x/avataaars/svg?seed=default")
    location = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)
    spotify_connected = models.BooleanField(default=False)
    apple_music_connected = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'
        ordering = ['-created_at']

    def __str__(self):
        return self.username


class UserStats(models.Model):
    """User statistics for profile display"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='stats')
    total_playlists = models.IntegerField(default=0)
    total_tracks = models.IntegerField(default=0)
    total_listening_hours = models.FloatField(default=0.0)
    followers = models.IntegerField(default=0)
    following = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'user_stats'
        verbose_name_plural = 'User stats'

    def __str__(self):
        return f"Stats for {self.user.username}"


class UserPreferences(models.Model):
    """User preferences and settings"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='preferences')
    
    # Privacy settings
    profile_public = models.BooleanField(default=True)
    show_listening_activity = models.BooleanField(default=True)
    show_playlists = models.BooleanField(default=True)
    allow_data_collection = models.BooleanField(default=False)
    
    # Notification settings
    email_new_playlist = models.BooleanField(default=True)
    email_weekly_digest = models.BooleanField(default=True)
    email_artist_updates = models.BooleanField(default=False)
    push_new_follower = models.BooleanField(default=True)
    push_playlist_complete = models.BooleanField(default=True)
    push_recommendations = models.BooleanField(default=False)
    
    # Preference settings
    favorite_moods = models.JSONField(default=list, blank=True)
    theme = models.CharField(max_length=20, default='dark')
    
    class Meta:
        db_table = 'user_preferences'
        verbose_name_plural = 'User preferences'

    def __str__(self):
        return f"Preferences for {self.user.username}"
