// lib/pages/handicrafts_page.dart

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../models/handicraft_model.dart';
import 'handicraft_detail_page.dart';

// --- COLOR PALETTE ---
const Color kSoothingOrange = Color(0xFFFFF5E6);
const Color kPrimaryOrange = Color(0xFFE88D67);
const Color kDeepBrown = Color(0xFF4A2B25);
const Color kAccentGreen = Color(0xFF6A8B5D);

class HandicraftsPage extends StatelessWidget {
  const HandicraftsPage({super.key});

  final List<Handicraft> handicrafts = const [
    Handicraft(id: 'hc1', name: 'Thangka Painting', material: 'Cotton Canvas, Silk, Gold Thread', price: 8000, imageUrl: 'assets/images/thangka.jpg', description: 'A traditional Tibetan Buddhist painting...', rating: 4.9, views: '1.8k'),
    Handicraft(id: 'hc2', name: 'Sikkimese Carpet', material: 'Wool, Natural Dyes', price: 15000, imageUrl: 'assets/images/carpet.jpg', description: 'Hand-woven carpets featuring intricate traditional designs...', rating: 4.8, views: '1.5k'),
    Handicraft(id: 'hc3', name: 'Choktse Table', material: 'Wood', price: 5000, imageUrl: 'assets/images/table.jpg', description: 'A small, foldable, and intricately carved wooden table...', rating: 4.7, views: '2.1k'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kSoothingOrange, // Use new background color
      appBar: AppBar(
        title: Text("Handicrafts", style: GoogleFonts.merriweather()),
        backgroundColor: kPrimaryOrange, // Use new theme color
        foregroundColor: Colors.white,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: handicrafts.length,
        itemBuilder: (context, index) {
          final handicraft = handicrafts[index];
          return HandicraftCard(handicraft: handicraft); // Use the new beautified card
        },
      ),
    );
  }
}

// --- NEW: Beautified Handicraft Card Widget ---
class HandicraftCard extends StatelessWidget {
  final Handicraft handicraft;

  const HandicraftCard({super.key, required this.handicraft});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => HandicraftDetailPage(handicraft: handicraft)),
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
              tag: 'handicraft-image-${handicraft.id}',
              child: ClipRRect(
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(16),
                  topRight: Radius.circular(16),
                ),
                child: Image.asset(
                  handicraft.imageUrl,
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
                    handicraft.name,
                    style: GoogleFonts.merriweather(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: kDeepBrown,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    handicraft.material,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: GoogleFonts.lato(color: kDeepBrown.withOpacity(0.6), fontSize: 14),
                  ),
                  const Divider(height: 24),
                  // Improved info display with icons
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _buildInfoChip(icon: Icons.sell_outlined, text: '₹${handicraft.price}', color: kAccentGreen),
                      _buildInfoChip(icon: Icons.star_border, text: '${handicraft.rating}', color: Colors.orange),
                      _buildInfoChip(icon: Icons.visibility_outlined, text: handicraft.views, color: Colors.grey),
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