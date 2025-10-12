// lib/pages/local_tours_page.dart

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../models/local_tour_model.dart';
import 'local_tour_detail_page.dart';

// --- COLOR PALETTE ---
const Color kSoothingOrange = Color(0xFFFFF5E6);
const Color kPrimaryOrange = Color(0xFFE88D67);
const Color kDeepBrown = Color(0xFF4A2B25);
const Color kAccentGreen = Color(0xFF6A8B5D);

class LocalToursPage extends StatelessWidget {
  const LocalToursPage({super.key});

  final List<LocalTour> tours = const [
    LocalTour(id: 'lt1', name: 'Gangtok City Explorer', duration: '1 Day', price: 4000, imageUrl: 'assets/images/gongtok.jpg', description: 'Discover the best of Sikkim\'s capital...', highlights: ['Enchey Monastery', 'Ganesh Tok Viewpoint'], rating: 4.8, views: '1.3k'),
    LocalTour(id: 'lt2', name: 'Monastery Circuit', duration: '2 Days / 1 Night', price: 9000, imageUrl: 'assets/images/circuit.jpg', description: 'A spiritual journey visiting the most significant monasteries...', highlights: ['Rumtek Monastery', 'Pemayangtse Monastery'], rating: 4.9, views: '2.7k'),
    LocalTour(id: 'lt3', name: 'North Sikkim Adventure', duration: '4 Days / 3 Nights', price: 20000, imageUrl: 'assets/images/north.jpg', description: 'Explore the breathtaking landscapes of North Sikkim...', highlights: ['Yumthang Valley', 'Gurudongmar Lake'], rating: 4.7, views: '2.3k'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kSoothingOrange, // Use new background color
      appBar: AppBar(
        title: Text("Local Tours", style: GoogleFonts.merriweather()),
        backgroundColor: kPrimaryOrange, // Use new theme color
        foregroundColor: Colors.white,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: tours.length,
        itemBuilder: (context, index) {
          final tour = tours[index];
          return LocalTourCard(tour: tour); // Use the new beautified card
        },
      ),
    );
  }
}

// --- NEW: Beautified LocalTour Card Widget ---
class LocalTourCard extends StatelessWidget {
  final LocalTour tour;

  const LocalTourCard({super.key, required this.tour});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => LocalTourDetailPage(tour: tour)),
        );
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: kPrimaryOrange.withOpacity(0.15),
              spreadRadius: 2,
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Hero animation for the image
            Hero(
              tag: 'tour-image-${tour.id}',
              child: ClipRRect(
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(16),
                  topRight: Radius.circular(16),
                ),
                child: Image.asset(
                  tour.imageUrl,
                  height: 180,
                  width: double.infinity,
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stackTrace) =>
                  const SizedBox(height: 180, child: Icon(Icons.broken_image)),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    tour.name,
                    style: GoogleFonts.merriweather(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: kDeepBrown,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    tour.duration,
                    style: GoogleFonts.lato(color: kDeepBrown.withOpacity(0.6), fontSize: 14, fontWeight: FontWeight.w600),
                  ),
                  const Divider(height: 24),
                  // Improved info display with icons
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _buildInfoChip(icon: Icons.sell_outlined, text: '₹${tour.price} / person', color: kAccentGreen),
                      _buildInfoChip(icon: Icons.star_border, text: '${tour.rating}', color: Colors.orange),
                      _buildInfoChip(icon: Icons.visibility_outlined, text: tour.views, color: Colors.grey),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Helper widget for the small info chips
  Widget _buildInfoChip({required IconData icon, required String text, required Color color}) {
    return Row(
      children: [
        Icon(icon, color: color, size: 18),
        const SizedBox(width: 6),
        Text(
          text,
          style: GoogleFonts.lato(
            color: kDeepBrown,
            fontWeight: FontWeight.bold,
            fontSize: 14,
          ),
        ),
      ],
    );
  }
}