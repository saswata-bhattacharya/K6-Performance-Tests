import http from 'k6/http';
import { check } from 'k6';

export default function () {
    let res = http.get('http://localhost:8000/public/crocodiles/');
    const crocodiles = res.json();
    const crocodileId = crocodiles[0].id;
    const crocodileName = crocodiles[0].name;

    res = http.get(`http://localhost:8000/public/crocodiles/${crocodileId}/`);

    console.log(res.headers.Allow);
    console.log(res.headers['Content-Type']);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile name': (r) => r.json().name === crocodileName
    });

}