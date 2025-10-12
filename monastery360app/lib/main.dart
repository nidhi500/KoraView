// lib/main.dart

import 'dart:io'; // Required for platform checking
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// ALL IMPORTS REQUIRED FOR WEBVIEW INITIALIZATION
import 'package:webview_flutter_android/webview_flutter_android.dart';
import 'package:webview_flutter_platform_interface/webview_flutter_platform_interface.dart';
// Your App's Pages and Providers
import 'pages/home_page.dart';
import 'pages/landing_page.dart';
import 'pages/login_page.dart';
import 'pages/register_page.dart';
import 'providers/auth_provider.dart';
import 'providers/monastery_provider.dart';
import 'pages/webview_page.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart'; // Import Firebase
import 'firebase_options.dart'; // Import the generated file

void main() async {
  // This block is essential to prevent WebView errors
  WidgetsFlutterBinding.ensureInitialized();
  // if (Platform.isAndroid) {
  //   WebView.platform = AndroidWebViewPlatform();
  // }
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => MonasteryProvider()),
      ],
      child: const MonasteryApp(),
    ),
  );
}

class MonasteryApp extends StatelessWidget {
  const MonasteryApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kora View',
      theme: ThemeData(
        primarySwatch: Colors.indigo,
        scaffoldBackgroundColor: Colors.grey[50],
      ),
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => const LandingPage(),
        '/login': (context) => LoginPage(),
        '/register': (context) =>  RegisterPage(),
        '/home': (context) => const HomePage(),
      },
    );
  }
}