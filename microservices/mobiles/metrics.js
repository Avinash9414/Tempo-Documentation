const prometheus = require('prom-client');

const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in milliseconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 5, 15, 50, 100, 500],
});

const httpRequestDurationSeconds = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.0001, 0.005, 0.015, 0.05, 0.1, 0.5], // Adjusted for seconds
});


const requestCounter = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Middleware to measure request duration and count requests
function middleware(req, res, next) {
  const start = process.hrtime();
  res.on('finish', () => {
    const duration = process.hrtime(start);
    const durationInSeconds = duration[0] + duration[1] / 1e9;
    const route = req.route ? req.route.path : 'unknown';
    const statusCode = res.statusCode || 500;

    const durationInMicroseconds = (duration[0] * 1e6 + duration[1] / 1e3) || 0;
    httpRequestDurationMicroseconds
      .labels(req.method, route, statusCode)
      .observe(durationInMicroseconds);

      httpRequestDurationSeconds
      .labels(req.method, route, statusCode)
      .observe(durationInSeconds);


    requestCounter.labels(req.method, route, statusCode).inc();
  });
  next();
}

module.exports = {
  prometheus,
  middleware,
};

