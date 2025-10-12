// lib/models/homestay_model.dart

class Homestay {
  final String id;
  final String name;
  final String location;
  final int pricePerNight;
  final String imageUrl;
  final String description;
  final double rating;
  final String views;

  const Homestay({
    required this.id,
    required this.name,
    required this.location,
    required this.pricePerNight,
    required this.imageUrl,
    required this.description,
    required this.rating,
    required this.views,
  });
}