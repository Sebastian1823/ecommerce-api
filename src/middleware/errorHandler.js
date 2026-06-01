const errorHandler = (err, req, res, next) => {
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      error: err.details.map(d => d.message).join(', ')
    });
  }

  console.error('\x1b[31m[Error]\x1b[0m', err.message);

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: status === 500 ? 'Error interno del servidor' : err.message
  });
};

module.exports = errorHandler;
