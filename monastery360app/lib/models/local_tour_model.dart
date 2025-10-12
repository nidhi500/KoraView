// lib/models/local_tour_model.dart

class LocalTour {
  final String id;
  final String name;
  final String duration;
  final int price;
  final String imageUrl;
  final String description;
  final List<String> highlights;
  final double rating;
  final String views;

  const LocalTour({
    required this.id,
    required this.name,
    required this.duration,
    required this.price,
    required this.imageUrl,
    required this.description,
    required this.highlights,
    required this.rating,
    required this.views,
  });
}