// src/index.js
// Entry point: sets up Express, middleware, routes, swagger, and error handling.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');

const patientsRouter = require('./routes/patients');
const errorHandler = require('./middleware/errorHandler');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Readiness: check DB connection (simple)
app.get('/ready', async (req, res) => {
  try {
    const pool = await db.getPool();
    // simple lightweight query
    await pool.request().query('SELECT 1 AS ok');
    return res.json({ ready: true });
  } catch (err) {
    return res.status(503).json({ ready: false, error: err.message });
  }
});

// Mount patients routes
app.use('/patients', patientsRouter);

// Swagger (dev only) - conditional mounting
const SWAGGER_ENABLED = process.env.SWAGGER_ENABLED === 'true';
if (SWAGGER_ENABLED && NODE_ENV !== 'production') {
  try {
    const doc = yaml.load(fs.readFileSync(__dirname + '/docs/openapi.yaml', 'utf8'));

    // optional simple basic-auth protection for docs
    const swaggerUser = process.env.SWAGGER_USER;
    const swaggerPass = process.env.SWAGGER_PASS;

    if (swaggerUser && swaggerPass) {
      app.use('/docs', (req, res, next) => {
        const auth = req.headers.authorization || '';
        if (!auth.startsWith('Basic ')) {
          res.set('WWW-Authenticate', 'Basic realm=\"Docs\"');
          return res.status(401).send('Auth required for docs');
        }
        const base64Credentials = auth.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [user, pass] = credentials.split(':');
        if (user === swaggerUser && pass === swaggerPass) return next();
        res.set('WWW-Authenticate', 'Basic realm=\"Docs\"');
        return res.status(401).send('Invalid credentials');
      }, swaggerUi.serve, swaggerUi.setup(doc));
    } else {
      app.use('/docs', swaggerUi.serve, swaggerUi.setup(doc));
    }
  } catch (err) {
    console.error('Failed to load Swagger doc:', err.message);
  }
}

// Error handler (must be last)
app.use(errorHandler);



// Start server only if run directly
if (require.main === module) {
  app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    try {
      await db.getPool();
      console.log('DB pool initialized');
    } catch (err) {
      console.error('DB pool init failed:', err.message);
    }
  });
}

// Export app for testing
module.exports = app;
