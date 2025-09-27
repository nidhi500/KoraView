GET /api/monasteries

➡ Returns a list of monasteries (for map/list view)

[
  {
    "id": 1,
    "name": "Rumtek Monastery",
    "location": { "lat": 27.3309, "lng": 88.5182 },
    "thumbnail": "/assets/images/rumtek_thumb.jpg"
  },
  {
    "id": 2,
    "name": "Tashiding Monastery",
    "location": { "lat": 27.3144, "lng": 88.2743 },
    "thumbnail": "/assets/images/tashiding_thumb.jpg"
  }
]

GET /api/monasteries/:id

➡ Returns details of a single monastery

{
  "id": 1,
  "name": "Rumtek Monastery",
  "description": "Built in 16th century, seat of the Karmapa...",
  "location": { "lat": 27.3309, "lng": 88.5182 },
  "tour360": "/assets/360/rumtek.jpg",
  "audio": {
    "english": "/assets/audio/rumtek_en.mp3",
    "nepali": "/assets/audio/rumtek_np.mp3"
  },
  "archives": [
    {
      "id": "a1",
      "title": "17th Century Manuscript",
      "image": "/assets/archives/rumtek_manuscript.jpg"
    }
  ]
}

GET /api/events

➡ Returns upcoming festivals/cultural events

[
  {
    "id": "e1",
    "name": "Losar (Tibetan New Year)",
    "date": "2025-03-02",
    "monasteryId": 1
  },
  {
    "id": "e2",
    "name": "Saga Dawa",
    "date": "2025-05-15",
    "monasteryId": 2
  }
]
