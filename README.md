# 🏔️ KoraView – Preserving the Sacred Heritage of Sikkim

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/React-17.0.2-blue)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Node.js-18-green)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/MongoDB-5.0.15-brightgreen)](https://www.mongodb.com/)

A digital platform to explore, preserve, and showcase Sikkim’s rich monastery heritage, including audio guides, manuscripts, images, videos, and community contributions.

---

## 🌟 Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Folder Structure](#folder-structure)  
- [API Endpoints](#api-endpoints)  
- [Database Setup](#database-setup)  
- [Contributions Management](#contributions-management)  
- [Admin Dashboard](#admin-dashboard)  
- [Future Enhancements](#future-enhancements)  
- [Screenshots](#screenshots)  
- [License](#license)  

---

## 🔹 Project Overview

Sikkim is home to 200+ historic monasteries, many containing priceless manuscripts, murals, and artifacts.  

**KoraView** enables:  
- Digitization and online display of monasteries  
- Audio guides in multiple languages  
- Community contributions by monks, locals, and researchers  
- Admin moderation dashboard for content approvals  

---

## ✨ Features

- Dynamic monastery display with:
  - Images, thumbnails, and manuscripts  
  - Multi-language audio guides  
  - Embedded video content  
- Contributions section for:
  - PDF and image files previewed inline  
  - Audio & video submissions  
  - Approve/Reject workflow  
- Responsive modern UI with Tailwind CSS  
- Admin login and dashboard  
- PDFs open in scrollable iframe, audio works inline  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT-based auth  
- **API Requests:** Axios  

---

## ⚙️ Installation

### Prerequisites

- Node.js >= 16.x  
- npm >= 8.x  
- MongoDB installed locally or cloud  

### Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/koraview.git
cd koraview

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Run the backend
node server.js

# Run the frontend
npm run dev
```

🔗 API Endpoints
Monasteries
Method	Endpoint	Description
GET	/api/monasteries	Fetch all monasteries
PUT	/api/monasteries/:id/approve	Approve a monastery
Contributions
Method	Endpoint	Description
GET	/api/contributions	Fetch all contributions
PUT	/api/contributions/:id/approve	Approve contribution
PUT	/api/contributions/:id/reject	Reject contribution

👥 Contributions Management

Inline previews for PDFs and images

Multiple audio files playable directly

Embedded video previews

Approve/Reject contributions with one click

🛡️ Admin Dashboard

Login: admin@sikkim360.com / ADMIN1234

Features:

View and approve monasteries

View contributions by monks, locals, researchers

PDF preview with scroll

Audio & video inline

Cards with dynamic heights

🌱 Future Enhancements

User roles for monks and researchers

Real-time notifications for new contributions

Search & filter by monastery, region, or heritage type

Offline support for mobile

AI-based OCR for manuscript digitization
