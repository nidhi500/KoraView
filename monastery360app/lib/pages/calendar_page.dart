// lib/pages/calendar_page.dart

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

// --- NEW: Color Palette ---
const Color kPrimaryOrange = Color(0xFFE88D67);
const Color kDeepBrown = Color(0xFF4A2B25);
const Color kAccentGreen = Color(0xFF6A8B5D);
const Color kOffWhite = Color(0xFFFAF8F5);

// --- Event Model (remains the same) ---
class Event {
  final String title;
  final String description;
  final String imageUrl;
  final String eventType;
  final DateTime date;

  const Event({
    required this.title,
    required this.description,
    required this.imageUrl,
    required this.eventType,
    required this.date,
  });

  @override
  String toString() => title;
}

// --- All Events List (remains the same) ---
final List<Event> allEvents = [
  Event(title: 'Losar (Tibetan New Year)', description: 'Losar is the Tibetan New Year celebrated with prayers, traditional dances...', imageUrl: 'assets/images/losar.webp', eventType: 'Festival', date: DateTime.utc(2025, 2, 28)),
  Event(title: 'Saga Dawa', description: 'Saga Dawa celebrates Buddha\'s birth, enlightenment, and passing...', imageUrl: 'assets/images/saga2.webp', eventType: 'Ritual', date: DateTime.utc(2025, 5, 23)),
  Event(title: 'Pang Lhabsol', description: 'A festival unique to Sikkim, honouring the guardian deity Mount Kanchenjunga...', imageUrl: 'assets/images/pang.webp', eventType: 'Festival', date: DateTime.utc(2025, 9, 13)),
  Event(title: 'Losoong / Namsoong', description: 'The Sikkimese New Year festival, marked by traditional masked dances...', imageUrl: 'assets/images/lasoong.webp', eventType: 'Festival', date: DateTime.utc(2025, 12, 28)),
  Event(title: 'Gutor Cham', description: 'Ritual masked dances performed two days prior to Losoong...', imageUrl: 'assets/images/cham_dance2.jpg', eventType: 'Ritual', date: DateTime.utc(2025, 12, 26)),
  Event(title: 'Drukpa Tshechi', description: 'Celebrates the first sermon delivered by Lord Buddha...', imageUrl: 'assets/images/drukpa2.jpg', eventType: 'Festival', date: DateTime.utc(2026, 7, 12)),
];

class CalendarPage extends StatefulWidget {
  const CalendarPage({super.key});

  @override
  State<CalendarPage> createState() => _CalendarPageState();
}

class _CalendarPageState extends State<CalendarPage> {
  String _selectedEventType = 'All';
  String _selectedMonth = 'All';

  List<Event> get _filteredEvents {
    List<Event> events = List.from(allEvents);
    events.sort((a, b) => a.date.compareTo(b.date));

    if (_selectedEventType != 'All') {
      events = events.where((event) => event.eventType == _selectedEventType).toList();
    }

    if (_selectedMonth != 'All') {
      final int monthNumber = _months.indexOf(_selectedMonth);
      events = events.where((event) => event.date.month == monthNumber).toList();
    }

    return events;
  }

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: kOffWhite, // Use the new off-white background
      appBar: AppBar(
        title: Text('Cultural Calendar', style: GoogleFonts.merriweather()),
        backgroundColor: kPrimaryOrange,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () => _scaffoldKey.currentState?.openEndDrawer(),
          ),
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: _filteredEvents.length,
        itemBuilder: (context, index) {
          final event = _filteredEvents[index];
          // Each card now fades in as you scroll
          return FadeInOnScroll(child: EventCard(event: event));
        },
      ),
      endDrawer: FilterDrawer(
        eventTypes: _eventTypes,
        months: _months,
        selectedEventType: _selectedEventType,
        selectedMonth: _selectedMonth,
        onEventTypeChanged: (newValue) {
          setState(() { _selectedEventType = newValue ?? 'All'; });
        },
        onMonthChanged: (newValue) {
          setState(() { _selectedMonth = newValue ?? 'All'; });
        },
      ),
    );
  }

  List<String> get _eventTypes {
    final types = allEvents.map((e) => e.eventType).toSet().toList();
    types.sort();
    return ['All', ...types];
  }

  final List<String> _months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
}

