// lib/models/handicraft_model.dart

class Handicraft {
  final String id;
  final String name;
  final String material;
  final int price;
  final String imageUrl;
  final String description;
  final double rating;
  final String views;

  const Handicraft({
    required this.id,
    required this.name,
    required this.material,
    required this.price,
    required this.imageUrl,
    required this.description,
    required this.rating,
    required this.views,
  });
}