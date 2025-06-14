import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics();

const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of Http request in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [50, 100, 200, 300, 500, 1000, 2000],
});

export { httpRequestDurationMicroseconds, client };
