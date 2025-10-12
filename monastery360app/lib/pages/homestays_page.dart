// lib/pages/homestays_page.dart

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../models/homestay_model.dart';
import 'homestay_detail_page.dart';

// --- COLOR PALETTE ---
const Color kSoothingOrange = Color(0xFFFFF5E6);
const Color kPrimaryOrange = Color(0xFFE88D67);
const Color kDeepBrown = Color(0xFF4A2B25);
const Color kAccentGreen = Color(0xFF6A8B5D);

class HomestaysPage extends StatelessWidget {
  const HomestaysPage({super.key});

  // Data remains the same, just ensure rating and views are included
  final List<Homestay> homestays = const [
    Homestay(id: 'hs1', name: 'Hee Bermiok Homestay', location: 'West Sikkim', pricePerNight: 2500, imageUrl: 'assets/images/hee.jpg', description: 'Experience authentic Sikkimese village life...', rating: 4.8, views: '2.3k'),
    Homestay(id: 'hs2', name: 'Yuksom Vineyard Homestay', location: 'Yuksom, West Sikkim', pricePerNight: 3000, imageUrl: 'assets/images/yuksom.jpg', description: 'Nestled amidst a lush vineyard, this homestay offers a unique experience...', rating: 4.9, views: '2.1k'),
    Homestay(id: 'hs3', name: 'Lachung Riverside Retreat', location: 'Lachung, North Sikkim', pricePerNight: 3500, imageUrl: 'assets/images/lachung.jpg', description: 'Stay by the pristine Lachung River and wake up to the sounds of nature...', rating: 4.7, views: '1.9k'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kSoothingOrange, // Use new background color
      appBar: AppBar(
        title: Text("Homestays", style: GoogleFonts.merriweather()),
        backgroundColor: kPrimaryOrange, // Use new theme color
        foregroundColor: Colors.white,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: homestays.length,
        itemBuilder: (context, index) {
          final homestay = homestays[index];
          return HomestayCard(homestay: homestay); // Use the new beautified card
        },
      ),
    );
  }
}

// --- NEW: Beautified Homestay Card Widget ---
class HomestayCard extends StatelessWidget {
  final Homestay homestay;

  const HomestayCard({super.key, required this.homestay});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => HomestayDetailPage(homestay: homestay)),
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
            // Hero animation for a smooth image transition
            Hero(
              tag: 'homestay-image-${homestay.id}',
              child: ClipRRect(
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(16),
                  topRight: Radius.circular(16),
                ),
                child: Image.asset(
                  homestay.imageUrl,
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
                    homestay.name,
                    style: GoogleFonts.merriweather(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: kDeepBrown,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Icon(Icons.location_on, color: kDeepBrown.withOpacity(0.6), size: 14),
                      const SizedBox(width: 4),
                      Text(
                        homestay.location,
                        style: GoogleFonts.lato(color: kDeepBrown.withOpacity(0.6), fontSize: 14),
                      ),
                    ],
                  ),
                  const Divider(height: 24),
                  // Improved info display with icons
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _buildInfoChip(icon: Icons.king_bed_outlined, text: '₹${homestay.pricePerNight} / night', color: kAccentGreen),
                      _buildInfoChip(icon: Icons.star_border, text: '${homestay.rating}', color: Colors.orange),
                      _buildInfoChip(icon: Icons.visibility_outlined, text: homestay.views, color: Colors.grey),
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

  // Helper widget for the small info chips (price, rating, views)
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