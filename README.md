Cynbit Smart Project Assistant
Turn Your Ideas Into Real Products.
An intelligent project inquiry wizard and software requirements
scoping engine built as an independent prototype for the Cynbit
Technologies Full Stack Developer Intern assessment.

Live Demo
- Frontend: https://cynbitprojectassistant.netlify.app/
- Backend API:
  https://cynbit-smart-project-assistant.onrender.com
- API health check:
  https://cynbit-smart-project-assistant.onrender.com/api/health
1. Project Overview
Traditional contact forms often collect vague project descriptions,
leading to lengthy follow-ups and delays in technical estimation.

The Cynbit Smart Project Assistant replaces a standard contact form
with an interactive, six-phase requirements-scoping wizard. Prospective
clients can specify their platform, required features, budget, timeline,
and contact details. The application generates a structured project
brief and stores the inquiry in MongoDB with a unique reference ID.
2. Core Features
Landing Page (/)
- Hero section with a clear project-start call to action.
- Interactive project-scoping simulator.
- Trust metrics and feature highlights.
- Workflow explanation and professional footer.
Project Inquiry Wizard (/wizard)
A responsive six-step wizard with progress tracking, step validation,
and draft persistence using localStorage.
1. Project Type: Web Application, SaaS Platform, AI Automation,
   Mobile App, Modern Website, or Custom Solution.
2. Features: Select from feature categories and add custom feature
   tags.
3. Budget: Choose a project budget range in Indian Rupees or
   request a scoping consultation.
4. Timeline: Select a preferred delivery horizon.
5. Contact Details: Enter name, email, phone, company, preferred
   contact channel, and project description.
6. Review & Submit: Review the generated project brief and submit
   the inquiry.
Success Page (/success/:id)
- Displays a unique project reference ID.
- Provides a project brief snapshot and next-step roadmap.
- Supports copying the reference ID and downloading the brief as a
  text file.
Inquiry Status Tracker (/track)
- Looks up an inquiry using its reference ID or MongoDB ID.
- Retrieves inquiry status and project details through the backend
  API.
3. UI/UX Design
- Dark slate/obsidian visual palette with indigo and cyan accents.
- Clear typography and consistent spacing.
- Interactive states, subtle transitions, and loading feedback.
- Responsive layouts for desktop, tablet, and mobile.
- Accessible touch targets and straightforward navigation.
4. Technology Stack
  Layer                               Technologies
  Frontend                            React 18, Vite, Tailwind CSS, React
Router DOM, Axios, Lucide React,
Canvas Confetti

  Backend                             Node.js, Express.js, Mongoose,
Express Validator, Morgan, CORS,
Dotenv

  Database                            MongoDB Atlas / MongoDB
Deployment                          Netlify (frontend), Render
(backend)
5. Backend REST API
Production base URL:
https://cynbit-smart-project-assistant.onrender.com/api
Local base URL: http://localhost:5000/api
  Method                  Endpoint                Description
  GET                   /health               Checks API and database
health

  POST                  /inquiries            Submits a new project
inquiry

  GET                   /inquiries/:id        Retrieves an inquiry by
reference ID or MongoDB
ID
GET                   /inquiries?limit=25   Lists recent inquiries
for prototype testing
Example inquiry request
{
  "projectType": "SaaS",
  "features": ["Authentication", "Dashboard", "Payments", "AI Chatbot"],
  "budget": "₹1,00,000 – ₹2,00,000",
  "timeline": "2 – 3 Months",
  "contact": {
    "name": "Sarah Connor",
    "email": "sarah@example.com",
    "phone": "+91 98765 43210",
    "company": "Example Company",
    "preferredContact": "Google Meet"
  },
  "description": "A multi-tenant analytics platform with an AI workflow assistant."
}
6. Local Development Setup
Prerequisites
- Node.js 18 or later
- npm
- MongoDB local instance or MongoDB Atlas connection string
Clone the repository
git clone https://github.com/Ajaykumar995/Cynbit_Smart_Project_Assistant.git
cd Cynbit_Smart_Project_Assistant
Install dependencies
cd backend
npm install

cd ../frontend
npm install
Configure environment variables
Create backend/.env:
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
Create frontend/.env:
VITE_API_URL=
For local development, leave VITE_API_URL empty if the Vite proxy is
configured to forward /api requests to http://localhost:5000.
Run the application
Start the backend in one terminal:
cd backend
npm run dev
Start the frontend in another terminal:
cd frontend
npm run dev
Open http://localhost:5173 in your browser.
7. Production Deployment
Backend --- Render
- Service URL: https://cynbit-smart-project-assistant.onrender.com
- Root directory: backend
- Build command: npm install
- Start command: npm start
Configure the required environment variables in the Render dashboard:
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=https://cynbitprojectassistant.netlify.app
Set PORT only if required by your service configuration; Render
provides a port to web services through the environment.
Frontend --- Netlify
- Site URL: https://cynbitprojectassistant.netlify.app/
- Base directory: frontend
- Build command: npm run build
- Publish directory: dist
Set this frontend environment variable in Netlify:
VITE_API_URL=https://cynbit-smart-project-assistant.onrender.com/api
Redeploy the frontend after changing environment variables.
8. Verification Checklist
- [x] Express backend deployed on Render.
- [x] React frontend deployed on Netlify.
- [x] MongoDB Atlas configured for inquiry persistence.
- [x] Project inquiry API implemented.
- [x] Frontend and backend environment configuration documented.
- [x] Responsive wizard and inquiry flow implemented.
Cynbit Smart Project Assistant --- Built as an independent
prototype for the Cynbit Technologies assessment.
