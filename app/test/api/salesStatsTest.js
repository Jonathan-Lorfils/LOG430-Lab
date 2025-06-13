
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 20,
    duration: '30s',
};

export default function () {
    const token = 'token-static-123';

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const res = http.get(
        'http://localhost:3000/api/v1/parentstore/salesStats',
        { headers }
    );

    check(res, {
        'status est 200': (r) => r.status === 200,
        'réponse contient storeRevenueByStore': (r) =>
            Array.isArray(r.json().data?.storeRevenueByStore),
        'réponse contient outOfStockProducts': (r) =>
            Array.isArray(r.json().data?.outOfStockProducts),
        'réponse contient trendyProducts': (r) =>
            Array.isArray(r.json().data?.trendyProducts),
    });

    sleep(1);
}
