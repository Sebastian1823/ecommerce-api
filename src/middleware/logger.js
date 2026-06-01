const logger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    let color;
    if (status >= 500) color = '\x1b[31m';
    else if (status >= 400) color = '\x1b[33m';
    else if (status >= 300) color = '\x1b[36m';
    else color = '\x1b[32m';

    console.log(
      `${color}${req.method}\x1b[0m ${req.originalUrl} ${color}${status}\x1b[0m ${duration}ms`
    );
  });

  next();
};

module.exports = logger;
