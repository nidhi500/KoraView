// lib/pages/monastery_detail_page.dart

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:just_audio/just_audio.dart';
import 'package:provider/provider.dart'; // ADDED: To fix the map button
import '../models/monastery_model.dart';
import '../providers/monastery_provider.dart'; // ADDED: To fix the map button
import 'map_page.dart';
import 'webview_page.dart';

// --- COLOR PALETTE ---
const Color kPrimaryOrange = Color(0xFFE88D67);
const Color kDeepBrown = Color(0xFF4A2B25);
const Color kAccentGreen = Color(0xFF6A8B5D);

class MonasteryDetailPage extends StatefulWidget {
  final Monastery monastery;
  const MonasteryDetailPage({super.key, required this.monastery});

  @override
  State<MonasteryDetailPage> createState() => _MonasteryDetailPageState();
}

class _MonasteryDetailPageState extends State<MonasteryDetailPage> {
  final AudioPlayer _audioPlayer = AudioPlayer();
  bool _isPlaying = false;

  // FIX: Removed the hardcoded list of monasteries.
  // Data should be managed by the provider, not duplicated here.
  final List<Monastery> monasteries = const [
    Monastery(id: '1', name: 'Pemayangtse Monastery', location: 'Pelling, Sikkim', description: '...', imageUrl: 'assets/images/pemayangtse.jpg', audioUrls: {
      'Hindi': 'assets/audio/hindi.mp3',
      'Nepali': 'assets/audio/nepali.mp3',
      'English': 'assets/audio/english.mp3',
    }, latitude: 27.3015, longitude: 88.2541, url360: '...'),
    Monastery(id: '2', name: 'Rumtek Monastery', location: 'Gangtok, Sikkim', description: '...', imageUrl: 'assets/images/rumtek_thumb.jpg', audioUrls: {
      'Hindi': 'assets/audio/hindi.mp3',
      'Nepali': 'assets/audio/nepali.mp3',
      'English': 'assets/audio/english.mp3',
    }, latitude: 27.2897, longitude: 88.5670, url360: '...'),
    Monastery(id: '3', name: 'Tashiding Monastery', location: 'West Sikkim', description: '...', imageUrl: 'assets/images/tashiding.webp', audioUrls: {
      'Hindi': 'assets/audio/hindi.mp3',
      'Nepali': 'assets/audio/nepali.mp3',
      'English': 'assets/audio/english.mp3',
    }, latitude: 27.2667, longitude: 88.2833, url360: null),
    Monastery(id: '4', name: 'Khecheopalri Lake', location: 'West Sikkim', description: '...', imageUrl: 'assets/images/khecheopalri-lake.webp', audioUrls: {
      'Hindi': 'assets/audio/hindi.mp3',
      'Nepali': 'assets/audio/nepali.mp3',
      'English': 'assets/audio/english.mp3',
    }, latitude: 27.3765, longitude: 88.2017, url360: null),
    Monastery(id: '5', name: 'Nathula Pass', location: 'East Sikkim', description: '...', imageUrl: 'assets/images/nathula.webp', audioUrls: {
      'Hindi': 'assets/audio/hindi.mp3',
      'Nepali': 'assets/audio/nepali.mp3',
      'English': 'assets/audio/english.mp3',
    }, latitude: 27.3862, longitude: 88.8306, url360: null),
  ];
  @override
  void initState() {
    super.initState();
    _audioPlayer.playingStream.listen((playing) {
      if (mounted) setState(() => _isPlaying = playing);
    });
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  // ADDED: Logic to handle multiple audio languages.
  void _showLanguageSelectionDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return SimpleDialog(
          title: Text('Select Audio Language', style: GoogleFonts.merriweather()),
          children: widget.monastery.audioUrls.entries.map((entry) {
            return SimpleDialogOption(
              onPressed: () {
                Navigator.pop(context);
                _playAudio(entry.value); // Play the selected audio path
              },
              child: Text(entry.key, style: GoogleFonts.lato(fontSize: 16)),
            );
          }).toList(),
        );
      },
    );
  }

  void _playAudio(String path) async {
    try {
      await _audioPlayer.setAsset(path);
      _audioPlayer.play();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Error: Could not load audio file.')),
        );
      }
    }
  }

  void _handleAudio() {
    if (_isPlaying) {
      _audioPlayer.stop();
    } else {
      _showLanguageSelectionDialog();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300.0,
            pinned: true,
            backgroundColor: kPrimaryOrange,
            foregroundColor: Colors.white,
            flexibleSpace: FlexibleSpaceBar(
              title: Text(
                widget.monastery.name,
                style: GoogleFonts.merriweather(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  shadows: [const Shadow(blurRadius: 2, color: Colors.black54)],
                ),
              ),
              background: Hero(
                tag: 'monastery-image-${widget.monastery.id}',
                child: Image.asset(
                  widget.monastery.imageUrl,
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stackTrace) =>
                      Container(color: Colors.grey, child: const Icon(Icons.image_not_supported, color: Colors.white)),
                ),
              ),
            ),
          ),

          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // REMOVED: Rating and review info as requested.
                  Row(
                    children: [
                      Icon(Icons.location_on_outlined, color: Colors.grey[600], size: 16),
                      const SizedBox(width: 4),
                      Text(
                        widget.monastery.location,
                        style: GoogleFonts.lato(fontSize: 16, color: Colors.grey[600]),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  Text(
                    'About',
                    style: GoogleFonts.merriweather(fontSize: 22, fontWeight: FontWeight.bold, color: kDeepBrown),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    widget.monastery.description,
                    style: GoogleFonts.lato(fontSize: 17, height: 1.7, color: kDeepBrown.withOpacity(0.8)),
                  ),
                  const Divider(height: 48),
                  Text(
                    'Actions',
                    style: GoogleFonts.merriweather(fontSize: 22, fontWeight: FontWeight.bold, color: kDeepBrown),
                  ),
                  const SizedBox(height: 8),
                  Card(
                    elevation: 0,
                    color: Colors.grey.shade50,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    child: Column(
                      children: [
                        ListTile(
                          leading: Icon(Icons.map_outlined, color: kAccentGreen),
                          title: Text('View on Map', style: GoogleFonts.lato(fontWeight: FontWeight.w600)),
                          subtitle: Text('See this location on the main map', style: GoogleFonts.lato()),
                          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => MapPage(monasteries: monasteries))),
                        ),
                        const Divider(height: 1, indent: 16, endIndent: 16),
                        ListTile(
                          leading: Icon(
                            _isPlaying ? Icons.stop_circle_outlined : Icons.play_circle_outline,
                            color: kPrimaryOrange,
                          ),
                          title: Text(
                            _isPlaying ? 'Stop Audio Guide' : 'Listen to Audio Guide',
                            style: GoogleFonts.lato(fontWeight: FontWeight.w600),
                          ),
                          onTap: _handleAudio,
                        ),
                        if (widget.monastery.url360 != null) ...[
                          const Divider(height: 1, indent: 16, endIndent: 16),
                          ListTile(
                            leading: Icon(Icons.threesixty_outlined, color: kDeepBrown),
                            title: Text('360° Virtual Tour', style: GoogleFonts.lato(fontWeight: FontWeight.w600)),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => WebViewPage(
                                    title: "${widget.monastery.name} 360° Tour",
                                    url: widget.monastery.url360!,
                                  ),
                                ),
                              );
                            },
                          ),
                        ]
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}