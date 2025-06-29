import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 30,
    duration: '30s',
};

export default function () {
    const token = 'token-static-123';

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const customerId = Math.floor(Math.random() * 10).toString();

    const res = http.get(
        `http://localhost/api/v1/cart/customer/${customerId}`,
        { headers }
    );

    check(res, {
        'status is 200 or 404': (r) => r.status === 200,
        'response has success field': (r) => r.json().success !== undefined,
        'data has cartId if status 200': (r) =>
            r.status === 200 ? r.json().data?.cartId !== undefined : true,
    });

    sleep(1);
}
