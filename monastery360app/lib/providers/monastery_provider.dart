import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class MonasteryProvider with ChangeNotifier {
  List<dynamic> _monasteries = [];
  List<dynamic> _events = [];

  List<dynamic> get monasteries => _monasteries;
  List<dynamic> get events => _events;

  final String baseUrl = "http://localhost:5000/monasteries"; // Node.js backend

  // =================== Fetch Monasteries ===================
  Future<void> fetchMonasteries() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token') ?? '';

      final res = await http.get(
        Uri.parse('$baseUrl/monasteries'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (res.statusCode == 200) {
        _monasteries = json.decode(res.body);
        notifyListeners();
      } else {
        print('Failed to fetch monasteries: ${res.body}');
      }
    } catch (e) {
      print('Error fetching monasteries: $e');
    }
  }

  // =================== Fetch Cultural Events ===================
  Future<void> fetchEvents() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token') ?? '';

      final res = await http.get(
        Uri.parse('$baseUrl/events'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (res.statusCode == 200) {
        _events = json.decode(res.body);
        notifyListeners();
      } else {
        print('Failed to fetch events: ${res.body}');
      }
    } catch (e) {
      print('Error fetching events: $e');
    }
  }

  // =================== Optional: Search Monastery by Name ===================
  Map<String, dynamic>? getMonasteryByName(String name) {
    try {
      return _monasteries.firstWhere((m) => m['name'] == name);
    } catch (e) {
      return null;
    }
  }
}
