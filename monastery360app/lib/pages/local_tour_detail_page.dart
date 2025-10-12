// lib/pages/local_tour_detail_page.dart

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../models/local_tour_model.dart';

// --- COLOR PALETTE ---
const Color kPrimaryOrange = Color(0xFFE88D67);
const Color kDeepBrown = Color(0xFF4A2B25);
const Color kAccentGreen = Color(0xFF6A8B5D);

class LocalTourDetailPage extends StatelessWidget {
  final LocalTour tour;

  const LocalTourDetailPage({super.key, required this.tour});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          // --- 1. AppBar with a flexible image background and Hero Animation ---
          SliverAppBar(
            expandedHeight: 300.0,
            pinned: true,
            backgroundColor: kPrimaryOrange,
            foregroundColor: Colors.white,
            flexibleSpace: FlexibleSpaceBar(
              title: Text(
                tour.name,
                style: GoogleFonts.merriweather(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  shadows: [const Shadow(blurRadius: 2, color: Colors.black54)],
                ),
              ),
              background: Hero(
                tag: 'tour-image-${tour.id}', // Must match the tag from the list page
                child: Image.asset(
                  tour.imageUrl,
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stackTrace) =>
                      Container(color: Colors.grey, child: const Icon(Icons.image_not_supported, color: Colors.white)),
                ),
              ),
            ),
          ),

          // --- 2. The Content Section ---
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // --- Redesigned Info Chips ---
                  Wrap(
                    spacing: 16.0,
                    runSpacing: 8.0,
                    children: [
                      _buildInfoChip(icon: Icons.timer_outlined, text: tour.duration, color: kAccentGreen),
                      _buildInfoChip(icon: Icons.star_border, text: '${tour.rating} (${tour.views} views)', color: Colors.orange),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // Price
                  Text(
                    "₹${tour.price}",
                    style: GoogleFonts.lato(fontSize: 28, fontWeight: FontWeight.bold, color: kDeepBrown),
                  ),
                  Text(
                    "/ person",
                    style: GoogleFonts.lato(fontSize: 16, color: Colors.grey[600]),
                  ),
                  const Divider(height: 32),

                  // Description
                  Text(
                    "About this tour",
                    style: GoogleFonts.merriweather(fontSize: 22, fontWeight: FontWeight.bold, color: kDeepBrown),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    tour.description,
                    style: GoogleFonts.lato(fontSize: 17, height: 1.7, color: kDeepBrown.withOpacity(0.8)),
                  ),
                  const SizedBox(height: 24),

                  // Highlights
                  Text(
                    "Highlights",
                    style: GoogleFonts.merriweather(fontSize: 22, fontWeight: FontWeight.bold, color: kDeepBrown),
                  ),
                  const SizedBox(height: 12),
                  for (String highlight in tour.highlights)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 8.0),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(top: 4.0, right: 8.0),
                            child: Icon(Icons.check_circle_outline, color: kAccentGreen, size: 18),
                          ),
                          Expanded(child: Text(highlight, style: GoogleFonts.lato(fontSize: 16, color: kDeepBrown.withOpacity(0.9)))),
                        ],
                      ),
                    ),
                  const SizedBox(height: 32),

                  // Book Tour Button
                  ElevatedButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Booking for ${tour.name} is not available yet.')),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: kPrimaryOrange,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: Text("Book Tour", style: GoogleFonts.lato(fontSize: 18, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  // Helper widget for the small info chips
  Widget _buildInfoChip({required IconData icon, required String text, required Color color}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: color, size: 18),
          const SizedBox(width: 8),
          Text(
            text,
            style: GoogleFonts.lato(
              color: kDeepBrown,
              fontWeight: FontWeight.bold,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}