// lib/pages/login_page.dart

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
// Provider is no longer needed for this hardcoded version
// import 'package:provider/provider.dart';
// import '../providers/auth_provider.dart';
import 'home_page.dart';

// --- COLOR PALETTE ---
const Color kSoothingOrange = Color(0xFFFFF5E6);
const Color kPrimaryOrange = Color(0xFFE88D67);
const Color kDeepBrown = Color(0xFF4A2B25);

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  bool loading = false;

  InputDecoration _buildInputDecoration(String label) {
    return InputDecoration(
      labelText: label,
      labelStyle: GoogleFonts.notoSansDevanagari(color: kDeepBrown.withOpacity(0.6)),
      filled: true,
      fillColor: kSoothingOrange.withOpacity(0.5),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide.none,
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: kPrimaryOrange, width: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // The AuthProvider is no longer needed here
    // final auth = Provider.of<AuthProvider>(context, listen: false);

    return Scaffold(
      backgroundColor: kSoothingOrange,
      appBar: AppBar(
        title: Text("Login | लगइन", style: GoogleFonts.notoSansDevanagari(color: kDeepBrown)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: IconThemeData(color: kDeepBrown),
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Container(
            padding: const EdgeInsets.all(24.0),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: kPrimaryOrange.withOpacity(0.1),
                  blurRadius: 20,
                  spreadRadius: 5,
                ),
              ],
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  "Welcome Back\nपुनः स्वागत छ",
                  textAlign: TextAlign.center,
                  style: GoogleFonts.notoSansDevanagari(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: kDeepBrown,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  "Sign in to continue\nजारी राख्न साइन इन गर्नुहोस्",
                  textAlign: TextAlign.center,
                  style: GoogleFonts.notoSansDevanagari(fontSize: 16, color: Colors.grey[600]),
                ),
                const SizedBox(height: 30),
                TextField(
                  controller: emailController,
                  keyboardType: TextInputType.emailAddress,
                  style: GoogleFonts.lato(color: kDeepBrown),
                  decoration: _buildInputDecoration("Email | इमेल"),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: passwordController,
                  obscureText: true,
                  style: GoogleFonts.lato(color: kDeepBrown),
                  decoration: _buildInputDecoration("Password | पासवर्ड"),
                ),
                const SizedBox(height: 30),
                loading
                    ? const CircularProgressIndicator(color: kPrimaryOrange)
                    : SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: kPrimaryOrange,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    onPressed: () async {
                      setState(() => loading = true);

                      // --- HARDCODED LOGIN LOGIC ---
                      const hardcodedEmail = 'user@kora.com';
                      const hardcodedPassword = 'password';

                      // Simulate network delay
                      await Future.delayed(const Duration(seconds: 1));

                      Map<String, dynamic> res;
                      if (true  ) {
                        res = {"success": true};
                      } else {
                        res = {
                          "success": false,
                          "message": "Invalid credentials. Use test@test.com and 'password'"
                        };
                      }
                      // --- END OF HARDCODED LOGIC ---

                      setState(() => loading = false);

                      if (res["success"] && mounted) {
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(builder: (_) => const HomePage()),
                        );
                      } else if (mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text(res["message"]!)),
                        );
                      }
                    },
                    child: Text("Login | लगइन", style: GoogleFonts.notoSansDevanagari(fontSize: 16, fontWeight: FontWeight.bold)),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}