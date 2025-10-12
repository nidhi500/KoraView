// lib/pages/map_page.dart

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:http/http.dart' as http;
import 'package:latlong2/latlong.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import '../models/monastery_model.dart';

const Color kPrimaryOrange = Color(0xFFE88D67);

// Class to hold our complete routing results
class RouteInfo {
  final List<String> directions;
  final List<LatLng> points;

  RouteInfo({
    required this.directions,
    required this.points,
  });
}

class MapPage extends StatefulWidget {
  final List<Monastery> monasteries;

  const MapPage({super.key, required this.monasteries});

  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  Monastery? _sourceMonastery;
  Monastery? _destinationMonastery;
  RouteInfo? _routeInfo;
  bool _isLoading = false;

  Future<void> _getDirections() async {
    if (_sourceMonastery == null || _destinationMonastery == null) return;

    setState(() {
      _isLoading = true;
      _routeInfo = null;
    });

    final polylinePoints = PolylinePoints();
    final source = _sourceMonastery!;
    final destination = _destinationMonastery!;

    var url = Uri.parse(
        'http://router.project-osrm.org/route/v1/driving/${source.longitude},${source.latitude};${destination.longitude},${destination.latitude}?steps=true&annotations=true&geometries=polyline&overview=full');

    try {
      var response = await http.get(url);
      if (response.statusCode == 200) {
        var data = json.decode(response.body);

        var encodedPolyline = data['routes'][0]['geometry'];
        List<PointLatLng> decodedPoints = polylinePoints.decodePolyline(encodedPolyline);
        List<LatLng> routePoints = decodedPoints.map((p) => LatLng(p.latitude, p.longitude)).toList();

        var steps = data['routes'][0]['legs'][0]['steps'] as List;
        List<String> directions = steps.map((step) {
          final maneuver = step['maneuver'];
          final type = maneuver['type'] ?? '';
          final modifier = maneuver['modifier'] ?? '';
          final streetName = step['name'] ?? '';

          String instruction = '$type $modifier'.trim().replaceAll('_', ' ');
          if (streetName.isNotEmpty) {
            instruction += ' onto $streetName';
          }

          if (instruction.isNotEmpty) {
            return instruction[0].toUpperCase() + instruction.substring(1);
          }
          return "Continue";
        }).toList();

        setState(() {
          _routeInfo = RouteInfo(directions: directions, points: routePoints);
          _isLoading = false;
        });
      } else {
        throw Exception('Failed to load route');
      }
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error fetching route: ${e.toString()}")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final LatLng initialCenter = widget.monasteries.isNotEmpty
        ? LatLng(widget.monasteries.first.latitude, widget.monasteries.first.longitude)
        : const LatLng(27.3314, 88.6138);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Plan Your Trip'),
        backgroundColor: kPrimaryOrange,
        foregroundColor: Colors.white,
      ),
      body: Stack(
        children: [
          FlutterMap(
            options: MapOptions(
              center: initialCenter,
              zoom: 10.0,
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'com.example.monastery360',
              ),
              if (_routeInfo != null && _routeInfo!.points.isNotEmpty)
                PolylineLayer(
                  polylines: [
                    Polyline(
                      points: _routeInfo!.points,
                      strokeWidth: 5.0,
                      color: Colors.green,
                    ),
                  ],
                ),
              if (_routeInfo != null)
                MarkerLayer(markers: [
                  Marker(
                      point: LatLng(_sourceMonastery!.latitude, _sourceMonastery!.longitude),
                      width: 80.0,
                      height: 80.0,
                      child: const Icon(Icons.location_pin, color: Colors.green, size: 40)),
                  Marker(
                      point: LatLng(_destinationMonastery!.latitude, _destinationMonastery!.longitude),
                      width: 80.0,
                      height: 80.0,
                      child: const Icon(Icons.location_pin, color: Colors.brown, size: 40)),
                ])
              else
                MarkerLayer(
                  markers: widget.monasteries.map((monastery) {
                    return Marker(
                      point: LatLng(monastery.latitude, monastery.longitude),
                      width: 80.0,
                      height: 80.0,
                      child: const Icon(Icons.location_pin, color: Colors.red, size: 40),
                    );
                  }).toList(),
                ),
            ],
          ),
          Positioned(
            top: 16,
            right: 16,
            child: Container(
              width: 300,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(color: Colors.black.withOpacity(0.2), blurRadius: 10, offset: const Offset(0, 4)),
                ],
              ),
              child: ConstrainedBox(
                constraints: BoxConstraints(
                  maxHeight: MediaQuery.of(context).size.height * 0.8,
                ),
                child: SingleChildScrollView(
                  // --- UPDATED: The entire panel is now an ExpansionTile ---
                  child: ExpansionTile(
                    initiallyExpanded: true, // Start with the panel open
                    title: const Text("Plan Your Trip", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    childrenPadding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                    // The content that expands/collapses goes in 'children'
                    children: [
                      _buildDropdown("Source", Colors.green, _sourceMonastery, (monastery) {
                        setState(() { _sourceMonastery = monastery; });
                      }),
                      const SizedBox(height: 12),
                      _buildDropdown("Destination", Colors.red, _destinationMonastery, (monastery) {
                        setState(() { _destinationMonastery = monastery; });
                      }),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: (_sourceMonastery != null && _destinationMonastery != null && !_isLoading)
                              ? _getDirections
                              : null,
                          style: ElevatedButton.styleFrom(
                              backgroundColor: kPrimaryOrange,
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(vertical: 12),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
                          child: _isLoading
                              ? const SizedBox(
                              height: 20, width: 20,
                              child: CircularProgressIndicator(strokeWidth: 3, color: Colors.white))
                              : const Text("Show Route"),
                        ),
                      ),
                      if (_routeInfo != null) ...[
                        const Divider(height: 24),
                        const Text("Directions:", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 8),
                        // Wrap directions in a Column to be used inside ExpansionTile
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            for (int i = 0; i < _routeInfo!.directions.length; i++)
                              Padding(
                                padding: const EdgeInsets.only(bottom: 4.0),
                                child: Text("${i + 1}. ${_routeInfo!.directions[i]}"),
                              ),
                          ],
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDropdown(String title, Color titleColor, Monastery? value, ValueChanged<Monastery?> onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: titleColor),
        ),
        const SizedBox(height: 4),
        DropdownButtonFormField<Monastery>(
          value: value,
          isExpanded: true,
          decoration: const InputDecoration(
            border: OutlineInputBorder(),
            contentPadding: EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          ),
          onChanged: onChanged,
          items: widget.monasteries.map<DropdownMenuItem<Monastery>>((Monastery monastery) {
            return DropdownMenuItem<Monastery>(
              value: monastery,
              child: Text(monastery.name, overflow: TextOverflow.ellipsis),
            );
          }).toList(),
        ),
      ],
    );
  }
}