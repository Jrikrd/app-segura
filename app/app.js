import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import publicRouter from './routes/public.js';
import authRouter from './routes/auth.js';
import errorHandler from './middleware/error.js';

dotenv.config();
const app = express();

// Seguridad básica
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"]
    }
  },
  referrerPolicy: { policy: "no-referrer" }
}));
app.use(cors({ origin: process.env.CORS_ORIGIN || false }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined'));
app.disable('x-powered-by');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Rutas
app.use('/api', publicRouter);
app.use('/api/auth', authRouter);

// Healthcheck
app.get('/health', (req, res) => res.json({ ok: true }));

// Manejador de errores
app.use(errorHandler);

export default app;