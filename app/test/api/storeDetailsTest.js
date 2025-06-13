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

    const storeId = Math.floor(Math.random() * 5) + 1;
    const res = http.get(
        `http://localhost:3000/api/v1/stores/details/${storeId}`,
        { headers }
    );

    check(res, {
        'status est 200': (r) => r.status === 200,
        'réponse contient le store': (r) => r.json().data?.store?.id === storeId,
        'réponse contient des stocks': (r) => Array.isArray(r.json().data?.stocks),
        'réponse contient des ventes': (r) => Array.isArray(r.json().data?.sales),
    });

    sleep(1);
}
