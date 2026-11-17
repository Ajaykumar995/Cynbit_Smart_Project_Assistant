<<<<<<< HEAD
# Cynbit Smart Project Assistant

> **Turn Your Ideas Into Real Products.**  
> An intelligent project inquiry wizard and software requirements scoping engine engineered for **Cynbit Technologies** as an independent prototype for the Full Stack Developer Intern assessment.

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Mongoose-47A248.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 1. Project Overview

Traditional "Contact Us" forms fail modern software development: they collect ambiguous sentences, cause protracted email ping-pong, and delay accurate technical estimates.

The **Cynbit Smart Project Assistant** replaces standard forms with an **interactive 6-phase requirements scoping wizard**. In under 2 minutes, prospective clients specify their platform architecture, feature matrix, budget bracket, timeline, and contact preferences. The system synthesizes this input into a structured project brief, computes estimated complexity and recommended technology stacks, and assigns an executive reference ID (`CYN-2026-XXXXX`) backed by MongoDB persistence.

---

## 2. Core Features & Pages

### 1. Landing Page (`/`)
- **Hero Section**: High-impact value proposition: *"Turn Your Ideas Into Real Products."* with clear CTA: *"Start Your Project"*.
- **Interactive Scoping Simulator**: Live widget allowing users to experiment with platform choices (SaaS, Mobile App, AI Automation, Web App) and feature blocks before entering the wizard.
- **Trust Metrics Bar**: Key indicators (2 Min Scoping Flow, < 24h Engineering Review, 100% Transparent Rupee Brackets, MERN Architecture).
- **Core Advantages (Features Section)**: 4 cards highlighting granular feature scoping, clear pricing brackets, instant architecture briefs, and reference tracking.
- **The Workflow (How It Works)**: 4 numbered phases guiding users from initial domain selection to final technical discovery.
- **Professional Footer**: Cynbit branding, system health indicator, assessment context, and quick links.

### 2. Project Inquiry Wizard (`/wizard`)
A responsive 6-step guided wizard with visual progress bar, validation per step, and draft persistence (`localStorage`):
- **Step 1: Project Type**: Web Application, SaaS Platform, AI Automation & Agents, Mobile App, Modern Website, or Custom Solution.
- **Step 2: Features Matrix**: Category-filtered selection (Core Experience, Security & Access, Commerce, AI & Data, Infrastructure) with multi-select counter, plus a custom feature tag addition input.
- **Step 3: Budget**: Transparent Indian Rupee brackets tailored to Cynbit:
  - `₹25,000 – ₹50,000` (Rapid MVP / Prototype)
  - `₹50,000 – ₹1,00,000` (Standard Production App)
  - `₹1,00,000 – ₹2,00,000` (Scalable SaaS & Platform)
  - `₹2,00,000 – ₹3,00,000+` (Enterprise & AI Systems)
  - `Undecided / Need Scoping Consultation`
- **Step 4: Timeline**: Delivery horizons (`< 2 Weeks`, `1 Month`, `2 – 3 Months`, `3 – 6 Months`, `Flexible / Milestone-Driven`).
- **Step 5: Contact Details**: Full Name, Email (validated format), Phone/WhatsApp, Company Name, Preferred Channel (Email, WhatsApp, Google Meet, Phone), and Project Description (up to 3000 chars).
- **Step 6: Review & Submit**: Live synthesized project brief, automated complexity calculation, estimated hours, recommended tech stack, jump-to-step editing, and single-click MongoDB submission.

### 3. Success Page (`/success/:id`)
- Confetti celebration effect on submission.
- **Unique Reference ID Banner**: Executive alphanumeric reference (e.g. `CYN-2026-738F19`) with one-click clipboard copy.
- **Visual Next Steps Roadmap**: 3 phases (Ingestion, Tech Lead Evaluation within 24h, Discovery Call & NDA).
- **Project Brief Snapshot**: Displays all submitted parameters.
- **Download Project Brief**: Exports clean formatted text file (`.txt`) for the client's records.

### 4. Inquiry Status Tracker (`/track`)
- Direct lookup by Reference ID or MongoDB `_id`.
- Fetches real-time status and technical specifications from `GET /api/inquiries/:id`.
- Quick-test helper drawer displaying recent inquiries in the database for instant evaluator testing.

---

## 3. Human UI/UX Design System

The interface was designed from the perspective of an experienced human product designer, adhering to strict quality benchmarks:
- **Visual Palette**: Obsidian/slate surfaces (`#090D16`, `#0F172A`) paired with refined indigo-cyan accents (`#6366F1`, `#06B6D4`), crisp 1px borders (`#1E293B`), and subtle ambient glow effects.
- **Typography**: Clean hierarchy with `Inter` for body copy, system font fallbacks, and tabular `JetBrains Mono` for IDs and budget metrics.
- **Tactile Feedback**: Interactive card states, micro-transitions, active step rings, and subtle loading animations.
- **AI-Slop Avoidance**: Zero repetitive generic card templates, no neon oversaturated gradients, no emoji icons, and no distracting decorative widgets.
- **100% Responsive**: Tested across desktop displays, tablets, and mobile screens with accessible touch targets and mobile drawer navigation.

---

