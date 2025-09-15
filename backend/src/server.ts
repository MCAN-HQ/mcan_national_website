import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Import configurations
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { logger } from './utils/logger';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import memberRoutes from './routes/members';
import paymentRoutes from './routes/payments';
import propertyRoutes from './routes/properties';
import marketplaceRoutes from './routes/marketplace';
import dashboardRoutes from './routes/dashboard';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Trust proxy for rate limiting (required for Render)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: process.env.CORS_CREDENTIALS === 'true',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  }));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MCAN API is running',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Simple test endpoint
app.get('/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Test endpoint working',
    timestamp: new Date().toISOString(),
  });
});

// API Documentation
if (process.env.API_DOCS_ENABLED === 'true') {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'MCAN National Website API',
        version: '1.0.0',
        description: 'API documentation for Muslim Corpers Association of Nigeria',
        contact: {
          name: 'MCAN Technical Team',
          email: 'tech@mcan.org.ng',
        },
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
  };

  const specs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'MCAN API Documentation',
  }));
}

// API Routes (temporarily disabled until database is working)
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/members', memberRoutes);
// app.use('/api/v1/payments', paymentRoutes);
// app.use('/api/v1/properties', propertyRoutes);
// app.use('/api/v1/marketplace', marketplaceRoutes);
// app.use('/api/v1/dashboard', dashboardRoutes);

// Temporary simple auth endpoint for testing
app.post('/api/v1/auth/register', (req, res) => {
  res.json({
    success: true,
    message: 'Registration successful - database setup in progress',
    data: {
      user: {
        id: 'temp-id-' + Date.now(),
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        role: 'MEMBER',
        stateCode: req.body.stateCode,
        nyscNumber: req.body.nyscNumber,
        deploymentState: req.body.deploymentState,
        serviceYear: req.body.serviceYear,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      token: 'temp-token-' + Date.now()
    }
  });
});

app.post('/api/v1/auth/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login successful - database setup in progress',
    data: {
      user: {
        id: 'temp-id-' + Date.now(),
        fullName: 'Test User',
        email: req.body.email,
        phone: '1234567890',
        role: 'MEMBER',
        stateCode: 'LA',
        nyscNumber: 'LA/2024/123456',
        deploymentState: 'Lagos',
        serviceYear: '2024',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      token: 'temp-token-' + Date.now()
    }
  });
});

// Temporary properties endpoints for UI integration
app.get('/api/v1/properties', (req, res) => {
  const { state, type, q } = req.query as { state?: string; type?: string; q?: string };

  const sample = [
    {
      id: 'p-1',
      name: 'MCAN Lodge - Ikeja',
      type: 'LODGE',
      state: 'Lagos',
      location: '12 Unity Street, Ikeja, Lagos',
      capacity: 60,
      condition: 'GOOD',
      manager: 'AbdulRahman Yusuf',
      status: 'ACTIVE',
      ownership: 'MCAN',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'p-2',
      name: 'MCAN Community Masjid - Kano',
      type: 'MASJID',
      state: 'Kano',
      location: 'Hadejia Road, Kano City',
      status: 'ACTIVE',
      ownership: 'DONATED',
      condition: 'EXCELLENT',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'p-3',
      name: 'MCAN State Bus - Kaduna',
      type: 'BUS',
      state: 'Kaduna',
      location: 'Kaduna Secretariat',
      status: 'UNDER_MAINTENANCE',
      ownership: 'MCAN',
      manager: 'Zainab S.',
      lastUpdated: new Date().toISOString(),
    },
  ];

  let filtered = sample;
  if (state) filtered = filtered.filter((p) => p.state.toLowerCase() === String(state).toLowerCase());
  if (type) filtered = filtered.filter((p) => p.type.toLowerCase() === String(type).toLowerCase());
  if (q) {
    const term = String(q).toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(term) || p.location.toLowerCase().includes(term));
  }

  res.json({ success: true, message: 'Properties fetched', data: filtered });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to MCAN National Website API',
    version: '1.0.0',
    documentation: '/api-docs',
    health: '/health',
  });
});

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Initialize database tables
const initializeDatabase = async () => {
  try {
    const { db } = await import('./config/database');
    
    // Check if users table exists
    const tableExists = await db.schema.hasTable('users');
    
    if (!tableExists) {
      logger.info('Database tables not found, creating minimal schema...');
      
      // Enable UUID extension
      await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      
      // Create users table with minimal schema
      await db.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(db.raw('uuid_generate_v4()'));
        table.string('email', 255).unique().notNullable();
        table.string('full_name', 255).notNullable();
        table.string('phone', 20).notNullable();
        table.string('password_hash', 255).notNullable();
        table.string('role', 50).notNullable().defaultTo('MEMBER');
        table.string('state_code', 10);
        table.string('nysc_number', 20);
        table.string('deployment_state', 100);
        table.string('service_year', 10);
        table.boolean('is_active').defaultTo(true);
        table.boolean('is_email_verified').defaultTo(false);
        table.string('profile_picture', 500);
        table.jsonb('biometric_data');
        table.string('email_verification_token', 255);
        table.string('password_reset_token', 255);
        table.timestamp('password_reset_expires');
        table.timestamp('last_login');
        table.timestamps(true, true);
      });
      
      // Create members table
      await db.schema.createTable('members', (table) => {
        table.uuid('id').primary().defaultTo(db.raw('uuid_generate_v4()'));
        table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('state_code', 10).notNullable();
        table.string('nysc_number', 20).unique().notNullable();
        table.string('deployment_state', 100).notNullable();
        table.string('service_year', 10).notNullable();
        table.timestamp('registration_date').defaultTo(db.fn.now());
        table.string('membership_status', 20).defaultTo('ACTIVE');
        table.string('payment_status', 20).defaultTo('CURRENT');
        table.timestamp('last_payment_date');
        table.timestamp('next_payment_date');
        table.timestamps(true, true);
      });
      
      logger.info('Minimal database schema created successfully');
    } else {
      logger.info('Database tables already exist');
    }
  } catch (error) {
    logger.error('Database initialization failed:', error);
    throw error;
  }
};

// Start server
const startServer = async () => {
  try {
    // Start the server first
    app.listen(PORT, () => {
      logger.info(`🚀 MCAN API server running on port ${PORT}`);
      logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
      logger.info(`🏥 Health Check: http://localhost:${PORT}/health`);
      logger.info(`🌍 Environment: ${NODE_ENV}`);
    });

    // Connect to database (async, non-blocking)
    try {
      await connectDatabase();
      logger.info('Database connected successfully');

      // Initialize database tables
      await initializeDatabase();
      logger.info('Database initialized successfully');
    } catch (dbError) {
      logger.error('Database connection/initialization failed:', dbError);
      logger.warn('Server running without database - some features may not work');
    }

    // Connect to Redis (optional)
    const redisConnected = await connectRedis();
    if (redisConnected) {
      logger.info('Redis connected successfully');
    } else {
      logger.warn('Redis not available, continuing without caching');
    }
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

startServer();

export default app;
