export default function errorHandler (err, req, res, next) {
  const status = err.status || 400;
  const message = err.message || 'Solicitud inválida';
  if (process.env.NODE_ENV !== 'test') {
    // Logging básico (en producción usar SIEM)
    console.error('[ERROR]', message);
  }
  res.status(status).json({ error: message });
}
