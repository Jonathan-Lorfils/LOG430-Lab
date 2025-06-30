import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 150,
    duration: '30s',
};

function getRandomPrice() {
    return (Math.random() * (50 - 5) + 5).toFixed(2);
}

export default function () {
    const token = 'token-static-123';
    const productId = Math.floor(Math.random() * 20) + 1;

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const payload = JSON.stringify({
        name: 'Produit modifié ' + productId,
        price: getRandomPrice(),
        description: 'Description du produit modifié ' + productId,
    });

    const res = http.put(
        `http://localhost/api/v1/product/updateProduct/${productId}`,
        payload,
        { headers }
    );

    check(res, {
        'status est 200': (r) => r.status === 200,
        'message de succès présent': (r) => r.json().message !== undefined,
    });

    sleep(1);
}
