// lib/pages/home_page.dart

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../models/monastery_model.dart';
import '../providers/auth_provider.dart';
import 'calendar_page.dart';
import 'monastery_detail_page.dart';
import 'landing_page.dart';
import 'map_page.dart';
import 'homestays_page.dart';
import 'handicrafts_page.dart';
import 'local_tours_page.dart';


// --- COLOR PALETTE ---
const Color kSoothingOrange = Color(0xFFFFF5E6);
const Color kPrimaryOrange = Color(0xFFE88D67);
const Color kDeepBrown = Color(0xFF4A2B25);
const Color kAccentGreen = Color(0xFF6A8B5D);

class ChatMessage {
  final String text;
  final bool isUserMessage;
  ChatMessage(this.text, this.isUserMessage);
}

class QAItem {
  final List<String> keywords;
  final String answer;
  QAItem({required this.keywords, required this.answer});
}

// Q&A data with Nepali translations for default messages
// --- 2. NEW: Q&A data for the fake chatbot ---
final List<QAItem> qaData = [
  // --- General ---
  QAItem(
    keywords: ["hello", "hi", "help", "namaste"],
    answer: "Hello! How can I help you today? | नमस्ते! म आज तपाईंलाई कसरी मद्दत गर्न सक्छु?",
  ),

  // --- Rumtek Monastery ---
  QAItem(
    keywords: ["rumtek", "location", "where"],
    answer: "Rumtek Monastery is located near Gangtok, Sikkim, approximately 24 km away, and is surrounded by beautiful hills and pine forests.",
  ),
  QAItem(
    keywords: ["rumtek", "history", "built", "founded"],
    answer: "Rumtek Monastery was originally established in the 16th century. It was rebuilt in the 1960s to serve as the main seat of the Karma Kagyu lineage outside Tibet.",
  ),
  QAItem(
    keywords: ["rumtek", "architecture", "design"],
    answer: "The monastery showcases traditional Tibetan Buddhist architecture, featuring golden rooftops, intricately painted walls, and prayer halls.",
  ),
  QAItem(
    keywords: ["rumtek", "festival", "events", "chaam"],
    answer: "Rumtek Monastery hosts several annual ceremonies, including the famous Chaam dance festival where monks perform ritual masked dances.",
  ),
  QAItem(
    keywords: ["rumtek", "visiting hours", "timings", "opening"],
    answer: "Rumtek Monastery is generally open to visitors from early morning until late afternoon. It's best to check in advance as timings can change for ceremonies.",
  ),
  QAItem(
    keywords: ["rumtek", "transport", "taxi", "bus"],
    answer: "You can reach Rumtek Monastery by hiring taxis, shared cabs, or local buses from Gangtok.",
  ),

  // --- Pemayangtse Monastery ---
  QAItem(
    keywords: ["pemayangtse", "location", "where"],
    answer: "Pemayangtse Monastery is located near Pelling in West Sikkim, situated on a hilltop with panoramic views.",
  ),
  QAItem(
    keywords: ["pemayangtse", "history", "founded"],
    answer: "Founded in 1705, Pemayangtse Monastery is one of the oldest and most important monasteries in Sikkim, belonging to the Nyingma tradition.",
  ),
  QAItem(
    keywords: ["pemayangtse", "architecture", "design"],
    answer: "The monastery features traditional Nyingma architecture with sloping roofs, intricate wood carvings, and a large central prayer hall.",
  ),
  QAItem(
    keywords: ["pemayangtse", "festival", "zangdok palri"],
    answer: "Pemayangtse Monastery is famous for its Cham dance festivals and the incredible wooden sculpture of 'Zangdok Palri', representing a heavenly abode.",
  ),
  QAItem(
    keywords: ["pemayangtse", "visiting hours", "timings", "opening"],
    answer: "Pemayangtse Monastery is generally open from early morning to late afternoon. Timings may vary on festival days.",
  ),

  // --- Tashiding Monastery ---
  QAItem(
    keywords: ["tashiding", "location", "where"],
    answer: "Tashiding Monastery is located on a hilltop in West Sikkim, near the town of Yuksom. It is a significant pilgrimage site for Buddhists.",
  ),
  QAItem(
    keywords: ["tashiding", "history", "founded"],
    answer: "Founded in the 17th century, Tashiding Monastery is considered the holiest monastery in Sikkim.",
  ),
  QAItem(
    keywords: ["tashiding", "architecture", "design"],
    answer: "The monastery is built in traditional Sikkimese Nyingma style, featuring sloping roofs, intricate wood carvings, and a large prayer hall.",
  ),
  QAItem(
    keywords: ["tashiding", "festival", "bumchu"],
    answer: "Tashiding Monastery is famous for the annual Bumchu festival, where the water level in a sacred vase is said to predict the fortune of the coming year.",
  ),
  QAItem(
    keywords: ["tashiding", "special", "unique", "facts"],
    answer: "Tashiding Monastery is considered the spiritual heart of Sikkim. It is believed that just seeing the monastery can cleanse one's sins.",
  ),
];

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final List<Monastery> monasteries = const [
    Monastery(
        id: '1',
        // TRANSLATED
        name: 'Pemayangtse Monastery | पेमायाङ्त्से गुम्बा',
        location: 'Pelling, Sikkim | पेलिङ, सिक्किम',
        description: 'One of the oldest and most important Nyingma monasteries...',
        imageUrl: 'assets/images/pemayangtse.jpg',
        audioUrls: {'Hindi': 'assets/audio/hindi.mp3', 'Nepali': 'assets/audio/nepali.mp3', 'English': 'assets/audio/english.mp3'},
        latitude: 27.3015, longitude: 88.2541, url360: null,
    ),
    Monastery(
        id: '2',
        // TRANSLATED
        name: 'Rumtek Monastery | रुम्तेक गुम्बा',
        location: 'Gangtok, Sikkim | गान्तोक, सिक्किम',
        description: 'The largest monastery in Sikkim and the seat of the Karmapa Lama.',
        imageUrl: 'assets/images/rumtek_thumb.jpg',
        audioUrls: {'Hindi': 'assets/audio/hindi.mp3', 'Nepali': 'assets/audio/nepali.mp3', 'English': 'assets/audio/english.mp3'},
        latitude: 27.2897, longitude: 88.5670, url360: null,
    ),
    Monastery(
        id: '3',
        // TRANSLATED
        name: 'Tashiding Monastery | टाशिदिङ गुम्बा',
        location: 'West Sikkim | पश्चिम सिक्किम',
        description: 'An important pilgrimage site, renowned for its sacred rituals.',
        imageUrl: 'assets/images/tashiding.webp',
        audioUrls: {'Hindi': 'assets/audio/hindi.mp3', 'Nepali': 'assets/audio/nepali.mp3', 'English': 'assets/audio/english.mp3'},
        latitude: 27.2667, longitude: 88.2833, url360: null,
    ),
    Monastery(
        id: '4',
        // TRANSLATED
        name: 'Khecheopalri Lake | खेचेयोपलरी ताल',
        location: 'West Sikkim | पश्चिम सिक्किम',
        description: 'A sacred lake for both Buddhists and Hindus.',
        imageUrl: 'assets/images/khecheopalri-lake.webp',
        audioUrls: {'Hindi': 'assets/audio/hindi.mp3', 'Nepali': 'assets/audio/nepali.mp3', 'English': 'assets/audio/english.mp3'},
        latitude: 27.3765, longitude: 88.2017, url360: null,
    ),
    Monastery(
        id: '5',
        // TRANSLATED
        name: 'Nathula Pass | नाथुला पास',
        location: 'East Sikkim | पूर्वी सिक्किम',
        description: 'A mountain pass in the Himalayas which serves as a trade link.',
        imageUrl: 'assets/images/nathula.webp',
        audioUrls: {'Hindi': 'assets/audio/hindi.mp3', 'Nepali': 'assets/audio/nepali.mp3', 'English': 'assets/audio/english.mp3'},
        latitude: 27.3862, longitude: 88.8306, url360: null,
    ),
  ];

  final List<ChatMessage> _messages = [];
  final TextEditingController _textController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  void _handleSubmitted(String text) {
    if (text.isEmpty) return;
    _textController.clear();

    setState(() { _messages.insert(0, ChatMessage(text, true)); });
    _scrollToBottom();

    // TRANSLATED
    String response = "Sorry, I couldn't find an answer. | माफ गर्नुहोस्, मैले जवाफ भेट्टाउन सकिनँ।";
    for (var qa in qaData) {
      if (qa.keywords.any((keyword) => text.toLowerCase().contains(keyword))) {
        response = qa.answer;
        break;
      }
    }

    Future.delayed(const Duration(milliseconds: 600), () {
      setState(() { _messages.insert(0, ChatMessage(response, false)); });
      _scrollToBottom();
    });
  }

  void _scrollToBottom() {
    if (_scrollController.hasClients) {
      _scrollController.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
    }
  }

  @override
  void dispose() {
    _textController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _showChatbot(BuildContext context) {
    if (_messages.isEmpty) {
      // TRANSLATED
      _messages.insert(0, ChatMessage("Hello! Ask me about the monasteries.\nनमस्ते! मलाई मठहरूको बारेमा सोध्नुहोस्।", false));
    }

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setModalState) {
            void handleModalSubmit(String text) {
              if (text.isEmpty) return;
              _textController.clear();

              setModalState(() { _messages.insert(0, ChatMessage(text, true)); });
              _scrollToBottom();

              // TRANSLATED
              String response = "Sorry, I couldn't find an answer. | माफ गर्नुहोस्, मैले जवाफ भेट्टाउन सकिनँ।";
              for (var qa in qaData) {
                if (qa.keywords.any((keyword) => text.toLowerCase().contains(keyword))) {
                  response = qa.answer;
                  break;
                }
              }

              Future.delayed(const Duration(milliseconds: 600), () {
                setModalState(() { _messages.insert(0, ChatMessage(response, false)); });
                _scrollToBottom();
              });
            }

            // --- THIS IS THE UPDATED UI ---
            return Padding(
              // 1. This Padding moves the entire sheet up when the keyboard appears
              padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
              child: Container(
                height: MediaQuery.of(context).size.height * 0.8,
                decoration: const BoxDecoration(
                  color: kSoothingOrange,
                  borderRadius: BorderRadius.only(topLeft: Radius.circular(20), topRight: Radius.circular(20)),
                ),
                child: Column(
                  children: [
                    Expanded(
                      child: ListView.builder(
                        reverse: true,
                        controller: _scrollController,
                        padding: const EdgeInsets.all(16),
                        itemCount: _messages.length,
                        itemBuilder: (context, index) {
                          return _ChatMessageBubble(message: _messages[index]);
                        },
                      ),
                    ),
                    // 2. This Padding lifts the input box from the bottom edge
                    Padding(
                      padding: const EdgeInsets.only(left: 12, right: 12, bottom: 24, top: 8),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(30), // Rounded corners
                          boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, 4))],
                        ),
                        child: Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: _textController,
                                decoration: const InputDecoration.collapsed(hintText: "Ask a question... | प्रश्न सोध्नुहोस्..."),
                                onSubmitted: handleModalSubmit,
                              ),
                            ),
                            IconButton(
                              icon: const Icon(Icons.send, color: kPrimaryOrange),
                              onPressed: () => handleModalSubmit(_textController.text),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    final drawer = Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          // TRANSLATED
          DrawerHeader(
            decoration: BoxDecoration(color: kPrimaryOrange, image: const DecorationImage(fit: BoxFit.cover, image: AssetImage('assets/images/hero_bg.jpg'), opacity: 0.4)),
            child: Text('Menu | मेनु', style: GoogleFonts.notoSansDevanagari(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
          ),
          ListTile(leading: const Icon(Icons.map), title: const Text('Map | नक्शा'), onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => MapPage(monasteries: monasteries)))),
          ListTile(leading: const Icon(Icons.calendar_month), title: const Text('Cultural Calendar | सांस्कृतिक पात्रो'), onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const CalendarPage()))),
          const Divider(),
          ListTile(leading: const Icon(Icons.home_work_outlined), title: const Text('Homestays | होमस्टे'), onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const HomestaysPage()))),
          ListTile(leading: const Icon(Icons.palette_outlined), title: const Text('Handicrafts | हस्तशिल्प'), onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const HandicraftsPage()))),
          ListTile(leading: const Icon(Icons.directions_walk_outlined), title: const Text('Local Tours | स्थानीय भ्रमण'), onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const LocalToursPage()))),
          const Divider(),
          ListTile(
            leading: const Icon(Icons.logout),
            title: const Text('Logout | लगआउट'),
            onTap: () {
              Navigator.of(context).pushAndRemoveUntil(MaterialPageRoute(builder: (context) => const LandingPage()), (Route<dynamic> route) => false);
            },
          ),
        ],
      ),
    );

    return Scaffold(
      drawer: drawer,
      backgroundColor: kSoothingOrange,
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showChatbot(context),
        backgroundColor: kPrimaryOrange,
        child: const Icon(Icons.chat_bubble_outline, color: Colors.white),
      ),
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            pinned: true, floating: true,
            backgroundColor: kSoothingOrange.withAlpha(240),
            elevation: 1,
            // TRANSLATED
            title: Text("Kora View | कोरा भ्यू", style: GoogleFonts.notoSansDevanagari(color: kDeepBrown, fontWeight: FontWeight.bold)),
            iconTheme: const IconThemeData(color: kDeepBrown),
            actions: [
              IconButton(icon: const Icon(Icons.notifications_none_outlined), onPressed: () {}, color: kDeepBrown),
              IconButton(icon: const Icon(Icons.search), onPressed: () {}, color: kDeepBrown),
            ],
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // TRANSLATED
                  Text("Welcome back, Seeker 🙏| पुनः स्वागत छ, साधक 🙏", style: GoogleFonts.notoSansDevanagari(fontSize: 24, fontWeight: FontWeight.bold, color: kDeepBrown)),
                  Text("Continue your spiritual journey | आफ्नो आध्यात्मिक यात्रा जारी राख्नुहोस्", style: GoogleFonts.notoSansDevanagari(fontSize: 16, color: kDeepBrown.withOpacity(0.7))),
                ],
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              // TRANSLATED
              child: Text("Quick Actions | द्रुत कार्यहरू", style: GoogleFonts.notoSansDevanagari(fontSize: 20, fontWeight: FontWeight.bold, color: kDeepBrown)),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.all(16.0),
            sliver: SliverGrid(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, crossAxisSpacing: 16, mainAxisSpacing: 16, childAspectRatio: 1.6),
              // TRANSLATED
              delegate: SliverChildListDelegate([
                _QuickActionCard(icon: Icons.map, label: 'Map', onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => MapPage(monasteries: monasteries)))),
                _QuickActionCard(icon: Icons.calendar_month, label: 'Festivals\nचाडपर्वहरू', onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const CalendarPage()))),
                ]),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // TRANSLATED
                  Text("Featured Monasteries | विशेष मठहरू", style: GoogleFonts.notoSansDevanagari(fontSize: 20, fontWeight: FontWeight.bold, color: kDeepBrown)),
                  TextButton(
                    onPressed: () {},
                    child: Text("View All | सबै हेर्नुहोस्", style: GoogleFonts.notoSansDevanagari(color: kAccentGreen, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
          ),
          SliverList(
            delegate: SliverChildBuilderDelegate((context, index) {
              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                child: _MonasteryListItem(monastery: monasteries[index]),
              );
            }, childCount: monasteries.length),
          ),
        ],
      ),
    );
  }
}

