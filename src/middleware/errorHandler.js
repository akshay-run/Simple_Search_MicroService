// src/middleware/errorHandler.js
// Centralized error handler. Logs and returns safe messages.

module.exports = function errorHandler(err, req, res, next) {
  console.error(err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  // Simple handling: expose message for known errors, otherwise generic
  const status = err.status || 500;
  const message = status === 500 ? 'Internal Server Error' : (err.message || 'Error');
  res.status(status).json({ error: message });
};
