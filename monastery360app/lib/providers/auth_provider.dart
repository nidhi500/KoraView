import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class AuthProvider with ChangeNotifier {
  String? _token;
  bool get isAuth => _token != null;

  String? get token => _token;

    final String baseUrl = "https://koraview-backend.onrender.com/api/monasteries/auth"; // use 10.0.2.2 for Android emulator

  Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/register"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "name": name,
          "email": email,
          "password": password,
        }),
      );

      final body = jsonDecode(response.body);

      if (response.statusCode == 201) {
        return {"success": true, "message": body["msg"]};
      } else {
        return {"success": false, "message": body["msg"]};
      }
    } catch (e) {
      // --- THIS IS THE IMPORTANT CHANGE ---
      // This block runs if the app fails to connect to the server at all.
      // We will print the specific error to the console.
      print("LOGIN FAILED WITH EXCEPTION: ${e.toString()}");

      // We also return a more helpful message to the user.
      return {"success": false, "message": "Connection to server failed. Please check your internet."};
    }
  }

  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/login"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"email": email, "password": password}),
      );

      final body = jsonDecode(response.body);

      if (response.statusCode == 200) {
        _token = body["token"];
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString("jwt", _token!);
        notifyListeners();
        return {"success": true};
      } else {
        return {"success": false, "message": body["msg"]};
      }
    } catch (e) {
      return {"success": false, "message": "Server error"};
    }
  }

  Future<void> logout() async {
    _token = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove("jwt");
    notifyListeners();
  }
}
