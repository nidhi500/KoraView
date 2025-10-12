// lib/pages/register_page.dart

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
// Provider is no longer needed for this hardcoded version
// import 'package:provider/provider.dart';
// import '../providers/auth_provider.dart';
import 'home_page.dart'; // Import HomePage for navigation

// --- COLOR PALETTE ---
const Color kSoothingOrange = Color(0xFFFFF5E6);
const Color kPrimaryOrange = Color(0xFFE88D67);
const Color kDeepBrown = Color(0xFF4A2B25);

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _formKey = GlobalKey<FormState>();
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  bool loading = false;

  InputDecoration _buildInputDecoration(String label) {
    return InputDecoration(
      labelText: label,
      labelStyle: GoogleFonts.notoSansDevanagari(color: kDeepBrown.withOpacity(0.6)),
      filled: true,
      fillColor: kSoothingOrange.withOpacity(0.5),
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: kPrimaryOrange, width: 2)),
      errorStyle: const TextStyle(color: kPrimaryOrange),
      errorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: kPrimaryOrange, width: 2)),
      focusedErrorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: kPrimaryOrange, width: 2)),
    );
  }

  @override
  Widget build(BuildContext context) {
    // AuthProvider is no longer needed here
    // final auth = Provider.of<AuthProvider>(context, listen: false);

    return Scaffold(
      backgroundColor: kSoothingOrange,
      appBar: AppBar(
        title: Text("Create Account | खाता बनाउनुहोस्", style: GoogleFonts.notoSansDevanagari(color: kDeepBrown)),
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
              boxShadow: [BoxShadow(color: kPrimaryOrange.withOpacity(0.1), blurRadius: 20, spreadRadius: 5)],
            ),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text("Join Us\nहामीसँग सामेल हुनुहोस्", textAlign: TextAlign.center, style: GoogleFonts.notoSansDevanagari(fontSize: 28, fontWeight: FontWeight.bold, color: kDeepBrown)),
                  const SizedBox(height: 8),
                  Text("Create your new account\nआफ्नो नयाँ खाता बनाउनुहोस्", textAlign: TextAlign.center, style: GoogleFonts.notoSansDevanagari(fontSize: 16, color: Colors.grey[600])),
                  const SizedBox(height: 30),
                  TextFormField(
                    controller: nameController,
                    style: GoogleFonts.lato(color: kDeepBrown),
                    decoration: _buildInputDecoration("Name | नाम"),
                    validator: (val) => val == null || val.isEmpty ? "Please enter name | कृपया नाम लेख्नुहोस्" : null,
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                    controller: emailController,
                    keyboardType: TextInputType.emailAddress,
                    style: GoogleFonts.lato(color: kDeepBrown),
                    decoration: _buildInputDecoration("Email | इमेल"),
                    validator: (val) => val == null || val.isEmpty ? "Please enter email | कृपया इमेल लेख्नुहोस्" : null,
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                    controller: passwordController,
                    obscureText: true,
                    style: GoogleFonts.lato(color: kDeepBrown),
                    decoration: _buildInputDecoration("Password | पासवर्ड"),
                    validator: (val) => val == null || val.isEmpty ? "Please enter password | कृपया पासवर्ड लेख्नुहोस्" : null,
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
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          setState(() => loading = true);

                          // --- HARDCODED REGISTER LOGIC ---
                          // Simulate network delay
                          await Future.delayed(const Duration(seconds: 1));

                          // Always pretend registration is successful
                          final res = {"success": true};
                          // --- END OF HARDCODED LOGIC ---

                          setState(() => loading = false);

                          if (res["success"]! && mounted) {
                            // Navigate directly to the HomePage
                            Navigator.pushAndRemoveUntil(
                              context,
                              MaterialPageRoute(builder: (context) => const HomePage()),
                                  (route) => false,
                            );
                          }
                        }
                      },
                      child: Text("Register | दर्ता गर्नुहोस्", style: GoogleFonts.notoSansDevanagari(fontSize: 16, fontWeight: FontWeight.bold)),
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}