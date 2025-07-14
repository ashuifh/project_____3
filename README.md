# 📊 Smart Workspace Monitor

**Smart Workspace Monitor** is a modern, React-based productivity dashboard that helps users **track their work habits and environment** using real-time web APIs. It’s designed to promote better focus and efficiency by monitoring your **location**, **network status**, and **activity** during working hours.

🌐 **Live Demo:** [https://project-3-qc2t.vercel.app/](https://project-3-qc2t.vercel.app/)

---

## 🚀 Features

### 🗺️ Location Tracker
- Uses the **Geolocation API** to detect your current position.
- Verifies whether you're at your designated **work location**.
- Displays your status as **at work** or **away**.

### 🌐 Network Monitor
- Leverages the **Network Information API** to show:
  - Connection type (Wi-Fi, 4G, etc.)
  - Downlink speed
  - Whether **data saver mode** is enabled

### ⏱️ Activity Tracker
- Monitors your **activity timeline** using custom background hooks.
- Tracks **working hours** and removes old data periodically.

### 📈 Productivity Dashboard
- Visualizes and summarizes:
  - Location data
  - Network conditions
  - Activity records
- Helps you understand your **focus patterns and productivity trends**

---

## 🧠 Web APIs Used

- 📍 **Geolocation API** – Detects and tracks your physical location.
- 📶 **Network Information API** – Retrieves real-time connection info.
- 🔁 **Background Tasks (Custom Hook)** – Manages periodic tasks like cleanup.

---

## 💻 Tech Stack

- **React** + **TypeScript**
- **Tailwind CSS** for responsive UI
- **Custom Hooks** for background processing
- **Vite** for fast development

---

