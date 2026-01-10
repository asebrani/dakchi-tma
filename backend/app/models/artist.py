from pydantic import BaseModel
from typing import List

class Artist(BaseModel):
    id: int
    name : str
    genre: str
    image_url: str
    tags: List[str]
    popularity: int

SEED_ARTISTS: List[Artist] = [
    Artist(
        id=1,
        name="The Weeknd",
        genre="pop",
        image_url="",
        tags=["night", "sad", "rnb", "chill"],
        popularity=95,
    ),
    Artist(
        id=2,
        name="Taylor Swift",
        genre="pop",
        image_url="",
        tags=["storytelling", "romantic", "pop"],
        popularity=100,
    ),
    Artist(
        id=3,
        name="Kendrick Lamar",
        genre="hip-hop",
        image_url="",
        tags=["conscious", "rap", "intense"],
        popularity=93,
    ),
    Artist(
        id=4,
        name="Radiohead",
        genre="rock",
        image_url="",
        tags=["melancholic", "alternative", "experimental"],
        popularity=90,
    ),
    Artist(
        id=5,
        name="Daft Punk",
        genre="electronic",
        image_url="",
        tags=["electronic", "funk", "dance"],
        popularity=92,
    ),
    Artist(
        id=6,
        name="Lana Del Rey",
        genre="pop",
        image_url="",
        tags=["sad", "cinematic", "nostalgic"],
        popularity=88,
    ),
    Artist(
        id=7,
        name="BTS",
        genre="k-pop",
        image_url="",
        tags=["kpop", "energetic", "dance"],
        popularity=99,
    ),
    Artist(
        id=8,
        name="Coldplay",
        genre="rock",
        image_url="",
        tags=["uplifting", "anthem", "soft"],
        popularity=89,
    ),
    Artist(
        id=9,
        name="Drake",
        genre="hip-hop",
        image_url="",
        tags=["rap", "rnb", "night"],
        popularity=96,
    ),
    Artist(
        id=10,
        name="Arctic Monkeys",
        genre="rock",
        image_url="",
        tags=["indie", "garage", "night"],
        popularity=87,
    ),
    Artist(
        id=11,
        name="Billie Eilish",
        genre="pop",
        image_url="",
        tags=["dark", "minimal", "alternative"],
        popularity=94,
    ),
    Artist(
        id=12,
        name="Hans Zimmer",
        genre="soundtrack",
        image_url="",
        tags=["cinematic", "orchestral", "epic"],
        popularity=85,
    ),
    Artist(
        id=13,
        name="Lo-Fi Beats",
        genre="lofi",
        image_url="",
        tags=["study", "chill", "instrumental"],
        popularity=80,
    ),
    Artist(
        id=14,
        name="Nujabes",
        genre="lofi",
        image_url="",
        tags=["jazzy", "chillhop", "smooth"],
        popularity=82,
    ),
    Artist(
        id=15,
        name="Metallica",
        genre="metal",
        image_url="",
        tags=["heavy", "aggressive", "classic"],
        popularity=91,
    ),
    Artist(
        id=16,
        name="Eminem",
        genre="hip-hop",
        image_url="",
        tags=["rap", "intense", "storytelling"],
        popularity=97,
    ),
    Artist(
        id=17,
        name="Adele",
        genre="pop",
        image_url="",
        tags=["ballad", "emotional", "vocal"],
        popularity=93,
    ),
    Artist(
        id=18,
        name="Imagine Dragons",
        genre="rock",
        image_url="",
        tags=["anthem", "energetic", "modern"],
        popularity=86,
    ),
    Artist(
        id=19,
        name="Joji",
        genre="alternative",
        image_url="",
        tags=["sad", "lofi", "night"],
        popularity=84,
    ),
    Artist(
        id=20,
        name="Tame Impala",
        genre="psychedelic",
        image_url="",
        tags=["psychedelic", "dreamy", "indie"],
        popularity=88,
    ),
]

