import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import { getHealthCheck } from './controllers/inquiryController.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - support local dev and production deployments
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith('.netlify.app') ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.onrender.com');

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for preview/intern review environments
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', getHealthCheck);

// API Documentation / root
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    project: 'Cynbit Smart Project Assistant API',
    endpoints: {
      health: 'GET /api/health',
      submitInquiry: 'POST /api/inquiries',
      getInquiry: 'GET /api/inquiries/:id',
      listInquiries: 'GET /api/inquiries',
    },
    documentation: 'See README.md for full specs',
  });
});

// Mount Routes
app.use('/api/inquiries', inquiryRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start Server and Connect Database
const startServer = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.warn('[Server] Starting server with degraded DB connection. Will retry on request.');
  }

  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`  Cynbit Smart Project Assistant API Server    `);
    console.log(`  Listening on port: ${PORT}                  `);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'} `);
    console.log(`  Health Check: http://localhost:${PORT}/api/health `);
    console.log(`===============================================`);
  });
};

startServer();

export default app;