class _QuickActionCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  const _QuickActionCard({required this.icon, required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), boxShadow: [BoxShadow(color: kPrimaryOrange.withOpacity(0.1), spreadRadius: 2, blurRadius: 10)]),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircleAvatar(radius: 24, backgroundColor: kPrimaryOrange.withOpacity(0.15), child: Icon(icon, color: kPrimaryOrange, size: 28)),
            const SizedBox(height: 12),
            Text(label, textAlign: TextAlign.center, style: GoogleFonts.notoSansDevanagari(fontWeight: FontWeight.bold, fontSize: 16, color: kDeepBrown)),
          ],
        ),
      ),
    );
  }
}

class _MonasteryListItem extends StatelessWidget {
  final Monastery monastery;
  const _MonasteryListItem({required this.monastery});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(context, MaterialPageRoute(builder: (_) => MonasteryDetailPage(monastery: monastery)));
      },
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), boxShadow: [BoxShadow(color: kPrimaryOrange.withOpacity(0.1), spreadRadius: 1, blurRadius: 8)]),
        child: Row(
          children: [
            Hero(
              tag: 'monastery-image-${monastery.id}',
              child: ClipRRect(borderRadius: BorderRadius.circular(12), child: Image.asset(monastery.imageUrl, width: 80, height: 80, fit: BoxFit.cover)),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(monastery.name, style: GoogleFonts.merriweather(fontSize: 17, fontWeight: FontWeight.bold, color: kDeepBrown)),
                  const SizedBox(height: 6),
                  Row(children: [Icon(Icons.location_on, color: kDeepBrown.withOpacity(0.6), size: 14), const SizedBox(width: 4), Text(monastery.location, style: GoogleFonts.lato(color: kDeepBrown.withOpacity(0.6), fontSize: 14))]),
                  const SizedBox(height: 6),

                ],
              ),
            ),
            Icon(Icons.arrow_forward_ios, color: kPrimaryOrange.withOpacity(0.6), size: 18),
          ],
        ),
      ),
    );
  }
}

class _ChatMessageBubble extends StatelessWidget {
  final ChatMessage message;
  const _ChatMessageBubble({required this.message});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 5.0),
      child: Row(
        mainAxisAlignment: message.isUserMessage ? MainAxisAlignment.end : MainAxisAlignment.start,
        children: [
          Flexible(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(
                color: message.isUserMessage ? kPrimaryOrange : Colors.white,
                borderRadius: BorderRadius.circular(18),
              ),
              child: Text(
                message.text,
                style: GoogleFonts.notoSansDevanagari( // Use Nepali font in chat
                  color: message.isUserMessage ? Colors.white : kDeepBrown,
                  fontSize: 16,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}