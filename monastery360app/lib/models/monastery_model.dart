// lib/models/monastery_model.dart

import 'package:flutter/foundation.dart';

@immutable
// lib/models/monastery_model.dart

class Monastery {
  final String id;
  final String name;
  final String location;
  final String description;
  final String imageUrl;
  final Map<String, String> audioUrls; // <-- CHANGED from String to Map
  final double latitude;
  final double longitude;
  final String? url360; // <-- ADD THIS: Make it optional

  const Monastery({
    required this.id,
    required this.name,
    required this.location,
    required this.description,
    required this.imageUrl,
    required this.audioUrls ,
    required this.latitude,
    required this.longitude,
    this.url360, // <-- ADD THIS to the constructor

  });
}