const express = require('express');
const client = require('prom-client');

const app = express();

function startMetricsServer() {
    const collectDefaultMetrics = client.collectDefaultMetrics;
    collectDefaultMetrics();

    app.get('/metrics', async (req, res) => {
        res.set("Content-Type", client.register.contentType);
        return res.send(await client.register.metrics())
    });

    const httpRequestCounter = new client.Counter({
        name: 'http_requests_total',
        help: 'Total number of HTTP requests',
        labelNames: ['method', 'endpoint']
    });

    const requestDurationHistogram = new client.Histogram({
        name: 'http_request_duration_seconds',
        help: 'Duration of HTTP requests in seconds',
        labelNames: ['route'],
        buckets: [0.1, 0.5, 1, 2, 5],
    });

    // Middleware to count HTTP requests
    app.use((req, res, next) => {
        // const timestamp = new Date().toISOString(); // Current UTC time
        httpRequestCounter.inc({ method: req.method, endpoint: req.path });
        // Observation for request duration
        requestDurationHistogram.observe({ route: req.path }, 0.5); // 0.5 seconds
        next();
    });

    app.listen(4556, () => {
        console.log("Metrics server started at 4556")
    });
}

module.exports = {
    startMetricsServer
};