// --- STYLED Filter Drawer ---
class FilterDrawer extends StatelessWidget {
  // ... (properties remain the same)
  const FilterDrawer({
    super.key,
    required this.eventTypes,
    required this.months,
    required this.selectedEventType,
    required this.selectedMonth,
    required this.onEventTypeChanged,
    required this.onMonthChanged,
  });

  final List<String> eventTypes;
  final List<String> months;
  final String selectedEventType;
  final String selectedMonth;
  final ValueChanged<String?> onEventTypeChanged;
  final ValueChanged<String?> onMonthChanged;

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: kOffWhite,
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: ListView(
          children: [
            Text("Filters", style: GoogleFonts.merriweather(fontSize: 28, color: kDeepBrown, fontWeight: FontWeight.bold)),
            const SizedBox(height: 24),
            Text("Event Type", style: GoogleFonts.lato(fontSize: 16, fontWeight: FontWeight.w600, color: kDeepBrown.withOpacity(0.8))),
            const SizedBox(height: 8),
            DropdownButtonFormField<String>(
              decoration: _buildInputDecoration(),
              value: selectedEventType,
              onChanged: onEventTypeChanged,
              items: eventTypes.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(value: value, child: Text(value));
              }).toList(),
            ),
            const SizedBox(height: 24),
            Text("Month", style: GoogleFonts.lato(fontSize: 16, fontWeight: FontWeight.w600, color: kDeepBrown.withOpacity(0.8))),
            const SizedBox(height: 8),
            DropdownButtonFormField<String>(
              decoration: _buildInputDecoration(),
              value: selectedMonth,
              onChanged: onMonthChanged,
              items: months.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(value: value, child: Text(value));
              }).toList(),
            ),
            const SizedBox(height: 30),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: kPrimaryOrange,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              onPressed: () => Navigator.of(context).pop(),
              child: const Text("Apply Filters"),
            )
          ],
        ),
      ),
    );
  }

  InputDecoration _buildInputDecoration() {
    return InputDecoration(
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: Colors.grey.shade300)),
      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: kPrimaryOrange, width: 2)),
      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
    );
  }
}

// --- BEAUTIFIED Event Card ---
class EventCard extends StatelessWidget {
  final Event event;
  const EventCard({super.key, required this.event});

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 24.0),
      elevation: 2,
      shadowColor: kPrimaryOrange.withOpacity(0.2),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              Image.asset(
                event.imageUrl,
                width: double.infinity,
                height: 200,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) => Container(height: 200, color: Colors.grey[300], child: const Center(child: Icon(Icons.broken_image, size: 50, color: Colors.grey))),
              ),
              // Event Type Tag
              Positioned(
                top: 12,
                left: 12,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: kAccentGreen,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    event.eventType,
                    style: GoogleFonts.lato(color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  event.title,
                  style: GoogleFonts.merriweather(fontSize: 22, fontWeight: FontWeight.bold, color: kDeepBrown),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.calendar_today_outlined, size: 14, color: Colors.grey[600]),
                    const SizedBox(width: 8),
                    Text(
                      DateFormat('MMMM d, yyyy').format(event.date),
                      style: GoogleFonts.lato(fontSize: 14, color: Colors.grey[600]),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  event.description,
                  style: GoogleFonts.lato(fontSize: 16, height: 1.5, color: kDeepBrown.withOpacity(0.8)),
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () => ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Booking for ${event.title} is not implemented yet!'))),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: kPrimaryOrange,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 15),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: Text("Book Now", style: GoogleFonts.lato(fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// --- NEW: Animation Widget ---
class FadeInOnScroll extends StatefulWidget {
  final Widget child;
  const FadeInOnScroll({super.key, required this.child});

  @override
  State<FadeInOnScroll> createState() => _FadeInOnScrollState();
}

class _FadeInOnScrollState extends State<FadeInOnScroll> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 500));
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOut));
    _slideAnimation = Tween<Offset>(begin: const Offset(0, 0.1), end: Offset.zero).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOut));
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: SlideTransition(
        position: _slideAnimation,
        child: widget.child,
      ),
    );
  }
}