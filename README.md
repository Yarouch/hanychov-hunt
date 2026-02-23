# 🧭 Hanychov Hunt — GPS City Game (PWA Prototype)

A location-based city game designed for mobile phones.  
Players walk through real locations in Horní Hanychov (Liberec, Czech Republic) and complete time-limited challenges directly on site.

This project is a lightweight Progressive Web App (PWA) prototype — no installation required.

---

## 🎮 Game Concept

- The player sees a map with marked locations
- When entering a location zone (geofence), a challenge unlocks
- The player has **3 minutes** to answer a question
- Only one attempt is allowed
- Points are awarded only for correct answers
- Remaining time counts toward the final ranking
- Locations close after completion

---

## 📍 Current Prototype

Contains **1 test location**:

**Za Domovem 558, Liberec — Horní Hanychov**

Example question:

> "Kolik...?"
>
> A) 1  
> B) 2  
> C) 3  
> D) 4  

Correct answer: **A**

---

## 🗺️ Features

✔ Real-time GPS tracking  
✔ Adaptive geofence radius based on accuracy  
✔ Tourist map (OpenTopoMap)  
✔ Time-limited tasks  
✔ Immediate feedback  
✔ Score + saved time tracking  
✔ Local leaderboard (device only)  
✔ PWA support (installable on phone)  

---

## 🚀 How to Run

### Option 1 — Online (recommended)

Open the deployed version in your browser:

👉 https://YOUR-USERNAME.github.io/hanychov-hunt/

Allow location access when prompted.

---

### Option 2 — Local Development

Serve the folder via a local web server.

#### Using Python

```bash
python -m http.server 5173
