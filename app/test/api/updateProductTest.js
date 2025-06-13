import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '15s',
};

export default function () {
    const token = 'token-static-123';
    const productId = Math.floor(Math.random() * 5) + 1;

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const payload = JSON.stringify({
        name: 'Produit modifié ' + productId,
        price: 19.99,
        description: 'Description du produit modifié ' + productId,
    });

    const res = http.put(
        `http://localhost:3000/api/v1/products/updateProduct/${productId}`,
        payload,
        { headers }
    );

    check(res, {
        'status est 200': (r) => r.status === 200,
        'message de succès présent': (r) => r.json().message !== undefined,
    });

    sleep(1);
}
