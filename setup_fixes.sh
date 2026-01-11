#!/bin/bash

# 404 Fix Setup Script
# Run this script to apply all backend fixes

echo "🔧 Setting up backend with user endpoints..."

cd /workspaces/dakchi-tma/backend

# Install required packages
echo "📦 Checking dependencies..."
pip install djangorestframework django-cors-headers Pillow python-magic

# Run migrations
echo "🗄️ Running database migrations..."
python manage.py makemigrations users
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
echo "👤 Creating demo user..."
python manage.py shell << EOF
from django.contrib.auth import get_user_model
from app.users.models import UserStats, UserPreferences

User = get_user_model()

# Create user if doesn't exist
if not User.objects.filter(username='demo_user').exists():
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
    
    print(f"✅ Created user: {user.username}")
else:
    print("ℹ️ Demo user already exists")
EOF

echo "✅ Backend setup complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Start backend: python manage.py runserver 3000"
echo "2. Start frontend: cd ../frontend && npm run dev"
echo "3. Visit: http://localhost:5173/profile"