## 4. Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS 3, React Router DOM v6, Axios, Lucide React, Canvas Confetti |
| **Backend** | Node.js, Express.js, Mongoose, Express Validator, Morgan, CORS, Dotenv |
| **Database** | MongoDB Atlas (Production) / Local MongoDB Service (`27017`) |
| **Deployment** | Netlify (Frontend SPA) + Render (Backend Web Service) |

---

## 5. Backend REST API Reference

### Base URL
- Local: `http://localhost:5000/api`
- Production: `https://<your-render-app>.onrender.com/api`

### 1. Health Check
```http
GET /api/health
```
**Response (200 OK):**
```json
{
  "status": "ok",
  "service": "Cynbit Smart Project Assistant API",
  "database": "connected",
  "timestamp": "2026-11-17T10:45:09.047Z",
  "uptime": "552 seconds"
}
```

### 2. Submit Project Inquiry
```http
POST /api/inquiries
Content-Type: application/json
```
**Request Body:**
```json
{
  "projectType": "SaaS",
  "features": ["Authentication", "Dashboard", "Payments", "AI Chatbot"],
  "budget": "₹1,00,000 – ₹2,00,000",
  "timeline": "2 – 3 Months",
  "contact": {
    "name": "Sarah Connor",
    "email": "sarah@cyberdyne.io",
    "phone": "+91 98765 43210",
    "company": "Cyberdyne Systems",
    "preferredContact": "Google Meet"
  },
  "description": "Multi-tenant B2B analytics platform with AI workflow assistant."
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "Project inquiry submitted successfully",
  "data": {
    "referenceId": "CYN-2026-738F19",
    "projectType": "SaaS",
    "features": ["Authentication", "Dashboard", "Payments", "AI Chatbot"],
    "budget": "₹1,00,000 – ₹2,00,000",
    "timeline": "2 – 3 Months",
    "contact": { ... },
    "estimatedScope": {
      "complexity": "Production Scalable",
      "estimatedHours": "140 - 220 Hours",
      "recommendedStack": [
        "Next.js 14",
        "Node.js / TypeScript",
        "MongoDB / PostgreSQL",
        "Stripe Subscriptions",
        "Redis",
        "OpenAI API / Claude API"
      ],
      "architectureStyle": "Clean Layered Monolith with RESTful APIs"
    },
    "status": "Submitted",
    "_id": "6afc30628ff456ceefd81c93",
    "createdAt": "2026-11-17T10:45:54.074Z"
  }
}
```

### 3. Retrieve Inquiry by Reference ID or Mongo ID
```http
GET /api/inquiries/:id
```
**Example:** `GET /api/inquiries/CYN-2026-738F19`  
**Response (200 OK):** Returns single inquiry document.

### 4. List Inquiries (Prototype Testing)
```http
GET /api/inquiries?limit=25
```
**Response (200 OK):** Returns array of recent inquiries.

---

## 6. Local Development Setup

### Prerequisites
- Node.js (v18 or v20+)
- MongoDB (Local service running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI)

### Step 1: Clone and Navigate
```bash
cd "Cynbit Smart Project Assistant"
```

### Step 2: Install Dependencies
```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Return to root
cd ..
```

### Step 3: Configure Environment Variables
Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/cynbit_assistant
CLIENT_URL=http://localhost:5173
```

Create `frontend/.env`:
```env
# Leave empty for local dev (Vite proxy forwards /api to http://localhost:5000)
VITE_API_URL=
```

### Step 4: Run the Application
In terminal 1 (Backend):
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

In terminal 2 (Frontend):
```bash
cd frontend
npm run dev
# Vite runs on http://localhost:5173
```

Alternatively, run both concurrently from the root directory:
```bash
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 7. Production Deployment Guide

### Deploying the Backend to Render
1. Push this repository to GitHub.
2. In Render Dashboard, click **New +** -> **Web Service**.
3. Select your repository and set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `<Your MongoDB Atlas connection string>`
   - `CLIENT_URL`: `https://<your-netlify-app>.netlify.app`
5. Click **Create Web Service**. Your backend API will be live at `https://<render-service-name>.onrender.com`.

### Deploying the Frontend to Netlify
1. In Netlify Dashboard, click **Add new site** -> **Import an existing project**.
2. Select your repository.
3. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. In **Environment variables**, add:
   - `VITE_API_URL`: `https://<render-service-name>.onrender.com/api`
5. Click **Deploy Site**. Netlify will use the included `_redirects` and `netlify.toml` for seamless client-side SPA routing.

---

## 8. Verification & Quality Assurance Summary

- [x] **Backend API Initialized**: Express server running on port 5000.
- [x] **Database Verified**: MongoDB connected; `POST /api/inquiries` and `GET /api/inquiries/:id` tested and saving real records.
- [x] **Frontend Production Build**: Vite build executed cleanly with 0 errors (`dist` generated).
- [x] **API Proxying**: Tested Vite proxy forwarding `/api/health` directly to backend with 200 OK.
- [x] **Form Validation**: Client-side and server-side validation tested for email, required steps, and length limits.
- [x] **Responsive Testing**: Verified desktop, tablet, and mobile layouts with clean touch targets.
- [x] **Deployment Artifacts**: `render.yaml`, `netlify.toml`, `.env.example`, and `.gitignore` configured.

---

**Cynbit Smart Project Assistant** &mdash; *Engineered for Cynbit Technologies Assessment.*
=======
# Cynbit_Smart_Project_Assistant
>>>>>>> 1713113b96d0f4f5f13c1d98fc85277661b8c96c
