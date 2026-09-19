# 🐾 Zoe's Wild World

> An interactive wildlife discovery web portal and iOS Progressive Web App (PWA) tailored specifically for 13-year-old **Zoe**, passionate about land creatures, ocean life, dinosaurs, mammals, reptiles, insects, and especially cats & dogs!

---

## 🌟 Key Features

1. **"TikTok meets NatGeo Kids" Discovery Deck**:
   - High-definition cards with crisp wildlife photos and short video clips.
   - Categorized and color-coded:
     - 🐱 **Cats & Dogs** (Warm Coral)
     - 🦖 **Dinosaurs & Fossils** (Amber/Rust)
     - 🌊 **Ocean Abyss** (Teal/Cyan)
     - 🦁 **Wild Land & Mammals** (Emerald)
     - 🦎 **Reptiles & Bugs** (Electric Lime)
2. **Authentic & Legitimate Sources Only**:
   - Every card cites and links to verified educational sources: **National Geographic Kids**, **Smithsonian's National Zoo**, **San Diego Zoo Wildlife Alliance**, **Monterey Bay Aquarium**, **American Museum of Natural History**, and **IUCN Red List**.
3. **Dynamic "Zoe Radar" Engine**:
   - Personalized callout banners dynamically key off the day of the week, time of day (morning vs. nocturnal evening), and rotating flash discoveries.
   - Example greetings:
     - *"Hey Zoe Happy Monday, let's start the week with some meow-meow energy! 🐾"*
     - *"FOSSIL FRIDAY ZOE! Unearthing massive dinosaur discoveries 68M years old 🦖"*
     - *"It's Caturday Zoe! Maximum purrs, whiskers, and feline stealth today 😻"*
4. **"Ask Zoe's Safari Guide" (Powered by Gemini AI)**:
   - Paw-themed search bar with quick suggested inquiries (*"Why do cats purr?"*, *"Could a Spinosaurus beat a T-Rex?"*, *"Why do dogs tilt their heads?"*).
   - Guardrailed to animal/wildlife topics, delivering witty, encouraging, and scientifically sound answers for a 13-year-old.
5. **Zoe's "Pocket Zoo" (Favorites)**:
   - Heart button on any card saves it into Zoe's personal pocket zoo (persisted in browser `localStorage`).
6. **Smart 60-Minute Refresh**:
   - Manual `🔄 New Discoveries!` button for immediate re-shuffle.
   - Server-side Stale-While-Revalidate caching (60 minutes) so Render's free tier sleep cycles don't break feeds or hammer APIs.
7. **Zero-Tracking, 100% Kid-Safe**:
   - No logins, no tracking cookies, no advertisements.

---

## 🚀 Quick Start (Localhost)

1. **Clone or enter directory**:
   ```bash
   cd /Users/vishalkarlo/.gemini/antigravity/scratch/zoe-wild-world
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure API Keys (Optional)**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your keys:
   - `GEMINI_API_KEY`: Get a free key at [Google AI Studio](https://aistudio.google.com/app/apikey).
   - `PEXELS_API_KEY`: Free key at [Pexels API](https://www.pexels.com/api/).
   - `PIXABAY_API_KEY`: Free key at [Pixabay API](https://pixabay.com/api/docs/).

   *(Note: The app is built with graceful fallbacks. If no keys are provided, it runs smoothly using the 210+ curated fact bank and vetted media!)*

4. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 How to Push to GitHub

1. Create a **new, empty repository** on your GitHub account (e.g. `zoe-wild-world`). **Do not** initialize it with a README or .gitignore (we already have them!).
2. In your terminal, run:
   ```bash
   cd /Users/vishalkarlo/.gemini/antigravity/scratch/zoe-wild-world
   git add .
   git commit -m "Initial release of Zoe's Wild World 🐾"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/zoe-wild-world.git
   git push -u origin main
   ```

---

## 🌐 1-Click Deployment to Render

This repository includes a `render.yaml` blueprint.

1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** > **Blueprint**.
3. Connect your new `zoe-wild-world` GitHub repository.
4. Render will automatically detect `render.yaml` and configure:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
5. Under **Environment Variables**, add:
   - `GEMINI_API_KEY` (Your Google Gemini key)
   - `PEXELS_API_KEY` (Optional)
   - `PIXABAY_API_KEY` (Optional)
6. Click **Apply**. Within 2-3 minutes, your live URL will be ready (e.g. `https://zoe-wild-world.onrender.com`)!

---

## 📱 How Zoe Can Install on Her iPhone (30 Seconds)

Zoe can install this directly to her iPhone Home Screen as a native app with zero App Store fees:

1. Open Safari on Zoe's iPhone.
2. Navigate to your deployed Render URL (or local network IP).
3. Tap the **Share** button (the square with an arrow pointing up at the bottom of Safari).
4. Scroll down and tap **"Add to Home Screen"**.
5. Tap **Add** in the top right.
6. The colorful **Zoe's Wild World** paw icon will now appear on her iPhone home screen, launching full-screen without Safari browser bars!
