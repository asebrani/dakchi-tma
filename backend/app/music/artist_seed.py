from pydantic import BaseModel
from typing import List

class Artist(BaseModel):
    id: int
    name : str
    genre: str
    image_url: str
    tags: List[str]
    popularity: int

# Using UI Avatars as placeholder - generates images from artist initials
# You can replace these with actual artist images from Spotify API, Last.fm, etc.
def avatar_url(name: str) -> str:
    return f"https://ui-avatars.com/api/?name={name.replace(' ', '+')}&size=300&background=2c3928&color=46ec13&bold=true"

SEED_ARTISTS: List[Artist] = [
    Artist(
        id=1,
        name="The Weeknd",
        genre="pop",
        image_url=avatar_url("The Weeknd"),
        tags=["night", "sad", "rnb", "chill"],
        popularity=95,
    ),
    Artist(
        id=2,
        name="Taylor Swift",
        genre="pop",
        image_url=avatar_url("Taylor Swift"),
        tags=["storytelling", "romantic", "pop"],
        popularity=100,
    ),
    Artist(
        id=3,
        name="Kendrick Lamar",
        genre="hip-hop",
        image_url=avatar_url("Kendrick Lamar"),
        tags=["conscious", "rap", "intense"],
        popularity=93,
    ),
    Artist(
        id=4,
        name="Radiohead",
        genre="rock",
        image_url=avatar_url("Radiohead"),
        tags=["melancholic", "alternative", "experimental"],
        popularity=90,
    ),
    Artist(
        id=5,
        name="Daft Punk",
        genre="electronic",
        image_url=avatar_url("Daft Punk"),
        tags=["electronic", "funk", "dance"],
        popularity=92,
    ),
    Artist(
        id=6,
        name="Lana Del Rey",
        genre="pop",
        image_url=avatar_url("Lana Del Rey"),
        tags=["sad", "cinematic", "nostalgic"],
        popularity=88,
    ),
    Artist(
        id=7,
        name="BTS",
        genre="k-pop",
        image_url=avatar_url("BTS"),
        tags=["kpop", "energetic", "dance"],
        popularity=99,
    ),
    Artist(
        id=8,
        name="Coldplay",
        genre="rock",
        image_url=avatar_url("Coldplay"),
        tags=["uplifting", "anthem", "soft"],
        popularity=89,
    ),
    Artist(
        id=9,
        name="Drake",
        genre="hip-hop",
        image_url=avatar_url("Drake"),
        tags=["rap", "rnb", "night"],
        popularity=96,
    ),
    Artist(
        id=10,
        name="Arctic Monkeys",
        genre="rock",
        image_url=avatar_url("Arctic Monkeys"),
        tags=["indie", "garage", "night"],
        popularity=87,
    ),
    Artist(
        id=11,
        name="Billie Eilish",
        genre="pop",
        image_url=avatar_url("Billie Eilish"),
        tags=["dark", "minimal", "alternative"],
        popularity=94,
    ),
    Artist(
        id=12,
        name="Hans Zimmer",
        genre="soundtrack",
        image_url=avatar_url("Hans Zimmer"),
        tags=["cinematic", "orchestral", "epic"],
        popularity=85,
    ),
    Artist(
        id=13,
        name="Lo-Fi Beats",
        genre="lofi",
        image_url=avatar_url("Lo-Fi Beats"),
        tags=["study", "chill", "instrumental"],
        popularity=80,
    ),
    Artist(
        id=14,
        name="Nujabes",
        genre="lofi",
        image_url=avatar_url("Nujabes"),
        tags=["jazzy", "chillhop", "smooth"],
        popularity=82,
    ),
    Artist(
        id=15,
        name="Metallica",
        genre="metal",
        image_url=avatar_url("Metallica"),
        tags=["heavy", "aggressive", "classic"],
        popularity=91,
    ),
    Artist(
        id=16,
        name="Eminem",
        genre="hip-hop",
        image_url=avatar_url("Eminem"),
        tags=["rap", "intense", "storytelling"],
        popularity=97,
    ),
    Artist(
        id=17,
        name="Adele",
        genre="pop",
        image_url=avatar_url("Adele"),
        tags=["ballad", "emotional", "vocal"],
        popularity=93,
    ),
    Artist(
        id=18,
        name="Imagine Dragons",
        genre="rock",
        image_url=avatar_url("Imagine Dragons"),
        tags=["anthem", "energetic", "modern"],
        popularity=86,
    ),
    Artist(
        id=19,
        name="Joji",
        genre="alternative",
        image_url=avatar_url("Joji"),
        tags=["sad", "lofi", "night"],
        popularity=84,
    ),
    Artist(
        id=20,
        name="Tame Impala",
        genre="psychedelic",
        image_url=avatar_url("Tame Impala"),
        tags=["psychedelic", "dreamy", "indie"],
        popularity=88,
    ),
]

