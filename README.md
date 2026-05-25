# Plantify 🌿

Plantify is an immersive, cinematic culinary journey featuring organic minimalist styling, advanced botanical mixing systems, and full-featured bilingual localization. This full-stack application brings visual elegance, luxurious motion designs, and modular architectures to modern web design.

---

## ✨ Features

- **Botanical Mixer & Custom Formulations**:
  A fully interactive, state-driven blender system that lets patrons mix their own nutritious or botanical smoothies. Customizer options include:
  - **Fresh Organic Fruit Bases**: Mango Nectar, Watermelon Purée, Kiwi Splash, and Berry Infusion.
  - **Creamy Nut Milks & Bases**: Coconut Cream, Oat Milk, Almond Paste, and Pistachio Cream.
  - **Gourmet Toppings**: Wild Honey, Pistachio Crunch, Rose Petals, and Organic Chia.

- **Bilingual Internationalization (En / Ar)**:
  - Deep-seated localizations supporting English and Arabic (`RTL` layout shift).
  - Dynamic Arabic translation for raw ingredients, wellness benefits, recipes, and formulation labels.
  - Formulated recipe text matches dynamically with language changes.

- **Interactive Animations & Micro-interactions**:
  - Immersive loading/mixing simulations.
  - Soft-fade entries, dynamic card scaling, and fluid slider carousels powered by `motion` (formerly framer-motion).

- **Full-Stack Architecture**:
  - Modular Client-Side SPA built with **React** and **Vite**.
  - Custom standalone backend built with **Express** and **TypeScript** supporting fully robust, bundle-able production outputs (`dist/server.cjs`) via `esbuild`.

- **Modern Minimalist Visual Styling**:
  - Crafted with deep forest, slate background panels, gold accents, and clean typeface pairings utilizing Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React, Motion
- **Backend / Server**: Express, tsx (development runner), esbuild (bundler)
- **Language**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (v18+) installed on your machine.

### Installation

1. Clone the repository or extract the project zip directory.
2. In the project root, install all required dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development Server

Boot up the development environment using the Express + Vite unified server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

#### Production Build & Running Independent Executables

To build the application for standard production deployment (producing optimized client static assets and bundling the standalone backend):
```bash
npm run build
```
Once the build concludes successfully, start the production server:
```bash
npm run start
```

---

## 📂 Project Structure

```
├── .env.example            # Environment variables setup example
├── .gitignore              # Git excluded directories and logs
├── index.html              # Core SPA entry point
├── metadata.json           # Application configurations and permissions
├── package.json            # Scripts, overrides, and dependencies
├── server.ts               # Standalone Express backend + Vite middleware dev environment
├── tsconfig.json           # Type configurations for TypeScript compilation
├── src/
│   ├── main.tsx            # React client mount point
│   ├── App.tsx             # Primary component router and layout system
│   ├── index.css           # Global Tailwind CSS configurations and font imports
│   ├── types.ts            # Declarations of central ingredient and item systems
│   ├── components/         # Extraction of modular dashboard screens
│   │   ├── BotanicalMixer.tsx      # Main Page custom formulation selector
│   │   ├── MixerPage.tsx           # Full-screen compounding and checkout system
│   │   ├── MenuPage.tsx            # Menu viewer with Cart mechanics
│   │   ├── ReservationSection.tsx  # Table and meal reservation managers
│   │   └── ...
│   ├── data/               # Static menu logs and recipes
│   └── utils/              # Token security utilities and context binders
```

---

*Plantify 🌿 - Curated with absolute dedication to premium interactive dining experiences.*
