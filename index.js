import { createClient } from 'redis';

console.log("01");

const client = createClient({
//    username: 'root', // use your Redis user. More info https://redis.io/docs/management/security/acl/
    password: '12345', // use your password here
    socket: {
        host: 'localhost',
        port: 6379,
        // tls: true,
        // key: readFileSync('./redis_user_private.key'),
        // cert: readFileSync('./redis_user.crt'),
        // ca: [readFileSync('./redis_ca.pem')]
    }
});
console.log("02");

client.on('error', (err) => console.log('Redis Client Error', err));
console.log("02.1");

await client.connect();

console.log("02.2");
await client.set('foo', 'bar');
console.log("02.3");
const value = await client.get('foo');
console.log("02.4");
console.log(value) // returns 'bar'

console.log("03");

await client.disconnect();

console.log("04");
