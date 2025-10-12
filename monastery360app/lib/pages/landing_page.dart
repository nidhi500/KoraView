// lib/pages/landing_page.dart

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LandingPage extends StatefulWidget {
  const LandingPage({super.key});

  @override
  State<LandingPage> createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 1));
    _animation = CurvedAnimation(parent: _controller, curve: Curves.easeIn);
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset(
            "assets/images/logo.jpg",
            fit: BoxFit.cover,
          ),
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Colors.transparent, Colors.black.withOpacity(0.8)],
              ),
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: FadeTransition(
                opacity: _animation,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // TRANSLATED TO NEPALI
                    Text(
                      "Discover Sikkim's | सिक्किमको पत्ता लगाउनुहोस्",
                      style: GoogleFonts.notoSansDevanagari(
                        fontSize: 28,
                        color: Colors.white,
                        fontWeight: FontWeight.w300,
                      ),
                    ),
                    // TRANSLATED TO NEPALI
                    Text(
                      "Sacred Heritage | पवित्र सम्पदा",
                      style: GoogleFonts.notoSansDevanagari(
                        fontSize: 42,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 12),
                    // TRANSLATED TO NEPALI
                    Text(
                      "Explore monasteries, cultural festivals, and more — all in one app. | मठहरू, सांस्कृतिक उत्सवहरू, र थप कुराहरू अन्वेषण गर्नुहोस् — सबै एउटै एपमा।",
                      style: GoogleFonts.notoSansDevanagari(
                        color: Colors.white70,
                        height: 1.6,
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 40),
                    ElevatedButton(
                      onPressed: () => Navigator.pushNamed(context, '/login'),
                      // TRANSLATED TO NEPALI
                      child: const Text("Login | लगइन"),
                    ),
                    const SizedBox(height: 12),
                    OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        side: const BorderSide(color: Colors.white, width: 2),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                      ),
                      onPressed: () => Navigator.pushNamed(context, '/register'),
                      // TRANSLATED TO NEPALI
                      child: const Text("Register | दर्ता गर्नुहोस्"),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}